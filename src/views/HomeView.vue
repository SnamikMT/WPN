<template>
  <AppHeader
    :authOpen="authOpen"
    :authMode="authMode"
    @update:authOpen="authOpen = $event"
  />

  <main>
    <HeroSection @enterPanel="onEnterPanel" />
    <HeroBottomBar href="#next" />
    <StatsStrip />
    <FeaturesGrid />
    <PricingSection />
    <TelegramBanner href="https://t.me/your_channel" />
    <HowToSection />
    <AppFooter />
    <section id="next"></section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

import AppHeader from "../components/layout/AppHeader.vue";
import HeroSection from "../components/sections/HeroSection.vue";
import HeroBottomBar from "../components/sections/HeroBottomBar.vue";
import StatsStrip from "../components/sections/StatsStrip.vue";
import FeaturesGrid from "../components/sections/FeaturesGrid.vue";
import PricingSection from "../components/sections/PricingSection.vue";
import TelegramBanner from "../components/sections/TelegramBanner.vue";
import HowToSection from "../components/sections/HowToSection.vue";
import AppFooter from "../components/layout/AppFooter.vue";

const router = useRouter();
const auth = useAuthStore();

const authOpen = ref(false);
const authMode = ref<"login" | "register" | "restore">("login");

async function onEnterPanel() {
  if (auth.isAuthed) {
    await router.push("/panel");
    return;
  }
  authMode.value = "login";
  authOpen.value = true;
}
</script>
