<!-- src/components/dashboard/sections/ReferralsView.vue -->
<template>
  <section class="ref">
    <header class="ref__head">
      <h2 class="ref__title">Реферальная система</h2>
      <p class="ref__desc">Приглашайте друзей и получайте выгоду!</p>
    </header>

    <div class="ref__grid">
      <!-- LEFT -->
      <div class="left">
        <article class="promoCard">
          <div class="promoCard__top">
            <img class="promoCard__ico" :src="icoDownload" alt="" aria-hidden="true" />
            <div class="promoCard__topTitle">Ваш промокод</div>
          </div>

          <div class="promoCard__field">
            <input class="promoCard__inp" :value="refLink" readonly />
          </div>

          <div class="promoCard__actions">
            <BaseButton variant="solid" size="md" :arrow="true" @click="copyRef">
              Скопировать код
            </BaseButton>

            <button class="linkBtn" type="button" @click="downloadQr">
              Скачать QR code
            </button>
          </div>

          <div v-if="copied" class="toast">Скопировано ✅</div>
        </article>

        <article class="chartCard">
          <div class="chartCard__top">
            <div class="chartCard__topLeft">
              <img class="chartCard__ico" :src="icoStats" alt="" aria-hidden="true" />
              <div class="chartCard__title">Статистика</div>
            </div>

            <div class="dropdown" ref="ddRef">
              <button class="dropdown__btn" type="button" @click="ddOpen = !ddOpen">
                <span>{{ ddValue }}</span>
                <img class="dropdown__arrow" :src="icoChevron" alt="" aria-hidden="true" />
              </button>

              <div v-if="ddOpen" class="dropdown__menu">
                <button class="dropdown__opt" type="button" @click="pickDD('Регистрации')">Регистрации</button>
                <button class="dropdown__opt" type="button" @click="pickDD('Покупки')">Покупки</button>
                <button class="dropdown__opt" type="button" @click="pickDD('Доход')">Доход</button>
              </div>
            </div>
          </div>

          <div class="chartBox">
            <div class="bars" aria-label="График статистики">
              <div
                v-for="(b, i) in bars"
                :key="i"
                class="bar"
                :style="{ height: b.h + 'px' }"
                :title="b.label + ': ' + b.value"
              />
              <div class="monthsIn">
                <div v-for="m in months" :key="m" class="m">{{ m }}</div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <article class="infoCard">
          <p class="infoCard__text infoCard__text--first">Зарабатывайте вместе с WPN.SU!</p>
          <p class="infoCard__text">
            Каждый пользователь, который зарегистрируется по вашей уникальной ссылке,
            <span class="blue">получит 5 дополнительных дней при покупке подписки</span>.
            А вы получите <span class="blue">10%</span> от суммы его покупки и
            <span class="blue">5 дней к подписке</span>.
          </p>
          <p class="infoCard__text">
            Мы ищем <span class="hl hl--yt">Ютуберов</span> и <span class="hl hl--tt">Тиктокеров</span>
            для сотрудничества, на более выгодных условиях реферальной системы. Свяжитесь с нами через
            <a class="infoCard__tg blueLink" href="#" @click.prevent>telegram</a>
            для обсуждения индивидуальных условий.
          </p>
        </article>

        <div class="statsRow">
          <article class="statCard">
            <div class="statCard__val">{{ balance }} ₽</div>
            <div class="statCard__lbl">Актуальный баланс</div>
          </article>
          <article class="statCard">
            <div class="statCard__val">{{ invited }}</div>
            <div class="statCard__lbl">Приведено пользователей</div>
          </article>
          <article class="statCard">
            <div class="statCard__val">{{ purchases }}</div>
            <div class="statCard__lbl">Совершено покупок</div>
          </article>
        </div>

        <!-- TABLE -->
        <article class="tableCard">
          <div class="tableBox">
            <!-- ✅ важное: скролл только внутри, родитель НЕ раздувается -->
            <div class="tScroll" role="region" aria-label="Таблица рефералов" tabindex="0">
              <div class="tHead">
                <div class="th th--id">ID</div>
                <div class="th th--name">Имя пользователя</div>
                <div class="th th--orders">Кол-во покупок</div>
                <div class="th th--date">Дата регистрации</div>
              </div>

              <div class="tBody">
                <div v-for="row in visibleRows" :key="row.id" class="tRow">
                  <div class="td td--id">{{ row.id }}</div>
                  <div class="td td--name">{{ row.name }}</div>
                  <div class="td td--orders">{{ row.orders }}</div>
                  <div class="td td--date">{{ row.date }}</div>
                </div>

                <div v-if="!visibleRows.length" class="tEmpty">
                  Пока нет приглашенных пользователей
                </div>
              </div>
            </div>

            <div class="tFoot">
              <div class="tTotal">Всего приведено {{ invited }} человека</div>

              <button class="showAll" type="button" @click="toggleAll" :aria-expanded="showAll">
                <span>{{ showAll ? "Свернуть список" : "Показать весь список" }}</span>
                <img class="showAll__arrow" :class="{ 'is-up': showAll }" :src="icoArrow" alt="" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import BaseButton from "../ui/BaseButton.vue";

