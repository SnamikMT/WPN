<template>
  <UiCard>
    <template #head>
      <div class="ttl">
        <img class="ico" :src="icoLib" alt="" aria-hidden="true" />
        Необходимые библиотеки
      </div>
    </template>

    <div class="list">
      <button v-for="(t, idx) in items" :key="idx" class="row" type="button">
        <img class="rI" :src="icoVs" alt="" aria-hidden="true" />
        <span class="txt">{{ t }}</span>
      </button>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UiCard from "./UiCard.vue";

import icoLib from "../../../../assets/img/ico-shield.png"; // замени
import icoVs from "../../../../assets/img/ico-ref.png";    // замени

const items = ref([
  "Скачать Visual C++ Redist x64",
  "Скачать Visual C++ Redist x64",
  "Скачать Visual C++ Redist x64",
  "Скачать Visual C++ Redist x64",
  "Скачать Visual C++ Redist x64",
]);
</script>

<style scoped>
.ttl{ display:inline-flex; align-items:center; gap:10px; font-family:var(--font-sf); font-weight:500; font-size:14px; color:rgba(255,255,255,.95);}
.ico{ width:18px; height:18px; display:block; opacity:.9; }

.list{ display:grid; gap:10px; }
.row{
  height: 38px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background: rgba(255,255,255,.04);
  display:flex; align-items:center; gap:10px;
  padding: 0 12px;
  text-align:left;
}
.rI{ width:18px; height:18px; display:block; opacity:.95; }
.txt{ font-family:var(--font-sf); font-size:12px; color: rgba(255,255,255,.85); }
</style>
