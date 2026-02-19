<template>
  <article class="card" :class="{ 'is-selected': selected }">
    <header class="card__top">
      <div class="card__titleRow">
        <h3 class="card__title">{{ title }}</h3>

        <div v-if="activePill" class="activePill" aria-label="Активна">
          <img class="activePill__check" :src="checkIcon" alt="" aria-hidden="true" />
          <div class="activePill__text">{{ activePill }}</div>
        </div>
      </div>

      <div class="card__sub">{{ subTitle }}</div>

      <div v-if="badges?.length" class="badgeRow">
        <span v-for="b in badges" :key="b.text" class="badge" :class="b.variant">
          {{ b.text }}
        </span>
      </div>
    </header>

    <div class="card__mid">
      <div v-if="selectOptions?.length" class="selectWrap">
        <button class="select" type="button" @click="toggleSelect" :aria-expanded="isOpen">
          <span class="select__value">{{ currentSelect }}</span>
          <img class="select__arrow" :src="selectArrow" alt="" aria-hidden="true" />
        </button>

        <div v-if="isOpen" class="selectMenu" role="listbox">
          <button
            v-for="opt in selectOptions"
            :key="opt"
            class="selectOpt"
            type="button"
            @click="pick(opt)"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <div v-if="chips?.length" class="chipRow">
        <span v-for="c in chips" :key="c" class="chip">{{ c }}</span>
      </div>

      <div v-if="note" class="note">{{ note }}</div>
    </div>

    <footer class="card__bottom">
      <div class="price">
        <span class="price__label">Цена</span>
        <span class="price__val">{{ price }}</span>
      </div>

      <button class="buyBtn" type="button">
        <span>Приобрести</span>
        <img class="buyBtn__arrow" :src="btnArrow" alt="" aria-hidden="true" />
      </button>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import btnArrow from "../../assets/img/arrow-right.png";
import selectArrow from "../../assets/img/select-arrow.png";
import checkIcon from "../../assets/img/check.png";

type BadgeVariant = "popular" | "best" | "muted";

const props = defineProps<{
  title: string;
  subTitle: string;
  selected?: boolean;
  activePill?: string;
  badges?: { text: string; variant: BadgeVariant }[];
  selectOptions?: string[];
  selectValue?: string;
  chips?: string[];
  note?: string;
  price: string;
}>();

const isOpen = ref(false);
const localValue = ref(props.selectValue ?? props.selectOptions?.[0] ?? "");
const currentSelect = computed(() => props.selectValue ?? localValue.value);

function close() { isOpen.value = false; }
function toggleSelect() { isOpen.value = !isOpen.value; }
function pick(v: string) { localValue.value = v; close(); }

function onDocClick(e: MouseEvent) {
  const el = e.target as HTMLElement | null;
  if (!el) return;
  if (el.closest(".selectWrap")) return;
  close();
}
document.addEventListener("click", onDocClick);
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<style scoped>
/* ===== Card ===== */
.card {
  background: rgba(12,12,15,.72);
  border-radius: 24px;
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,.25);
}

.card.is-selected {
  box-shadow: 0 0 0 1px rgba(93,93,208,.65), 0 18px 60px rgba(0,0,0,.35);
}

/* ===== Top row: responsive behavior =====
   - На широких: заголовок слева, пилл справа
   - На узких: пилл переезжает вниз (это нормально) */
.card__titleRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
  flex-wrap: wrap; /* <-- ключ к резиновости */
}

/* Заголовок теперь может переноситься */
.card__title {
  margin: 0;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  color: rgba(255,255,255,.95);

  min-width: 0;
  flex: 1 1 180px; /* <-- ужимается и переносится */
}

/* Подзаголовок */
.card__sub {
  margin-top: 10px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #FFFFFF99;
}

/* ===== Active pill: flexible ===== */
.activePill {
  height: 24px;
  padding: 5px 8px;
  border-radius: 14px;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  background: rgba(93, 93, 208, 0.25);
  color: #5D5DD0;

  flex: 0 1 auto;     /* может ужиматься */
  max-width: 100%;    /* <-- не ограничиваем 140, чтобы было резиново */
  overflow: hidden;
  white-space: nowrap;
}

.activePill__check {
  width: 14px;
  height: 14px;
  display: block;
  flex: 0 0 auto;
}

.activePill__text {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #5D5DD0;

  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== Badges ===== */
.badgeRow {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 10px;
  border-radius: 999px;
  font-family: var(--font-sf);
  font-size: 12px;
  line-height: 100%;
  white-space: nowrap;
}

.badge.popular { background: #5D5DD066; color: #5D5DD0; }
.badge.best { background: #EBA55F66; color: #EBA55F; }
.badge.muted { background: rgba(255,255,255,.06); color: rgba(255,255,255,.75); }

/* ===== Middle ===== */
.card__mid { display: grid; gap: 10px; }

.selectWrap {
  position: relative;
  width: 100%;
  max-width: 100%;
}

.select {
  width: 100%;
  height: 44px;

  border-radius: 16px;
  border: none;
  background: rgba(255,255,255,.04);

  padding: 0 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  cursor: pointer;
  overflow: hidden;
}

.select__value {
  font-family: var(--font-sf);
  font-size: 14px;
  color: rgba(255,255,255,.85);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select__arrow {
  width: 14px;
  height: 14px;
  display: block;
  opacity: .85;
  flex: 0 0 auto;
}

.selectMenu {
  position: absolute;
  left: 0;
  top: calc(100% + 12px);
  width: 100%;
  max-width: 100%;
  background: rgba(12,12,15,.95);
  border-radius: 16px;
  box-shadow: 0 18px 60px rgba(0,0,0,.45);
  overflow: hidden;
  z-index: 10;
}

.selectOpt {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: var(--font-sf);
  font-size: 14px;
  color: rgba(255,255,255,.85);
}

.selectOpt:hover { background: rgba(255,255,255,.06); }

.chipRow { display: flex; gap: 10px; flex-wrap: wrap; }

.chip {
  padding: 8px 10px;
  border-radius: 14px;
  background: rgba(255,255,255,.05);
  border: none;
  font-family: var(--font-sf);
  font-size: 12px;
  color: rgba(255,255,255,.70);
}

.note {
  font-family: var(--font-sf);
  font-size: 12px;
  color: rgba(255,255,255,.55);
}

/* ===== Bottom ===== */
.card__bottom {
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap; /* <-- чтобы на узких не ломалось */
}

.price {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,.04);
  border: none;
}

.price__label {
  font-family: var(--font-sf);
  font-size: 12px;
  color: rgba(255,255,255,.55);
}

.price__val {
  font-family: var(--font-sf);
  font-size: 14px;
  color: rgba(255,255,255,.9);
}

.buyBtn {
  height: 36px;
  padding: 10px 12px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background: rgba(255,255,255,.92);
  color: #0b0d12;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sf);
  font-size: 14px;
  transition: transform .18s ease, opacity .18s ease;
}

.buyBtn:hover { transform: translateY(-1px); opacity: .95; }

.buyBtn__arrow { width: 14px; height: 14px; display: block; }

/* ===== Micro responsive tighten ===== */
@media (max-width: 380px) {
  .card { padding: 14px; }
  .card__title { font-size: 22px; }
  .buyBtn { width: 100%; justify-content: center; }
}
</style>
