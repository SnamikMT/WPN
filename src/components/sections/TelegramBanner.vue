<template>
  <section class="tg" id="resources">
    <div class="container">
      <div class="tg__card">
        <div class="tg__content">

          <div class="tg__header">
            <img class="tg__icon" :src="tgIcon" alt="" aria-hidden="true" />
            <div class="tg__title">Мы есть в Телеграмме!</div>
          </div>

          <div class="tg__subtitle">
            Подписывайтесь на наш официальный ресурс, для получения свежих новостей и участия в розыгрышах!
          </div>

        </div>

        <!-- DESKTOP: квадратная стрелка как было -->
        <a
          class="tg__btn"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Перейти в Телеграм"
        >
          <img class="tg__arrow" :src="arrowIcon" alt="" aria-hidden="true" />
        </a>

        <!-- MOBILE: наша кнопка BaseButton -->
        <BaseButton
          class="tg__cta"
          as="a"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          size="md"
          :arrow="true"
        >
          Перейти в телеграм
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import tgIcon from "../../assets/img/tg.png";
import arrowIcon from "../../assets/img/arrow-right.png";
import BaseButton from "../ui/BaseButton.vue";

const props = defineProps<{
  href?: string;
}>();

const href = props.href ?? "https://t.me/";
</script>

<style scoped>
.tg {
  background: #0b0d12;
}

.tg__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  padding: 18px 18px;
  border-radius: 24px;

  background: linear-gradient(100.59deg, #5d5dd0 12.17%, #9f9fe9 49.27%, #5d5dd0 87.83%);
  border: 1px solid rgba(255, 255, 255, 0.10);

  color: #fff;
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.30);

  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}

.tg__card:hover {
  transform: translateY(-1px);
  filter: saturate(1.03);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.38);
}

.tg__left {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
}

.tg__icon {
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
  margin-top: 3px;
  opacity: 0.95;
}

.tg__text {
  min-width: 0;
}

.tg__title {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 26px;
  line-height: 100%;
}

.tg__subtitle {
  margin-top: 10px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: rgba(255, 255, 255, 0.78);
  max-width: 900px;
}

/* DESKTOP BUTTON (square) */
.tg__btn {
  width: 36px;
  height: 76px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  text-decoration: none;
}

.tg__arrow {
  width: 14px;
  height: 14px;
  display: block;
}

/* MOBILE CTA (BaseButton) - hidden by default */
.tg__cta {
  display: none;
  flex: 0 0 auto;
}

.tg__content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tg__header {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Responsive */
@media (max-width: 700px) {

  .tg__card {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  .tg__btn {
    display: none;
  }

  .tg__cta {
    display: inline-flex;
    align-self: flex-start;
  }

  .tg__title { font-size: 23px; }
  .tg__subtitle { font-size: 16px; }
}
</style>