<template>
  <section class="tg" id="resources">
    <div class="container">
      <a class="tg__card" :href="href" target="_blank" rel="noopener noreferrer">
        <div class="tg__left">
          <img class="tg__icon" :src="tgIcon" alt="" aria-hidden="true" />
          <div class="tg__text">
            <div class="tg__title">Мы есть в Телеграмме!</div>
            <div class="tg__subtitle">
              Подписывайтесь на наш официальный ресурс, для получения свежих новостей и участия в розыгрышах!
            </div>
          </div>
        </div>

        <div class="tg__btn" aria-hidden="true">
          <img class="tg__arrow" :src="arrowIcon" alt="" aria-hidden="true" />
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import tgIcon from "../../assets/img/tg.png";
import arrowIcon from "../../assets/img/arrow-right.png";

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

  /* фиолетовая плашка */
  background: linear-gradient(90deg, rgba(126,126,255,0.95), rgba(108,108,230,0.95));
  border: 1px solid rgba(255,255,255,.10);

  color: #fff;
  text-decoration: none;

  box-shadow: 0 18px 46px rgba(0,0,0,.30);

  transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
}

.tg__card:hover {
  transform: translateY(-1px);
  filter: saturate(1.03);
  box-shadow: 0 22px 60px rgba(0,0,0,.38);
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
  opacity: .95;
}

.tg__text {
  min-width: 0;
}

.tg__title {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 26px;
  line-height: 100%;
  letter-spacing: 0;
}

.tg__subtitle {
  margin-top: 10px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: 0;
  color: rgba(255,255,255,.78);
  max-width: 900px;
}

.tg__btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255,255,255,.92);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.tg__arrow {
  width: 14px;
  height: 14px;
  display: block;
}

@media (max-width: 700px) {
  .tg__title { font-size: 20px; }
  .tg__subtitle { font-size: 14px; }
  .tg__btn { width: 40px; height: 40px; }
}
</style>
