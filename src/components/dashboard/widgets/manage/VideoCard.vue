<template>
  <UiCard>
    <template #head>
      <div class="head">
        <div class="ttl">
          <img class="ico" :src="icoHelp" alt="" aria-hidden="true" />
          Посмотрите видео перед установкой
        </div>
      </div>
    </template>

    <!-- ✅ fullscreen делаем на контейнер, чтобы оверлеи тоже были в fullscreen -->
    <div
      ref="fsEl"
      class="player"
      :class="{ 'is-started': started, 'is-pseudoFs': pseudoFs }"
    >
      <!-- VIDEO -->
      <video
        ref="vid"
        class="video"
        :src="src"
        :poster="poster"
        playsinline
        preload="metadata"
        disablepictureinpicture
        disableremoteplayback
        controlslist="nodownload noplaybackrate noremoteplayback"
        @timeupdate="onTime"
        @loadedmetadata="onMeta"
        @ended="onEnded"
        @click="togglePlay"
      />

      <!-- COVER -->
      <button
        v-if="!started"
        class="cover"
        type="button"
        @click="start"
        :aria-label="`Воспроизвести: ${title}`"
      >
        <span class="shade" aria-hidden="true"></span>
        <span class="bigBtn" aria-hidden="true">
          <img class="bigIcon" :src="icoPlay" alt="" aria-hidden="true" />
        </span>
        <span class="hint">Нажмите, чтобы воспроизвести</span>
      </button>

      <!-- CONTROLS -->
      <div class="controls" :class="{ 'is-visible': started || forceControls || isFs || pseudoFs }">
        <!-- play/pause/replay -->
        <button
          class="ctlBtn"
          type="button"
          @click.stop="togglePlay"
          :aria-label="ended ? 'Повторить' : isPlaying ? 'Пауза' : 'Плей'"
        >
          <img
            class="ctlIcon"
            :src="ended ? icoReplay : isPlaying ? icoPause : icoPlay"
            alt=""
            aria-hidden="true"
          />
        </button>

        <!-- time -->
        <div class="time">{{ fmt(current) }} / {{ fmt(duration) }}</div>

        <!-- progress -->
        <div class="bar" @pointerdown="seekPointer" aria-label="Перемотка">
          <div class="bar__bg"></div>
          <div class="bar__fill" :style="{ width: progress + '%' }"></div>
          <div class="bar__dot" :style="{ left: progress + '%' }"></div>
        </div>

        <!-- mute -->
        <button
          class="ctlBtn"
          type="button"
          @click.stop="toggleMute"
          :aria-label="muted ? 'Включить звук' : 'Выключить звук'"
        >
          <img class="ctlIcon" :src="muted ? icoMute : icoVolume" alt="" aria-hidden="true" />
        </button>

        <!-- fullscreen toggle -->
        <button
          class="ctlBtn"
          type="button"
          @click.stop="toggleFs"
          :aria-label="isFs || pseudoFs ? 'Закрыть полноэкранный режим' : 'На весь экран'"
        >
          <span v-if="isFs || pseudoFs" class="x" aria-hidden="true">×</span>
          <img v-else class="ctlIcon" :src="icoFullscreen" alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import UiCard from "./UiCard.vue";

import icoHelp from "../../../../assets/img/ico-help.png";

/* ✅ твои иконки */
import icoPlay from "../../../../assets/img/play.svg";
import icoPause from "../../../../assets/img/pause.svg";
import icoReplay from "../../../../assets/img/replay.svg";
import icoVolume from "../../../../assets/img/volume.svg";
import icoMute from "../../../../assets/img/mute.svg";
import icoFullscreen from "../../../../assets/img/fullscreen.svg";

const props = defineProps<{
  src: string;          // URL (через import из assets или /public)
  poster?: string;      // URL постера
  title?: string;
}>();

const title = computed(() => props.title ?? "Видео-инструкция");

const vid = ref<HTMLVideoElement | null>(null);
const fsEl = ref<HTMLElement | null>(null);

const started = ref(false);
const isPlaying = ref(false);
const muted = ref(false);
const ended = ref(false);

const duration = ref(0);
const current = ref(0);

