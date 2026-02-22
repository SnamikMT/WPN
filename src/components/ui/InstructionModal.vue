<!-- src/components/ui/InstructionModal.vue -->
<template>
  <BaseModal v-model="open" :showClose="false" :panelless="true">
    <div class="im">
      <!-- TOP BAR -->
      <div class="imTop">
        <div class="imTop__left">
          <div class="imTop__title">Инструкция</div>

          <!-- иконка “увеличить” возле заголовка -->
          <button
            class="imTop__iconBtn"
            type="button"
            @click="isViewerOpen = true"
            aria-label="Открыть в полный экран"
          >
            <img class="imTop__ico" :src="icoOpen" alt="" aria-hidden="true" />
          </button>

          <!-- видео -->
          <a
            class="imTop__video"
            :href="videoUrl"
            target="_blank"
            rel="noopener"
            aria-label="Видео-гайд по установке"
          >
            <span class="imTop__videoTxt">Видео-гайд по установке</span>
            <img class="imTop__videoIco" :src="icoExt" alt="" aria-hidden="true" />
          </a>
        </div>

        <!-- крестик основной модалки -->
        <button class="imTop__x" type="button" @click="open = false" aria-label="Закрыть">
          <img class="imTop__xIco" :src="icoClose" alt="" aria-hidden="true" />
        </button>
      </div>

      <!-- IMAGE PREVIEW -->
      <div class="imShotWrap">
        <img class="imShot" :src="step.imagePreview" alt="Скриншот инструкции" />
      </div>

      <!-- BOTTOM STEP PANEL -->
      <div class="imStepPanel">
        <div class="imStepTop">
          <div class="imStepTop__left">
            <span class="imStepTop__num">{{ step.number }}</span>
            <span class="imStepTop__ttl">{{ step.title }}</span>
          </div>

          <div class="imStepTop__pills" aria-label="Платформы">
            <button
              v-for="p in platforms"
              :key="p"
              class="imPill"
              type="button"
              :class="{ 'is-active': p === activePlatform }"
              @click="activePlatform = p"
            >
              {{ p }}
            </button>
          </div>
        </div>

        <div class="imStepText">
          {{ step.text }}
        </div>
      </div>

      <!-- CTA -->
      <button class="imCta" type="button" @click="nextStep">
        <span>{{ isLastStep ? "Готово" : "Я выполнил этот шаг, дальше" }}</span>
      </button>

      <!-- FULLSCREEN VIEWER -->
      <Teleport to="body">
        <div
          v-if="isViewerOpen"
          class="viewer"
          role="dialog"
          aria-modal="true"
          @click.self="isViewerOpen = false"
        >
          <div class="viewer__body">
            <div class="viewer__stage">
              <img class="viewer__img" :src="step.imageFull" alt="Изображение в большом размере" />

              <!-- ЛЕВАЯ: свернуть -->
              <button
                class="viewerEdge viewerEdge--left"
                type="button"
                @click="isViewerOpen = false"
                aria-label="Свернуть"
              >
                <img class="viewerEdge__ico" :src="icoMinimize" alt="" aria-hidden="true" />
              </button>

              <!-- ПРАВАЯ: открыть в новом окне -->
              <a
                class="viewerEdge viewerEdge--right"
                :href="step.imageFull"
                target="_blank"
                rel="noopener"
                aria-label="Открыть в новом окне"
              >
                <img class="viewerEdge__ico" :src="icoOpen" alt="" aria-hidden="true" />
              </a>

              <!-- КРЕСТИК: закрыть -->
              <button
                class="viewerEdge viewerEdge--close"
                type="button"
                @click="isViewerOpen = false"
                aria-label="Закрыть"
              >
                <img class="viewerEdge__ico" :src="icoClose" alt="" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import BaseModal from "./BaseModal.vue";

type Step = {
  number: number;
  title: string;
  text: string;
  imagePreview: string;
  imageFull: string;
};

const props = withDefaults(
  defineProps<{
    modelValue: boolean;

    videoUrl: string;

    // step 1
    imagePreview: string;
    imageFull: string;

    // step 2
    image2Preview?: string;
    image2Full?: string;

    // icons
    icoOpen: string;
    icoExt: string;
    icoClose: string;
    icoMinimize: string;
  }>(),
  {
    image2Preview: "",
    image2Full: "",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "step", n: number): void;
  (e: "finish"): void;
}>();

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

/* platforms pills */
const platforms = ["Windows", "macOS (Apple Silicon)", "macOS (Intel)", "Linux"] as const;
const activePlatform = ref<(typeof platforms)[number]>(platforms[0]);

