<template>
  <header class="hdr">
    <div class="container">
      <div class="hdr__pill">
        <a class="hdr__logo" href="/" aria-label="WPN">
          <img class="hdr__logoImg" src="/src/assets/img/logo.png" alt="WPN" />
        </a>

        <nav class="hdr__nav" aria-label="Основное меню">
          <a class="hdr__link is-active" href="#">Главная</a>
          <a class="hdr__link" href="#">Новости</a>
          <a class="hdr__link" href="#tariffs">Тарифы</a>
          <a class="hdr__link" href="#resources">Ресурсы</a>
        </nav>

        <div class="hdr__actions">
          <template v-if="auth.isAuthed && auth.currentUser">
            <div class="hdrUser">
              <div class="hdrUser__balance">
                {{ auth.currentUser.balanceRub }} ₽
              </div>

              <div class="hdrUser__profile">
                <div class="hdrUser__avatar"></div>
                <span class="hdrUser__name">
                  {{ auth.currentUser.username }}
                </span>
              </div>
            </div>

          </template>

          <template v-else>
            <BaseButton size="sm" variant="ghost" :arrow="false" type="button" @click="openLogin">
              Войти
            </BaseButton>
            <BaseButton size="sm" variant="solid" :arrow="false" type="button" @click="openRegister">
              Попробовать
            </BaseButton>
          </template>
        </div>
      </div>
    </div>

    <AuthModals v-model="isAuthOpen" :initialMode="initialMode" />
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AuthModals from "../ui/AuthModals.vue";
import BaseButton from "../ui/BaseButton.vue";
import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();

const props = defineProps<{
  authOpen?: boolean;
  authMode?: "login" | "register" | "restore";
}>();

const emit = defineEmits<{
  (e: "update:authOpen", v: boolean): void;
}>();

const isAuthOpen = ref(false);
const initialMode = ref<"login" | "register" | "restore">("login");

/* если родитель просит открыть/закрыть */
watch(
  () => props.authOpen,
  (v) => {
    if (typeof v === "boolean") isAuthOpen.value = v;
  },
  { immediate: true }
);

/* если родитель меняет режим */
watch(
  () => props.authMode,
  (v) => {
    if (v) initialMode.value = v;
  },
  { immediate: true }
);

/* синхроним обратно в родителя */
watch(isAuthOpen, (v) => emit("update:authOpen", v));

function openLogin() {
  initialMode.value = "login";
  isAuthOpen.value = true;
}

function openRegister() {
  initialMode.value = "register";
  isAuthOpen.value = true;
}
</script>

<style scoped>
.hdr {
  position: fixed;
  top: 12px;
  left: 0;
  right: 0;
  z-index: 100;
}

.hdr__pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 18px;
  border-radius: 24px;
  background: rgba(25, 25, 32, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  min-width: 0;
}

.hdr__logo { display: inline-flex; align-items: center; flex: 0 0 auto; }
.hdr__logoImg { height: 20px; width: auto; display: block; }

.hdr__nav {
  display: inline-flex;
  align-items: center;
  gap: 22px;
  flex: 1 1 auto;
  justify-content: center;
  min-width: 0;
}

.hdr__link {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}

.hdr__link:hover { opacity: 0.85; }
.hdr__link.is-active { opacity: 1; }

.hdr__actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

/* ===== USER BLOCK ===== */
.hdrUser{
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

/* ===== BALANCE (26px height) ===== */
.hdrUser__balance{
  height: 26px;
  padding: 0 14px;
  border-radius: 10px;

  display: inline-flex;
  align-items: center;

  border: 1px solid #FFFFFF33;
  background: transparent;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.85);
}

/* ===== PROFILE (32px height) ===== */
.hdrUser__profile{
  height: 32px;
  padding: 0 14px;
  border-radius: 10px;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  border: 1px solid #FFFFFF33;
  background: transparent;
}

.hdrUser__avatar{
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255,255,255,.25);
  flex: 0 0 auto;
}

.hdrUser__name{
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  color: rgba(255,255,255,.85);
  white-space: nowrap;
}

@media (max-width: 900px) {
  .hdr__nav { display: none; }
  .hdr__pill { padding: 12px 12px; gap: 10px; }
  .hdr__logoImg { height: 18px; }
}
</style>
