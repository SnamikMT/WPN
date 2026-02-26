<template>
  <section class="sec">
    <!-- HEAD -->
    <header class="sec__head">
      <h2 class="sec__title">Настройки и безопасность</h2>
      <p class="sec__desc">Управляйте аккаунтом и средствами безопасности</p>
    </header>

    <div class="sec__grid">
      <!-- LEFT COL -->
      <div class="col">
        <!-- Change password -->
        <article class="card">
          <div class="card__top">
            <div class="card__cap">
              <img class="capIco" :src="icoDots" alt="" aria-hidden="true" />
              <span>Смена пароля</span>
            </div>
          </div>

          <div class="fields">
            <div class="inpShell">
              <input
                class="inp inp--inShell"
                :type="showOld ? 'text' : 'password'"
                placeholder="Старый пароль"
                v-model="oldPass"
              />
              <button class="iconBtn" type="button" @click="showOld = !showOld" aria-label="Показать пароль">
                <img class="iconImg" :src="eyeIcon" alt="" />
              </button>
            </div>

            <div class="row">
              <div class="inpShell inpShell--grow">
                <input
                  class="inp inp--inShell"
                  :type="showNew ? 'text' : 'password'"
                  placeholder="Новый пароль"
                  v-model="newPass"
                />
                <button class="iconBtn" type="button" @click="showNew = !showNew" aria-label="Показать пароль">
                  <img class="iconImg" :src="eyeIcon" alt="" />
                </button>
              </div>

              <button class="sideBtn" type="button" aria-label="Подтвердить">
                <img class="sideBtn__img" :src="arrowIcon" alt="" />
              </button>
            </div>

            <div v-if="newPass && newPass.length < 20" class="warn">
              <img class="warn__ico" :src="icoWarn" alt="" aria-hidden="true" />
              <span>Пароль должен быть не менее 20 символов</span>
            </div>
          </div>
        </article>

        <!-- Change email -->
        <article class="card">
          <div class="card__top">
            <div class="card__cap">
              <img class="capIco" :src="icoDots" alt="" aria-hidden="true" />
              <span>Смена почты</span>
            </div>
          </div>

          <div class="fields">
            <div class="row">
              <input class="inp inp--grow inp--locked"placeholder="АктуальнаяПочта@майл.ру" v-model="oldEmail" readonly aria-readonly="true"/>
              <button class="sideBtn" type="button" aria-label="Отправить код">
                <img class="sideBtn__img" :src="arrowIcon" alt="" />
              </button>
            </div>

            <input class="inp" placeholder="Код со старой почты" v-model="oldEmailCode" />
            <input class="inp" placeholder="Новая почта" v-model="newEmail" />

            <div class="ctaRow">
              <button class="bigBtn" type="button">
                <span>Сменить почту</span>
                <img class="bigBtn__arrow" :src="arrowIcon" alt="" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- MIDDLE COL -->
      <div class="col">
        <!-- Google Auth -->
        <article class="card">
          <div class="card__top">
            <div class="card__cap">
              <img class="capIco" :src="icoGrid" alt="" aria-hidden="true" />
              <span>Google Authenticator</span>
            </div>
          </div>

          <div class="ga">
            <div class="qr">
              <!-- если будет реальный QR - просто поменяешь src -->
              <img class="qr__img" :src="qrMock" alt="QR code" />
            </div>

            <div class="row">
              <input class="inp inp--grow" placeholder="Код из Google Auth" v-model="gaCode" />
              <button class="sideBtn" type="button" aria-label="Подтвердить код">
                <img class="sideBtn__img" :src="arrowIcon" alt="" />
              </button>
            </div>
          </div>
        </article>

        <!-- Telegram connect -->
        <article class="card card--small">
          <div class="card__top">
            <div class="card__cap">
              <img class="capIco" :src="icoGrid" alt="" aria-hidden="true" />
              <span>Telegram connect</span>
            </div>
          </div>

          <div class="ctaRow ctaRow--left">
            <button class="bigBtn bigBtn--compact" type="button">
              <span>Привязать аккаунт</span>
              <img class="bigBtn__arrow" :src="arrowIcon" alt="" aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>

      <!-- RIGHT COL -->
      <div class="col">
        <!-- Delete account -->
        <article class="card">
          <div class="card__top">
            <div class="card__cap">
              <img class="capIco" :src="icoDots" alt="" aria-hidden="true" />
              <span>Удалить аккаунт</span>
            </div>
          </div>

          <div class="fields">
            <div class="dangerLine">
              <img class="dangerLine__ico" :src="icoWarn" alt="" aria-hidden="true" />
              <span>Удаление будет безвозвратным!</span>
            </div>

            <div class="row">
              <input class="inp inp--grow inp--locked" placeholder="АктуальнаяПочта@майл.ру" v-model="delEmail"  readonly aria-readonly="true"/>
              <button class="sideBtn" type="button" aria-label="Отправить код">
                <img class="sideBtn__img" :src="arrowIcon" alt="" />
              </button>
            </div>

            <input class="inp" placeholder="Введите код с почты для удаления" v-model="delCode" />

            <div class="ctaRow">
              <button class="bigBtn bigBtn--danger" type="button" @click="openConfirmDelete">
                <span>Удалить аккаунт</span>
                <img class="bigBtn__arrow" :src="arrowIcon" alt="" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
  <ConfirmDeleteModal
  v-model="isConfirmDeleteOpen"
  @confirm="confirmDelete"
/>
</template>

<script setup lang="ts">
import { ref } from "vue";

