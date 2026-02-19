<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true"></div>

    <div class="container hero__wrap">
      <div class="hero__content">
        <div class="heroPill">
          <img class="heroPill__icon" :src="pillIcon" alt="" aria-hidden="true" />
          <span class="heroPill__text">Лучшее предложение на рынке</span>
        </div>

        <h1 class="hero__title">
          Новый уровень доступа<br />
          к интернет ресурсам ✨
        </h1>

        <p class="hero__desc">
          Встречайте сервис доступа к интернет ресурсам нового поколения
          в сфере провайдеров связи!
        </p>

        <div class="hero__cta">
          <BaseButton size="md" variant="solid" :arrow="false" type="button">
            Попробовать 3 дня
          </BaseButton>

          <BaseButton
            size="md"
            variant="ghost"
            :arrow="false"
            type="button"
            @click="$emit('enterPanel')"
          >
            Войти в панель
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="hero__fade" aria-hidden="true"></div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "../ui/BaseButton.vue";
import pillIcon from "../../assets/img/pill-icon.png";

defineEmits<{ (e: "enterPanel"): void }>();
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  min-height: 520px;
  padding-top: 110px;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(120,110,255,.72), rgba(120,110,255,.62)),
    url("/src/assets/img/hero.png");
  background-size: cover;
  background-position: center;
}

.hero__wrap {
  position: relative;
  z-index: 2;
  min-height: 600px;
  display: grid;
  align-items: center;
}

.hero__content { max-width: 720px; }

.heroPill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 8px;
  border-radius: 14px;
  background: linear-gradient(
    90.55deg,
    #dadada 5.66%,
    #ffffff 45.31%,
    #dadada 94.34%
  );
  color: #0b0d12;
}

.heroPill__icon { width: 16px; height: 16px; display: block; }

.heroPill__text {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  white-space: nowrap;
}

.hero__title {
  margin: 16px 0 0;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 60px;
  line-height: 100%;
}

.hero__desc {
  margin: 16px 0 0;
  max-width: 640px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 28px;
  line-height: 100%;
  opacity: 0.78;
}

.hero__cta {
  margin-top: 22px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero__fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 140px;
  z-index: 2;
}

@media (max-width: 900px) {
  .hero__title { font-size: 44px; }
  .hero__desc { font-size: 20px; }
  .heroPill__text { font-size: 14px; }
}

@media (max-width: 520px) {
  .hero { padding: 48px 0 80px; }
  .hero__title { font-size: 34px; }
  .hero__desc { font-size: 16px; }
  .heroPill { padding: 8px 8px; }
}
</style>
