<template>
  <div class="cardlist d-flex flex-wrap">
    <div class="map c-pointer" @click="this.$router.push('/MapCanvas')"  @mouseenter="showOpt=true" @mouseleave="showOpt=false">
        <transition name="show-opt">
          <div class="topOptions" v-if="showOpt">
            <div class="w-50" style="border-right: gainsboro 1px solid;">
              <img src="@/assets/images/Service/edit.png" class="c-pointer option"  alt="">
            </div>
            <div class="w-50" style="border-left: gainsboro 1px solid;">
              <img src="@/assets/images/Service/delete.png" class="c-pointer option"  alt="">
            </div>
          </div>
        </transition>
        <div class="topImgBox">
      <img src="@/assets/images/plug.jpg" class="topImg" alt="...">
        </div>
          <div class="mapData">
            <b>Название</b><br>
            <div style="text-align: right">
              Дата создания: <br>
              Дата изменения:
            </div>
          </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MapCard',
  data(){
    return{
      showOpt: false,
    }
  },
  props: {
  },
}
</script>
<style scoped>
.map{
  position: relative;
  border:2px solid #dcdcdc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width:300px;
  height: 300px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.map:hover .topOptions{
  visibility: visible;
}
.mapData{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  bottom: 0;
  height: 30%;
  width: 100%;
  padding:10px
}
.topOptions{
  background-color: white;
  position: absolute;
  display: flex;
  max-width: 70px;
  max-height: 30px;
  object-fit: cover;
  right: 10px;
  top:10px;
  border-radius: 15px;
  border: 2px solid gainsboro;
}
.topImgBox{
  width:100%;
  height: 70%
}
.topImg{
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.option{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.cardlist{
  margin-right: 20px
}
.card:hover{
  -webkit-box-shadow: 0px 0px 5px 3px rgba(35, 35, 35, 0.15);
  -moz-box-shadow: 0px 0px 5px 3px rgba(35, 35, 35, 0.15);
  box-shadow: 0px 0px 5px 3px rgba(35, 35, 35, 0.15);
}
.card-img-top{
  max-height:200px;
  object-fit: cover
}
.show-opt-enter-active,
.show-opt-leave-active {
  transition: all 0.2s ease-out;
}
.show-opt-enter-from,
.show-opt-leave-to {
  opacity: 0;
  transform: scale(0)
}
</style>