import icoArrow from "../../assets/img/arrow-right2.png";
import icoDownload from "../../assets/img/ico-download.png";
import icoStats from "../../assets/img/ico-download.png";
import icoChevron from "../../assets/img/select-arrow.png";

const refLink = "wpn.com/ref3910-01?";

const copied = ref(false);
let t: number | null = null;

async function copyRef() {
  try {
    await navigator.clipboard.writeText(refLink);
    copied.value = true;
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => (copied.value = false), 1200);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = refLink;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    copied.value = true;
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => (copied.value = false), 1200);
  }
}

function downloadQr() {
  alert("QR code: будет подключено позже 🙂");
}

/* Dropdown */
const ddOpen = ref(false);
const ddValue = ref("Регистрации");
const ddRef = ref<HTMLElement | null>(null);

function pickDD(v: string) {
  ddValue.value = v;
  ddOpen.value = false;
}

function onDocClick(e: MouseEvent) {
  const el = e.target as HTMLElement | null;
  if (!el) return;
  if (ddRef.value && ddRef.value.contains(el)) return;
  ddOpen.value = false;
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));

/* Mock data */
const balance = 149;
const invited = 23;
const purchases = 13;

const rows = [
  { id: 1, name: "Username13", orders: 3, date: "13.04.2025" },
  { id: 2, name: "Username13", orders: 3, date: "13.04.2025" },
  { id: 3, name: "Username13", orders: 3, date: "13.04.2025" },
  { id: 4, name: "Username13", orders: 3, date: "13.04.2025" },
  { id: 5, name: "Username13", orders: 3, date: "13.04.2025" },
  { id: 6, name: "Username13", orders: 2, date: "19.04.2025" },
  { id: 7, name: "Username13", orders: 1, date: "25.04.2025" },
  { id: 8, name: "Username13", orders: 5, date: "29.04.2025" },
  { id: 9, name: "Username13", orders: 1, date: "01.05.2025" },
  { id: 10, name: "Username13", orders: 2, date: "03.05.2025" },
];

const showAll = ref(false);
const PREVIEW_COUNT = 5;

const visibleRows = computed(() => (showAll.value ? rows : rows.slice(0, PREVIEW_COUNT)));
function toggleAll() { showAll.value = !showAll.value; }

/* Chart mock */
const months = ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"];
const bars = [
  { label: "Янв", value: 18, h: 88 },
  { label: "Фев", value: 10, h: 54 },
  { label: "Мар", value: 14, h: 70 },
  { label: "Апр", value: 22, h: 102 },
  { label: "Май", value: 12, h: 62 },
  { label: "Июн", value: 24, h: 110 },
  { label: "Июл", value: 16, h: 78 },
  { label: "Авг", value: 20, h: 96 },
  { label: "Сен", value: 9, h: 48 },
  { label: "Окт", value: 13, h: 66 },
  { label: "Ноя", value: 11, h: 58 },
  { label: "Дек", value: 19, h: 92 },
];
</script>

