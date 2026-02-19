<template>
  <section class="nf">
    <!-- общий фон как в hero -->
    <div class="nf__bg" aria-hidden="true"></div>

    <!-- шапка как на остальных страницах -->
    <AppHeader />

    <!-- чёрная шторка (чтобы низ всегда был чёрный) -->
    <div class="nf__shell">
      <div class="container nf__wrap">
        <div class="nfCard" role="group" aria-label="404">
          <!-- emoji/gif -->
          <img class="nfCard__gif" :src="sadGif" alt="" aria-hidden="true" />

          <div class="nfCard__title">Страница не найдена!</div>

          <div class="nfCard__text">
            Скорее всего вы перешли по недействительной ссылке, обратитесь в тех.
            поддержку, если это ошибка
          </div>

          <div class="nfCard__cta">
            <BaseButton arrow type="button" @click="goBack">
              Вернуться обратно
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AppHeader from "../components/layout/AppHeader.vue";
import BaseButton from "../components/ui/BaseButton.vue";

// заменишь путь на свой файл (gif 82x82)
import sadGif from "../assets/img/404-sad.gif";

const router = useRouter();

function goBack() {
  // если есть история — назад, иначе на главную
  if (window.history.length > 1) router.back();
  else router.push("/");
}
</script>

<style scoped>
/* базовый фон страницы — чтобы низ никогда не был фиолетовым */
.nf {
  position: relative;
  min-height: 100vh;
  overflow-x: clip;
  padding-top: 110px;

  background: #0b0d12;
}

/* hero background фиксируем, чтобы не “скакал” */
.nf__bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  background:
    linear-gradient(90deg, rgba(120,110,255,.72), rgba(120,110,255,.62)),
    url("/src/assets/img/hero.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
}

/* чёрная шторка */
.nf__shell {
  position: relative;
  z-index: 1;

  /* как в макете: близко к шапке */
  margin-top: 24px;

  padding: 36px 0 80px;

  border-top-left-radius: 48px;
  border-top-right-radius: 48px;

  background: #0b0d12;

  /* чтобы при малом контенте низ был чёрный */
  min-height: calc(100vh - 110px - 24px);
}

/* центрирование карточки */
.nf__wrap {
  min-height: calc(100vh - 110px - 24px - 36px - 80px);
  display: grid;
  place-items: center;
}

/* Карточка */
.nfCard {
  width: min(420px, 100%);
  border-radius: 24px;

  /* отступы от краёв 32 и снизу 14 + сверху пусть будет нормально */
  padding: 32px 32px 14px;

  background: rgba(25, 25, 32, 0.2); /* близко к твоим карточкам */
  backdrop-filter: blur(24px);

  box-shadow: 0 18px 70px rgba(0,0,0,.45);
  text-align: center;
}

/* GIF 82x82 */
.nfCard__gif {
  width: 82px;
  height: 82px;
  display: block;
  margin: 0 auto;
}

/* Заголовок: отступ сверху 6, снизу 16 */
.nfCard__title {
  margin-top: 6px;
  margin-bottom: 16px;

  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: rgba(255,255,255,.95);
}

/* Текст */
.nfCard__text {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;

  color: rgba(255,255,255,.60);
}

/* Кнопка: отступ сверху 24 */
.nfCard__cta {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
