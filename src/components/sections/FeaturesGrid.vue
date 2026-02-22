<template>
  <section class="feat" id="features">
    <div class="container">
      <h2 class="feat__title">Мы заботимся о вас</h2>
      <p class="feat__subtitle">
        Наши разработчики сделают всё, чтобы сделать ваш доступ к интернету был более приятным!
      </p>

      <div class="feat__grid">
        <article
          v-for="(card, idx) in cards"
          :key="idx"
          class="card"
          :class="[
            idx < 3 ? 'card--w2' : 'card--w3',
            card.featured ? 'card--featured' : ''
          ]"
        >
          <img class="card__icon" :src="card.icon" alt="" aria-hidden="true" />
          <h3 class="card__title">{{ card.title }}</h3>
          <p class="card__text">{{ card.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// ВАЖНО: так Vite гарантированно соберёт картинки (а не “битые иконки”)
import iconZero from "../../assets/img/feat-zero.png";
import iconLocations from "../../assets/img/feat-locations.png";
import iconPay from "../../assets/img/feat-pay.png";
import iconVless from "../../assets/img/feat-vless.png";
import iconPing from "../../assets/img/feat-ping.png";

type Card = {
  title: string;
  text: string;
  icon: string;
  featured?: boolean;
};

const cards: Card[] = [
  {
    title: "Zero logs policy",
    text: "Никаких логов активности, ip-адресов или истории подключений. Мы физически не можем видеть то, чего не существует.",
    icon: iconZero,
  },
  {
    title: "42 Лучших локаций",
    text: "Множество серверов в Европе: нидерланды, финляндия, швеция, германия. Низкий пинг из россии.",
    icon: iconLocations,
    featured: true,
  },
  {
    title: "Быстрая оплата",
    text: "Прямая оплата картами рф и СБП — оплата за минуту, моментальное подключение после оплаты.",
    icon: iconPay,
  },
  {
    title: "Vless protocol",
    text: "Современный, быстрый и безопасный протокол. Обходит блокировки, минимальный пинг.",
    icon: iconVless,
  },
  {
    title: "Минимальная задержка",
    text: "Прямая оплата картами рф и СБП — оплата за минуту, моментальное подключение после оплаты.",
    icon: iconPing,
  },
];
</script>

<style scoped>
.feat {
  background: #0b0d12;
}

.feat__title {
  margin: 0;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 38px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
  color: #fff;
}

.feat__subtitle {
  margin: 10px auto 0;
  max-width: 900px;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;

  color: #ffffff99;
}

/* СЕТКА КАК В МАКЕТЕ:
   6 колонок:
   - первые 3 карточки занимают по 2 колонки (2+2+2=6)
   - последние 2 занимают по 3 колонки (3+3=6)
*/
.feat__grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

.card--w2 { grid-column: span 2; }
.card--w3 { grid-column: span 3; }

/* Карточки */
.card {
  border-radius: 24px;
  padding: 26px 26px 22px;
  background: #0c0c0f;
  border: 1px solid #191920;

  text-align: center;

  /* чтобы визуально было как “премиум карточки” */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.05),
    0 18px 46px rgba(0,0,0,.30);

  transition: transform .18s ease, background .18s ease, box-shadow .18s ease;
}

.card:hover {
  transform: translateY(-1px);
  background: #101018;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.06),
    0 22px 60px rgba(0,0,0,.38);
}

/* Иконка */
.card__icon {
  width: 28px;
  height: 28px;
  display: block;
  margin: 0 auto 14px;
}

/* Заголовок карточки */
.card__title {
  margin: 0;
  font-family: var(--font-sf);
  font-weight: 500;
  font-size: 26px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
  color: #fff;
}

/* Подзаголовок карточки */
.card__text {
  margin: 12px 0 0;

  font-family: var(--font-sf);
  font-weight: 400;
  font-size: 16px;
  line-height: 140%; /* на макете визуально читабельнее, чем 100% */
  letter-spacing: 0;
  text-align: center;

  color: #ffffff99;
}

/* Акцентная карточка (фиолетовая) */
.card--featured {
  background: #5b5de1; /* подгонишь точным hex из Figma */
  border-color: rgba(255,255,255,.06);
  box-shadow: 0 26px 70px rgba(91, 93, 225, .22);
}
.card--featured:hover {
  background: #5b5de1;
  transform: translateY(-1px);
  box-shadow: 0 28px 80px rgba(91, 93, 225, .26);
}
.card--featured .card__text {
  color: rgba(255,255,255,.82);
}

/* Адаптив */
@media (max-width: 980px) {
  .feat__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .card--w2,
  .card--w3 {
    grid-column: auto;
  }
}

@media (max-width: 520px) {
  .feat__grid { grid-template-columns: 1fr; }
  .feat__title { font-size: 30px; }
  .card {background-color: none;}

  .feat__subtitle {
    font-size: 14px;
  }
  }
</style>
