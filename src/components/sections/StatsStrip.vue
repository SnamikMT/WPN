<template>
  <section class="stats">
    <div class="container">
      <div class="stats__row">
        <button
          v-for="(item, idx) in stats"
          :key="idx"
          class="card"
          :class="{ 'card--mobile-active': idx === 1 }"
          type="button"
        >
          <div class="card__top">
            <img
              v-if="item.icon"
              class="card__icon"
              :src="item.icon"
              alt=""
              aria-hidden="true"
            />
            <div class="card__value">{{ item.value }}</div>
          </div>

          <div class="card__label">{{ item.label }}</div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { stats } from "../../data/mock";
</script>

<style scoped>
.stats {
  background: #0b0d12;
}

.stats__row {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 18px;
}

/* CARD */
.card {
  min-height: 110px;
  border-radius: 24px;
  background: #0c0c0f;
  border: 1px solid #191920;

  padding: 22px 18px 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  cursor: pointer;

  transition: background .18s ease, transform .18s ease, box-shadow .18s ease;
}

/* TOP ROW */
.card__top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.card__icon {
  width: 24px;
  height: 24px;
  display: block;
  opacity: .95;
}

.card__value {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 32px;
  line-height: 100%;
  color: #ffffff;
  transition: color .18s ease;
}

.card__label {
  margin-top: 12px;
  margin-bottom: 18px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;

  color: #ffffff99;
}

/* DESKTOP HOVER */
.card:hover,
.card:focus-visible {
  outline: none;
  background: #191920;
  transform: translateY(-1px);
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.42);
}

.card:hover .card__value,
.card:focus-visible .card__value {
  color: #57c35e;
}

/* ========================= */
/* MOBILE LOGIC */
/* ========================= */

@media (max-width: 980px) {
  .stats__row {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  /* отключаем hover на тачах */
  .card:hover {
    background: #0c0c0f;
    transform: none;
    box-shadow: none;
  }

  .card:hover .card__value {
    color: #ffffff;
  }

  /* ВТОРАЯ карточка всегда “активная” */
  .card--mobile-active {
    background: #191920;
    transform: translateY(-1px);
    box-shadow: 0 18px 46px rgba(0, 0, 0, 0.42);
  }

  .card--mobile-active .card__value {
    color: #57c35e;
  }
}

@media (max-width: 520px) {
  .stats__row {
    grid-template-columns: 1fr;
  }
}
</style>