import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PanelView from "../views/PanelView.vue";
import LegalView from "../views/LegalView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import BlockedView from "../views/BlockedView.vue";

import { useAuthStore } from "../stores/auth";
import { pinia } from "../main";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/panel", name: "panel", component: PanelView },
    { path: "/legal", name: "legal", component: LegalView },
    { path: "/blocked", name: "blocked", component: BlockedView },
    { path: "/:pathMatch(.*)*", name: "notfound", component: NotFoundView },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

/**
 * ✅ Логика:
 * - Если пользователь залогинен и blocked → можно ТОЛЬКО /blocked
 * - Если не залогинен → нельзя /panel (редирект на /)
 * - Если залогинен и НЕ blocked → нельзя /blocked (редирект на /panel)
 */
router.beforeEach((to) => {
  const auth = useAuthStore(pinia);

  // blocked user: закрываем всё, кроме /blocked
  if (auth.isAuthed && auth.isBlocked && to.name !== "blocked") {
    return { name: "blocked" };
  }

  // guest: закрываем панель
  if (!auth.isAuthed && to.name === "panel") {
    return { name: "home" };
  }

  // обычный пользователь: /blocked ему не нужен
  if (auth.isAuthed && !auth.isBlocked && to.name === "blocked") {
    return { name: "panel" };
  }

  return true;
});