// на мобиле лучше держать контролы видимыми после старта
const forceControls = ref(false);

// fullscreen state
const isFs = ref(false);
// fallback fullscreen (фиксируем контейнер на весь экран)
const pseudoFs = ref(false);

const progress = computed(() => {
  if (!duration.value) return 0;
  return Math.min(100, Math.max(0, (current.value / duration.value) * 100));
});

function start() {
  started.value = true;
  ended.value = false;

  nextFrame(() => {
    const p = vid.value?.play();
    if (p && typeof (p as any).then === "function") {
      (p as Promise<void>)
        .then(() => (isPlaying.value = true))
        .catch(() => (isPlaying.value = false));
    } else {
      isPlaying.value = true;
    }
  });
}

function togglePlay() {
  if (!vid.value) return;

  if (!started.value) {
    start();
    return;
  }

  // реплей
  if (ended.value) {
    vid.value.currentTime = 0;
    ended.value = false;
  }

  if (vid.value.paused) {
    const p = vid.value.play();
    if (p && typeof (p as any).then === "function") {
      (p as Promise<void>)
        .then(() => (isPlaying.value = true))
        .catch(() => (isPlaying.value = false));
    } else {
      isPlaying.value = true;
    }
  } else {
    vid.value.pause();
    isPlaying.value = false;
  }
}

function toggleMute() {
  if (!vid.value) return;
  muted.value = !muted.value;
  vid.value.muted = muted.value;
}

function onMeta() {
  duration.value = vid.value?.duration || 0;
}

function onTime() {
  current.value = vid.value?.currentTime || 0;
  isPlaying.value = !!vid.value && !vid.value.paused && !vid.value.ended;
}

function onEnded() {
  isPlaying.value = false;
  ended.value = true;
}

/* ===== seek ===== */
function seekPointer(e: PointerEvent) {
  if (!vid.value || !duration.value) return;

  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();

  const setByClientX = (clientX: number) => {
    const x = Math.min(rect.right, Math.max(rect.left, clientX));
    const p = (x - rect.left) / rect.width;
    vid.value!.currentTime = p * duration.value;
  };

  setByClientX(e.clientX);
  el.setPointerCapture(e.pointerId);

  const move = (ev: PointerEvent) => setByClientX(ev.clientX);
  const up = () => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", up);
  };

  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);
}

/* ===== fullscreen (container) + fallback ===== */
async function toggleFs() {
  const el = fsEl.value;
  if (!el) return;

  // close pseudoFS
  if (pseudoFs.value) {
    pseudoFs.value = false;
    unlockBody();
    return;
  }

  // close native FS
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch {
      // if exit fails, fallback
      pseudoFs.value = false;
      unlockBody();
    }
    return;
  }

  // open: try native FS first
  try {
    if ((document as any).fullscreenEnabled && el.requestFullscreen) {
      await el.requestFullscreen();
      // fullscreenchange выставит isFs
    } else {
      // no API — pseudo
      pseudoFs.value = true;
      lockBody();
    }
  } catch {
    // if native FS fails (iOS/Safari sometimes), pseudo
    pseudoFs.value = true;
    lockBody();
  }
}

function onFsChange() {
  isFs.value = !!document.fullscreenElement;
  // если вышли из fullscreen — не держим locked body
  if (!isFs.value) unlockBody();
}

function lockBody() {
  document.body.classList.add("is-locked");
}

function unlockBody() {
  document.body.classList.remove("is-locked");
}

/* ===== helpers ===== */
function fmt(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function nextFrame(fn: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(fn));
}

function onFirstTouch() {
  forceControls.value = true;
}

onMounted(() => {
  window.addEventListener("touchstart", onFirstTouch, { passive: true, once: true });
  document.addEventListener("fullscreenchange", onFsChange);
});

onBeforeUnmount(() => {
  window.removeEventListener("touchstart", onFirstTouch);
  document.removeEventListener("fullscreenchange", onFsChange);
  unlockBody();
});
</script>

