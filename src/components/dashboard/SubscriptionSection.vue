<template>
  <section class="sub">
    <div class="sub__head">
      <h2 class="sub__title">Подписка на сервис</h2>
      <p class="sub__desc">Выберите необходимую вам подписку</p>
    </div>

    <div class="subTabs" role="tablist" aria-label="Тип подписки">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="subTab"
        :class="{ 'is-active': active === t.key }"
        type="button"
        role="tab"
        :aria-selected="active === t.key"
        @click="active = t.key"
      >
        <span class="subTab__label">{{ t.label }}</span>
        <span v-if="t.badge" class="subTab__badge">{{ t.badge }}</span>
      </button>
    </div>

    <div class="sub__content">
      <TariffsGrid :activeTab="active" @pick="onPickTariff" />

      <SubscribeModal
        v-model="isSubOpen"
        :title="subTitle"
        :price="subPrice"
        :locations="subLocations"
        :initialLocation="subInitialLocation"
        @submit="onBuy"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TariffsGrid, { type TariffPickPayload } from "./TariffsGrid.vue";
import SubscribeModal from "../ui/SubscribeModal.vue";

type TabKey = "trial" | "monthly" | "yearly" | "universal" | "builder";

const tabs = [
  { key: "trial" as const, label: "Пробная" },
  { key: "monthly" as const, label: "Месячная" },
  { key: "yearly" as const, label: "Годовая", badge: "Новое" },
  { key: "universal" as const, label: "Универсальная" },
  { key: "builder" as const, label: "Конструктор" },
];

const active = ref<TabKey>("monthly");

/* modal state */
const isSubOpen = ref(false);
const subTitle = ref("Подписка");
const subPrice = ref(0);
const subLocations = ref<string[]>([]);
const subInitialLocation = ref("");

function onPickTariff(t: TariffPickPayload) {
  subTitle.value = t.title;
  subPrice.value = t.priceRub;

  subLocations.value = t.locations ?? [];
  subInitialLocation.value = t.defaultLocation ?? (subLocations.value[0] ?? "");

  isSubOpen.value = true;
}

function onBuy(p: any) {
  console.log("BUY", p);
}
</script>

<style scoped>
/* ===== Head ===== */
.sub__title {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  margin: 0;
  color: rgba(255,255,255,.95);
}

.sub__desc {
  margin: 16px 0 0;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #FFFFFF99;
}

/* ===== Tabs Panel (desktop/tablet default) ===== */
.subTabs {
  margin-top: 18px;

  display: flex;
  align-items: center;
  gap: 4px;

  padding: 4px;

  background: #0C0C0F;
  border: 1px solid #191920;
  border-radius: 20px;

  width: 100%;
  max-width: 635px;

  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.subTabs::-webkit-scrollbar { height: 0; }

.subTab {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  height: 40px;
  padding: 0 12px;

  border-radius: 16px;
  border: none;
  background: transparent;
  cursor: pointer;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;

  color: #FFFFFF99;
  white-space: nowrap;

  transition: background .18s ease, color .18s ease, opacity .18s ease;
}

.subTab:hover { color: rgba(255,255,255,.85); }

.subTab.is-active {
  background: #5D5DD0;
  color: rgba(255,255,255,.95);
}

.subTab__badge {
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255,255,255,.10);
  border: 1px solid rgba(255,255,255,.12);
  font-size: 12px;
  color: rgba(255,255,255,.85);
}

/* ===== Content ===== */
.sub__content { margin-top: 18px; }

/* ===== MOBILE: как в макете (перенос + центр) ===== */
@media (max-width: 520px) {
  .subTabs {
    max-width: 100%;
    padding: 10px 10px;          /* как “плашка” */
    border-radius: 26px;

    gap: 10px;                   /* чтобы не липли */
    justify-content: center;     /* все пункты по центру */
    flex-wrap: wrap;             /* ✅ перенос строк */
    overflow: visible;           /* ✅ убираем горизонтальный скролл */
  }

  .subTab {
    height: 44px;
    padding: 0 18px;
    border-radius: 999px;        /* “пилюля” */
    font-size: 18px;             /* крупнее как на скрине */
    color: rgba(255,255,255,.55);
  }

  .subTab.is-active {
    background: #5D5DD0;
    color: rgba(255,255,255,.95);
  }

  .subTab__badge {
    padding: 6px 10px;
    font-size: 14px;
    background: rgba(0,0,0,.35); /* чтобы как в макете “Новое” */
    border-color: rgba(255,255,255,.10);
    color: rgba(255,255,255,.9);
  }
}
</style>