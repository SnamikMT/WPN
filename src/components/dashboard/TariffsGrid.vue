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
      @select="onSelect(c)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import type { Plan } from "../../stores/auth";
import TariffCard from "./TariffCard.vue";

type TabKey = "trial" | "monthly" | "yearly" | "universal" | "builder";
type BadgeVariant = "popular" | "best" | "muted";

export type TariffPickPayload = {
  id: string;
  planKey: Exclude<Plan, "none">;
  title: string;
  subTitle: string;
  priceRub: number;          // число, удобно для модалки
  priceText: string;         // "100 ₽"
  locations?: string[];      // selectOptions
  defaultLocation?: string;  // selectValue
};

type Card = {
  id: string;
  planKey: Exclude<Plan, "none">;
  title: string;
  subTitle: string;
  badges?: { text: string; variant: BadgeVariant }[];
  selectOptions?: string[];
  selectValue?: string;
  chips?: string[];
  note?: string;
  price: string;
  isActive?: boolean; // добавляем в visibleCards
};

const props = defineProps<{ activeTab: TabKey }>();

const emit = defineEmits<{
  (e: "pick", payload: TariffPickPayload): void;
}>();

const auth = useAuthStore();

const userPlan = computed<Plan>(() => auth.currentUser?.plan ?? "none");
const hasPlan = computed(() => userPlan.value !== "none");

/* мок карточек */
const cards = computed<Card[]>(() => [
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

const visibleCards = computed(() => {
  const tab = props.activeTab;

  let list: Card[] = [];
  if (tab === "monthly") list = cards.value.filter((c) => c.planKey === "monthly");
  else if (tab === "yearly") list = cards.value.filter((c) => c.planKey === "yearly");
  else if (tab === "trial") list = cards.value.filter((c) => c.planKey === "trial");
  else list = cards.value.filter((c) => c.planKey === "monthly");

  return list.map((c) => ({
    ...c,
    isActive: hasPlan.value && c.planKey === userPlan.value,
  }));
});

/* утилита: "100 ₽" -> 100 */
function parseRub(text: string): number {
  const n = Number(String(text).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function onSelect(c: Card) {
  // если активный — можно запретить или открыть “управление”
  if (c.isActive) return;

  emit("pick", {
    id: c.id,
    planKey: c.planKey,
    title: c.title,
    subTitle: c.subTitle,
    priceRub: parseRub(c.price),
    priceText: c.price,
    locations: c.selectOptions,
    defaultLocation: c.selectValue,
  });
}
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