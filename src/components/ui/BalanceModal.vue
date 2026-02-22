<template>
  <BaseModal v-model="open" :showClose="false" :panelless="true">
    <div class="bm">
      <!-- Header -->
      <div class="bmHead">
        <div class="bmHead__left">
          <div class="bmHead__title">Ваш баланс</div>

          <div class="bmBalancePill" aria-label="Баланс">
            <img class="bmBalancePill__ico" :src="icoWallet" alt="" aria-hidden="true" />
            <span class="bmBalancePill__txt">{{ balance }}₽</span>
          </div>
        </div>

        <button class="bmHead__x" type="button" @click="open = false" aria-label="Закрыть">
          <img class="bmHead__xIco" :src="icoClose" alt="" aria-hidden="true" />
        </button>
      </div>

      <!-- Tabs (full width) -->
      <div class="bmTabsWrap">
        <div class="bmTabs" role="tablist" aria-label="Операции баланса">
          <button
            v-for="t in tabs"
            :key="t"
            class="bmTab"
            :class="{ 'is-active': active === t }"
            type="button"
            role="tab"
            :aria-selected="active === t"
            @click="active = t"
          >
            {{ t }}
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="bmBody">
        <!-- ===== TOPUP ===== -->
        <template v-if="active === 'Пополнение'">
          <div class="bmInpShell">
            <input
              class="bmInp"
              v-model="topupAmount"
              inputmode="numeric"
              placeholder="Сумма пополнения в рублях"
            />
          </div>

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

          <div class="bmRow">
            <span class="bmRow__txt">Отправить квитанцию на почту</span>

            <button class="bmSwitch" type="button" @click="sendReceipt = !sendReceipt" aria-label="toggle">
              <span class="bmSwitch__track" :class="{ 'is-on': sendReceipt }">
                <span class="bmSwitch__dot" :class="{ 'is-on': sendReceipt }"></span>
              </span>
            </button>
          </div>

          <button class="bmCta" type="button" @click="mockAction('Пополнение')">
            <span>Пополнить счет</span>
            <img class="bmCta__arr" :src="icoArrow" alt="" aria-hidden="true" />
          </button>
        </template>

        <!-- ===== WITHDRAW ===== -->
        <template v-else-if="active === 'Вывод'">
          <div class="bmInpShell">
            <input class="bmInp" v-model="withdrawAmount" inputmode="numeric" placeholder="Сумма вывода" />
          </div>

          <div class="bmSelectShell">
            <button class="bmSelectRow" type="button" @click="withdrawMenuOpen = !withdrawMenuOpen">
              <span class="bmSelectRow__txt">{{ withdrawMethod }}</span>
              <img class="bmSelectRow__arr" :src="icoChevron" alt="" aria-hidden="true" />
            </button>

            <div v-if="withdrawMenuOpen" class="bmSelectList" role="listbox" aria-label="Метод вывода">
              <button
                v-for="m in withdrawMethods"
                :key="m"
                class="bmSelectOpt"
                :class="{ 'is-active': m === withdrawMethod }"
                type="button"
                role="option"
                :aria-selected="m === withdrawMethod"
                @click="pickWithdraw(m)"
              >
                <span>{{ m }}</span>
                <img v-if="m === withdrawMethod" class="bmSelectOpt__check" :src="icoCheck" alt="" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div class="bmInpShell">
            <input class="bmInp" v-model="cardNumber" inputmode="numeric" placeholder="Номер карты" />
          </div>

          <button class="bmCta" type="button" @click="mockAction('Вывод')">
            <span>Вывести</span>
            <img class="bmCta__arr" :src="icoArrow" alt="" aria-hidden="true" />
          </button>
        </template>

        <!-- ===== TRANSFER ===== -->
        <template v-else>
          <div class="bmInpShell">
            <input class="bmInp" v-model="uid" placeholder="UID пользователя" />
          </div>

          <div class="bmInpShell">
            <input class="bmInp" v-model="transferAmount" inputmode="numeric" placeholder="123₽" />
          </div>

          <button class="bmCta" type="button" @click="mockAction('Перевод')">
            <span>Перевести</span>
            <img class="bmCta__arr" :src="icoArrow" alt="" aria-hidden="true" />
          </button>
        </template>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BaseModal from "./BaseModal.vue";
