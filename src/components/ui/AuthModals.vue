<template>
  <BaseModal v-model="open">
    <div class="wrap">
      <!-- логотип -->
      <img class="brandLogo" :src="logo" alt="WPN" />

      <!-- LOGIN -->
      <div v-if="mode === 'login'">
        <div class="title">Авторизация</div>

        <div class="fields">
          <input
            class="inp"
            v-model="loginValue"
            placeholder="Никнейм пользователя"
            @keydown.enter="onLogin"
          />

          <!-- пароль + глазик -->
          <div class="inpShell">
            <input
              class="inp inp--inShell"
              v-model="passwordValue"
              :type="showPass ? 'text' : 'password'"
              placeholder="Пароль"
              @keydown.enter="onLogin"
            />
            <button
              class="iconBtn"
              type="button"
              @click="showPass = !showPass"
              aria-label="Показать пароль"
            >
              <img class="iconImg" :src="eyeIcon" alt="" />
            </button>
          </div>

          <!-- remember -->
          <div class="inpShell">
            <div class="inp inp--inShell inp--fake">
              Запомнить пароль
            </div>

            <button
              class="toggleBtn"
              type="button"
              @click="remember = !remember"
              aria-label="Запомнить пароль"
            >
              <span class="toggle" :class="{ 'is-on': remember }"></span>
            </button>
          </div>


          <!-- ошибка -->
          <div v-if="errorText" class="errorText">{{ errorText }}</div>
        </div>

        <div class="bottomRow">
          <button class="textLink" type="button" @click="switchMode('register')">
            Нет аккаунта? Создать
          </button>
          <button class="textLink" type="button" @click="switchMode('restore')">
            Забыл пароль?
          </button>
        </div>

        <div class="ctaRow">
          <BaseButton arrow type="button" @click="onLogin">Войти в аккаунт</BaseButton>
        </div>
      </div>

      <!-- REGISTER -->
      <div v-else-if="mode === 'register'">
        <div class="title">Создание аккаунта</div>

        <div class="fields">
          <input class="inp" placeholder="Никнейм пользователя" />
          <input class="inp" placeholder="Username123@mail.ru" />

          <div class="inpShell">
            <input
              class="inp inp--inShell"
              :type="showPass ? 'text' : 'password'"
              placeholder="Пароль"
            />
            <button class="iconBtn" type="button" @click="showPass = !showPass">
              <img class="iconImg" :src="eyeIcon" alt="" />
            </button>
          </div>

          <div class="inpShell">
            <input
              class="inp inp--inShell"
              :type="showPass2 ? 'text' : 'password'"
              placeholder="Повторите пароль"
            />
            <button class="iconBtn" type="button" @click="showPass2 = !showPass2">
              <img class="iconImg" :src="eyeIcon" alt="" />
            </button>
          </div>

          <div class="hint">
            Пока мок-режим: регистрацию подключим позже 🙂
          </div>
        </div>

        <div class="singleRow">
          <button class="textLink" type="button" @click="switchMode('login')">
            Есть аккаунт? Войти
          </button>
        </div>

        <div class="ctaRow">
          <BaseButton arrow type="button" @click="fakeRegister">
            Создать аккаунт
          </BaseButton>
        </div>
      </div>

      <!-- RESTORE -->
      <div v-else>
        <div class="title">Восстановление пароля</div>

        <div class="fields">
          <div class="row">
            <input class="inp inp--grow" placeholder="Username123@mail.ru" />
            <button class="sideBtn" type="button">
              <img class="sideBtn__img" :src="arrowIcon" alt="" />
            </button>
          </div>

          <input class="inp" placeholder="Код с почты" />

          <div class="hint">
            Пока мок-режим: восстановление подключим позже 🙂
          </div>
        </div>

        <div class="ctaRow">
          <BaseButton arrow type="button" @click="fakeRestore">
            Отправить пароль
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

import BaseModal from "./BaseModal.vue";
import BaseButton from "./BaseButton.vue";

import logo from "../../assets/img/zerologo.png";
import eyeIcon from "../../assets/img/eye.png";
import arrowIcon from "../../assets/img/arrow-right.png";

const router = useRouter();
const auth = useAuthStore();

const props = defineProps<{
  modelValue: boolean;
  initialMode?: "login" | "register" | "restore";
}>();

const emit = defineEmits<{ (e: "update:modelValue", v: boolean): void }>();

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const mode = ref<"login" | "register" | "restore">(props.initialMode ?? "login");

watch(
  () => props.initialMode,
  (v) => {
    if (v) mode.value = v;
  }
);

/* поля логина */
const loginValue = ref("");
const passwordValue = ref("");
const errorText = ref("");

