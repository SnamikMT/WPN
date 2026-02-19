import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import "./styles/main.scss";
import "./styles/typography.css";

import App from "./App.vue";

export const pinia = createPinia(); // ✅ один инстанс на всё приложение

createApp(App).use(pinia).use(router).mount("#app");
