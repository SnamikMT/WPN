<template>
  <button class="base-button" :class="[`v-${variant}`, `s-${size}`]" :type="type">
    <span class="btn-text"><slot /></span>

    <img
      v-if="arrow"
      class="btn-arrow"
      :src="arrowIcon"
      alt=""
      aria-hidden="true"
    />
  </button>
</template>

<script setup lang="ts">
import arrowIcon from "../../assets/img/arrow-right.png";

withDefaults(
  defineProps<{
    arrow?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "solid" | "ghost";
    size?: "md" | "sm";
  }>(),
  {
    arrow: false,
    type: "button",
    variant: "solid",
    size: "md",
  }
);
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  border: none;
  cursor: pointer;

  font-family: var(--font-sf);
  font-weight: 400;
  line-height: 100%;
  user-select: none;

  /* Анимация: “дорогой” hover */
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;

  will-change: transform;
}

.base-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
}

.base-button:active {
  transform: translateY(0px) scale(0.98);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
}

/* focus для клавиатуры */
.base-button:focus-visible {
  outline: 2px solid rgba(76, 103, 255, 0.55);
  outline-offset: 2px;
  border-radius: inherit;
}

.btn-text {
  display: inline-flex;
  align-items: center;
}

.btn-arrow {
  width: 14px;
  height: 14px;
  display: block;
}

/* ====== SIZE ====== */
/* как в модалках */
.s-md {
  height: 36px;
  padding: 10px 12px;
  border-radius: 14px;
  font-size: 14px;
}

/* как в хедере */
.s-sm {
  height: 32px;
  padding: 0 14px;
  border-radius: 14px; /* тот же радиус */
  font-size: 14px;
}

/* ====== VARIANTS ====== */
.v-solid {
  background: rgba(255, 255, 255, 0.92);
  color: #0b0d12;
}

.v-solid:hover {
  opacity: 0.95;
}

.v-ghost {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: none;
}

.v-ghost:hover {
  background: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
}
</style>
