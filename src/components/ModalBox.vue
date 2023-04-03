<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel"><b>Настройки холста</b></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <p class="fs-5">Введите название карты:
            <input type="text" class="p-1 rounded-3 w-100" maxlength="100" v-model="mapData.name" placeholder="Минимум 6 символов"></p>
          <p class="fs-5">Выберите разрешение:</p>
          <div class="d-flex radio-icon-group">
            <div class=" radio-icon canvas-options-size card me-3 text-center">
              <input id="res1" type="radio" name="reso" value="hd" checked v-model="res">
              <label for="res1"> <img src="@/assets/images/NewMap/720.png" class="card-img-top p-2 icon" alt="...">
                HD <br>(1280x720)</label>
            </div>
            <div class="radio-icon canvas-options-size card me-3 text-center">
              <input id="res2" type="radio" name="reso" value="fhd" v-model="res">
              <label for="res2"><img src="@/assets/images/NewMap/1080.png" class="card-img-top p-2 icon" alt="...">
                Full HD (1920x1080)</label>
            </div>
            <div class="radio-icon canvas-options-size card me-3 text-center">
              <input id="res3" type="radio" name="reso" value="qhd" v-model="res">
              <label for="res3"><img src="@/assets/images/NewMap/1440.png" class="card-img-top p-2 icon" alt="...">
                Quad HD (2560x1440)</label>
            </div>
            <div class="radio-icon canvas-options-size card me-3 text-center">
              <input id="res4" type="radio" name="reso" value="uhd" v-model="res">
              <label for="res4"><img src="@/assets/images/NewMap/2160.png" class="card-img-top p-2 icon" alt="...">
                Ultra HD (3840x2160)</label>
            </div>
            <div class="radio-icon canvas-options-size card me-3 text-center">
              <input id="res5" type="radio" name="reso" value="yours" v-model="res">
              <label for="res5"><img src="@/assets/images/NewMap/yours.png" class="card-img-top p-2 icon" alt="...">
                Задать <br>своё</label>
            </div>
          </div>
          <div id="newCanvasOpt" class="mt-3" v-if="res=='yours'">
            <div class="mb-3">
              <img src="@/assets/images/NewMap/width.png" >
              Ширина холста:<br>
              <input id="canvasWidthOpt" type="text" class="mt-1 rounded-3 inputnum" maxlength="4" placeholder="В пикселях"
                     oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" v-model="mapData.resX">
            </div>
            <div>
              <img src="@/assets/images/NewMap/height.png" >
              Высота холста: <br>
              <input id="canvasHeightOpt" type="text" class="mt-1 rounded-3 inputnum" maxlength="4" placeholder="В пикселях"
                     oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" v-model="mapData.resY">
            </div>
          </div>
          <p class="fs-5 mt-3">Ориентация холста:</p>
          <div class="d-flex radio-icon-group">
            <div class="radio-icon card canvas-options-size me-3 text-center">
              <input id="or1" type="radio" name="orient" value="hor" checked v-model="orient">
              <label for="or1">
                <img src="@/assets/images/NewMap/horizontal.png" class="card-img-top p-2 icon" alt="...">
                Альбомная</label>
            </div>
            <div class="radio-icon canvas-options-size card me-3 text-center" >
              <input id="or2" type="radio" name="orient" value="vert" v-model="orient">
              <label for="or2">
                <img src="@/assets/images/NewMap/vertical.png" class="card-img-top p-2 icon" alt="...">
                Портретная</label>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-outline-dark " data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-dark"
                  @click="createCanvas"
                  :disabled="mapData.name.length<6 ||(res=='yours' && !(mapData.resX && mapData.resY))">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalBox',
  data(){
  return{
    mapData:{
      name: "",
      resX: 1280,
      resY: 720
    },
    res:"hd",
    orient:"hor"
  }
  },
  methods:{
    createCanvas(){

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
    }
  }
}

</script>
<style>
.modal-lg{
  min-width: 800px;
}
.inputnum{
  max-width: 110px;
  text-align: center
}
.icon{
  height:100px;
  object-fit: contain
}
.canvas-options-size{
  width:17%;
  height:10%
}
</style>
