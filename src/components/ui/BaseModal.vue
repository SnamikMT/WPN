<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="close" role="dialog" aria-modal="true">
      <div class="modal">
        <button class="x" type="button" @click="close" aria-label="Закрыть">×</button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", v: boolean): void }>();

function close() {
  emit("update:modelValue", false);
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && props.modelValue) close();
}

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.55);
  display: grid;
  place-items: center;
  z-index: 999;
}


.modal {
  width: min(420px, calc(100% - 32px));
  border-radius: 14px;
  background: #0c0c0fe5;
  backdrop-filter: blur(12px);
  padding: 20px;
  position: relative;
    border: 1px solid rgba(25,25,32,.9);
  box-shadow: 0 30px 90px rgba(0,0,0,.55);
}

.x {
  position: absolute;
  top: 14px;
  right: 14px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,.55);
  font-size: 18px;
  cursor: pointer;
}
.x:hover { color: rgba(255,255,255,.85); }

</style>
