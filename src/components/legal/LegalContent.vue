<template>
  <div class="wrap">
    <header class="head">
      <h1 class="title">Информация и законные материалы</h1>
      <p class="sub">На основании которых мы функционируем</p>
    </header>

    <nav class="tabs" aria-label="Юридические разделы">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="tab"
        :class="{ 'is-active': t.key === active }"
        type="button"
        @click="setTab(t.key)"
      >
        {{ t.label }}
      </button>
    </nav>

    <article class="card">
      <h2 class="cardTitle">{{ currentTitle }}</h2>

      <p class="preview">
        Заходя на этот веб-сайт, вы соглашаетесь с условиями использования и применимыми законами.
      </p>

      <div class="body">
        <p v-for="(p, i) in currentText" :key="i">{{ p }}</p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

type TabKey = "cookies" | "policy" | "billing" | "terms";

const tabs: { key: TabKey; label: string }[] = [
  { key: "cookies", label: "Правила обработки Cookie" },
  { key: "policy", label: "Политика соглашения" },
  { key: "billing", label: "Реализация подписок" },
  { key: "terms", label: "Термины и условия" },
];

const router = useRouter();
const route = useRoute();

const active = computed<TabKey>(() => {
  const q = String(route.query.tab ?? "policy");
  if (q === "cookies" || q === "policy" || q === "billing" || q === "terms") return q;
  return "policy";
});

function setTab(key: TabKey) {
  router.replace({ path: "/legal", query: { ...route.query, tab: key } });
}

const content = {
  cookies: {
    title: "Правила обработки Cookie",
    text: [
      "Мы используем cookie и схожие технологии для корректной работы сервиса, аналитики и улучшения пользовательского опыта.",
      "Вы можете ограничить или отключить cookie в настройках браузера — часть функций может работать некорректно.",
      "Подробности о целях, сроках хранения и типах cookie описываются в данной политике.",
    ],
  },
  policy: {
    title: "Условия использования",
    text: [
      "Разрешается временный просмотр материалов с личной некоммерческой целью.",
      "Запрещается модифицировать, копировать, публиковать, декомпилировать и распространять материалы без разрешения.",
      "Запрещается попытка обхода блокировок и вмешательство в работу инфраструктуры сервиса.",
      "Администрация может приостановить доступ при нарушении условий.",
    ],
  },
  billing: {
    title: "Реализация подписок",
    text: [
      "Подписка активируется после успешной оплаты и действует в течение выбранного периода.",
      "Возвраты и отмены регламентируются условиями конкретного тарифа и применимым законодательством.",
      "При проблемах с оплатой обратитесь в поддержку — поможем восстановить доступ.",
    ],
  },
  terms: {
    title: "Термины и условия",
    text: [
      "В данном разделе определяются ключевые термины: пользователь, аккаунт, подписка, сервис, контент.",
      "Ответственность сторон и порядок разрешения споров описаны в условиях.",
      "Используя сервис, вы подтверждаете принятие данных условий.",
    ],
  },
} as const;

const currentTitle = computed(() => content[active.value].title);
const currentText = computed(() => content[active.value].text);
</script>

<style scoped>
.wrap { padding-top: 6px; }

.head { text-align: center; }

.title{
  margin: 0;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  color: rgba(255,255,255,.92);
}

/* отступ снизу 16 */
.sub{
  margin: 16px 0 0;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  color: #ffffff99;
}

/* контейнер вкладок */
.tabs{
  margin: 18px auto 0;
  width: min(760px, 100%);
  padding: 4px;
  border-radius: 20px;

  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;

  background: #0c0c0f;
  border: 1px solid #191920;
}

.tab{
  height: 40px; /* как ты сказал */
  padding: 0 14px;
  border-radius: 16px;
  border: none;
  background: transparent;
  cursor: pointer;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #ffffff99;

  transition: transform .18s ease, opacity .18s ease;
}

.tab:hover{ transform: translateY(-1px); opacity: .92; }

.tab.is-active{
  background: #5d5dd0;
  color: rgba(255,255,255,.95);
}

.card{
  margin: 18px auto 0;
  width: min(900px, 100%);
  padding: 22px;
  border-radius: 24px;

  background: rgba(25,25,32,.18);
  backdrop-filter: blur(24px);
  box-shadow: 0 18px 60px rgba(0,0,0,.35);
}

/* текст внутри контейнера */
.cardTitle{
  margin: 0;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  text-align: center;
  color: rgba(255,255,255,.92);
}

/* превью с отступом 22 сверху */
.preview{
  margin: 22px 0 0;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  color: #ffffff99;
}

/* основной текст с отступом 22 */
.body{
  margin-top: 22px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;  /* чтобы justify смотрелся нормально */
  text-align: justify;
  color: #ffffff99;
}

.body p{ margin: 0; }
.body p + p{ margin-top: 12px; }

/* адаптив вкладок */
@media (max-width: 720px) {
  .tabs{ flex-wrap: wrap; justify-content: flex-start; }
}
</style>