const showPass = ref(false);
const showPass2 = ref(false);
const remember = ref(auth.rememberMe ?? true);

/* remember → store */
watch(
  remember,
  (v) => {
    auth.setRememberMe(v);
  },
  { immediate: true }
);

watch(mode, () => {
  // при переключении режимов сбрасываем ошибку
  errorText.value = "";
});

/* helpers */
function switchMode(next: "login" | "register" | "restore") {
  mode.value = next;
  errorText.value = "";
}

/* ===== LOGIN ===== */
async function onLogin() {
  errorText.value = "";

  const identifier = loginValue.value.trim();
  const pass = passwordValue.value;

  if (!identifier) {
    errorText.value = "Введите никнейм или почту";
    return;
  }
  if (!pass) {
    errorText.value = "Введите пароль";
    return;
  }

  const res = auth.login(identifier, pass);

  if (res.ok) {
    open.value = false;
    passwordValue.value = "";
    await router.push("/panel");
    return;
  }

  if (res.code === "BLOCKED") {
    open.value = false;
    passwordValue.value = "";
    await router.push("/blocked");
    return;
  }

  // NOT_FOUND / WRONG_PASSWORD
  errorText.value =
    res.code === "NOT_FOUND"
      ? "Пользователь не найден. Примеры: Username123 / trial@mail.ru / nosub@mail.ru / banned@mail.ru"
      : "Неверный пароль. Для моков: 123456";
}

/* ===== MOCK actions for later ===== */
function fakeRegister() {
  errorText.value = "";
  // можно показать подсказку или позже привязать к реальному API
}

function fakeRestore() {
  errorText.value = "";
}
</script>

<style scoped>
.wrap { display: block; }

/* логотип */
.brandLogo {
  height: 28px;
  margin-bottom: 10px;
}

/* заголовок */
.title {
  margin-top: 6px;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 20px;
  color: #fff;
}

/* поля */
.fields {
  margin-top: 18px;
  display: grid;
  gap: 12px;
}

/* инпут */
.inp {
  width: 100%;
  height: 52px;
  border-radius: 14px;
  border: none;
  background: #19192066;
  color: rgba(255,255,255,.95);
  padding: 18px 14px;
  font-family: var(--font-sf);
  font-size: 16px;
  outline: none;
}

.inp::placeholder { color: #ffffff99; }

.inpShell { position: relative; }
.inp--inShell { padding-right: 56px; }

/* глазик */
.iconBtn {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.iconImg { width: 20px; height: 20px; }

/* toggle */
/* toggle — такой же стиль, но больше */
.toggleBtn {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);

  /* ✅ увеличили hit-area */
  width: 52px;
  height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  display: grid;
  place-items: center;
}

.toggle {
  /* ✅ сам тумблер больше */
  width: 52px;
  height: 28px;
  border-radius: 999px;

  background: #191920; /* как было */
  display: block;
  position: relative;
  font-size: 0;
  line-height: 0;

  /* чуть контраста, чтобы не терялся */
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
}

.toggle::after {
  content: "";
  position: absolute;

  /* ✅ кружок больше */
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 999px;

  background: #ffffff99;
  display: block;
  transition: transform 0.2s ease, background 0.2s ease;
}

/* ✅ движение через transform — стабильнее, чем left */
.toggle.is-on::after {
  transform: translateX(24px);
  background: #57c35e;
}


/* ошибка */
.errorText {
  margin-top: 2px;
  font-family: var(--font-sf);
  font-size: 12px;
  line-height: 120%;
  color: rgba(255, 120, 120, 0.9);
}

/* подсказка */
.hint {
  margin-top: 2px;
  font-family: var(--font-sf);
  font-size: 12px;
  line-height: 120%;
  color: rgba(255,255,255,.45);
}

/* нижние тексты */
.bottomRow {
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
}

.singleRow { margin-top: 32px; }

.textLink {
  background: transparent;
  border: none;
  font-family: var(--font-sf);
  font-size: 16px;
  color: #ffffff99;
  cursor: pointer;
}
.textLink:hover { color: rgba(255,255,255,.85); }

/* CTA */
.ctaRow {
  margin-top: 18px;
  display: flex;
  justify-content: center;
}

/* restore */
.row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.inp--grow { flex: 1; }

.sideBtn {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  border: none;
  background: rgba(255,255,255,.92);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.sideBtn__img {
  width: 16px;
  height: 16px;
  display: block;
}

.inp--fake{
  display: flex;
  align-items: center;
  cursor: default;   /* обычная стрелка */
  user-select: none; /* чтобы текст не выделялся */
}

</style>