import { useAuthStore } from "../../stores/auth";

import icoArrow from "../../assets/img/arrow-right.png";
import icoWallet from "../../assets/img/ico-balance.png";
import icoCheck from "../../assets/img/ico-check.png";
import icoChevron from "../../assets/img/select-arrow.png";
import icoClose from "../../assets/img/ico-close.png";
import flagRu from "../../assets/img/flag-ru.png";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", v: boolean): void }>();

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const auth = useAuthStore();
const balance = computed(() => auth.currentUser?.balanceRub ?? 0);

/* Tabs */
const tabs = ["Пополнение", "Вывод", "Перевод"] as const;
type Tab = (typeof tabs)[number];
const active = ref<Tab>("Пополнение");

/* Fields */
const topupAmount = ref("");
const withdrawAmount = ref("");
const cardNumber = ref("");
const uid = ref("");
const transferAmount = ref("");
const sendReceipt = ref(true);

/* Providers */
type Provider = { key: "crystal" | "paymaster" | "mir"; name: string; flagSrc: string };

/** ✅ делаем кортеж, чтобы providers[0] НЕ был undefined */
const providers = [
  { key: "crystal", name: "Crystal Pay", flagSrc: flagRu },
  { key: "paymaster", name: "PayMaster", flagSrc: flagRu },
  { key: "mir", name: "Mir Online", flagSrc: flagRu },
] as const satisfies readonly Provider[];

/** ✅ теперь TS знает: providers[0] точно существует */
const provider = ref<Provider>(providers[0]);

/* Withdraw select */
const withdrawMethods = ["Вывод на карту", "СБП"] as const;
type WithdrawMethod = (typeof withdrawMethods)[number];
const withdrawMethod = ref<WithdrawMethod>("Вывод на карту");
const withdrawMenuOpen = ref(false);

function pickWithdraw(m: WithdrawMethod) {
  withdrawMethod.value = m;
  withdrawMenuOpen.value = false;
}

watch(active, () => {
  withdrawMenuOpen.value = false;
});

watch(open, (v) => {
  if (!v) {
    active.value = "Пополнение";
    withdrawMenuOpen.value = false;
  }
});

function mockAction(kind: string) {
  console.log("[BALANCE]", kind, {
    topupAmount: topupAmount.value,
    provider: provider.value,
    sendReceipt: sendReceipt.value,
    withdrawAmount: withdrawAmount.value,
    withdrawMethod: withdrawMethod.value,
    cardNumber: cardNumber.value,
    uid: uid.value,
    transferAmount: transferAmount.value,
  });
  open.value = false;
}
</script>

<style scoped>
/* ===== Modal Card (макет ~380px) ===== */
.bm{
  width: min(380px, 92vw);
  max-width: 92vw;
  box-sizing: border-box;
  background: #0C0C0F;
  border: 1px solid #191920;
  border-radius: 26px;
  padding: 18px;
  overflow-x: hidden;
}
.bm *{ box-sizing: border-box; }
.bm button, .bm input{ max-width: 100%; }

/* ===== Header ===== */
.bmHead{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
}
.bmHead__left{
  display:flex;
  align-items:center;
  gap: 8px;
  min-width:0;
}
.bmHead__title{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  color: rgba(255,255,255,.95);
  white-space: nowrap;
}

/* ===== Balance pill 74x26 bg #FFFFFF33 ===== */
.bmBalancePill{
  width: 74px;
  height: 26px;
  border-radius: 10px;
  background: #FFFFFF33;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap: 6px;
  flex: 0 0 auto;
}
.bmBalancePill__ico{ width:14px; height:14px; display:block; opacity:.95; }
.bmBalancePill__txt{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.95);
}

