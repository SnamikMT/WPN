<template>
  <aside class="side">
    <div class="side__card">
      <!-- USER HEADER -->
      <div class="userPill">
        <div class="userPill__left">
          <div class="userPill__avatar"></div>
          <div class="userPill__name">{{ user?.username ?? "Username" }}</div>
        </div>

        <div class="userPill__role">{{ user?.role ?? "User" }}</div>
      </div>

      <!-- NAV -->
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

        <!-- последние пункты с отступом 18 -->
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

      <!-- PROMO -->
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
  </aside>
</template>

<script setup lang="ts">
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

type TabKey = "subscription" | "manage" | "ref" | "security" | "help";

defineProps<{
  active: TabKey;
  user?: { username: string; role: string };
}>();

const emit = defineEmits<{ (e: "select", key: TabKey): void }>();

const router = useRouter();
const auth = useAuthStore();

async function onLogout() {
  auth.logout();
  await router.push("/");
}
</script>

<style scoped>
.side { position: relative; }

/* фон всей панели */
.side__card {
  background: rgba(25, 25, 32, 0.2); /* #19192033 */
  backdrop-filter: blur(24px);
  border-radius: 24px;
  padding: 18px;
  border: 1px solid rgba(25,25,32,1);
}

/* USER PILL */
.userPill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 12px;
  border-radius: 18px;

  background: linear-gradient(
    100.59deg,
    #5d5dd0 12.17%,
    #9f9fe9 49.27%,
    #5d5dd0 87.83%
  );
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
  background: rgba(255,255,255,.25);
  flex: 0 0 auto;
}

.userPill__name {
  font-family: var(--font-sf);
  font-size: 14px;
  color: rgba(255,255,255,.95);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* плашка admin/user */
.userPill__role {
  padding: 4px 10px;
  border-radius: 999px;

  border: 1px solid rgba(255,255,255,.2); /* #FFFFFF33 */
  color: rgba(255,255,255,.2);            /* тот же тон */
  font-family: var(--font-sf);
  font-size: 12px;
  line-height: 100%;
  white-space: nowrap;
}

/* NAV */
.nav {
  margin-top: 14px;
  display: grid;
  gap: 8px; /* между пунктами 8px */
}

/* item */
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
  font-size: 14px;
  line-height: 100%;
  color: #ffffff99; /* не актив */
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
  color: rgba(255,255,255,.92);
}

.navItem:hover {
  background: rgba(255,255,255,.04);
  border-color: rgba(255,255,255,.06);
}

/* active */
.navItem.is-active {
  background: #191920;
  border-color: rgba(255,255,255,.06);
}

.navItem.is-active .navItem__text {
  color: rgba(255,255,255,.92);
}

/* последние два пункта с отступом 18 */
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

  background: linear-gradient(
    100.59deg,
    #5d5dd0 12.17%,
    #9f9fe9 49.27%,
    #5d5dd0 87.83%
  );
}

.promo__title {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: rgba(255,255,255,.95);
}

.promo__desc {
  margin-top: 6px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: rgba(255,255,255,.85);
}

.promo__btn {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: none;
  background: rgba(255,255,255,.95);
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
</style>
