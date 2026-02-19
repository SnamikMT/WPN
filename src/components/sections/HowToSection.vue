<template>
  <section class="howto" id="howto">
    <div class="container">
      <div class="howto__head">
        <div>
          <h2 class="howto__title">Как подключиться?</h2>
          <p class="howto__subtitle">Простая настройка в 4 шага</p>
        </div>

        <a class="howto__cta" href="#tariffs">
          Попробовать <span aria-hidden="true">↗</span>
        </a>
      </div>

      <!-- Общий контейнер -->
      <div class="stepsBox">
        <div class="steps">
          <article
            v-for="(s, i) in steps"
            :key="i"
            class="step"
            :class="{
              'step--first': i === 0,
              'step--mid': i === 1 || i === 2,
              'step--last': i === 3
            }"
          >
            <div class="step__top" aria-hidden="true">
              <div class="step__line"></div>
              <div class="step__num">{{ s.step }}</div>
            </div>

            <h3 class="step__title">{{ s.title }}</h3>

            <p class="step__text">
              <template v-for="(chunk, ci) in s.text" :key="ci">
                <a
                  v-if="chunk.type === 'link'"
                  class="step__link"
                  :href="chunk.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ chunk.value }}
                </a>
                <span v-else>{{ chunk.value }}</span>
              </template>
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type TextChunk =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string };

type Step = {
  step: string;
  title: string;
  text: TextChunk[];
};

const steps: Step[] = [
  {
    step: "1",
    title: "Создайте аккаунт",
    text: [
      { type: "text", value: "Перейдите на " },
      { type: "link", value: "страницу регистрации", href: "#" },
      { type: "text", value: " и создайте свой аккаунт на нашей платформе, после определитесь с тарифом." },
    ],
  },
  {
    step: "2",
    title: "Оплата тарифа",
    text: [
      { type: "text", value: "Оплатите тариф который вам необходим, любым доступным методом, если среди них нет нужного вам, " },
      { type: "link", value: "обратитесь в поддержку.", href: "#" },
    ],
  },
  {
    step: "3",
    title: "Скачайте приложение",
    text: [
      { type: "text", value: "Перейдите в " },
      { type: "link", value: "личный кабинет", href: "#" },
      { type: "text", value: ", после чего откройте окно приложения, в нем будет указана полная инструкция." },
    ],
  },
  {
    step: "4",
    title: "🎉 Выберите сервер",
    text: [
      { type: "text", value: "Подключитесь к необходимому серверу выбрав нужный вам метод подключения, в два клика ваш трафик будет замаскирован!" },
    ],
  },
];
</script>

<style scoped>
.howto {
  background: #0b0d12;
}

/* Head */
.howto__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.howto__title {
  margin: 0;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 34px;
  line-height: 100%;
  color: #fff;
}

.howto__subtitle {
  margin: 10px 0 0;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #ffffff99;
}

.howto__cta {
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: #fff;
  color: #0b0d12;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 13px;
  line-height: 100%;
  text-decoration: none;
  flex: 0 0 auto;
}

/* Общий контейнер шагов */
.stepsBox {
  margin-top: 22px;
  border: 1px solid #191920;
  border-radius: 24px;
  background: #0c0c0f;
  padding: 22px;
}

/* 4 колонки */
.steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

/* Карточка шага */
.step {
  min-height: 160px;
}

/* Верхняя часть (цифра + линия) */
.step__top {
  position: relative;
  height: 24px; /* под цифру 24px */
}

/* Линия */
.step__line {
  position: absolute;
  top: 50%;
  height: 1px;
  background: #191920;
  transform: translateY(-50%);
  left: 0;
  right: 0;
}

/* Цифра поверх линии */
.step__num {
  position: absolute;
  top: 0;

  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0;
  vertical-align: middle;

  color: #ffffff99;

  /* “скрывает” линию под собой */
  background: #0c0c0f;
  padding: 0 10px;
  border-radius: 999px;
}

/* ====== ЛОГИКА ВЫРАВНИВАНИЯ ====== */

/* STEP 1: всё слева, линия только справа */
.step--first .step__num {
  left: 0;
}
.step--first .step__line {
  left: 56px;
  right: 0;
}
.step--first .step__title,
.step--first .step__text {
  text-align: left;
}

/* STEP 2-3: всё по центру, цифра по центру перекрывает линию */
.step--mid .step__num {
  left: 50%;
  transform: translateX(-50%);
}
.step--mid .step__line {
  left: 0;
  right: 0;
}
.step--mid .step__title,
.step--mid .step__text {
  text-align: center;
}

/* STEP 4: всё справа, линия только слева */
.step--last .step__num {
  right: 0;
}
.step--last .step__line {
  left: 0;
  right: 56px;
}
.step--last .step__title,
.step--last .step__text {
  text-align: right;
}

/* ====== Типографика текста ====== */
.step__title {
  margin: 18px 0 0;

  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0;
  vertical-align: middle;

  color: #fff;
}

.step__text {
  margin: 14px 0 0;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%; /* строго по твоим данным */
  letter-spacing: 0;

  color: #ffffff99;
}

.step__link {
  color: #4c67ff;
  text-decoration: none;
}
.step__link:hover {
  text-decoration: underline;
}

/* Адаптив */
@media (max-width: 980px) {
  .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  /* на 2 колонки логика “лево/центр/центр/право” может выглядеть странно,
     поэтому на планшете делаем все по левому для читабельности */
  .step .step__title,
  .step .step__text { text-align: left; }

  .step__line { left: 56px; right: 0; }
  .step__num { left: 0; right: auto; transform: none; }
}

@media (max-width: 520px) {
  .howto__head { flex-direction: column; align-items: flex-start; }
  .steps { grid-template-columns: 1fr; }
}
</style>
