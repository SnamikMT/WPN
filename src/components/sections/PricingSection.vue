<template>
  <section class="pricing" id="tariffs">
    <div class="container">
      <div class="grid">
        <article
          v-for="(plan, idx) in pricing"
          :key="idx"
          class="card"
          :class="[
            `card--${idx + 1}`,
            plan.featured ? 'card--featured' : ''
          ]"
        >
          <!-- TOP ROW -->
          <div class="card__top">
            <div class="tag">{{ plan.tag }}</div>

          <RouterLink
            class="pick"
            :to="{ path: '/panel', query: { tab: 'subscription' } }"
          >
            <span>{{ plan.action }}</span>
            <span class="pick__icon" aria-hidden="true">↗</span>
          </RouterLink>
          </div>

          <!-- TITLE -->
          <div class="card__title">{{ plan.title }}</div>

          <!-- SUBTITLE -->
          <div class="card__sub">{{ plan.sub }}</div>

          <!-- LIST -->
          <ul class="list">
            <li v-for="(b, bi) in plan.bullets" :key="bi" class="list__item">
              <span class="check" aria-hidden="true">✓</span>
              <span class="list__text">{{ b }}</span>
            </li>
          </ul>

          <!-- PRICE -->
          <div class="card__price">{{ plan.price }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pricing } from "../../data/mock";
import { RouterLink } from "vue-router";
</script>

<style scoped>
.pricing { background: #0b0d12; }

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

/* ===== CARD BASE ===== */
.card {
  border-radius: 24px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  min-height: 330px;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.04),
    0 18px 46px rgba(0,0,0,.30);
}

/* backgrounds exactly like your requirements + looks like screenshot */
.card--1 {
  background: #191920;
  border: 1px solid #191920;
}
.card--2 {
  background: #694A2A;
  border: 1px solid #694A2A;
}
.card--3 {
  background: transparent;
  border: 1px solid #191920;
}
.card--4 {
  background: #191920;
  border: 1px solid #191920;
}

/* ===== TOP ROW ===== */
.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.tag {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: rgba(255,255,255,.95);
}

.pick {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;

  color: rgba(255,255,255,.55);
  text-decoration: none;

  transition: color .18s ease, opacity .18s ease;
}
.pick:hover { color: rgba(255,255,255,.8); }

.pick__icon { opacity: .9; }

/* ===== TITLE ===== */
.card__title {
  margin-top: 26px;

  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 20px;   
  line-height: 100%;
  color: #fff;
}

/* ===== SUBTITLE ===== */
.card__sub {
  margin-top: 12px; 
  margin-bottom: 12px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;   
  line-height: 100%;
  color: rgba(255,255,255,.6);
}

.card__sub::after {
  content: "";
}

.card__subNote {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px; 
  line-height: 100%;
  color: rgba(255,255,255,.6);
}

/* ===== LIST ===== */
.list {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;  
  display: grid;
  gap: 18px;  
}

.list__item {
  display: grid;
  grid-template-columns: 18px 1fr;
  column-gap: 10px;
  align-items: start;
}

.check {
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  font-size: 14px;
  line-height: 1;
  color: rgba(255,255,255,.6);
}

.list__text {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;   
  line-height: 120%;
  color: rgba(255,255,255,.95);
}

/* ===== PRICE ===== */
.card__price {
  margin-top: 36px;    
  padding-bottom: 36px;    
  text-align: center;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: rgba(255,255,255,.6);
}

/* Только tag в оранжевой карточке */
.card--featured .tag {
  color: #EBA55F;
}

/* адаптив */
@media (max-width: 1100px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; }
}
</style>