<style scoped>
/* header */
.head{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.ttl{ display:inline-flex; align-items:center; gap:10px; font-family:var(--font-sf); font-weight:500; font-size:14px; color:rgba(255,255,255,.95);}
.ico{ width:18px; height:18px; display:block; opacity:.9; }

/* player box */
.player{
  height:240px;
  border-radius:18px;
  overflow:hidden;
  position:relative;
  background: rgba(255,255,255,.06);
}

/* video */
.video{
  width:100%;
  height:100%;
  object-fit: cover;
  display:block;
  background: #000;
}

/* hard-disable native controls (webkit) */
.video::-webkit-media-controls{ display:none !important; }
.video::-webkit-media-controls-enclosure{ display:none !important; }
.video::-webkit-media-controls-panel{ display:none !important; }

/* cover */
.cover{
  position:absolute;
  inset:0;
  border:0;
  padding:0;
  background: transparent;
  cursor:pointer;
}
.shade{
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.60));
}
.bigBtn{
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  width:72px;
  height:72px;
  border-radius: 999px;
  background: rgba(255,255,255,.14);
  backdrop-filter: blur(8px);
  display:grid;
  place-items:center;
  box-shadow: 0 12px 30px rgba(0,0,0,.35);
  transition: transform .2s ease, background .2s ease;
}
.cover:hover .bigBtn{
  transform: translate(-50%,-50%) scale(1.05);
  background: rgba(255,255,255,.18);
}
.bigIcon{
  width:22px;
  height:22px;
  display:block;
  opacity:.95;
}
.hint{
  position:absolute;
  left:16px;
  bottom:12px;
  font-family:var(--font-sf);
  font-size:12px;
  color: rgba(255,255,255,.80);
  background: rgba(0,0,0,.35);
  padding:8px 10px;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

/* controls layout */
.controls{
  position:absolute;
  left:12px;
  right:12px;
  bottom:10px;

  display:grid;
  grid-template-columns: 34px max-content 1fr 34px 34px;
  gap:10px;
  align-items:center;

  padding:10px;
  border-radius: 14px;
  background: rgba(0,0,0,.35);
  backdrop-filter: blur(10px);

  opacity: 0;
  transform: translateY(6px);
  transition: .18s ease;
  pointer-events: none;
}

.player:hover .controls,
.player:focus-within .controls{
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.controls.is-visible{
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.ctlBtn{
  width:34px;
  height:34px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  cursor: pointer;
  display:grid;
  place-items:center;
  padding:0;
}

.ctlIcon{
  width:16px;
  height:16px;
  display:block;
  object-fit: contain;
  opacity: .92;
}
.ctlBtn:hover .ctlIcon{ opacity: 1; }

.time{
  font-family: var(--font-sf);
  font-size: 12px;
  color: rgba(255,255,255,.85);
  white-space: nowrap;
}

.bar{
  position: relative;
  height: 8px;
  cursor: pointer;
  border-radius: 999px;
  min-width: 80px;
}
.bar__bg{
  position:absolute; inset:0;
  background: rgba(255,255,255,.14);
  border-radius: 999px;
}
.bar__fill{
  position:absolute; left:0; top:0; bottom:0;
  background: rgba(255,255,255,.70);
  border-radius: 999px;
}
.bar__dot{
  position:absolute;
  top:50%;
  transform: translate(-50%,-50%);
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: rgba(255,255,255,.95);
}

/* close icon */
.x{
  font-size: 22px;
  line-height: 1;
  color: rgba(255,255,255,.92);
  transform: translateY(-1px);
}

/* responsive: узко — прячем время */
@media (max-width: 420px){
  .controls{
    grid-template-columns: 34px 1fr 34px 34px; /* play | bar | vol | fs/close */
  }
  .time{ display:none; }
}

/* ===== native fullscreen styling ===== */
.player:fullscreen{
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  background: #000;
}
.player:fullscreen .video{
  width:100%;
  height:100%;
  object-fit: contain;
}
.player:fullscreen .controls{
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* ===== pseudo fullscreen fallback ===== */
.player.is-pseudoFs{
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  background: #000;
  z-index: 9999;
}
.player.is-pseudoFs .video{
  width:100%;
  height:100%;
  object-fit: contain;
}
.player.is-pseudoFs .controls{
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* mobile: controls always after start */
@media (pointer: coarse){
  .player.is-started .controls{
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}
</style>
