<template>
  <div class="dash">
    <DashboardSidebar
      :active="active"
      :user="{ username: auth.currentUser?.username ?? 'Username', role: auth.roleLabel }"
      @select="active = $event"
    />

    <main class="dash__main">
      <!-- Подписка на сервис -->
      <template v-if="active === 'subscription'">
        <SubscriptionSection />
      </template>

      <!-- Управление подпиской -->
      <template v-else-if="active === 'manage'">
        <ManageSubscriptionSection />
      </template>

      <template v-else-if="active === 'ref'">
        <ReferralSection />
      </template>

      <template v-else-if="active === 'security'">
        <SecuritySection />
      </template>

      <!-- Остальные -->
      <template v-else>
        <div class="cardsStub">Раздел "{{ active }}" — следующий шаг</div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth"; // ⚠️ путь проверь: откуда лежит DashboardLayout.vue

import DashboardSidebar from "./DashboardSidebar.vue";
import SubscriptionSection from "./SubscriptionSection.vue";
import ManageSubscriptionSection from "../dashboard/views/ManageSubscriptionView.vue";
import ReferralSection from "./ReferralSection.vue";
import SecuritySection from "./SecuritySection.vue";

type TabKey = "subscription" | "manage" | "ref" | "security" | "help";

const auth = useAuthStore(); // ✅ вот этого не хватало

const active = ref<TabKey>("subscription");
</script>

<style scoped>
.dash {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 22px;
  align-items: start;
}

.dash__main {
  min-width: 0;
}

.cardsStub {
  margin-top: 18px;
  padding: 22px;
  border-radius: 24px;
  border: 1px dashed rgba(255,255,255,.12);
  color: rgba(255,255,255,.45);
  font-family: var(--font-sf);
}

@media (max-width: 980px) {
  .dash { grid-template-columns: 1fr; }
}
</style>
