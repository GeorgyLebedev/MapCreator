<template>
  <transition name="popup-anim">
    <div class="modalContainer" v-if="showWindow">
        <div class="modalWindow">
          <div class="modalHeader">
            <b>Настройки холста</b>
            <img class="c-pointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
                 @click="this.$emit('closeWindow')">
          </div>
          <hr>
          <div class="modalBody">
            Введите название карты:
            <input type="text" class="mapNameInput" placeholder="Минимум 6 символов" v-model="mapData.name">
            Выберите разрешение:
            <div class="selectGroup">
              <div class="selectItem" :class="{selected:(this.res=='hd')}" @click="this.res='hd'">
                <img src="@/assets/images/NewMap/720.png" alt="">
                HD <br> (1280x720)
              </div>
              <div class="selectItem" :class="{selected:(this.res=='fhd')}" @click="this.res='fhd'">
                <img src="@/assets/images/NewMap/1080.png" alt="">
                Full HD (1920x1080)
              </div>
              <div class="selectItem" :class="{selected:(this.res=='qhd')}" @click="this.res='qhd'">
                <img src="@/assets/images/NewMap/1440.png" alt="">
                Quad HD (2560x1440)
              </div>
              <div class="selectItem" :class="{selected:(this.res=='uhd')}" @click="this.res='uhd'">
                <img src="@/assets/images/NewMap/2160.png" alt="">
                Ultra HD (3840x2160)
              </div>
              <div class="selectItem" :class="{selected:(this.res=='yours')}" @click="this.res='yours'">
                <img src="@/assets/images/NewMap/yours.png" alt="">
                Задать <br> своё
              </div>
            </div>
            <div v-if="res=='yours'">
              <div class="resOptShell">
                <img src="@/assets/images/NewMap/width.png" >
                Ширина холста: <small>(не менее 200 и не более 5000)</small><br>
                <input  type="text" class="resOptInput" maxlength="4" placeholder="В пикселях"
                       oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" v-model="mapData.resX">
              </div>
              <div class="resOptShell">
                <img src="@/assets/images/NewMap/height.png" >
                Высота холста: <small>(не менее 200 и не более 5000)</small> <br>
                <input  type="text" class="resOptInput" maxlength="4" placeholder="В пикселях"
                       oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" v-model="mapData.resY">
              </div>
            </div>
            Выберите ориентацию:
            <div class="selectGroup">
              <div class="selectItem" :class="{selected:(this.orient=='hor')}" @click="this.orient='hor'">
                <img src="@/assets/images/NewMap/horizontal.png" alt="">
                Альбомная
              </div>
              <div class="selectItem"  :class="{selected:(this.orient=='vert')}" @click="this.orient='vert'">
                <img src="@/assets/images/NewMap/vertical.png" alt="">
                Портретная
              </div>
            </div>
          </div>
          <div class="modalFooter">
            <button type="button" class="buttonLight" @click="this.$emit('closeWindow')">Закрыть</button>
            <button type="button"
                class="buttonDark"
                @click="createCanvas"
                :disabled="mapData.name.length<6 ||
                (res=='yours' && (mapData.resX<200 || mapData.resX>5000 || mapData.resY<200 || mapData.resY>5000))">Создать</button>
          </div>
        </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'NewMapWindow',
  data(){
  return{
    mapData:{
      name: "",
      resX: 1280,
      resY: 720,
    },
    res:"hd",
    orient:"hor"
  }
  },
  props:{
    showWindow:{
      default: false,
      type: Boolean
    }
  },
  methods:{
    createCanvas(){
      this.$emit('newMap',this.mapData.name, (this.mapData.resX+"x"+this.mapData.resY))
    }
  },
  watch:{
    res(val){
      switch (val){
        case "hd":
          this.mapData.resX=1280
          this.mapData.resY=720
              break
        case "fhd":
          this.mapData.resX=1920
          this.mapData.resY=1080
              break
        case "qhd":
          this.mapData.resX=2560
          this.mapData.resY=1440
              break
        case "uhd":
          this.mapData.resX=3840
          this.mapData.resY=2160
      }
      let temp=0
      if(this.orient=="vert" && this.mapData.resX>this.mapData.resY){
        temp=this.mapData.resX
        this.mapData.resX=this.mapData.resY
        this.mapData.resY=temp
      }
    },
    orient(){
      let temp=0
      temp=this.mapData.resX
      this.mapData.resX=this.mapData.resY
      this.mapData.resY=temp
    },
  }
}

</script>
<style>
.resOptInput{
  border: 2px solid #dcdcdc;
  padding-inline: 10px;
  padding-block: 5px;
  font-size: 18px;
  border-radius: 10px;
  max-width: 150px;
  margin: 5px;
}
.resOptShell{
  margin-block:10px;
}
.selectGroup{
  display: flex;
  margin-block: 10px;
}
.selectItem{
  border: 2px solid #dcdcdc;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-inline: 10px;
  white-space: normal;
  max-width: 120px;
  padding: 5px;
  text-align: center;
}
.selectItem > img{
  max-height: 80px;
  max-width: 120px;
  padding: 5px;
}
.selected{
  background-color: #232323;
  border-color: #232323;
  color: white
}
.selected >img{
  filter: invert(1);
}
</style>