/* steps */
const steps = computed<Step[]>(() => {
  const s1: Step = {
    number: 1,
    title: "Скачайте Clash verge",
    text: "Скачайте нужную версию для вашего устройства, после чего подтвердите действие кнопкой ниже",
    imagePreview: props.imagePreview,
    imageFull: props.imageFull,
  };

  const s2: Step = {
    number: 2,
    title: "Импортируйте подписку",
    text: "Тестовый шаг: пока показываем ту же информацию. Дальше сюда воткнем реальные действия (import_sub и т.п.)",
    imagePreview: props.image2Preview || props.imagePreview,
    imageFull: props.image2Full || props.imageFull,
  };

  return [s1, s2];
});

const stepIndex = ref(0);

/* clamp */
const safeIndex = computed(() => {
  const max = Math.max(0, steps.value.length - 1);
  const v = stepIndex.value;
  if (v < 0) return 0;
  if (v > max) return max;
  return v;
});

/* ✅ fallback, чтобы TS никогда не видел undefined */
const FALLBACK_STEP: Step = {
  number: 1,
  title: "",
  text: "",
  imagePreview: props.imagePreview,
  imageFull: props.imageFull,
};

/* ✅ step ВСЕГДА Step */
const step = computed<Step>(() => steps.value[safeIndex.value] ?? steps.value[0] ?? FALLBACK_STEP);

const isLastStep = computed(() => safeIndex.value >= steps.value.length - 1);

/* fullscreen viewer */
const isViewerOpen = ref(false);

function nextStep() {
  if (isLastStep.value) {
    emit("finish");
    open.value = false;
    return;
  }

  stepIndex.value = safeIndex.value + 1;
  emit("step", step.value.number);
}
</script>

<style scoped>
.im {
  width: min(820px, 92vw);
  background: #0c0c0f;
  border: 1px solid #191920;
  border-radius: 26px;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
}
.im * { box-sizing: border-box; }

/* ===== TOP ===== */
.imTop {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.imTop__left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.imTop__title {
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.95);
  white-space: nowrap;
}

.imTop__iconBtn {
  width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: grid;
  place-items: center;
  opacity: 0.9;
}
.imTop__ico { width: 18px; height: 18px; display: block; }

.imTop__video {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  min-width: 0;
}
.imTop__videoTxt {
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #ffffff99;
  white-space: nowrap;
}
.imTop__videoIco { width: 16px; height: 16px; display: block; opacity: 0.9; }

.imTop__x {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}
.imTop__xIco { width: 16px; height: 16px; display: block; opacity: 0.85; }
.imTop__x:hover .imTop__xIco { opacity: 1; }

/* ===== IMAGE ===== */
.imShotWrap { padding: 12px; }
.imShot {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
}

/* ===== STEP PANEL ===== */
.imStepPanel {
  margin: 0 12px;
  padding: 16px;
  border-radius: 20px;
  background: rgba(25, 25, 32, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.imStepTop {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.imStepTop__left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.imStepTop__num {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  display: grid;
  place-items: center;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  flex: 0 0 auto;
}

.imStepTop__ttl {
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
}

.imStepTop__pills {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.imPill {
  height: 20px;
  padding: 0 10px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 1);
  cursor: pointer;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #0b0d12;
  white-space: nowrap;
  opacity: 0.92;
}
.imPill:hover { opacity: 1; }
.imPill.is-active { opacity: 1; }

.imStepText {
  margin-top: 16px;
  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: rgba(255, 255, 255, 1);
}

/* ===== CTA ===== */
.imCta {
  width: calc(100% - 24px);
  margin: 12px;
  height: 52px;
  border-radius: 18px;
  border: none;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.92);
  color: #0b0d12;

  font-family: SF Pro Display, var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}
.imCta:hover { opacity: 0.96; }

/* ===== FULLSCREEN VIEWER ===== */
.viewer {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  z-index: 2000;
  display: flex;
}

.viewer__body {
  flex: 1 1 auto;
  padding: 12px;
  display: grid;
  place-items: center;
  overflow: auto;
}

.viewer__stage {
  position: relative;
  display: inline-block;
  max-width: 100%;
  max-height: calc(100vh - 24px);
}

.viewer__img {
  display: block;
  max-width: 100%;
  max-height: calc(100vh - 24px);
  border-radius: 12px;
}

.viewerEdge {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: #000000b2;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 0;
  text-decoration: none;
  z-index: 5;
}
.viewerEdge:hover { background: rgba(0, 0, 0, 0.78); }

.viewerEdge__ico {
  width: 20px;
  height: 20px;
  display: block;
  opacity: 0.95;
}

.viewerEdge--left { left: 12px; top: 12px; }
.viewerEdge--right { left: 64px; top: 12px; }
.viewerEdge--close { right: 12px; top: 12px; }

@media (max-width: 560px) {
  .im { width: min(520px, 92vw); }
  .imTop__videoTxt { display: none; }
}
</style>