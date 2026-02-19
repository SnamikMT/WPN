<template>
  <section class="panel">
    <div class="panel__bg" aria-hidden="true"></div>

    <AppHeader />

    <div class="panel__shell">
      <div class="container">
        <DashboardLayout />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppHeader from "../components/layout/AppHeader.vue";
import DashboardLayout from "../components/dashboard/DashboardLayout.vue";
</script>

<style scoped>
/* чтобы ширина страницы не прыгала от появления/исчезновения скролла */
:global(html) {
  scrollbar-gutter: stable;
}

.panel {
  position: relative;
  min-height: 100vh;
  overflow-x: clip;

  /* 👇 базовый фон страницы */
  background: #0b0d12;

  padding-top: 110px;
}

.panel__bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  background:
    linear-gradient(90deg, rgba(120,110,255,.72), rgba(120,110,255,.62)),
    url("/src/assets/img/hero.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
}

/* чёрная “шторка” */
.panel__shell {
  position: relative;
  z-index: 1;

  margin-top: 0;
  padding: 36px 0 80px;

  border-top-left-radius: 48px;
  border-top-right-radius: 48px;

  background: #0b0d12;

  /* 👇 гарантируем, что шторка дотянется до низа экрана */
  min-height: calc(100vh - 110px);
}


</style>
