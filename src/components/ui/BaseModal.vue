<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="close" role="dialog" aria-modal="true">
      <div
        v-if="!panelless"
        class="modal"
        :class="{ 'is-plain': plain }"
        ref="panel"
        tabindex="-1"
      >
        <button v-if="showClose" class="x" type="button" @click="close" aria-label="Закрыть">
          ×
        </button>

        <div class="modal__scroll">
          <slot />
        </div>
      </div>

      <!-- panelless: без карточки, только overlay + слот -->
      <div v-else class="paneless" ref="panel" tabindex="-1">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    showClose?: boolean;

    /** plain: отключает фон/бордер/блюр у карточки (но оставляет размеры/паддинги) */
    plain?: boolean;

    /** panelless: полностью убирает карточку .modal (контент рисует себя сам) */
    panelless?: boolean;
  }>(),
  { showClose: true, plain: false, panelless: false }
);

const emit = defineEmits<{ (e: "update:modelValue", v: boolean): void }>();
const panel = ref<HTMLElement | null>(null);

function close() {
  emit("update:modelValue", false);
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && props.modelValue) close();
}

function lockScroll(v: boolean) {
  document.documentElement.style.overflow = v ? "hidden" : "";
}

watch(
  () => props.modelValue,
  async (v) => {
    lockScroll(v);
    if (v) {
      await nextTick();
      panel.value?.focus();
    }
  },
  { immediate: true }
);

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  lockScroll(false);
});
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  z-index: 999;
  padding: 18px;
}

/* стандартная карточка (для остальных модалок) */
.modal {
  width: min(520px, calc(100% - 24px));
  border-radius: 26px;
  padding: 18px;

  background: rgba(12, 12, 15, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.55);

  position: relative;
  outline: none;

  max-height: calc(100vh - 36px);
  overflow: hidden;
  box-sizing: border-box;
}

/* plain: отключаем “второй фон”, оставляя поведение/размеры */
.modal.is-plain {
  background: transparent;
  border: none;
  backdrop-filter: none;
  box-shadow: none;
  padding: 0; /* важно: чтобы не было лишнего поля вокруг */
}

/* скролл внутренностей */
.modal__scroll {
  max-height: calc(100vh - 36px - 36px);
  overflow: auto;
  padding-right: 2px;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* крестик стандартный */
.x {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 12px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;

  color: rgba(255, 255, 255, 0.75);
  font-size: 18px;
  line-height: 0;
}
.x:hover {
  color: rgba(255, 255, 255, 0.92);
  background: rgba(255, 255, 255, 0.06);
}

/* panelless контейнер: просто фокус + позиция */
.paneless{
  outline: none;
}
</style>