<style scoped>
.ref { color: rgba(255,255,255,.95); font-family: var(--font-sf); }
.ref__head { margin-bottom: 18px; }
.ref__title { margin: 0; font-weight: 500; font-size: 24px; line-height: 100%; }
.ref__desc { margin: 12px 0 0; font-weight: 400; font-size: 16px; line-height: 100%; color: #ffffff99; }

.ref__grid {
  display: grid;
  grid-template-columns: 352px 1fr;
  gap: 18px;
  align-items: start;
}
.left, .right { min-width: 0; display: grid; gap: 18px; }

/* cards */
.promoCard, .chartCard, .infoCard, .statCard, .tableCard {
  border-radius: 24px;
  background: rgba(25, 25, 32, 0.18);
  backdrop-filter: blur(24px);
  box-shadow: 0 18px 60px rgba(0,0,0,.35);
  padding: 18px;
}
.blue { color: #4C67FF; font-weight: 400; }
.blueLink { color: #4C67FF; text-decoration: none; }
.blueLink:hover { text-decoration: underline; }

/* promo */
.promoCard {
  background: linear-gradient(100.59deg, #5D5DD0 12.17%, #9F9FE9 49.27%, #5D5DD0 87.83%);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.promoCard__top { display: flex; align-items: center; gap: 10px; }
.promoCard__ico { width: 20px; height: 20px; display: block; }
.promoCard__topTitle { font-weight: 500; font-size: 16px; line-height: 100%; }
.promoCard__field { margin-top: 14px; }
.promoCard__inp {
  width: 100%; height: 44px; border-radius: 16px; border: none; outline: none;
  background: rgba(25,25,32,.35); color: rgba(255,255,255,.95);
  padding: 0 14px; font-size: 14px;
}
.promoCard__actions { margin-top: 14px; display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
.linkBtn{
  border: none; background: transparent; color: rgba(255,255,255,.92);
  font-size: 14px; cursor: pointer; padding: 8px 0; opacity: .9;
}
.linkBtn:hover { opacity: 1; text-decoration: underline; }
.toast{
  position: absolute; right: 14px; bottom: 14px;
  background: rgba(12,12,15,.55); border: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(12px); border-radius: 14px; padding: 8px 10px; font-size: 12px;
}

/* chart */
.chartCard__top{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.chartCard__topLeft{ display:inline-flex; align-items:center; gap:10px; }
.chartCard__ico{ width:20px; height:20px; display:block; opacity:.9; }
.chartCard__title{ font-weight:500; font-size:16px; color:rgba(255,255,255,.92); }

.dropdown{ position: relative; }
.dropdown__btn{
  height: 34px; padding: 0 12px; border-radius: 999px; border: none;
  background: #FFFFFF33; color: rgba(255,255,255,.85); cursor: pointer;
  display: inline-flex; align-items: center; gap: 10px; font-size: 14px;
}
.dropdown__arrow{ width:14px; height:14px; display:block; opacity:.85; }
.dropdown__menu{
  position:absolute; right:0; top:calc(100% + 10px);
  width:170px; border-radius:16px; background: rgba(12,12,15,.95);
  border: 1px solid rgba(255,255,255,.08); overflow:hidden; z-index:5;
}
.dropdown__opt{
  width:100%; padding:10px 12px; text-align:left; border:none; background:transparent;
  color: rgba(255,255,255,.85); cursor:pointer; font-size:14px;
}
.dropdown__opt:hover{ background: rgba(255,255,255,.06); }

.chartBox{ margin-top:14px; padding:12px; border-radius:16px; background:#19192099; }
.bars{
  position:relative; height:140px; display:grid;
  grid-template-columns:repeat(12, 1fr); gap:8px; align-items:end; padding-bottom:22px;
}
.bar{ border-radius:10px; background: rgba(93,93,208,.95); box-shadow: inset 0 -10px 25px rgba(255,255,255,.08); }
.monthsIn{
  position:absolute; left:0; right:0; bottom:0;
  display:grid; grid-template-columns:repeat(12, 1fr); gap:8px; pointer-events:none;
}
.m{ text-align:center; font-size:12px; line-height:100%; color: rgba(255,255,255,.92); opacity:.9; }

/* info */
.infoCard__text{ margin: 12px 0 0; font-size: 14px; line-height: 140%; color: rgba(255,255,255,.78); }
.infoCard__text--first{ margin: 0; color: rgba(255,255,255,.88); }
.hl{ font-weight: 600; }
.hl--yt{ color: #E24343; }
.hl--tt{ color: #5B94DF; }

/* stats */
.statsRow{ display:grid; grid-template-columns: repeat(3, 1fr); gap:14px; }
.statCard{ background: rgba(12,12,15,.65); padding:18px; }
.statCard__val{ font-weight:500; font-size:28px; text-align:center; }
.statCard__lbl{ margin-top:8px; font-size:12px; text-align:center; color:#ffffff99; }

/* table */
.tableCard{ padding: 0; background: transparent; box-shadow: none; backdrop-filter: none; }

.tableBox{
  border-radius: 24px;
  padding: 14px 14px 12px;
  background: #19192066;
  border: 1px solid rgba(255,255,255,.06);
  box-shadow: 0 18px 60px rgba(0,0,0,.35);
  backdrop-filter: blur(24px);

  max-width: 100%;
  overflow: hidden; /* ✅ гарант: ничего “наружу” визуально не вылезет */
}

/* ✅ скролл внутри, не раздувает карточку */
.tScroll{
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 6px;
}

/* ✅ умная сетка: колонки не фикс, но с минимальными границами */
.tHead, .tRow{
  display: grid;
  grid-template-columns:
    minmax(44px, 70px)
    minmax(140px, 1fr)
    minmax(110px, 170px)
    minmax(120px, 170px);
  gap: 0;
  align-items: center;

  /* важно: grid внутри скролл-контейнера должен уметь сжиматься */
  min-width: 0;
}

/* head */
.tHead{
  padding: 10px 10px 12px;
  color: rgba(255,255,255,.55);
  font-size: 12px;
  line-height: 120%;
  align-items: start;
}

/* ✅ показываем ВЕСЬ текст заголовков (переносим строки) */
.th{
  min-width: 0;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  word-break: break-word;
}

/* ✅ значения тоже не режем (как ты просил), но аккуратно переносим */
.td{
  min-width: 0;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  word-break: break-word;

  font-size: 13px;
  line-height: 120%;
  color: rgba(255,255,255,.9);
}

.tBody{ display:grid; gap:8px; padding: 2px 0 0; }
.tRow{
  padding: 10px 10px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.03);
}
.tRow:nth-child(odd){ background: rgba(12,12,15,.30); }
.tRow:nth-child(even){ background: rgba(25,25,32,.26); }

.th--id, .td--id{ text-align: left; padding-left: 6px; }
.th--name, .td--name{ text-align: center; }
.th--orders, .td--orders{ text-align: center; }
.th--date, .td--date{ text-align: right; padding-right: 6px; }

.tEmpty{
  padding: 14px 10px 2px;
  color: rgba(255,255,255,.6);
  font-size: 13px;
}

/* foot */
.tFoot{
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 10px;
}
.tTotal{ font-size: 12px; line-height: 100%; color: rgba(255,255,255,.55); }

.showAll{
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: none;
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.55);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  line-height: 100%;
  user-select: none;
}
.showAll:hover{ background: rgba(255,255,255,.085); color: rgba(255,255,255,.7); }
.showAll__arrow{
  width: 8px; height: 8px; display: block; opacity: .9;
  transition: transform .18s ease;
}
.showAll__arrow.is-up{ transform: rotate(180deg); }

/* responsive */
@media (max-width: 1120px) {
  .ref__grid { grid-template-columns: 1fr; }
  .statsRow { grid-template-columns: 1fr; }
}

/* мобила: чутка типографика, чтобы “всё влезало”, но НИЧЕГО не скрываем */
@media (max-width: 560px){
  .tHead{ font-size: 11px; }
  .td{ font-size: 12px; }
  .tRow{ padding: 9px 10px; }
  .tFoot{ flex-direction: column; align-items: flex-start; }
}

/* ============================
   ✅ MOBILE OVERFLOW FIX PACK
   ============================ */

/* 1) секция никогда не расширяет страницу */
.ref{
  max-width: 100%;
  overflow-x: hidden; /* или clip, если хочешь */
}

/* 2) гриды/колонки должны уметь сжиматься */
.ref__grid,
.left,
.right{
  min-width: 0;
  max-width: 100%;
}

/* 3) карточки не могут быть шире контейнера */
.promoCard,
.chartCard,
.infoCard,
.statCard,
.tableCard,
.tableBox{
  max-width: 100%;
  min-width: 0;
}

/* 4) общий “анти-вылезатор” для любых детей */
.ref :deep(*) {
  min-width: 0;
}

/* 5) медиа/инпуты по умолчанию не вылезают */
.ref :deep(img),
.ref :deep(video),
.ref :deep(svg),
.ref :deep(input),
.ref :deep(button){
  max-width: 100%;
}

/* 6) именно таблица: скролл только внутри, наружу не раздувает */
.tableBox{
  overflow: hidden; /* у тебя уже было — оставляем */
}

.tScroll{
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

/* 7) если где-то есть длинные строки — переносим */
.th, .td{
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* 8) на мобиле дополнительно прибиваем любые “случайные” 1px/2px вылезания */
@media (max-width: 560px){
  .ref__grid{ width: 100%; }
}

</style>
