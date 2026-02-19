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
      <span class="t-soft">Скопируйте </span><span class="t-strong">VLESS</span><span class="t-soft"> ссылку, после чего </span>
      <span class="t-strong">откройте инструкцию</span><span class="t-soft"> и следуйте по всем необходимым шагам, если у вас
      возникли проблемы, </span><span class="t-strong">обратитесь</span><span class="t-soft"> в </span>
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
      <button class="btnSolid" type="button">
        <span>VLESS ссылка</span>
        <img class="arr" :src="arrowRight" alt="" aria-hidden="true" />
      </button>

      <button class="btnText" type="button">
        Инструкция WPN
      </button>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import UiCard from "./UiCard.vue";
import arrowRight from "../../../../assets/img/arrow-right.png";
import icoDl from "../../../../assets/img/ico-down.png";
import icoWin from "../../../../assets/img/ico-win.png";
import icoLib from "../../../../assets/img/ico-lib.png";

</script>

<style scoped>
/* важно: паддинги карточки по ТЗ */
.installCard :deep(.uiCard__body),
.installCard :deep(.uiCard__inner),
.installCard :deep(.card__inner) {
  padding: 24px 16px;
}

/* head */
.top { display:flex; align-items:center; justify-content:space-between; gap:12px; }
.ttl{
  display:inline-flex; align-items:center; gap:10px;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,1);
}
.ico{ width:18px; height:18px; display:block; opacity:.95; }

/* текст карточки: 18px, и контроль “сильных”/“слабых” слов */
.p{
  margin: 0;
  margin-top: 14px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0;
}

.t-strong { color: rgba(255,255,255,1); }
.t-soft   { color: rgba(255,255,255,.6); }

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
  background: #FFFFFF33;

  color: rgba(255,255,255,1);
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
.actions{
  margin-top: 16px;
  display:flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
}

/* solid button */
.btnSolid{
  height: 44px;
  padding: 0 16px;
  border-radius: 14px;
  border: none;
  cursor: pointer;

  background: rgba(255,255,255,.92);
  color:#0b0d12;

  display:inline-flex;
  align-items:center;
  gap: 10px;

  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;

  max-width: 100%;
}

.arr{ width:14px; height:14px; display:block; }

/* "Инструкция" — без фона, только текст */
.btnText{
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;

  color: #FFFFFF99; /* по ТЗ */
  text-align: center;
}

.btnText:hover { color: rgba(255,255,255,.85); }
</style>
