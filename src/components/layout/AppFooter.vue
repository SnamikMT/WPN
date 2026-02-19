<template>
  <footer class="ftr">
    <div class="container">
      <div class="ftr__line" aria-hidden="true"></div>

      <div class="ftr__grid">
        <!-- LEFT -->
        <div class="brand">
          <div class="brand__title">
            <img class="brand__icon" :src="logo" alt="WPN" />
            <span>
              WPN — ваше право на свободный<br />
              доступ ко всем ресурсам
            </span>
          </div>

          <div class="brand__desc">
            Сила — в ваших руках. Сделайте Интернет свободным. WPN © 2025
          </div>
        </div>

        <!-- RIGHT -->
        <div class="cols">
          <div class="col">
            <div class="col__title">Полезные ссылки</div>

            <a class="col__link" href="https://t.me/your_channel" target="_blank" rel="noreferrer">
              <span>Телеграмм канал</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </a>

            <RouterLink class="col__link" to="/?auth=register">
              <span>Создать аккаунт</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </RouterLink>

            <RouterLink class="col__link" to="/?auth=login">
              <span>Войти в аккаунт</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </RouterLink>
          </div>

          <div class="col">
            <div class="col__title">Соглашения</div>

            <RouterLink class="col__link" :to="{ path: '/legal', query: { tab: 'cookies' } }">
              <span>Правила обработки Cookie</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </RouterLink>

            <RouterLink class="col__link" :to="{ path: '/legal', query: { tab: 'policy' } }">
              <span>Политика соглашения</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </RouterLink>

            <RouterLink class="col__link" :to="{ path: '/legal', query: { tab: 'billing' } }">
              <span>Реализация подписок</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </RouterLink>

            <RouterLink class="col__link" :to="{ path: '/legal', query: { tab: 'terms' } }">
              <span>Термины и условия</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import logo from "../../assets/img/footer-logo.png";
import arrow from "../../assets/img/link-arrow.png";
</script>

<style scoped>
/* без отступов (как ты просил) */
.ftr {
  background: #0b0d12;
}

/* линия над футером */
.ftr__line {
  height: 1px;
  background: #191920;
}

/* сетка */
.ftr__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: start;
}

/* LEFT */
.brand {
  padding: 24px 0;
}

.brand__title {
  display: grid;
  grid-template-columns: 28px 1fr; /* иконка + текст */
  column-gap: 12px;
  align-items: start;

  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 28px;
  line-height: 120%;
  color: #fff;
}

/* иконка логотипа в строке */
.brand__icon {
  width: 28px;
  height: 28px;
  display: block;
  margin-top: 4px;
}

.brand__desc {
  margin-top: 24px; /* как в макете */
  max-width: 427px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  color: #ffffff99;
}


/* RIGHT */
.cols {
  padding: 24px 0; /* чтобы верх правой части совпадал с логотипом */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  justify-content: end;
}

.col__title {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.9);

  /* расстояние пункта от заголовка меню 18px */
  margin-bottom: 18px;
  text-align: right;
}

/* пункт меню */
.col__link {
  display: flex;
  align-items: center;
  justify-content: end; /* было flex-end */
  gap: 10px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: right;
  vertical-align: middle;

  color: #ffffff99;
  text-decoration: none;

  margin-top: 14px;
}

.col__link:first-of-type {
  margin-top: 0;
}

.col__link:hover {
  color: rgba(255,255,255,.88);
}

.col__arrow {
  width: 14px;  /* подгонишь под реальный png */
  height: 14px;
  display: block;
  opacity: .9;
}

/* адаптив */
@media (max-width: 980px) {
  .ftr__grid { grid-template-columns: 1fr; }
  .cols { grid-template-columns: 1fr 1fr; gap: 28px; }
  .col__link { justify-content: flex-start; text-align: left; }
}

@media (max-width: 520px) {
  .brand__logo { width: 260px; height: auto; }
  .cols { grid-template-columns: 1fr; }
}
</style>
