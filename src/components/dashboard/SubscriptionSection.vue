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
      <TariffsGrid :activeTab="active" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import TariffsGrid from "./TariffsGrid.vue";

type TabKey = "trial" | "monthly" | "yearly" | "universal" | "builder";

const tabs = [
  { key: "trial" as const, label: "Пробная" },
  { key: "monthly" as const, label: "Месячная" },
  { key: "yearly" as const, label: "Годовая", badge: "Новое" },
  { key: "universal" as const, label: "Универсальная" },
  { key: "builder" as const, label: "Конструктор" },
];

const active = ref<TabKey>("monthly");
const activeLabel = computed(() => tabs.find(t => t.key === active.value)?.label ?? "");
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

/* ===== Tabs Panel ===== */
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
  max-width: 635px; /* как в фигме; при меньшем экране ужмётся */
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.subTabs::-webkit-scrollbar { height: 0; }

.subTab {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  height: 40px; /* 48 панель - 8 паддинги */
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
.sub__content {
  margin-top: 18px;
}

.stub {
  padding: 22px;
  border-radius: 24px;
  border: 1px dashed rgba(255,255,255,.12);
  color: rgba(255,255,255,.45);
  font-family: var(--font-sf);
}
</style>
