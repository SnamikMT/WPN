<template>
  <div class="bar">
    <a class="bar__link" :href="href">
      <span class="bar__text">Подробнее</span>
      <img class="bar__icon" :src="iconSrc" alt="" aria-hidden="true" />
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  href?: string;
  iconSrc?: string;
}>();

const href = props.href ?? "#next";
const iconSrc = props.iconSrc ?? "/src/assets/img/arrow-down.png";
</script>

<style scoped>
/* Это тот самый “наезд” на Hero */
.bar {
  position: relative;
  z-index: 5;
  margin-top: -108px; /* наезд на hero */
  
  /* отступы по макету */
  padding-top: 32px;
  padding-bottom: 24px;

  display: grid;
  place-items: center;

  background: #0b0d12;
  border-top-left-radius: 48px;
  border-top-right-radius: 48px;

  /* box-shadow: 0 -18px 40px rgba(0, 0, 0, 0.05); */
}

.bar__link {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 14px;
  color: rgba(255,255,255,.9);
  opacity: .9;
  transition: opacity .2s ease, transform .2s ease;
}

.bar__link:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.bar__text {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
}

.bar__icon {
  width: 12px;
  height: 20px;
  display: block;
  opacity: .9;
}

</style>
