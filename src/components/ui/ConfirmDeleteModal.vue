<template>
  <BaseModal v-model="open" :showClose="false" :panelless="true">
    <div class="cdm">
      <div class="cdmHead">
        <div class="cdmHead__title">Подтвердите действие</div>

        <button class="cdmHead__x" type="button" @click="open = false" aria-label="Закрыть">
          <img class="cdmHead__xIco" :src="icoClose" alt="" aria-hidden="true" />
        </button>
      </div>

      <div class="cdmMsg">
        <span>Вы точно что хотите удалить аккаунт?</span>
      </div>

      <button class="cdmCta" type="button" @click="confirm">
        <span>Да, удалить</span>
        <img class="cdmCta__arr" :src="icoArrow" alt="" aria-hidden="true" />
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseModal from "./BaseModal.vue";

import icoArrow from "../../assets/img/arrow-right.png";
import icoClose from "../../assets/img/ico-close.png"; // ты сам подставишь свою иконку

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "confirm"): void;
}>();

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

function confirm() {
  emit("confirm");
  open.value = false;
}
</script>

<style scoped>
.cdm{
  width: min(380px, 92vw);
  background: #0C0C0F;
  border: 1px solid #191920;
  border-radius: 26px;
  padding: 18px;
  box-sizing: border-box;
}
.cdm *{ box-sizing: border-box; }

.cdmHead{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
}

.cdmHead__title{
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  color: rgba(255,255,255,.95);
}

.cdmHead__x{
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  padding: 0;

  display: grid;
  place-items: center;

  cursor: pointer;
}

.cdmHead__x:hover{
  background: transparent;
}

.cdmHead__xIco{
  width: 16px;
  height: 16px;
  display: block;
  opacity: .85;
  transition: opacity .18s ease;
}

.cdmHead__x:hover .cdmHead__xIco{
  opacity: 1;
}
.cdmMsg{
  margin-top: 16px;
  height: 44px;
  border-radius: 18px;
  padding: 0 16px;

  display:flex;
  align-items:center;

  background: #19192099;
  border: 1px solid rgba(255,255,255,.06);

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.92);
}

.cdmCta{
  margin-top: 16px;
  width: 100%;
  height: 38px;
  border-radius: 14px;
  border: none;
  cursor: pointer;

  background: rgba(255,255,255,.92);
  color: #0b0d12;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;

  display:flex;
  align-items:center;
  justify-content:center;
  gap: 10px;
}
.cdmCta__arr{ width:14px; height:14px; display:block; opacity:.9; }
</style>