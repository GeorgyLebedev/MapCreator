<template>
  <div>
    <div class="h-100 bg-white " id="toolsPanel">
      <div class="radio-icon-group tools-group mb-auto text-center">
        <div class="tool-radio card text-center ">
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
        <div class="tool-radio card text-center">
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
                <input id="colorsTab" checked type="radio" name="brushType" value="color" v-model="brushOpt.brushType">
                <label for="colorsTab" class="radio-text">Цвета</label>
                <input id="texturesTab" type="radio" name="brushType" value="texture" v-model="brushOpt.brushType">
                <label for="texturesTab" class="ms-1 radio-text">Текстуры</label>
              </div>
              <div id="brushColors" v-if="brushOpt.brushType=='color'">
                Цвет кисти: <br>
                <input type="color" v-model="brushOpt.color">
                <div class="mb-3">
                  Последние цвета:
                  <table class="colorTable">
                    <tr>
                      <td v-for="(color, index) in recentColors" :key="index"
                          :style="{ 'background-color': color}"
                          @click="brushOpt.color=color">
                      </td>
                    </tr>
                  </table>
                </div>
                <div>
                  Палитра:
                  <table id="palette" class="colorTable">
                    <tr>
                      <td class="colorCell" v-for="i in 8" :key="i"></td>
                    </tr>
                    <tr>
                      <td class="colorCell" v-for="i in 8" :key="i"></td>
                    </tr>
                    <tr>
                      <td class="colorCell" v-for="i in 8" :key="i"></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div id="brushTextures" v-if="brushOpt.brushType=='texture'">
                Это раздел настройки текстур
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Размер кисти">
                <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                <input type="range" step="1" min="1" max="50" v-model="brushOpt.size">
                <input type="number" step="1" min="1" max="50" class="input-number-style" v-model="brushOpt.size">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Непрозрачность кисти">
                <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
                <input type="range" step="0.01" min="0" max="1" v-model="brushOpt.opacity">
                <input type="number" step="0.01" min="0" max="1" v-model="brushOpt.opacity" class="input-number-style">
              </div>
            </div>
          </Transition>
        </div>
        <div class="tool-radio card text-center">
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
        <div class="tool-radio card text-center">
          <input id="tool4" type="radio" name="tool" value="shape"
                 v-model="tool"
                 v-on:click="optionVisible=!optionVisible"
                 v-on:change="optionVisible=true">
          <label for="tool4" data-bs-toggle="tooltip" data-bs-placement="right" title="Фигуры">
            <img src="@/assets/images/Tools/shapes.png" class="card-img-top p-1 icon-mid" alt="...">
          </label>
          <Transition>
            <div id="shapesOpt" class="tools-options" v-if="tool=='shape' && optionVisible">
              <div class="d-flex justify-content-between">
                <b> Фигуры </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt" height="20" alt=""
                     v-on:click="optionVisible=false">
              </div>
              <hr>
              <p> Вид фигуры:</p>
              <div class="d-flex">
                <div class="card radio-icon me-2">
                  <input id="shapeRectId" type="radio" value="rectangle" name="shapeTypeRadio"
                         :disabled="shapeOpt.isArbitrary"
                         v-model="shapeOpt.shapeType">
                  <label for="shapeRectId" title="Прямоугольник">
                    <img src="@/assets/images/Tools/Options/rectangle.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="shapeTriaId" type="radio" value="triangle" name="shapeTypeRadio"
                         :disabled="shapeOpt.isArbitrary"
                         v-model="shapeOpt.shapeType">
                  <label for="shapeTriaId" title="Треугольник">
                    <img src="@/assets/images/Tools/Options/triangle.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="shapeCircId" type="radio" value="circle" name="shapeTypeRadio"
                         :disabled="shapeOpt.isArbitrary"
                         v-model="shapeOpt.shapeType">
                  <label for="shapeCircId" title="Круг">
                    <img src="@/assets/images/Tools/Options/circle.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="polygonId" type="radio" value="polygon" name="shapeTypeRadio"
                         :disabled="shapeOpt.isArbitrary"
                         v-model="shapeOpt.shapeType">
                  <label for="polygonId" title="Многоугольник">
                    <img src="@/assets/images/Tools/Options/polygon.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
              </div>
              <div class="d-flex mt-3">
                <input type="checkbox" class="form-check-input me-2" id="arbitraryShapeChbx"
                       v-model="shapeOpt.isArbitrary" @change="setArbitraryShape(shapeOpt.isArbitrary)">
                <label for="arbitraryShapeChbx">Произвольная</label>
              </div>
              <div v-if="shapeOpt.shapeType=='polygon'">
                <hr>
                Число сторон: <br>
                <input type="range" step="1" min="5" max="20" v-model="shapeOpt.sides">
                <input type="number" step="1" min="5" max="20" v-model="shapeOpt.sides" class="input-number-style">
              </div>
              <hr>
              Цвета:
              <table class=" options-table">
                <tr>
                  <td><input type="checkbox" class="form-check-input me-2" id="shapeFillChbx" checked
                             v-model="shapeOpt.isFill" @change="setFill(shapeOpt)">
                    <label for="shapeFillChbx">Заливка</label>
                  </td>
                  <td>
                    <input type="color" v-model="shapeOpt.fillColor" v-if="shapeOpt.isFill">
                    <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                         v-if="!shapeOpt.isFill">
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" class="form-check-input me-2 " id="shapeBorderChbx" checked
                           v-model="shapeOpt.isBorder" @change="setBorder(shapeOpt)">
                    <label for="shapeBorderChbx">Контур</label>
                  </td>
                  <td>
                    <input type="color" v-model="shapeOpt.borderColor" v-if="shapeOpt.isBorder">
                    <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                         v-if="!shapeOpt.isBorder">
                  </td>
                </tr>
              </table>
              Последние цвета:
              <table class="colorTable">
                <tr>
                  <td v-for="(color, index) in recentColors" :key="index"
                      class="colorCell"
                      :style="{ 'background-color': color}"
                      @click="shapeOpt.fillColor=color; shapeOpt.isFill=true"
                      @contextmenu="shapeOpt.borderColor=color; shapeOpt.isBorder=true">
                  </td>
                </tr>
              </table>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Толщина контура">
                <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                <input type="range" step="1" min="1" max="50" v-model="shapeOpt.borderWidth">
                <input type="number" step="1" min="1" max="50" class="input-number-style"
                       v-model="shapeOpt.borderWidth">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Непрозрачность фигуры">
                <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
                <input type="range" step="0.01" min="0" max="1" v-model="shapeOpt.opacity">
                <input type="number" step="0.01" min="0" max="1" v-model="shapeOpt.opacity" class="input-number-style">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Поворот фигуры">
                <img src="@/assets/images/Tools/reset.png" alt="" height="20">
                <input type="range" step="1" min="0" max="360" v-model="shapeOpt.rotation">
                <input type="number" step="1" min="0" max="360" v-model="shapeOpt.rotation" class="input-number-style">
              </div>
            </div>
          </Transition>
        </div>
        <div class="tool-radio card text-center">
          <input id="tool5" type="radio" name="tool" value="path"
                 v-model="tool"
                 v-on:click="optionVisible=!optionVisible"
                 v-on:change="optionVisible=true">
          <label for="tool5" data-bs-toggle="tooltip" data-bs-placement="right" title="Построить путь">
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
              Тип линии:
              <div class="d-flex">
                <div class="card radio-icon me-2">
                  <input id="pathLineId" type="radio" checked value="line" name="pathTypeRadio"
                         v-model="pathOpt.pathType">
                  <label for="pathLineId" title="Прямая">
                    <img src="@/assets/images/Tools/Options/line.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="pathPolyId" type="radio" value="poly" name="pathTypeRadio" v-model="pathOpt.pathType">
                  <label for="pathPolyId" title="Ломаная">
                    <img src="@/assets/images/Tools/Options/polyLine.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="pathCurveId" type="radio" value="curve" name="pathTypeRadio" v-model="pathOpt.pathType">
                  <label for="pathCurveId" title="Кривая">
                    <img src="@/assets/images/Tools/Options/curve.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
              </div>
              <hr>
              Стиль линии:
              <div class="d-flex">
                <div class="card radio-icon me-2">
                  <input id="pathStyleDefaultId" type="radio" checked value="default" name="pathStyleRadio"
                         v-model="pathOpt.style">
                  <label for="pathStyleDefaultId" title="Без стилей">
                    <img src="@/assets/images/Tools/Options/line.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="pathStyleDashedId" type="radio" value="dashed" name="pathStyleRadio"
                         v-model="pathOpt.style">
                  <label for="pathStyleDashedId" title="Пунктирная">
                    <img src="@/assets/images/Tools/Options/dashed.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="pathStyleDottedId" type="radio" value="dotted" name="pathStyleRadio"
                         v-model="pathOpt.style">
                  <label for="pathStyleDottedId" title="Точечная">
                    <img src="@/assets/images/Tools/Options/dotted.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
              </div>
              <div class="my-3" title="Расстояние между точками" v-if=" pathOpt.style=='dotted'">
                <img src="@/assets/images/Tools/Options/gapDot.png" alt="" height="20">
                <input type="range" step="1" min="5" max="50" v-model="pathOpt.dotArray[1]">
                <input type="number" step="1" min="5" max="50" class="input-number-style" v-model="pathOpt.dotArray[1]">
              </div>
              <div class="my-3" title="Расстояние между штрихами" v-if="pathOpt.style=='dashed'">
                <img src="@/assets/images/Tools/Options/gapDash.png" alt="" height="30">
                <input type="range" step="1" min="5" max="50" v-model="pathOpt.dashArray[1]">
                <input type="number" step="1" min="5" max="50" class="input-number-style"
                       v-model="pathOpt.dashArray[1]">
              </div>
              <div class="my-3" title="Длина штриха" v-if="pathOpt.style=='dashed'">
                <img src="@/assets/images/Tools/Options/dash.png" alt="" height="30">
                <input type="range" step="1" min="10" max="50" v-model="pathOpt.dashArray[0]">
                <input type="number" step="1" min="10" max="50" class="input-number-style"
                       v-model="pathOpt.dashArray[0]">
              </div>
              <hr>
              Цвет линии: <br>
              <input type="color" v-model="pathOpt.color">
              <div class="mb-3">
                Последние цвета:
                <table class="colorTable">
                  <tr>
                    <td v-for="(color, index) in recentColors" :key="index"
                        class="colorCell"
                        :style="{ 'background-color': color}"
                        @click="pathOpt.color=color">
                    </td>
                  </tr>
                </table>
              </div>
              <hr>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="roundCapChbxId" v-model="pathOpt.roundCap" checked>
                <label for="roundCapChbxId">
                  Скруглённые концы
                </label>
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Толщина линии">
                <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                <input type="range" step="1" min="1" max="50" v-model="pathOpt.size">
                <input type="number" step="1" min="1" max="50" class="input-number-style" v-model="pathOpt.size">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Непрозрачность линии">
                <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
                <input type="range" step="0.01" min="0" max="1" v-model="pathOpt.opacity">
                <input type="number" step="0.01" min="0" max="1" v-model="pathOpt.opacity" class="input-number-style">
              </div>
            </div>
          </Transition>
        </div>
        <div class="tool-radio card text-center">
          <input id="tool6" type="radio" name="tool" value="text"
                 v-model="tool"
                 v-on:click="optionVisible=!optionVisible"
                 v-on:change="optionVisible=true">
          <label for="tool6" title="Создать надпись">
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
              <textarea id="text" cols="24" rows="3" v-model="textOpt.text" :style="{'font-family':textOpt.font}"></textarea>
              <hr>
              <div class="d-flex align-items-center justify-content-between">
                Шрифт
                <div class="dropdown dropdownArea" :style="{'font-family':textOpt.font}">
                  <a class="fontDropDown btn btn-sm btn-outline-dark dropdown-toggle"
                     id="dropdownMenuBorder" data-bs-toggle="dropdown"
                     aria-expanded="false">
                    <div class="d-flex justify-content-between">
                      <div class="fontList"> {{ textOpt.font }}</div>
                      <img src="@/assets/images/downArrow.png" height="20" alt="">
                    </div>
                  </a>
                  <div class="dropdown-menu p-2">
                    <div class="dropdown-item"
                         v-for="font in fontsCollection" :key="font"
                         @click="textOpt.font=font"
                         :style="{'font-family':font}">{{ font }}
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <table class=" options-table">
                <tr>
                  <td>
                    <input type="checkbox" class="form-check-input me-2" id="textFillChbx" checked
                           v-model="textOpt.isFill" @change="setFill(textOpt)">
                    <label for="textFillChbx">Цвет текста</label>
                  </td>
                  <td>
                    <input type="color" v-model="textOpt.fillColor" v-if="textOpt.isFill">
                    <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                         v-if="!textOpt.isFill">
                  </td>
                </tr>
              </table>
              <hr>
              <div title="Размер шрифта">
                <img src="@/assets/images/Tools/Options/font-size.png" height="20" alt="">
                <input type="range" step="1" min="5" max="50" v-model="textOpt.fontSize">
                <input type="number" step="1" min="5" max="50" class="input-number-style" v-model="textOpt.fontSize">
              </div>
              <hr>
              <div title="Непрозрачность текста">
                <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
                <input type="range" step="0.1" min="0" max="1" v-model="textOpt.opacity">
                <input type="number" step="0.1" min="0" max="1" class="input-number-style" v-model="textOpt.opacity">
              </div>
              <hr>
              <div title="Поворот текста">
                <img src="@/assets/images/Tools/reset.png" alt="" height="20">
                <input type="range" step="1" min="0" max="360" v-model="textOpt.rotation">
                <input type="number" step="1" min="0" max="360" v-model="textOpt.rotation" class="input-number-style">
              </div>
              <hr>
              <table class=" options-table">
                <tr>
                  <td>
                    <input type="checkbox" class="form-check-input me-2" id="textBorderChbx" checked
                           v-model="textOpt.isBorder" @change="setBorder(textOpt)">
                    <label for="shapeFillChbx">Обводка</label>
                  </td>
                  <td>
                    <input type="color" v-model="textOpt.borderColor" v-if="textOpt.isBorder">
                    <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                         v-if="!textOpt.isBorder">
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" class="form-check-input me-2 " id="textShadowChbx" v-model="textOpt.isShadow"
                           @change="setShadow(textOpt)">
                    <label for="shapeBorderChbx">Тень</label>
                  </td>
                  <td>
                    <input type="color" v-model="textOpt.shadowColor" v-if="textOpt.isShadow">
                    <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                         v-if="!textOpt.isShadow">
                  </td>
                </tr>
              </table>
            </div>
          </Transition>
        </div>
        <div class="tool-radio card text-center">
          <input id="tool7" type="radio" name="tool" value="zoom" v-model="tool">
          <label for="tool7" data-bs-toggle="tooltip" data-bs-placement="right" title="Масштабировать">
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
  props: {
    recentColors: Array()
  },
  data() {
    return {
      tool: "cursor",
      optionVisible: false,
      fontsCollection: ["Cambria", "Comfortaa", "Arial", "Comic Sans MS"],
      brushOpt: {
        size: 1,
        opacity: 1,
        color: "#000000",
        brushType: "color"
      },
      pathOpt: {
        size: 1,
        opacity: 1,
        color: "#000000",
        pathType: "line",
        roundCap: true,
        style: "default",
        dashArray: [10, 5],
        dotArray: [1, 5]
      },
      shapeOpt: {
        shapeType: "rectangle",
        borderWidth: 1,
        borderColor: "#000000",
        fillColor: "#ffffff",
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        sides: 5,
        isArbitrary: false,
        isFill: true,
        isBorder: true
      },
      textOpt: {
        text: "Текст",
        font: "Cambria",
        fontWeight: "normal",
        fontSize: 10,
        textAlign: "left",
        fillColor: "#ffffff",
        strokeColor: "#000000",
        shadowColor: "#000000",
        opacity: 1,
        rotation: 0,
        isBorder: true,
        isFill: true,
        isShadow: false
      },
    }
  },
  methods: {
    setArbitraryShape(isArbitrary) {
      this.shapeOpt.shapeType = isArbitrary ? "arbitrary" : "rectangle"
    },
    setFill(object) {
      object.fillColor = object.isFill ? "#ffffff" : "transparent"
    },
    setBorder(object) {
      object.borderColor = object.isBorder ? "#000000" : "transparent"
    },
    setShadow(object) {
      object.shadowColor = object.isShadow ? "#000000" : "transparent"
    }
  },
  watch: {
    tool(tool) {
      this.$emit('toolChange', this.tool)
      switch (tool) {
        case "cursor":
          //!!!!
          //this.$emit('optChange', this.brushOpt)
          //!!!!
          break
        case "brush":
          this.$emit('optChange', this.brushOpt)
          break;
        case "shape":
          this.$emit('optChange', this.shapeOpt)
          break
        case "path":
          this.$emit('optChange', this.pathOpt)
          break
        default:
          return
      }
    },
    brushOpt: {
      handler() {
        this.$emit('optChange', this.brushOpt)
      }, deep: true
    },
    shapeOpt: {
      handler() {
        this.$emit('optChange', this.shapeOpt)
      }, deep: true
    },
    pathOpt: {
      handler() {
        this.$emit('optChange', this.pathOpt)
      }, deep: true
    },
  }
}
</script>
<style>
#toolsPanel {
  grid-area: ToolsPanel;
  position: relative;
}
#text{
  width:235px;
  height: 75px;
}
hr {
  border: 1px solid gainsboro !important;
  border-bottom-width: 0 !important;
  opacity: 1 !important;
  margin: 10px 0 !important;
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
  z-index: 1;
}

