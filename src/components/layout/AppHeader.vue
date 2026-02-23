<template>
  <header class="hdr">
    <div class="container">
      <div class="hdr__wrap">
        <!-- TOP PILL -->
        <div class="hdr__pill">
          <a class="hdr__logo" href="/" aria-label="WPN">
            <img class="hdr__logoImg" src="/src/assets/img/logo.png" alt="WPN" />
          </a>

          <!-- DESKTOP NAV -->
          <nav class="hdr__nav" aria-label="Основное меню">
            <a class="hdr__link is-active" href="/">Главная</a>
            <a class="hdr__link" href="#">Новости</a>
            <a class="hdr__link" href="/#tariffs">Тарифы</a>
            <a class="hdr__link" href="#resources">Ресурсы</a>
          </nav>

          <!-- DESKTOP ACTIONS -->
          <div class="hdr__actions">
            <template v-if="auth.isAuthed && auth.currentUser">
              <div class="hdrUser">
                <button
                  class="hdrUser__balance"
                  type="button"
                  @click="openBalance"
                  aria-label="Открыть баланс"
                >
                  {{ auth.currentUser.balanceRub }} ₽
                </button>

                <button
                  class="hdrUser__profile"
                  type="button"
                  @click="goPanel"
                  aria-label="Открыть панель"
                >
                  <span class="hdrUser__avatar" aria-hidden="true">
                    <img
                      v-if="avatarSrc"
                      class="hdrUser__avatarImg"
                      :src="avatarSrc"
                      alt=""
                      loading="lazy"
                    />
                  </span>
                  <span class="hdrUser__name">{{ auth.currentUser.username }}</span>
                </button>
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

          <!-- MOBILE TOGGLE -->
          <button
            class="hdrMobToggle"
            type="button"
            :aria-expanded="isMobOpen"
            aria-label="Открыть меню"
            @click="toggleMobile"
          >
            <img
              class="hdrMobToggle__ico"
              :class="{ 'is-open': isMobOpen }"
              :src="icoChevron"
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        <!-- MOBILE DROPDOWN PANEL -->
        <transition name="drop">
          <div v-if="isMobOpen" class="hdrMobPanel" ref="mobPanel" role="dialog" aria-modal="true">
            <nav class="hdrMobNav" aria-label="Меню (мобилка)">
              <a class="hdrMobLink is-active" href="#" @click="closeMobile">Главная</a>
              <a class="hdrMobLink" href="#" @click="closeMobile">Новости</a>
              <a class="hdrMobLink" href="#tariffs" @click="closeMobile">Тарифы</a>
              <a class="hdrMobLink" href="#resources" @click="closeMobile">Ресурсы</a>
            </nav>

            <div class="hdrMobBottom">
              <template v-if="auth.isAuthed && auth.currentUser">
                <button class="hdrMobPill" type="button" @click="openBalanceFromMobile">
                  <span class="hdrMobPill__txt">{{ auth.currentUser.balanceRub }} ₽</span>
                </button>

                <!-- ✅ click -> /panel -->
                <button class="hdrMobPill us" type="button" @click="goPanelFromMobile">
                  <span class="hdrMobPill__avatar" aria-hidden="true">
                    <img
                      v-if="avatarSrc"
                      class="hdrMobPill__avatarImg"
                      :src="avatarSrc"
                      alt=""
                      loading="lazy"
                    />
                  </span>
                  <span class="hdrMobPill__txt">{{ auth.currentUser.username }}</span>
                </button>
              </template>

              <template v-else>
                <button class="hdrMobBtn" type="button" @click="openLoginFromMobile">Войти</button>
                <button class="hdrMobBtn hdrMobBtn--solid" type="button" @click="openRegisterFromMobile">
                  Попробовать
                </button>
              </template>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- ✅ MOBILE OVERLAY -->
    <transition name="fade">
      <button
        v-if="isMobOpen"
        class="hdrOverlay"
        type="button"
        aria-label="Закрыть меню"
        @click="closeMobile"
      />
    </transition>

    <!-- MODALS -->
    <AuthModals v-model="isAuthOpen" :initialMode="initialMode" />
    <BalanceModal v-if="auth.isAuthed && auth.currentUser" v-model="isBalanceOpen" />
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { computed } from "vue";

// любую дефолтную аву (лучше положить в assets)
import defaultAvatar from "../../assets/img/avatar-default.png";

const avatarSrc = computed(() => {
  if (!auth.isAuthed || !auth.currentUser) return "";
  return auth.currentUser.avatarUrl || defaultAvatar;
});

import AuthModals from "../ui/AuthModals.vue";
import BalanceModal from "../ui/BalanceModal.vue";
import BaseButton from "../ui/BaseButton.vue";

import icoChevron from "../../assets/img/ico-chevron-9x5.png";

const router = useRouter();
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
const isBalanceOpen = ref(false);

/* mobile menu */
const isMobOpen = ref(false);

function toggleMobile() {
  isMobOpen.value = !isMobOpen.value;
}

function closeMobile() {
  isMobOpen.value = false;
}