/* ===== Close icon button ===== */
.bmHead__x{
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: none;
  background: transparent;
  display:grid;
  place-items:center;
  cursor:pointer;
}
.bmHead__x:hover{ background: rgba(255,255,255,.06); }
.bmHead__xIco{ width: 16px; height: 16px; display:block; opacity:.9; }

/* ===== Tabs FULL WIDTH ===== */
.bmTabsWrap{ margin-top: 20px; }
.bmTabs{
  width: 100%;
  height: 46px;
  border-radius: 20px;
  background: #0C0C0F;
  border: 1px solid #191920;
  padding: 4px;
  display:flex;
  gap: 6px;
}
.bmTab{
  flex: 1 1 0;
  height: 38px;
  border-radius: 16px;
  border: none;
  background: transparent;
  cursor:pointer;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.65);

  min-width:0;
  white-space: nowrap;
}
.bmTab.is-active{
  background: #5D5DD0;
  color: rgba(255,255,255,.95);
}

/* ===== Body ===== */
.bmBody{
  margin-top: 16px;
  display:grid;
  gap: 16px;
}

/* ===== Input 48 bg #19192099 ===== */
.bmInpShell{
  height: 48px;
  border-radius: 18px;
  background: #19192099;
  border: 1px solid rgba(255,255,255,.06);
  overflow:hidden;
}
.bmInp{
  width:100%;
  height:48px;
  border:0;
  outline:0;
  background:transparent;
  padding:0 16px;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.92);
}
.bmInp::placeholder{ color: rgba(255,255,255,.42); }

/* ===== Providers: 44, gap 6 ===== */
.pmList{ display:grid; gap: 6px; }
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

  min-width:0;
}
.pmOpt.is-active{ background: #191920; }

.pmOpt__left{
  display:flex;
  align-items:center;
  gap: 8px;       /* флаг рядом с текстом, отступ 8 */
  min-width: 0;
}
.pmOpt__name{
  min-width:0;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pmOpt__flag{
  width:16px;
  height:16px;
  border-radius: 999px;
  flex:0 0 auto;
  display:block;
}
.pmOpt__check{
  width:16px;
  height:16px;
  flex:0 0 auto;
  display:block;
}

/* ===== Withdraw select ===== */
.bmSelectShell{ display:grid; gap: 6px; }
.bmSelectRow{
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

  min-width:0;
}
.bmSelectRow__txt{ min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.bmSelectRow__arr{ width:14px; height:14px; opacity:.85; }

.bmSelectList{ display:grid; gap: 6px; }
.bmSelectOpt{
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
.bmSelectOpt.is-active{ background:#191920; }
.bmSelectOpt__check{ width:16px; height:16px; }

/* ===== Row toggle ===== */
.bmRow{
  height: 48px; /* как у способов оплаты */
  border-radius: 18px;
  padding: 0 16px;

  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;

  background: #19192099;
  border: 1px solid rgba(255,255,255,.06);
}
.bmRow__txt{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: rgba(255,255,255,.55);
}

/* switch 34x20 radius 24, dot centered */
.bmSwitch{ border:0; background:transparent; cursor:pointer; padding:0; }
.bmSwitch__track{
  width: 34px;
  height: 20px;
  border-radius: 24px;
  background: rgba(255,255,255,.18);
  border: 1px solid rgba(255,255,255,.08);
  position: relative;
  display:block;
}
.bmSwitch__track.is-on{
  background: #5D5DD0;
  border-color: transparent;
}
.bmSwitch__dot{
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background: #fff;
  position:absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%); /* фикс: по центру */
  transition: left .18s ease;
}
.bmSwitch__dot.is-on{ left: 17px; }

/* ===== CTA ===== */
.bmCta{
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
.bmCta__arr{ width:14px; height:14px; opacity:.9; }
</style>