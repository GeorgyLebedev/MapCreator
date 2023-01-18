<template>
  <Header/>
  <MapCard/>
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
<style>
</style>
