<template>
  <section class="card" :class="variant">
    <header v-if="$slots.head" class="card__head">
      <slot name="head" />
    </header>
    <div class="card__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: "default" | "accent" }>(), {
  variant: "default",
});
</script>

<style scoped>
.card{
  background: rgba(25,25,32,.35);
  border: 1px solid #191920;
  border-radius: 24px;
  backdrop-filter: blur(24px);
  overflow: hidden;
}
.card__head{ padding: 18px 18px 0; }
.card__body{ padding: 18px; }

.card.accent{
  background: linear-gradient(100.59deg, rgba(93,93,208,.95) 12.17%, rgba(159,159,233,.95) 49.27%, rgba(93,93,208,.95) 87.83%);
  border-color: rgba(255,255,255,.12);
}
</style>
