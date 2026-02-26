<template>
  <div class="view">
    <header class="head">
      <div>
        <div class="h">Управление подпиской</div>
        <div class="s">Управление вашими услугами и скачивание лаунчера</div>
      </div>
    </header>

    <div class="rows">
      <!-- ряд 1: 352 + резина -->
      <div class="row row--narrowLeft">
        <InstallCard />
        <MySubscriptionCard />
      </div>

      <!-- ряд 2: резина + 352 -->
      <div class="row row--narrowRight">
        <VideoCard :src="helpVideo" :poster="helpPoster" />
        <LibrariesCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InstallCard from "../widgets/manage/InstallCard.vue";
import MySubscriptionCard from "../widgets/manage/MySubscriptionCard.vue";
import VideoCard from "../widgets/manage/VideoCard.vue";
import LibrariesCard from "../widgets/manage/LibrariesCard.vue";

import helpVideo from "../../../assets/video/help.mp4";
import helpPoster from "../../../assets/img/help.png";
</script>

<style scoped>
.view{ padding: 4px 0; }

.head{ display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:18px; }
.h{ font-family:var(--font-sf); font-weight:500; font-size:24px; line-height:100%; color:#fff; }
.s{ margin-top:10px; font-family:var(--font-sf); font-weight:400; font-size:12px; line-height:140%; color:#FFFFFF99; }

.rows{ display:grid; gap:16px; }

/* базовая сетка строки */
.row{
  display:grid;
  gap:16px;
  align-items:start;
}

/* 352 слева + резина справа */
.row--narrowLeft{
  grid-template-columns: minmax(280px, 352px) minmax(0, 1fr);
}

/* резина слева + 352 справа */
.row--narrowRight{
  grid-template-columns: minmax(0, 1fr) minmax(280px, 352px);
}

/* чтобы внутренности не распирали колонки */
.row > *{ min-width:0; }

@media (max-width: 1100px){
  .row--narrowLeft,
  .row--narrowRight{
    grid-template-columns: 1fr;
  }
}
</style>
