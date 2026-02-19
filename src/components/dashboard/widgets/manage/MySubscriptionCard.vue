<!-- src/components/dashboard/widgets/manage/MySubscriptionCard.vue -->
<template>
  <UiCard>
    <template #head>
      <div class="head">
        <div class="ttl">
          <img class="ico" :src="icoSub" alt="" aria-hidden="true" />
          <span>Ваша подписка</span>
        </div>

        <button
          v-if="hasSubscription"
          class="linkBtn"
          type="button"
        >
          <span>Изменить тариф</span>
          <img class="arr" :src="arrowRight" alt="" aria-hidden="true" />
        </button>
      </div>
    </template>

    <!-- ЕСЛИ ПОДПИСКИ НЕТ -->
    <template v-if="!hasSubscription">
      <div class="name">Подписка отсутствует</div>
      <div class="sub">Выберите подходящий тариф ниже</div>

      <!-- спейсер чтобы низ не “висел” -->
      <div class="spacer"></div>
    </template>

    <!-- ЕСЛИ ПОДПИСКА ЕСТЬ -->
    <template v-else>
      <div class="name">{{ planTitle }}</div>
      <div class="sub">{{ planSubtitle }}</div>

      <div class="meta">
        <span class="pill">
          <img class="pI" :src="icoClock" alt="" aria-hidden="true" />
          Осталось {{ daysLeft }} дней
        </span>

        <span class="pill">
          <img class="pI" :src="icoPin" alt="" aria-hidden="true" />
          {{ serverName }}
        </span>
      </div>

      <button class="tiny" type="button">
        Продлить подписку
        <img class="arr2" :src="arrowRight" alt="" aria-hidden="true" />
      </button>

      <!-- ✅ спейсер: бар красиво прижимается вниз если сверху мало -->
      <div class="spacer"></div>

      <div class="bar">
        <div class="bar__fill" :style="{ width: progress + '%' }"></div>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../../../stores/auth";
import UiCard from "./UiCard.vue";

import arrowRight from "../../../../assets/img/arrow-right2.png";
import icoSub from "../../../../assets/img/ico-sub2.png";
import icoClock from "../../../../assets/img/ico-stime.png";
import icoPin from "../../../../assets/img/ico-flag.png";

const auth = useAuthStore();

const user = computed(() => auth.currentUser);
const hasSubscription = computed(() => auth.hasSubscription);

const planTitle = computed(() => {
  switch (user.value?.plan) {
    case "trial": return "Пробный доступ";
    case "monthly": return "Месячная подписка";
    case "yearly": return "Годовая подписка";
    default: return "";
  }
});

const planSubtitle = computed(() => {
  switch (user.value?.plan) {
    case "trial": return "Тестовый доступ (3 дня)";
    case "monthly": return "Подписка на месяц (30 дней)";
    case "yearly": return "Подписка на год (365 дней)";
    default: return "";
  }
});

const totalDays = computed(() => {
  if (user.value?.plan === "trial") return 3;
  if (user.value?.plan === "monthly") return 30;
  if (user.value?.plan === "yearly") return 365;
  return 0;
});

const daysLeft = computed(() => {
  if (!totalDays.value) return 0;
  const seed = user.value?.id?.charCodeAt(1) ?? 1;
  return Math.max(1, totalDays.value - (seed % totalDays.value));
});

const progress = computed(() => {
  if (!totalDays.value) return 0;
  return Math.round((daysLeft.value / totalDays.value) * 100);
});

const serverName = computed(() => {
  if (user.value?.plan === "trial") return "Finland#1 server";
  if (user.value?.plan === "monthly") return "Finland#3 server";
  if (user.value?.plan === "yearly") return "All Europe servers";
  return "";
});
</script>

<style scoped>
/* хедер */
.head{ display:flex; align-items:center; justify-content:space-between; gap:12px; }

.ttl{
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-family:var(--font-sf);
  font-weight:500;
  font-size:18px;
  color:rgba(255,255,255,.95);
}

.ico{ width:24px; height:24px; display:block; opacity:.95; }

.linkBtn{
  background:transparent; border:none; cursor:pointer;
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--font-sf);
  font-size:16px;
  color:#FFFFFF99;
}
.arr{ width:14px; height:14px; display:block; opacity:.9; }

/* контент */
.name{
  margin-top: 10px;
  font-family:var(--font-sf);
  font-weight:500;
  font-size:24px;
  color:#fff;
}

.sub{
  margin-top:8px;
  font-family:var(--font-sf);
  font-size:14px;
  color:#FFFFFF99;
}

.meta{ margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; }

.pill{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #FFFFFF33;
  color: rgba(255,255,255,.78);
  font-family: var(--font-sf);
  font-size: 14px;
}

.pI{ width:14px; height:14px; display:block; opacity:.9; }

.tiny{
  margin-top: 12px;
  background: transparent;
  border:none;
  cursor:pointer;
  color: #FFFFFF99;
  font-family: var(--font-sf);
  font-size: 16px;
  display: inline-flex;
  align-items:center;
  gap:8px;
  padding:0;
  font-weight: 400;
}
.arr2{ width:8px; height:8px; display:block; opacity:.9; }

/* ✅ “прижимаем” низ */
.spacer{ flex: 1 1 auto; min-height: 12px; }

.bar{
  margin-top: 14px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.04);
  overflow: hidden;
}

.bar__fill{
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    rgba(93,93,208,.95),
    rgba(93,93,208,.95) 8px,
    rgba(93,93,208,.55) 8px,
    rgba(93,93,208,.55) 16px
  );
  transition: width .3s ease;
}
</style>
