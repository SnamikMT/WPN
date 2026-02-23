<template>
  <UiCard>
    <template #head>
      <div class="head">
        <div class="ttl">
          <img class="ico" :src="icoHelp" alt="" aria-hidden="true" />
          Посмотрите видео перед установкой
        </div>

        <a
          class="linkBtn"
          :href="youtubeUrl"
          target="_blank"
          rel="noopener"
        >
          Открыть YouTube
          <img class="arr" :src="arrowRight" alt="" aria-hidden="true" />
        </a>
      </div>
    </template>

    <!-- кастомный "плеер" -->
    <div class="player" :class="{ 'is-playing': isPlaying }">
      <button
        v-if="!isPlaying"
        class="player__cover"
        type="button"
        @click="play"
        :aria-label="`Воспроизвести видео: ${title}`"
      >
        <img class="player__thumb" :src="thumbSrc" :alt="title" />
        <span class="player__shade" aria-hidden="true"></span>

        <span class="player__btn" aria-hidden="true">
          <span class="player__triangle"></span>
        </span>

        <span class="player__hint">Нажмите, чтобы воспроизвести</span>
      </button>

      <iframe
        class="player__iframe"
        :src="`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`"
        title="Видео-инструкция"
        frameborder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import UiCard from "./UiCard.vue";

import arrowRight from "../../../../assets/img/arrow-right2.png";
import icoHelp from "../../../../assets/img/ico-help.png";

const props = defineProps<{
  videoId: string;      // например: "dQw4w9WgXcQ"
  title?: string;       // заголовок для a11y
  thumb?: string;       // если хочешь свою превью (например, из assets/public)
  start?: number;       // старт с секунды
}>();

const title = computed(() => props.title ?? "Видео-инструкция");
const start = computed(() => props.start ?? 0);

const isPlaying = ref(false);

const youtubeUrl = computed(() => {
  const t = start.value > 0 ? `&t=${start.value}s` : "";
  return `https://www.youtube.com/watch?v=${props.videoId}${t}`;
});

// дефолтная превьюха YouTube (быстро и без API-ключей)
const thumbSrc = computed(() => {
  return props.thumb ?? `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`;
});

function play() {
  isPlaying.value = true;
}
</script>

<style scoped>
.head{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.ttl{ display:inline-flex; align-items:center; gap:10px; font-family:var(--font-sf); font-weight:500; font-size:14px; color:rgba(255,255,255,.95);}
.ico{ width:18px; height:18px; display:block; opacity:.9; }

.linkBtn{
  background:transparent; border:none; cursor:pointer;
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--font-sf); font-size:12px; color:#FFFFFF99;
  text-decoration: none;
}
.linkBtn:hover{ color: rgba(255,255,255,.85); }
.arr{ width:14px; height:14px; display:block; opacity:.9; }


.player__cover{
  width:100%;
  height:100%;
  padding:0;
  border:0;
  cursor:pointer;
  background: transparent;
  position: relative;
  display:block;
}

.player__thumb{
  width:100%;
  height:100%;
  object-fit: cover;
  display:block;
  transform: scale(1.02);
}

.player__shade{
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.55));
}

.player__btn{
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
.player__triangle{
  width:0; height:0;
  border-left: 18px solid rgba(255,255,255,.92);
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  margin-left: 4px;
}

.player__cover:hover .player__btn{
  transform: translate(-50%,-50%) scale(1.05);
  background: rgba(255,255,255,.18);
}

.player__hint{
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

.player{
  height:240px;
  border-radius:18px;
  overflow:hidden;
  background: rgba(255,255,255,.06);
}
.player__iframe{ width:100%; height:100%; display:block; }
</style>