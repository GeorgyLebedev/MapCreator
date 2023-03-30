<template>
  <Header/>
  <div class="d-flex flex-wrap">
  <MapCard v-for="i in 1" :key="i"/>
    <div class="card bg-light text-center justify-content-center">
      <div class="maplink" id="newMapCard" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <img src="@/assets/images/new.png" :width="70">
        <p class="fs-5" style="color: #909090">Создать новую карту </p>
      </div>
    </div>
  </div>

  <ModalBox/>
</template>
<script>
import Header from '@/components/Header.vue'
import MapCard from "@/components/MapCard";
import ModalBox from "@/components/ModalBox";
export default {
  name: 'MainPage',
  components: {
    Header,
    MapCard,
    ModalBox
  }
}
</script>
<style scoped>
#newMapCard{
  cursor: pointer;
}
.card{
  width:300px;
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>
