<template>
  <UiCard>
    <template #head>
      <div class="head">
        <div class="ttl">
          <img class="ico" :src="icoPlay" alt="" aria-hidden="true" />
          Посмотрите видео перед установкой
        </div>

        <button class="linkBtn" type="button">
          Открыть Youtube
          <img class="arr" :src="arrowRight" alt="" aria-hidden="true" />
        </button>
      </div>
    </template>

    <div class="stub"></div>
  </UiCard>
</template>

<script setup lang="ts">
import UiCard from "./UiCard.vue";
import arrowRight from "../../../../assets/img/arrow-right.png";
import icoPlay from "../../../../assets/img/ico-help.png"; // замени
</script>

<style scoped>
.head{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.ttl{ display:inline-flex; align-items:center; gap:10px; font-family:var(--font-sf); font-weight:500; font-size:14px; color:rgba(255,255,255,.95);}
.ico{ width:18px; height:18px; display:block; opacity:.9; }

.linkBtn{
  background:transparent; border:none; cursor:pointer;
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--font-sf); font-size:12px; color:#FFFFFF99;
}
.arr{ width:14px; height:14px; display:block; opacity:.9; }

.stub{
  height: 240px;
  border-radius: 18px;
  background: rgba(255,255,255,.06);
}
</style>
