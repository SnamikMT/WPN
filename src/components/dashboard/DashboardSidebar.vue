<template>
  <aside class="side">
    <!-- ===== MOBILE TOP PILL ===== -->
    <div class="mobTop">
      <div class="mobPill">
        <div class="userPill userPill--mob">
          <div class="userPill__left">
            <div class="userPill__avatar"></div>
            <div class="userPill__name">{{ user?.username ?? "Username" }}</div>
          </div>

          <div class="userPill__right">
            <div class="userPill__role" v-if="user?.role">{{ user.role }}</div>

            <button
              class="mobToggle"
              type="button"
              :aria-expanded="isMobOpen"
              aria-label="Открыть меню"
              @click="toggleMobile"
            >
              <img
                class="mobToggle__ico"
                :class="{ 'is-open': isMobOpen }"
                :src="icoChevron"
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- MOBILE DROPDOWN -->
      <transition name="drop">
        <div v-if="isMobOpen" class="mobPanel" role="dialog" aria-modal="true">
          <div class="side__card side__card--mob">
            <!-- NAV (без дублирования user блока) -->
            <nav class="nav">
              <button
                class="navItem"
                :class="{ 'is-active': active === 'subscription' }"
                type="button"
                @click="onSelect('subscription')"
              >
                <img class="navItem__ico" :src="icoSub" alt="" aria-hidden="true" />
                <span class="navItem__text">Подписка на сервис</span>
                <span class="navItem__badge">NEW</span>
              </button>

              <button
                class="navItem"
                :class="{ 'is-active': active === 'manage' }"
                type="button"
                @click="onSelect('manage')"
              >
                <img class="navItem__ico" :src="icoManage" alt="" aria-hidden="true" />
                <span class="navItem__text">Управление подпиской</span>
              </button>

              <button
                class="navItem"
                :class="{ 'is-active': active === 'ref' }"
                type="button"
                @click="onSelect('ref')"
              >
                <img class="navItem__ico" :src="icoRef" alt="" aria-hidden="true" />
                <span class="navItem__text">Реферальная система</span>
              </button>

              <button
                class="navItem"
                :class="{ 'is-active': active === 'security' }"
                type="button"
                @click="onSelect('security')"
              >
                <img class="navItem__ico" :src="icoShield" alt="" aria-hidden="true" />
                <span class="navItem__text">Настройки и безопасность</span>
              </button>

              <button
                class="navItem"
                :class="{ 'is-active': active === 'help' }"
                type="button"
                @click="onSelect('help')"
              >
                <img class="navItem__ico" :src="icoHelp" alt="" aria-hidden="true" />
                <span class="navItem__text">Техническая помощь</span>
              </button>

              <div class="nav__tail">
                <button class="navItem" type="button">
                  <img class="navItem__ico" :src="icoTg" alt="" aria-hidden="true" />
                  <span class="navItem__text">Наш Telegram канал</span>
                </button>

                <button class="navItem" type="button" @click="onLogout">
                  <img class="navItem__ico" :src="icoExit" alt="" aria-hidden="true" />
                  <span class="navItem__text">Выйти из аккаунта</span>
                </button>
              </div>
            </nav>
          </div>

          <!-- PROMO -->
          <div class="promo promo--mob">
            <div class="promo__text">
              <div class="promo__title">Бесплатная подписка 1д.</div>
              <div class="promo__desc">Подпишитесь на наш Telegramм канал</div>
            </div>

            <button class="promo__btn" type="button" aria-label="Открыть">
              <img class="promo__btnIco" :src="icoArrow" alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- ===== DESKTOP SIDEBAR ===== -->
    <div class="deskOnly">
      <div class="side__card">
        <div class="userPill">
          <div class="userPill__left">
            <div class="userPill__avatar"></div>
            <div class="userPill__name">{{ user?.username ?? "Username" }}</div>
          </div>

          <div class="userPill__role">{{ user?.role ?? "User" }}</div>
        </div>

        <nav class="nav">
          <button
            class="navItem"
            :class="{ 'is-active': active === 'subscription' }"
            type="button"
            @click="emit('select', 'subscription')"
          >
            <img class="navItem__ico" :src="icoSub" alt="" aria-hidden="true" />
            <span class="navItem__text">Подписка на сервис</span>
            <span class="navItem__badge">NEW</span>
          </button>

          <button
            class="navItem"
            :class="{ 'is-active': active === 'manage' }"
            type="button"
            @click="emit('select', 'manage')"
          >
            <img class="navItem__ico" :src="icoManage" alt="" aria-hidden="true" />
            <span class="navItem__text">Управление подпиской</span>
          </button>

          <button
            class="navItem"
            :class="{ 'is-active': active === 'ref' }"
            type="button"
            @click="emit('select', 'ref')"
          >
            <img class="navItem__ico" :src="icoRef" alt="" aria-hidden="true" />
            <span class="navItem__text">Реферальная система</span>
          </button>

          <button
            class="navItem"
            :class="{ 'is-active': active === 'security' }"
            type="button"
            @click="emit('select', 'security')"
          >
            <img class="navItem__ico" :src="icoShield" alt="" aria-hidden="true" />
            <span class="navItem__text">Настройки и безопасность</span>
          </button>

          <button
            class="navItem"
            :class="{ 'is-active': active === 'help' }"
            type="button"
            @click="emit('select', 'help')"
          >
            <img class="navItem__ico" :src="icoHelp" alt="" aria-hidden="true" />
            <span class="navItem__text">Техническая помощь</span>
          </button>

          <div class="nav__tail">
            <button class="navItem" type="button">
              <img class="navItem__ico" :src="icoTg" alt="" aria-hidden="true" />
              <span class="navItem__text">Наш Telegram канал</span>
            </button>

            <button class="navItem" type="button" @click="onLogout">
              <img class="navItem__ico" :src="icoExit" alt="" aria-hidden="true" />
              <span class="navItem__text">Выйти из аккаунта</span>
            </button>
          </div>
        </nav>
      </div>

      <div class="promo">
        <div class="promo__text">
          <div class="promo__title">Бесплатная подписка</div>
          <div class="promo__desc">Подпишитесь на наш Telegramм канал</div>
        </div>

        <button class="promo__btn" type="button" aria-label="Открыть">
          <img class="promo__btnIco" :src="icoArrow" alt="" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- OVERLAY -->
    <transition name="fade">
      <button
        v-if="isMobOpen"
        class="mobOverlay"
        type="button"
        aria-label="Закрыть меню"
        @click="closeMobile"
      />
    </transition>
  </aside>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

