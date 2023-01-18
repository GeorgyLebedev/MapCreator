<template>
  <div class="d-flex content">
    <div class="d-flex h-100 bg-white " id="toolsPanel">
      <div class="radio-icon-group mb-auto text-center">
        <div class="radio-icon card text-center ">
          <input id="tool1" type="radio" name="tool" value="cursor" checked
                 v-model="tool"
                 v-on:click="optionVisible=!optionVisible"
                 v-on:change="optionVisible=true">
          <label for="tool1" data-bs-toggle="tooltip" data-bs-placement="right" title="Курсор">
            <img src="@/assets/images/Tools/cursor.png" class="card-img-top p-1 icon-mid" alt="...">
          </label>
          <Transition>
            <div id="cursorOpt" class="tools-options" v-if="tool=='cursor' && optionVisible">
              <div class="d-flex justify-content-between">
                <b> Курсор </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt" height="20" alt=""
                     v-on:click="optionVisible=false">
              </div>
              <hr>
              Выбирать:<br>
              <input id="selectAll" type="checkbox">
              <label for="selectAll">Всё</label>
              <input id="selectStamps" type="checkbox">
              <label for="selectStamps">Штампы</label>
              <input id="selectLabels" type="checkbox">
              <label for="selectLabels">Текст</label>
              <input id="selectCurves" type="checkbox">
              <label for="selectCurves">Кривые</label>
              <input id="selectShapes" type="checkbox">
              <label for="selectShapes">Фигуры</label>
            </div>
          </Transition>
        </div>
        <div class="radio-icon card text-center">
          <input id="tool2" type="radio" name="tool" value="brush"
                 v-model="tool"
                 v-on:click="optionVisible=!optionVisible"
                 v-on:change="optionVisible=true">
          <label for="tool2" data-bs-toggle="tooltip" data-bs-placement="right" title="Кисть">
            <img src="@/assets/images/Tools/brush.png" class="card-img-top p-1 icon-mid" alt="...">
          </label>
          <Transition>
            <div id="brushOpt" class="tools-options" v-if="tool=='brush' && optionVisible">
              <div class="d-flex justify-content-between">
                <b> Кисть </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt" height="20" alt=""
                     v-on:click="optionVisible=false">
              </div>
              <hr>
              <div class="mb-3">
                <input id="colorsTab" checked type="radio" name="brushType" value="col">
                <label for="colorsTab">Цвета</label>
                <input id="texturesTab" type="radio" name="brushType" value="tex">
                <label for="texturesTab" class="ms-1">Текстуры</label>
              </div>
              <div id="brushColors">
                <input type="color" v-model="brushColor"><br>
                <div class="mb-3">
                  Последние цвета:
                  <table id="lastColors" class="colorTable">
                    <tr>
                      <td v-for="i in 8" :key="i"></td>
                    </tr>
                  </table>
                </div>
                <div>
                  Палитра:
                  <table id="palette" class="colorTable">
                    <tr>
                      <td v-for="i in 8" :key="i"></td>
                    </tr>
                    <tr>
                      <td v-for="i in 8" :key="i"></td>
                    </tr>
                    <tr>
                      <td v-for="i in 8" :key="i"></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div id="brushTextures" style="display: none">
                Это раздел настройки текстур
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Размер кисти">
                <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                <input type="range" step="1" min="1" max="50"  v-model="brushSize">
                <input type="number" step="1" min="1"  max="50" class="input-number-style" v-model="brushSize">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Непрозрачность кисти">
                <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
                <input type="range" step="0.01" min="0" max="1" v-model="brushOp">
                <input type="number" step="0.01" min="0" max="1"  v-model="brushOp" class="input-number-style">
              </div>
            </div>
          </Transition>
        </div>
        <div class="radio-icon card text-center">
          <input id="tool3" type="radio" name="tool" value="stamp"
                 v-model="tool"
                 v-on:click="optionVisible=!optionVisible"
                 v-on:change="optionVisible=true">
          <label for="tool3" data-bs-toggle="tooltip" data-bs-placement="right" title="Штамп">
            <img src="@/assets/images/Tools/stamp.png" class="card-img-top p-1 icon-mid" alt="...">
          </label>
          <Transition>
            <div id="stampOpt" class="tools-options" v-if="tool=='stamp' && optionVisible">
              <div class="d-flex justify-content-between">
                <b> Штамп </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt" height="20" alt=""
                     v-on:click="optionVisible=false">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Размер иконок">
                <img src="@/assets/images/Tools/Options/size.png" alt="" height="20">
                <input type="range" step="1" min="1" value="1" max="50">
                <input type="number" step="1" min="1" value="1" max="50" class="input-number-style">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Непрозрачность иконок">
                <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
                <input type="range" step="0.1" min="0" value="1" max="1">
                <input type="number" step="0.1" min="0" value="1" max="1" class="input-number-style">
              </div>
            </div>
          </Transition>
        </div>
        <div class="radio-icon card text-center">
          <input id="tool4" type="radio" name="tool" value="path"
                 v-model="tool"
                 v-on:click="optionVisible=!optionVisible"
                 v-on:change="optionVisible=true">
          <label for="tool4" data-bs-toggle="tooltip" data-bs-placement="right" title="Построить путь">
            <img src="@/assets/images/Tools/path.png" class="card-img-top p-1 icon-mid" alt="...">
          </label>
          <Transition>
          <div id="pathOpt" class="tools-options" v-if="tool=='path' && optionVisible">
            <div class="d-flex justify-content-between">
              <b> Пути/кривые </b>
              <img src="@/assets/images/arrow-left.png" class="closeOpt" height="20" alt=""
                   v-on:click="optionVisible=false">
            </div>
            <hr>
            Опции
          </div>
          </Transition>
        </div>
        <div class="radio-icon card text-center">
          <input id="tool5" type="radio" name="tool" value="text"
                 v-model="tool"
                 v-on:click="optionVisible=!optionVisible"
                 v-on:change="optionVisible=true">
          <label for="tool5" data-bs-toggle="tooltip" data-bs-placement="right" title="Создать надпись">
            <img src="@/assets/images/Tools/text.png" class="card-img-top p-1 icon-mid" alt="...">
          </label>
          <Transition>
            <div id="textOpt" class="tools-options" v-if="tool=='text' && optionVisible">
              <div class="d-flex justify-content-between">
                <b> Надпись </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt" height="20" alt=""
                     v-on:click="optionVisible=false">
              </div>
              <hr>
              <textarea id="text" cols="20" rows="3"></textarea>
              <hr>
              Цвет текста: <input type="color">
              <hr>
              <img src="@/assets/images/Tools/Options/font-size.png" height="20" alt="">
              <input type="range" step="1" min="1" value="1" max="50">
              <input type="number" step="1" min="1" value="1" max="50" class="input-number-style">
              <hr>
              <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
              <input type="range" step="0.1" min="0" value="1" max="1">
              <input type="number" step="0.1" min="0" value="1" max="1" class="input-number-style">
              <hr>
              <input type="checkbox" id="outline">
              <label for="outline">Обводка</label>
              <input type="color">
              <input type="checkbox" id="shadow">
              <label for="shadow">Тень</label>
              <input type="color">
            </div>
          </Transition>
        </div>
        <div class="radio-icon card text-center">
          <input id="tool6" type="radio" name="tool" value="zoom" v-model="tool">
          <label for="tool6" data-bs-toggle="tooltip" data-bs-placement="right" title="Масштабировать">
            <img src="@/assets/images/Tools/zoom.png" class="card-img-top p-1 icon-mid" alt="...">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ToolsPanel",
  data() {
    return {
      tool: "cursor",
      optionVisible: false,
      brushSize: 1,
      brushOp: 1,
      brushColor:"#000000",
      brushOpt:{
        size:this.brushSize,
        opacity:this.brushOp,
        color: this.brushColor,
      }
    }
  },
  watch:{
    tool(tool){
    alert(tool)
    }
  }
}
</script>
<style>
hr{
  border: 1px solid gainsboro !important;
  border-bottom-width: 0 !important;
  opacity: 1 !important;
  margin:10px 0 !important;
}
.tools-options {
  position: absolute;
  border: 1px solid gainsboro;
  border-left: none;
  background: white;
  border-radius: 0 5px 5px 0;
  padding: 10px;
  left: 41px;
  top: -1px;
  white-space: nowrap;
  text-align: left;
}

.tools-options input[type=radio]:checked + label {
  color: #232323;
  border-bottom: 2px solid #232323;
  border-radius: 0;
  background: transparent;
}

.icon-mid {
  object-fit: contain;
  width: 40px;
  height: 40px
}

.radio-icon-group > .card {
  border-radius: 0;
  border-right: none;
  border-left: none;
  border-top: none;
}

.radio-icon > label {
  border-radius: 0 !important;
}

#toolsPanel {
  grid-area: ToolsPanel;
  border-right: 1px solid gainsboro;
}

.closeOpt {
  cursor: pointer;
  margin-left: 10px;
}
.colorTable{
  border-collapse: collapse;
  border: 1px solid gainsboro;
}
.colorTable > tr{
  border: 1px solid gainsboro;
}
td {
  max-height: 25px;
  height: 25px;
  width: 25px;
  min-width: 25px;
  border: 1px solid gainsboro !important;
  cursor: pointer;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-400px);
}
</style>