function onDocClick(e: MouseEvent) {
  if (!isMobOpen.value) return;
  const t = e.target as HTMLElement | null;
  if (!t) return;

  if (t.closest(".hdrMobPanel")) return;
  if (t.closest(".hdrMobToggle")) return;

  closeMobile();
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") closeMobile();
}

/* ✅ lock scroll when mobile menu open */
function setBodyLock(lock: boolean) {
  const body = document.body;
  if (lock) body.classList.add("is-locked");
  else body.classList.remove("is-locked");
}

watch(isMobOpen, (v) => setBodyLock(v));

onMounted(() => {
  document.addEventListener("click", onDocClick);
  window.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
  window.removeEventListener("keydown", onKey);
  setBodyLock(false);
});

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

function openBalance() {
  if (!auth.isAuthed || !auth.currentUser) return;
  isBalanceOpen.value = true;
}

/* ✅ go to /panel (desktop) */
function goPanel() {
  if (!auth.isAuthed) {
    openLogin();
    return;
  }
  router.push({ name: "panel" });
}

/* mobile helpers */
async function openBalanceFromMobile() {
  closeMobile();
  await nextTick();
  openBalance();
}

async function goPanelFromMobile() {
  closeMobile();
  await nextTick();
  goPanel();
}

async function openLoginFromMobile() {
  closeMobile();
  await nextTick();
  openLogin();
}

async function openRegisterFromMobile() {
  closeMobile();
  await nextTick();
  openRegister();
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

.hdr { z-index: 100; }
.hdr__wrap { position: relative; z-index: 101; }
.hdr__pill { position: relative; z-index: 102; }
.hdrMobPanel { position: relative; z-index: 103; }

.hdrOverlay { z-index: 90; }

.hdr__wrap {
  position: relative;
}

/* TOP PILL */
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

.hdr__logo {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
}
.hdr__logoImg {
  height: 20px;
  width: auto;
  display: block;
}

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

/* USER (desktop) */
.hdrUser {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.hdrUser__balance {
  height: 26px;
  padding: 0 14px;
  border-radius: 10px;

  display: inline-flex;
  align-items: center;

  border: 1px solid #ffffff33;
  background: transparent;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.85);

  cursor: pointer;
  user-select: none;
}
.hdrUser__balance:hover {
  background: rgba(255, 255, 255, 0.04);
}

/* ✅ profile is now a button */
.hdrUser__profile {
  height: 32px;
  padding: 0 14px;
  border-radius: 10px;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  border: 1px solid #ffffff33;
  background: transparent;

  cursor: pointer;
  user-select: none;

  /* reset button */
  appearance: none;
  -webkit-appearance: none;
  outline: none;
}
.hdrUser__profile:hover {
  background: rgba(255, 255, 255, 0.04);
}

.hdrUser__avatar{
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  flex: 0 0 auto;
  overflow: hidden;
  display: inline-block;
}

.hdrUser__avatarImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* mobile */

.hdrMobPill__avatarImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hdrUser__name {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
}

/* ===== MOBILE TOGGLE (34x34 border) ===== */
.hdrMobToggle {
  display: none;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid #ffffff33;
  background: transparent;
  cursor: pointer;
  padding: 0;
  place-items: center;
  flex: 0 0 auto;
}

.hdrMobToggle__ico {
  width: 9px;
  height: 5px;
  display: block;
  transition: transform 0.18s ease;
  transform: rotate(0deg);
  opacity: 0.9;
}
.hdrMobToggle__ico.is-open { transform: rotate(180deg); }

/* ===== MOBILE PANEL ===== */
.hdrMobPanel {
  margin-top: 12px;
  width: 100%;
  border-radius: 34px;
  padding: 22px 16px 16px;

  background: rgba(12, 12, 15, 0.72);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);
}

.hdrMobNav {
  display: grid;
  gap: 26px;
  justify-items: center;
  padding: 18px 0 22px;
}

.hdrMobLink {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 24px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
}
.hdrMobLink.is-active { color: rgba(255, 255, 255, 0.6); }

.hdrMobBottom { display: grid; gap: 12px; }

.hdrMobPill {
  height: 52px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
}

.hdrMobPill__avatar{
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  overflow: hidden;
  display: inline-block;
}

.hdrMobPill__txt {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 24px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.55);
}

/* NOT AUTH (mobile) */
.hdrMobBtn {
  height: 52px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
}

.hdrMobBtn--solid {
  border: none;
  background: rgba(255, 255, 255, 0.92);
  color: #0b0d12;
}

/* transition (panel) */
.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ✅ overlay */
.hdrOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  z-index: 90;
}

/* fade transition (overlay) */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.18s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* ===== RESPONSIVE RULES ===== */
@media (max-width: 900px) {
  .hdr__nav { display: none; }
  .hdr__actions { display: none; }
  .hdrMobToggle { display: grid; }
  .hdr__pill { padding: 12px 16px; border-radius: 28px; }
  .hdr__logoImg { height: 22px; }

  .hdrMobLink { font-size: 16px; }
  .hdrMobPill__txt { font-size: 16px; }

  .hdrMobPill { height: 26px; background: none; }
  .hdrMobPill.us { height: 32px; }

  .hdrMobToggle__ico { width: 16px; height: 16px; }
}

@media (min-width: 901px) {
  .hdrOverlay { display: none; }
}
</style>