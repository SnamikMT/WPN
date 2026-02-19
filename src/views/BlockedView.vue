<template>
  <section class="blk">
    <div class="blk__bg" aria-hidden="true"></div>

    <AppHeader />

    <div class="blk__shell">
      <div class="container blk__wrap">
        <div class="blkCard" role="group" aria-label="Аккаунт заблокирован">
          <img class="blkCard__gif" :src="sadGif" alt="" aria-hidden="true" />

          <div class="blkCard__msg">
            Ваш аккаунт, {{ username }} был заблокирован<br />
            за нарушение правил ToS!
          </div>

          <div class="blkCard__cta">
            <BaseButton
              class="blkCard__btn"
              arrow
              type="button"
              @click="logout"
            >
              Выйти из аккаунта
            </BaseButton>
          </div>

          <button class="blkCard__support" type="button" @click="goSupport">
            Обратиться в тех. поддержку
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "../components/layout/AppHeader.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import { useAuthStore } from "../stores/auth";

// гифка 82x82
import sadGif from "../assets/img/404-sad.gif";

const router = useRouter();
const auth = useAuthStore();

const username = computed(() => auth.currentUser?.username ?? "Username");

async function logout() {
  auth.logout();
  await router.push("/");
}

function goSupport() {
  window.open("https://t.me/your_channel", "_blank");
}
</script>

<style scoped>
.blk {
  position: relative;
  min-height: 100vh;
  overflow-x: clip;
  padding-top: 110px;
  background: #0b0d12;
}

/* фиксируем фон, чтобы не “прыгал” */
.blk__bg {
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

/* черный слой как в панели + отступ до шапки 24px */
.blk__shell {
  position: relative;
  z-index: 1;
  margin-top: 24px;
  padding: 36px 0 80px;

  border-top-left-radius: 48px;
  border-top-right-radius: 48px;

  background: #0b0d12;

  /* чтобы снизу всегда был чёрный фон даже при малом контенте */
  min-height: calc(100vh - 110px - 24px);
}

.blk__wrap {
  min-height: calc(100vh - 110px - 24px - 36px - 80px);
  display: grid;
  place-items: center;
}

/* CARD */
.blkCard {
  width: min(420px, 100%);
  border-radius: 24px;

  /* 👇 как ты сказал: внутренние отступы вокруг контента 14px */
  padding: 14px;

  background: rgba(25, 25, 32, 0.2);
  backdrop-filter: blur(24px);
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);

  text-align: center;
}

.blkCard__gif {
  width: 82px;
  height: 82px;
  display: block;
  margin: 0 auto;
}

/* ОСНОВНОЙ ТЕКСТ (18/500) */
.blkCard__msg {
  margin-top: 6px; /* легкий отступ от гифки */

  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;

  color: rgba(255,255,255,.95);
}

/* CTA */
.blkCard__cta {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

/* 👇 фикс ширина кнопки как в макете */
.blkCard__btn {
  width: 316px;
  max-width: 100%;
}

/* ТЕХПОДДЕРЖКА (16/400/#FFFFFF99) */
.blkCard__support {
  margin-top: 14px;

  border: none;
  background: transparent;
  cursor: pointer;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;

  color: #ffffff99;

  transition: color .18s ease, opacity .18s ease;
}

.blkCard__support:hover {
  color: rgba(255,255,255,.85);
}
</style>
