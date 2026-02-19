<template>
  <section class="pricing" id="tariffs">
    <div class="container">
      <div class="grid">
        <article
          v-for="(plan, idx) in pricing"
          :key="idx"
          class="card"
          :class="{ 'card--featured': plan.featured }"
        >
          <div class="card__top">
            <div class="tag">{{ plan.tag }}</div>

            <a class="pick" href="#" @click.prevent>
              <span>{{ plan.action }}</span>
              <span class="pick__icon" aria-hidden="true">↗</span>
            </a>
          </div>

          <div class="card__title">{{ plan.title }}</div>
          <div class="card__sub">{{ plan.sub }}</div>

          <ul class="list">
            <li v-for="(b, bi) in plan.bullets" :key="bi" class="list__item">
              <span class="check" aria-hidden="true">✓</span>
              <span class="list__text">{{ b }}</span>
            </li>
          </ul>

          <div class="card__price">{{ plan.price }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pricing } from "../../data/mock";
</script>

<style scoped>
.pricing {
  background: #0b0d12;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

.card {
  border-radius: 24px;
  background: #0c0c0f;
  border: 1px solid #191920;

  padding: 18px 18px 16px;

  display: flex;
  flex-direction: column;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.05),
    0 18px 46px rgba(0,0,0,.30);
}

.card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag {
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: rgba(255,255,255,.9);
}

.pick {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;

  color: rgba(255,255,255,.6);
  opacity: .95;
  transition: color .2s ease, opacity .2s ease;
}

.pick:hover { color: rgba(255,255,255,.85); }

.pick__icon {
  font-size: 14px;
  opacity: .9;
}

.card__title {
  margin-top: 18px;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 24px;
  line-height: 110%;
  color: #fff;
}

.card__sub {
  margin-top: 6px;
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #ffffff99;
}

.list {
  list-style: none;
  padding: 0;
  margin: 18px 0 0;
  display: grid;
  gap: 12px;
}

.list__item {
  display: grid;
  grid-template-columns: 18px 1fr;
  align-items: start;
  column-gap: 10px;
}

.check {
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  font-size: 14px;
  line-height: 1;
  color: rgba(255,255,255,.8);
  opacity: .9;
}

.list__text {
  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: rgba(255,255,255,.85);
}

.card__price {
  margin-top: auto;
  padding-top: 18px;
  text-align: center;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: rgba(255,255,255,.55);
}

/* Выделенный тариф */
.card--featured {
  background: #6a4b2a;              /* подгонишь под точный коричнево-золотой */
  border-color: rgba(255,255,255,.06);
  box-shadow: 0 26px 70px rgba(106, 75, 42, .25);
}

.card--featured .tag {
  color: rgba(255,255,255,.85);
}

.card--featured .pick,
.card--featured .card__sub,
.card--featured .card__price {
  color: rgba(255,255,255,.75);
}

.card--featured .list__text {
  color: rgba(255,255,255,.92);
}

/* Адаптив */
@media (max-width: 1100px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
