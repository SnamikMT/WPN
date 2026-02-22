<template>
  <BaseModal v-model="open" :showClose="false" :panelless="true">
    <div class="sm">
      <!-- Head -->
      <div class="smHead">
        <div class="smHead__title">{{ title }}</div>

        <button class="smHead__x" type="button" @click="open = false" aria-label="Закрыть">
          <img class="smHead__xIco" :src="icoClose" alt="" aria-hidden="true" />
        </button>
      </div>

      <!-- Location select (если локаций > 1) -->
      <div v-if="locationsList.length" class="smSelectShell">
        <button class="smSelectRow" type="button" @click="locMenuOpen = !locMenuOpen">
          <span class="smSelectRow__txt">{{ location }}</span>
          <img class="smSelectRow__arr" :src="icoChevron" alt="" aria-hidden="true" />
        </button>

        <div v-if="locMenuOpen" class="smSelectList" role="listbox" aria-label="Локации">
          <button
            v-for="l in locationsList"
            :key="l"
            class="smSelectOpt"
            :class="{ 'is-active': l === location }"
            type="button"
            role="option"
            :aria-selected="l === location"
            @click="pickLocation(l)"
          >
            <span>{{ l }}</span>
            <img v-if="l === location" class="smSelectOpt__check" :src="icoCheck" alt="" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- balance row -->
      <div class="smBalanceRow">
        <span class="smBalanceRow__label">Мой баланс</span>
        <span class="smBalancePill">{{ balance }} ₽</span>
      </div>

      <!-- providers -->
      <div class="pmList" role="listbox" aria-label="Способ оплаты">
        <button
          v-for="p in providers"
          :key="p.key"
          class="pmOpt"
          :class="{ 'is-active': p.key === provider.key }"
          type="button"
          role="option"
          :aria-selected="p.key === provider.key"
          @click="provider = p"
        >
          <span class="pmOpt__left">
            <span class="pmOpt__name">{{ p.name }}</span>
            <img class="pmOpt__flag" :src="p.flagSrc" alt="" aria-hidden="true" />
          </span>

          <img
            v-if="p.key === provider.key"
            class="pmOpt__check"
            :src="icoCheck"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      <!-- promo -->
      <div class="smInpShell">
        <input class="smInp" v-model="promo" placeholder="Промокод (если есть)" />
      </div>

      <!-- receipt switch (rounded bg like inputs) -->
      <div class="smRow">
        <span class="smRow__txt">Отправить квитанцию на почту</span>

        <button class="smSwitch" type="button" @click="sendReceipt = !sendReceipt" aria-label="toggle">
          <span class="smSwitch__track" :class="{ 'is-on': sendReceipt }">
            <span class="smSwitch__dot" :class="{ 'is-on': sendReceipt }"></span>
          </span>
        </button>
      </div>

      <!-- price row -->
      <div class="smPriceRow">
        <span class="smPriceRow__label">Стоимость подписки</span>
        <span class="smPriceRow__value">{{ price }} ₽</span>
      </div>

      <!-- CTA -->
      <button class="smCta" type="button" @click="submit">
        <span>Приобрести подписку</span>
        <img class="smCta__arr" :src="icoArrow" alt="" aria-hidden="true" />
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BaseModal from "./BaseModal.vue";
import { useAuthStore } from "../../stores/auth";

import icoArrow from "../../assets/img/arrow-right.png";
import icoCheck from "../../assets/img/ico-check.png";
import icoChevron from "../../assets/img/select-arrow.png";
import icoClose from "../../assets/img/ico-close.png";
import flagRu from "../../assets/img/flag-ru.png";

/** ✅ нормальный тип ключей (чтобы дальше было проще и безопаснее) */
type ProviderKey = "crystal" | "paymaster" | "mir";
type Provider = { key: ProviderKey; name: string; flagSrc: string };

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;              // "Одна локация"
    price?: number;              // 149
    locations?: string[];        // ["Finland#1","Finland#2"]
    initialLocation?: string;    // "Finland#1"
  }>(),
  {
    title: "Подписка",
    price: 0,
    locations: () => [],
    initialLocation: "",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "submit", payload: {
    title: string;
    price: number;
    location: string;
    provider: ProviderKey;
    promo: string;
    sendReceipt: boolean;
  }): void;
}>();

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const auth = useAuthStore();
const balance = computed(() => auth.currentUser?.balanceRub ?? 0);

const title = computed(() => props.title ?? "Подписка");
const price = computed(() => props.price ?? 0);

const locationsList = computed(() => props.locations ?? []);

const location = ref<string>("");
const locMenuOpen = ref(false);

function normalizeInitialLocation(): string {
  const list = locationsList.value;
  if (!list.length) return "";
  if (props.initialLocation && list.includes(props.initialLocation)) return props.initialLocation;
  return list[0] ?? ""; // ✅ чтобы TS не ругался
}

function pickLocation(v: string) {
  location.value = v;
  locMenuOpen.value = false;
}

/* ✅ providers как кортеж, чтобы providers[0] точно существовал */
const providers = [
  { key: "crystal", name: "Crystal Pay", flagSrc: flagRu },
  { key: "paymaster", name: "PayMaster", flagSrc: flagRu },
  { key: "mir", name: "Mir Online", flagSrc: flagRu },
] as const satisfies readonly Provider[];