import icoSub from "../../assets/img/ico-sub.png";
import icoManage from "../../assets/img/ico-manage.png";
import icoRef from "../../assets/img/ico-ref.png";
import icoShield from "../../assets/img/ico-shield.png";
import icoHelp from "../../assets/img/ico-help.png";
import icoTg from "../../assets/img/ico-tg.png";
import icoExit from "../../assets/img/ico-exit.png";
import icoArrow from "../../assets/img/arrow-right.png";
import icoChevron from "../../assets/img/ico-chevron-9x5.png";

type TabKey = "subscription" | "manage" | "ref" | "security" | "help";

defineProps<{
  active: TabKey;
  user?: { username: string; role: string };
}>();

const emit = defineEmits<{ (e: "select", key: TabKey): void }>();

const router = useRouter();
const auth = useAuthStore();

const isMobOpen = ref(false);

function toggleMobile() {
  isMobOpen.value = !isMobOpen.value;
}
function closeMobile() {
  isMobOpen.value = false;
}

function setBodyLock(lock: boolean) {
  const body = document.body;
  if (lock) body.classList.add("is-locked");
  else body.classList.remove("is-locked");
}
watch(isMobOpen, (v) => setBodyLock(v));

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") closeMobile();
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  setBodyLock(false);
});

function onSelect(key: TabKey) {
  emit("select", key);
  closeMobile();
}

async function onLogout() {
  closeMobile();
  auth.logout();
  await router.push("/");
}
</script>

<style scoped>
.side {
  position: relative;
}

/* visibility */
.mobTop {
  display: none;
}
.deskOnly {
  display: block;
}

/* overlay */
.mobOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  z-index: 80;
}

/* transitions */
.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* mobile top */
.mobPill {
  position: relative;
  z-index: 95;
}

.userPill__right {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

/* burger */
.mobToggle {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.mobToggle__ico {
  width: 16px;
  height: 16px;
  display: block;
  transition: transform 0.18s ease;
  transform: rotate(0deg);
}
.mobToggle__ico.is-open {
  transform: rotate(180deg);
}

/* panel */
.mobPanel {
  position: relative;
  z-index: 95;
  margin-top: 12px;
}

.side__card {
  background: rgba(25, 25, 32, 0.2);
  backdrop-filter: blur(24px);
  border-radius: 24px;
  padding: 18px;
  border: 1px solid rgba(25, 25, 32, 1);
}

.side__card--mob {
  border-radius: 28px;
}

/* USER PILL */
.userPill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 12px;
  border-radius: 18px;

  background: linear-gradient(100.59deg, #5d5dd0 12.17%, #9f9fe9 49.27%, #5d5dd0 87.83%);
}

.userPill--mob {
  border-radius: 28px;
}

.userPill__left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.userPill__avatar {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  flex: 0 0 auto;
}

.userPill__name {
  font-family: var(--font-sf);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* role */
.userPill__role {
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-sf);
  font-size: 12px;
  line-height: 100%;
  white-space: nowrap;
}

/* NAV */
.nav {
  margin-top: 14px;
  display: grid;
  gap: 8px;
}

.navItem {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px;
  border-radius: 16px;

  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;

  text-align: left;
}

.navItem__ico {
  width: 20px;
  height: 20px;
  display: block;
  flex: 0 0 auto;
}

.navItem__text {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #ffffff99;
  min-width: 0;
}

.navItem__badge {
  margin-left: auto;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(76, 103, 255, 0.6);
  border: 1px solid rgba(76, 103, 255, 0.5);
  font-family: var(--font-sf);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.92);
}

.navItem:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.06);
}

.navItem.is-active {
  background: #191920;
  border-color: rgba(255, 255, 255, 0.06);
}
.navItem.is-active .navItem__text {
  color: rgba(255, 255, 255, 0.92);
}

.nav__tail {
  margin-top: 18px;
  display: grid;
  gap: 8px;
}

/* PROMO */
.promo {
  margin-top: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 14px;
  border-radius: 18px;

  background: linear-gradient(100.59deg, #5d5dd0 12.17%, #9f9fe9 49.27%, #5d5dd0 87.83%);
}

.promo--mob {
  border-radius: 22px;
}

.promo__title {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.95);
}

.promo__desc {
  margin-top: 6px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: rgba(255, 255, 255, 0.6);
}

.promo__btn {
  width: 32px;
  height: 58px;
  border-radius: 14px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.promo__btnIco {
  width: 16px;
  height: 16px;
  display: block;
}

/* responsive */
@media (max-width: 900px) {
  .mobTop {
    display: block;
  }
  .deskOnly {
    display: none;
  }
}
</style>