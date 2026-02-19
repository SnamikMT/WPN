<template>
  <div class="grid">
    <TariffCard
      v-for="c in visibleCards"
      :key="c.id"
      :title="c.title"
      :subTitle="c.subTitle"
      :selected="c.isActive"
      :activePill="c.isActive ? 'Активна' : undefined"
      :badges="c.badges"
      :selectOptions="c.selectOptions"
      :selectValue="c.selectValue"
      :chips="c.chips"
      :note="c.note"
      :price="c.price"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore, Plan } from "../../stores/auth";
import TariffCard from "./TariffCard.vue";

type TabKey = "trial" | "monthly" | "yearly" | "universal" | "builder";
type BadgeVariant = "popular" | "best" | "muted";

type Card = {
  id: string;
  planKey: Exclude<Plan, "none">; // trial | monthly | yearly
  title: string;
  subTitle: string;
  badges?: { text: string; variant: BadgeVariant }[];
  selectOptions?: string[];
  selectValue?: string;
  chips?: string[];
  note?: string;
  price: string;
};

const props = defineProps<{ activeTab: TabKey }>();

const auth = useAuthStore();

const userPlan = computed<Plan>(() => auth.currentUser?.plan ?? "none");
const hasPlan = computed(() => userPlan.value !== "none");

/**
 * ВАЖНО: эти карточки — мок.
 * Привязываем их к planKey, чтобы дальше логика была железобетонная.
 */
const cards = computed<Card[]>(() => [
  // ===== monthly =====
  {
    id: "m1",
    planKey: "monthly",
    title: "Одна локация",
    subTitle: "Подписка на месяц (30 дней)",
    selectOptions: ["Finland#1", "Finland#2"],
    selectValue: "Finland#1",
    chips: ["До 3 устройств", "1 сервер на выбор"],
    price: "100 ₽",
  },
  {
    id: "m2",
    planKey: "monthly",
    title: "Все локации Европы",
    subTitle: "Подписка на месяц (30 дней)",
    badges: [
      { text: "Популярно", variant: "popular" },
      { text: "До 5 устройств", variant: "muted" },
    ],
    note: "23 Уникальных сервера",
    price: "100 ₽",
  },
  {
    id: "m3",
    planKey: "monthly",
    title: "Все локации",
    subTitle: "Подписка на месяц (30 дней)",
    badges: [
      { text: "Лучший выбор", variant: "best" },
      { text: "До 15 устройств", variant: "muted" },
    ],
    note: "43 Уникальных сервера",
    price: "100 ₽",
  },

  // ===== yearly ===== (можешь допилить контент позже)
  {
    id: "y1",
    planKey: "yearly",
    title: "Все локации",
    subTitle: "Подписка на год (365 дней)",
    badges: [{ text: "Лучший выбор", variant: "best" }],
    chips: ["До 12 устройств", "42 сервера"],
    note: "Максимальная выгода",
    price: "560 ₽",
  },

  // ===== trial =====
  {
    id: "t1",
    planKey: "trial",
    title: "Пробный доступ",
    subTitle: "Тест на 3 дня",
    chips: ["1 сервер", "До 1 устройства"],
    note: "Для знакомства",
    price: "0 ₽",
  },
]);

/**
 * Какие карточки показываем по активной вкладке
 * (universal/builder можно пока показать пусто/заглушку).
 */
const visibleCards = computed(() => {
  const tab = props.activeTab;

  // фильтрация по вкладкам
  let list: Card[] = [];
  if (tab === "monthly") list = cards.value.filter(c => c.planKey === "monthly");
  else if (tab === "yearly") list = cards.value.filter(c => c.planKey === "yearly");
  else if (tab === "trial") list = cards.value.filter(c => c.planKey === "trial");
  else list = cards.value.filter(c => c.planKey === "monthly"); // временно

  // выделение “Активна” — только если у юзера есть подписка
  return list.map((c) => ({
    ...c,
    isActive: hasPlan.value && c.planKey === userPlan.value,
  }));
});
</script>

<style scoped>
.grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
