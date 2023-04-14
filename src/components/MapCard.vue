<template>
  <div class="cardlist d-flex flex-wrap">
    <div class="card">
      <a class="maplink" href="/MapCanvas" @mouseenter="showOpt=true" @mouseleave="showOpt=false">
        <transition name="show-opt">
          <div class="topOptions d-flex" v-if="showOpt">
            <div class="w-50" style="border-right: gainsboro 1px solid;">
              <img src="@/assets/images/Service/edit.png" class="c-pointer option"  alt="">
            </div>
            <div class="w-50" style="border-left: gainsboro 1px solid;">
              <img src="@/assets/images/Service/delete.png" class="c-pointer option"  alt="">
            </div>
          </div>
        </transition>
        <img src="@/assets/images/plug.jpg" class="card-img-top w-100" alt="...">
        <div class="card-body py-1">
          <div class="card-text">
            <span class="fw-bold">Название</span><br>
            <div class="text-end ">
              Дата создания: <br>
              Дата изменения:
            </div>
          </div>
        </div>
      </a>
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
.card{
  width:300px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.card:hover .topOptions{
  visibility: visible;
}
.topOptions{
  background-color: white;
  position: absolute;
  display: block;
  max-width: 70px;
  max-height: 30px;
  object-fit: cover;
  right: 10px;
  top:10px;
  border-radius: 15px;
  border: 2px solid gainsboro;
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
