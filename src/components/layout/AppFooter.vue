<template>
  <footer class="ftr">
    <div class="container">
      <div class="ftr__line" aria-hidden="true"></div>

      <div class="ftr__grid">
        <!-- LEFT -->
        <div class="brand">
          <div class="brand__title">
            <img class="brand__icon" :src="logo" alt="WPN" />
            <span class="brand__titleText">
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

            <!-- ✅ вместо RouterLink: открываем модалку -->
            <button class="col__linkBtn" type="button" @click="openRegister">
              <span>Создать аккаунт</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </button>

            <button class="col__linkBtn" type="button" @click="openLogin">
              <span>Войти в аккаунт</span>
              <img class="col__arrow" :src="arrow" alt="" aria-hidden="true" />
            </button>
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

    <!-- ✅ те же модалки, что в шапке -->
    <AuthModals v-model="isAuthOpen" :initialMode="initialMode" />
  </footer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

import logo from "../../assets/img/footer-logo.png";
import arrow from "../../assets/img/link-arrow.png";

import AuthModals from "../ui/AuthModals.vue";

const isAuthOpen = ref(false);
const initialMode = ref<"login" | "register" | "restore">("login");

function openLogin() {
  initialMode.value = "login";
  isAuthOpen.value = true;
}

function openRegister() {
  initialMode.value = "register";
  isAuthOpen.value = true;
}

/* на всякий: если модалка закрылась — оставим дефолт */
watch(isAuthOpen, (v) => {
  if (!v) initialMode.value = "login";
});
</script>

<style scoped>
.ftr { background: #0b0d12; }
.ftr__line { height: 1px; background: #191920; }

.ftr__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: start;
}

/* LEFT */
.brand { padding: 24px 0; }
.brand__title {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 28px;
  line-height: 120%;
  color: #fff;
  display: block;
}
.brand__icon {
  width: 28px;
  height: 28px;
  display: inline-block;
  vertical-align: text-top;
  margin-right: 12px;
}
.brand__titleText { display: inline; }
.brand__desc {
  margin-top: 24px;
  max-width: 427px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #ffffff99;
}

/* RIGHT */
.cols {
  padding: 24px 0;
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
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 18px;
  text-align: right;
}

/* link for a + router-link */
.col__link {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  text-align: right;

  color: #ffffff99;
  text-decoration: none;
  margin-top: 14px;
}
.col__link:first-of-type { margin-top: 0; }
.col__link:hover { color: rgba(255, 255, 255, 0.88); }

.col__arrow {
  width: 14px;
  height: 14px;
  display: block;
  opacity: 0.9;
}

/* ✅ footer "links" as buttons */
.col__linkBtn{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  text-align: right;

  color: #ffffff99;
  background: transparent;
  border: 0;
  padding: 0;
  margin-top: 14px;
  cursor: pointer;
}
.col__linkBtn:hover { color: rgba(255, 255, 255, 0.88); }

/* адаптив */
@media (max-width: 980px) {
  .ftr__grid { grid-template-columns: 1fr; }
  .cols { grid-template-columns: 1fr 1fr; gap: 75px; }
  .col__link, .col__linkBtn { justify-content: flex-start; text-align: left; }
  .col__title { text-align: left; }
}

@media (max-width: 520px) {
  .cols { grid-template-columns: 1fr; }
  .brand__title { font-size: 20px; }
  .brand__icon { height: 20px; width: 20px; }
  .brand__desc { max-width: 350px; }
}
</style>
