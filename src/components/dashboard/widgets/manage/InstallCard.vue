<template>
  <UiCard variant="accent" class="installCard">
    <template #head>
      <div class="top">
        <div class="ttl">
          <img class="ico" :src="icoDl" alt="" aria-hidden="true" />
          <span>Установка VPN приложения</span>
        </div>
      </div>
    </template>

    <p class="p">
      <span class="t-soft">Скопируйте </span><span class="t-strong">VLESS</span
      ><span class="t-soft"> ссылку, после чего </span>
      <span class="t-strong">откройте инструкцию</span
      ><span class="t-soft">
        и следуйте по всем необходимым шагам, если у вас возникли проблемы,
      </span>
      <span class="t-strong">обратитесь</span><span class="t-soft"> в </span>
      <span class="t-strong">тех.поддержку</span>
    </p>

    <div class="chips" aria-label="Платформы">
      <span class="chip">
        <img class="chip__ico" :src="icoWin" alt="" aria-hidden="true" />
        Windows 10-11
      </span>

      <span class="chip">
        <img class="chip__ico" :src="icoLib" alt="" aria-hidden="true" />
        VC++ libs 2005+
      </span>
    </div>

    <div class="actions">
      <button class="btnSolid" type="button" @click="copyVless">
        <span>VLESS ссылка</span>
        <img class="arr" :src="arrowRight" alt="" aria-hidden="true" />
      </button>

      <button class="btnText" type="button" @click="isInstrOpen = true">
        Инструкция WPN
      </button>

      <InstructionModal
        v-model="isInstrOpen"
        :imagePreview="imgStep1"
        :imageFull="imgStep1Full"
        :image2Preview="imgStep2"
        :image2Full="imgStep2Full"
        videoUrl="https://youtube.com/..."
        :icoOpen="icoOpen"
        :icoExt="icoExt"
        :icoClose="icoClose"
        :icoMinimize="icoMinimize"
        @finish="console.log('done')"
      />
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UiCard from "./UiCard.vue";
import InstructionModal from "../../../ui/InstructionModal.vue";

import arrowRight from "../../../../assets/img/arrow-right.png";
import icoDl from "../../../../assets/img/ico-down.png";
import icoWin from "../../../../assets/img/ico-win.png";
import icoLib from "../../../../assets/img/ico-lib.png";

/* icons for modal */
import icoOpen from "../../../../assets/img/ico-open.png";
import icoExt from "../../../../assets/img/ico-ext.png";
import icoClose from "../../../../assets/img/ico-close.png";
import icoMinimize from "../../../../assets/img/ico-minimize.png";

/* step images (ВАЖНО: именно import, не строка пути) */
import imgStep1 from "../../../../assets/img/instr-1.png";
import imgStep1Full from "../../../../assets/img/instr-1-full.png"; // если нет отдельного — можешь поставить instr-1.png
import imgStep2 from "../../../../assets/img/instr-2.png";
import imgStep2Full from "../../../../assets/img/instr-2-full.png";

const isInstrOpen = ref(false);

function copyVless() {
  // мок — сюда воткнёшь реальную VLESS строку
  const vless = "vless://...";
  navigator.clipboard?.writeText(vless).catch(() => {});
}
</script>

<style scoped>
.installCard :deep(.uiCard__body),
.installCard :deep(.uiCard__inner),
.installCard :deep(.card__inner) {
  padding: 24px 16px;
}

/* head */
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.ttl {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255, 255, 255, 1);
}
.ico {
  width: 18px;
  height: 18px;
  display: block;
  opacity: 0.95;
}

/* text */
.p {
  margin: 0;
  margin-top: 14px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0;
}
.t-strong {
  color: rgba(255, 255, 255, 1);
}
.t-soft {
  color: rgba(255, 255, 255, 0.6);
}

/* chips */
.chips {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #ffffff33;
  color: rgba(255, 255, 255, 1);
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  white-space: nowrap;
}
.chip__ico {
  width: 14px;
  height: 14px;
  display: block;
  opacity: 0.9;
}

/* actions */
.actions {
  margin-top: 16px;
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
}

.btnSolid {
  height: 44px;
  padding: 0 16px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.92);
  color: #0b0d12;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  max-width: 100%;
}
.arr {
  width: 14px;
  height: 14px;
  display: block;
}

.btnText {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #ffffff99;
  text-align: center;
}
.btnText:hover {
  color: rgba(255, 255, 255, 0.85);
}
</style>