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
            <input type="text" class="form-control w-100" maxlength="100"></p>
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
              <input id="canvasWidthOpt" type="text" class="mt-1 inputnum" maxlength="4" placeholder="В пикселях"
                     oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
            </div>
            <div>
              <img src="@/assets/images/NewMap/height.png" >
              Высота холста: <br>
              <input id="canvasHeightOpt" type="text" class="mt-1 inputnum" maxlength="4" placeholder="В пикселях"
                     oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
            </div>
          </div>
          <p class="fs-5 mt-3">Ориентация холста:</p>
          <div class="d-flex radio-icon-group">
            <div class="radio-icon card canvas-options-size me-3 text-center">
              <input id="or1" type="radio" name="orient" value="album" checked v-model="orient">
              <label for="or1">
                <img src="@/assets/images/NewMap/horizontal.png" class="card-img-top p-2 icon" alt="...">
                Альбомная</label>
            </div>
            <div class="radio-icon canvas-options-size card me-3 text-center" >
              <input id="or2" type="radio" name="orient" value="portrait" v-model="orient">
              <label for="or2">
                <img src="@/assets/images/NewMap/vertical.png" class="card-img-top p-2 icon" alt="...">
                Портретная</label>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-outline-dark " data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-dark">Создать</button>
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
    res:"hd",
    orient:"album"
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