.options-table tr {
  height: 40px;
}

.options-table {
  width: 100%;
}

.dropdown-item:active {
  background: #232323;
  color: white;
}

.dropdown-item:hover {
  cursor: pointer;
}

.tools-options input[type=radio]:checked + .radio-text {
  color: #232323;
  border-bottom: 2px solid #232323;
  border-radius: 0;
  background: transparent;
}

.radio-text {
  cursor: pointer;
}

.icon-mid {
  object-fit: contain;
  width: 40px;
  height: 40px
}

.icon-sm {
  object-fit: contain;
  width: 30px;
  height: 30px
}

.tools-group > .card {
  border-radius: 0;
  border-right: none;
  border-left: none;
  border-top: none;
}

.tool-radio > label {
  border-radius: 0 !important;
  cursor: pointer;
}

.card-img-top {
  width: auto !important;
}

.closeOpt {
  cursor: pointer;
  margin-left: 10px;
}

.colorTable {
  border-collapse: collapse;
  border: 1px solid gainsboro;
}

.colorTable > tr {
  border: 1px solid gainsboro;
}

.colorCell {
  max-height: 30px;
  height: 30px;
  width: 30px;
  min-width: 30px;
  border: 1px solid gainsboro !important;
  cursor: pointer;
}

.colorPlaceholder {
  border: 1px solid gray;
  padding: 0;
  margin: 0;
}

.dropdownArea {
  width: 50%;
}

.fontDropDown {
  width: 100%;
}

.fontDropDown:hover img {
  filter: invert(1);
}

.btn.show img {
  filter: invert(1);
}

.fontList {
  overflow: hidden;
  white-space: nowrap;
}

.fontDropDown:after {
  content: none !important;
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
