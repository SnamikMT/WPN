<template>
  <section class="legal">
    <AppHeader />

    <!-- Чёрный блок близко к шапке -->
    <div class="legal__shell">
      <div class="container">
        <LegalContent />
      </div>
    </div>

    <AppFooter />
  </section>
</template>

<script setup lang="ts">
import AppHeader from "../components/layout/AppHeader.vue";
import AppFooter from "../components/layout/AppFooter.vue";
import LegalContent from "../components/legal/LegalContent.vue";
</script>

<style scoped>
.legal{
  min-height: 100vh;
  overflow: hidden;

  /* место под fixed header */
  padding-top: 110px;
}

/* чёрный блок подползает близко */
.legal__shell{
  margin-top: 12px;          /* было 120 — поэтому “провал” */
  padding: 18px 0 80px;

  border-top-left-radius: 48px;
  border-top-right-radius: 48px;

  background: #0b0d12;
}
</style>