/* icons (под твои ассеты) */
import arrowIcon from "../../assets/img/arrow-right.png";
import eyeIcon from "../../assets/img/eye.png";

/* эти две иконки — подставь свои, если названия другие */
import icoDots from "../../assets/img/ico-dots.png"; // "..." как на макете
import icoGrid from "../../assets/img/ico-grid.png"; // квадратики как на макете
import icoWarn from "../../assets/img/ico-warn.png"; // треугольник

import qrMock from "../../assets/img/qr-mock.png";

import ConfirmDeleteModal from "../ui/ConfirmDeleteModal.vue";

const isConfirmDeleteOpen = ref(false);

function openConfirmDelete() {
  // можно добавить валидацию, если хочешь:
  // if (!delEmail.value || !delCode.value) return;
  isConfirmDeleteOpen.value = true;
}

function confirmDelete() {
  // тут позже подключишь API удаления
  console.log("[DELETE ACCOUNT CONFIRMED]", {
    email: delEmail.value,
    code: delCode.value,
  });
}

/* state */
const showOld = ref(false);
const showNew = ref(false);

const oldPass = ref("");
const newPass = ref("");

const oldEmail = ref("АктуальнаяПочта@майл.ру");
const oldEmailCode = ref("");
const newEmail = ref("");

const gaCode = ref("");

const delEmail = ref("АктуальнаяПочта@майл.ру");
const delCode = ref("");
</script>

<style scoped>
.sec {
  font-family: var(--font-sf);
  color: rgba(255,255,255,.95);
}

.sec__head {
  margin-bottom: 18px;
}

.sec__title {
  margin: 0;
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
}

.sec__desc {
  margin: 12px 0 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #ffffff99;
}

/* ===== GRID ===== */
.sec__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.9fr 1fr;
  gap: 18px;
  align-items: start;
}

.col {
  display: grid;
  gap: 18px;
  min-width: 0;
}

/* ===== CARD ===== */
.card {
  border-radius: 24px;
  background: rgba(25, 25, 32, 0.18);
  backdrop-filter: blur(24px);
  box-shadow: 0 18px 60px rgba(0,0,0,.35);
  padding: 18px;
}

.card--small {
  padding: 18px;
}

/* card top caption */
.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__cap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255,255,255,.92);
}

.capIco {
  width: 18px;
  height: 18px;
  display: block;
  opacity: .9;
}

/* ===== FIELDS ===== */
.fields {
  margin-top: 14px;
  display: grid;
  gap: 12px;
}

.row {
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
}

.inpShell {
  position: relative;
  min-width: 0;
}

.inpShell--grow { flex: 1; }

.inp {
  width: 100%;
  height: 44px;
  border-radius: 16px;
  border: none;
  outline: none;
  background: #19192066;
  color: rgba(255,255,255,.95);
  padding: 0 14px;
  font-size: 14px;
}

.inp::placeholder { color: #ffffff99; }

.inp--grow { flex: 1; min-width: 0; }

.inp--inShell { padding-right: 48px; }

/* eye */
.iconBtn {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.iconImg { width: 20px; height: 20px; display: block; opacity: .9; }

/* side button (small square with arrow) */
.sideBtn {
  width: 34px;
  height: 44px;
  border-radius: 14px;
  border: none;
  background: rgba(255,255,255,.92);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 0 0 auto;
  transition: transform .18s ease, opacity .18s ease;
}

.sideBtn:hover { transform: translateY(-1px); opacity: .96; }

.sideBtn__img { width: 16px; height: 16px; display: block; }

/* warning line */
.warn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(235,165,95,.12);
  color: rgba(235,165,95,.95);
  font-size: 12px;
}

.warn__ico { width: 14px; height: 14px; display: block; }

/* danger line */
.dangerLine {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(235,165,95,.10);
  color: rgba(235,165,95,.95);
  font-size: 12px;
}

.dangerLine__ico { width: 14px; height: 14px; display: block; }

/* ===== CTA big button (white) ===== */
.ctaRow {
  margin-top: 6px;
  display: flex;
  justify-content: center;
}

.ctaRow--left { justify-content: flex-start; }

.bigBtn {
  height: 44px;
  width: 100%;
  max-width: 320px;
  padding: 0 14px;
  border-radius: 14px;
  border: none;
  cursor: pointer;

  background: rgba(255,255,255,.92);
  color: #0b0d12;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 14px;
  transition: transform .18s ease, opacity .18s ease;
}

.bigBtn:hover { transform: translateY(-1px); opacity: .96; }

.bigBtn__arrow { width: 14px; height: 14px; display: block; }

.bigBtn--compact { max-width: 240px; }

.bigBtn--danger {
  background: rgba(255,255,255,.92); /* по макету она белая */
}

/* ===== Google Auth block ===== */
.ga {
  margin-top: 14px;
  display: grid;
  gap: 12px;
}

.qr {
  width: 100%;
  border-radius: 18px;
  background: rgba(255,255,255,.04);
  display: grid;
  place-items: center;
}

.qr__img {
  width: 220px;
  max-width: 100%;
  height: auto;
  border-radius: 14px;
  display: block;
}

/* ===== responsive ===== */
@media (max-width: 1200px) {
  .sec__grid { grid-template-columns: 1fr; }
  .bigBtn { max-width: 100%; }
}

/* readonly inputs — выглядят чуть “заблокировано”, но копируются */
.inp[readonly],
.inp--locked{
  opacity: .85;
  cursor: default;
}

/* чтобы не было ощущения “можно печатать” */
.inp[readonly]{
  user-select: text;
}

</style>