const provider = ref<Provider>(providers[0]);

const promo = ref("");
const sendReceipt = ref(true);

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      location.value = normalizeInitialLocation();
      locMenuOpen.value = false;
      promo.value = "";
      sendReceipt.value = true;
      provider.value = providers[0]; // ✅ сброс на дефолт при открытии (по желанию)
    } else {
      locMenuOpen.value = false;
    }
  },
  { immediate: true }
);

watch(
  () => props.locations,
  () => {
    if (!open.value) return;
    const next = normalizeInitialLocation();
    if (next && next !== location.value) location.value = next;
  }
);

function submit() {
  emit("submit", {
    title: title.value,
    price: price.value,
    location: location.value,
    provider: provider.value.key,
    promo: promo.value,
    sendReceipt: sendReceipt.value,
  });

  open.value = false;
}
</script>

<style scoped>
/* card like BalanceModal */
.sm{
  width: min(380px, 92vw);
  max-width: 92vw;
  background: #0C0C0F;
  border: 1px solid #191920;
  border-radius: 26px;
  padding: 18px;
  box-sizing: border-box;
  overflow-x: hidden;
}
.sm *{ box-sizing: border-box; }

/* head */
.smHead{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
}
.smHead__title{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  color: rgba(255,255,255,.95);
}
.smHead__x{
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: none;
  background: transparent;
  display:grid;
  place-items:center;
  cursor:pointer;
}
.smHead__x:hover{ background: rgba(255,255,255,.06); }
.smHead__xIco{ width:16px; height:16px; display:block; opacity:.9; }

/* select (location) */
.smSelectShell{ margin-top: 16px; display:grid; gap: 6px; }
.smSelectRow{
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;

  display:flex;
  align-items:center;
  justify-content:space-between;

  border: 1px solid rgba(255,255,255,.06);
  background: #19192099;

  cursor:pointer;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.85);
}
.smSelectRow__txt{ min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.smSelectRow__arr{ width:14px; height:14px; opacity:.85; }

.smSelectList{ display:grid; gap: 6px; }
.smSelectOpt{
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;

  display:flex;
  align-items:center;
  justify-content:space-between;

  border: 1px solid rgba(255,255,255,.06);
  background: #19192099;
  cursor:pointer;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.85);
}
.smSelectOpt.is-active{ background:#191920; }
.smSelectOpt__check{ width:16px; height:16px; }

/* balance row */
.smBalanceRow{
  margin-top: 12px;
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  background: #19192099;
  border: 1px solid rgba(255,255,255,.06);
}
.smBalanceRow__label{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.55);
}
.smBalancePill{
  height: 26px;
  padding: 0 12px;
  border-radius: 10px;
  background: #FFFFFF33;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.95);
}

/* providers list */
.pmList{ margin-top: 12px; display:grid; gap: 6px; }
.pmOpt{
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;

  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;

  border: 1px solid rgba(255,255,255,.06);
  background: #19192099;
  cursor:pointer;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.85);
}
.pmOpt.is-active{ background:#191920; }
.pmOpt__left{ display:flex; align-items:center; gap: 8px; min-width:0; }
.pmOpt__name{ min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.pmOpt__flag{ width:16px; height:16px; border-radius:999px; display:block; flex:0 0 auto; }
.pmOpt__check{ width:16px; height:16px; display:block; flex:0 0 auto; }

/* promo input */
.smInpShell{
  margin-top: 12px;
  height: 48px;
  border-radius: 18px;
  background: #19192099;
  border: 1px solid rgba(255,255,255,.06);
  overflow:hidden;
}
.smInp{
  width:100%;
  height:48px;
  border:0;
  outline:0;
  background:transparent;
  padding: 0 16px;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.92);
}
.smInp::placeholder{ color: rgba(255,255,255,.42); }

/* receipt row (rounded bg like inputs) */
.smRow{
  margin-top: 12px;
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;

  background: #19192099;
  border: 1px solid rgba(255,255,255,.06);
}
.smRow__txt{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.85);
}

/* switch */
.smSwitch{ border:0; background:transparent; cursor:pointer; padding:0; }
.smSwitch__track{
  width: 34px;
  height: 20px;
  border-radius: 24px;
  background: rgba(255,255,255,.18);
  border: 1px solid rgba(255,255,255,.08);
  position: relative;
  display:block;
}
.smSwitch__track.is-on{
  background: #5D5DD0;
  border-color: transparent;
}
.smSwitch__dot{
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background: #fff;
  position:absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  transition: left .18s ease;
}
.smSwitch__dot.is-on{ left: 17px; }

/* price row */
.smPriceRow{
  margin-top: 12px;
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;

  display:flex;
  align-items:center;
  justify-content:space-between;

  background: #19192099;
  border: 1px solid rgba(255,255,255,.06);
}
.smPriceRow__label{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.55);
}
.smPriceRow__value{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.95);
}

/* CTA 38px */
.smCta{
  margin-top: 12px;
  width: 100%;
  height: 38px;
  border-radius: 14px;
  border:none;
  cursor:pointer;

  background: rgba(255,255,255,.92);
  color:#0b0d12;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;

  display:flex;
  align-items:center;
  justify-content:center;
  gap: 10px;
}
.smCta__arr{ width:14px; height:14px; opacity:.9; }
</style>