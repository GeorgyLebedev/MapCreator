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
          <Transition name="show">
            <div id="cursorOpt" class="tools-options" v-if="tool=='cursor' && optionVisible">
              <div class="d-flex justify-content-between">
                <b> Курсор </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt interactive" height="20" alt=""
                     v-on:click="closePanel">
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
          <Transition name="show">
            <div id="brushOpt" class="tools-options" v-if="tool=='brush' && optionVisible">
              <div class="d-flex justify-content-between">
                <b> Кисть </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt interactive" height="20" alt=""
                     v-on:click="closePanel">
              </div>
              <hr>
              <div class="mb-3">
                <input id="colorsTab" checked type="radio" name="brushType" value="color" v-model="brushOpt.brushType">
                <label for="colorsTab" class="radio-text interactive">Цвета</label>
                <input id="texturesTab" type="radio" name="brushType" value="texture" v-model="brushOpt.brushType">
                <label for="texturesTab" class="ms-1 radio-text interactive">Текстуры</label>
              </div>
              <div id="brushColors" v-if="brushOpt.brushType=='color'">
                Цвет кисти: <br>
                <input type="color" v-model="brushOpt.color">
                <div class="mb-3">
                  Последние цвета:
                  <table class="colorTable">
                    <tr>
                      <td v-for="(color, index) in recentColors" :key="index"
                          class="colorCell interactive"
                          :style="{ 'background-color': color}"
                          @click="brushOpt.color=color ">
                      </td>
                    </tr>
                  </table>
                </div>
                <div>
                  Палитра:
                  <table id="palette" class="colorTable">
                    <tr>
                      <td class="colorCell interactive" v-for="i in 8" :key="i"></td>
                    </tr>
                    <tr>
                      <td class="colorCell interactive" v-for="i in 8" :key="i"></td>
                    </tr>
                    <tr>
                      <td class="colorCell interactive" v-for="i in 8" :key="i"></td>
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
          <Transition name="show">
            <div id="stampOpt" class="tools-options" v-if="(tool=='stamp' && optionVisible) || (selectedObj && selectedObj.type=='stamp')">
              <div class="d-flex justify-content-between">
                <b> Штамп </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt interactive" height="20" alt=""
                     v-on:click="closePanel">
              </div>
              <hr>
              <div class="stampsContainer d-flex mb-2">
                <div class="bigStampContainer">
                <div class="bigStamp interactive">
                  <img :src="require('../assets/images/Stamps/'+ this.stampOpt.currentSet + '/' + this.stampOpt.currentStamp)" alt="">
                </div>
                <div class="switch d-flex justify-content-between">
                  <img src="@/assets/images/leftArrow.png" class="interactive" height="20">
                  <p>12/10</p>
                  <img src="@/assets/images/rightArrow.png" class="interactive" height="20">
                </div>
                </div>
                <div class="stampsTable ms-1 d-flex flex-wrap">
                  <div class="smallStamp mb-1 me-1 interactive" v-for="i in 8" :key="i">
                    <img :src="require('../assets/images/Stamps/'+ stampOpt.currentSet + '/' + stampOpt.currentStamp)" alt="" >
                  </div>
                </div>
              </div>
              <button class="btn btn-outline-dark w-100">Открыть каталог</button>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Размер иконок" >
                <img src="@/assets/images/Tools/Options/size.png" alt="" height="20">
                <input type="range" step="10" min="10" max="500" v-model="stampOpt.scale">
                <input type="number" step="1" min="10" max="500" class="input-number-style" v-model="stampOpt.scale">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Непрозрачность иконок">
                <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
                <input type="range" step="0.1" min="0" max="1" v-model="stampOpt.opacity">
                <input type="number" step="0.1" min="0" max="1" class="input-number-style" v-model="stampOpt.opacity">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Поворот иконок">
                <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
                <input type="range" step="1" min="-180" max="180" v-model="stampOpt.rotation">
                <input type="number" step="1" min="-180" max="180" v-model="stampOpt.rotation" class="input-number-style">
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
          <Transition name="show">
            <div id="shapesOpt" class="tools-options" v-if="(tool=='shape' && optionVisible) || (selectedObj && selectedObj.type=='shape')">
              <div class="d-flex justify-content-between">
                <b> Фигуры </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt interactive" height="20" alt=""
                     v-on:click="closePanel">
              </div>
              <hr>
              <div v-if="!(selectedObj && selectedObj.type=='shape')">
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
              </div>
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
                    <input type="color" v-model="shapeOpt.strokeColor" v-if="shapeOpt.isBorder">
                    <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                         v-if="!shapeOpt.isBorder">
                  </td>
                </tr>
              </table>
              Последние цвета:
              <table class="colorTable">
                <tr>
                  <td v-for="(color, index) in recentColors" :key="index"
                      class="colorCell interactive"
                      :style="{ 'background-color': color}"
                      @click="shapeOpt.fillColor=color; shapeOpt.isFill=true"
                      @contextmenu="shapeOpt.strokeColor=color; shapeOpt.isBorder=true">
                  </td>
                </tr>
              </table>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Толщина контура">
                <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                <input type="range" step="1" min="1" max="50" v-model="shapeOpt.strokeWidth">
                <input type="number" step="1" min="1" max="50" class="input-number-style"
                       v-model="shapeOpt.strokeWidth">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Непрозрачность фигуры">
                <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
                <input type="range" step="0.01" min="0" max="1" v-model="shapeOpt.opacity">
                <input type="number" step="0.01" min="0" max="1" v-model="shapeOpt.opacity" class="input-number-style">
              </div>
              <hr>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Поворот фигуры">
                <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
                <input type="range" step="1" min="-180" max="180" v-model="shapeOpt.rotation">
                <input type="number" step="1" min="-180" max="180" v-model="shapeOpt.rotation" class="input-number-style">
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
          <Transition name="show">
            <div id="pathOpt" class="tools-options" v-if="tool=='path' && optionVisible">
              <div class="d-flex justify-content-between">
                <b> Пути/кривые </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt interactive" height="20" alt=""
                     v-on:click="closePanel">
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
              <Transition name="stretch" mode="out-in">
                <div class="my-3" title="Расстояние между точками" v-if=" pathOpt.style=='dotted'">
                  <img src="@/assets/images/Tools/Options/gapDot.png" alt="" height="20">
                  <input type="range" step="1" min="5" max="50" v-model="pathOpt.dotArray[1]">
                  <input type="number" step="1" min="5" max="50" class="input-number-style"
                         v-model="pathOpt.dotArray[1]">
                </div>
              </Transition>
              <Transition name="stretch" mode="out-in">
                <div v-if="pathOpt.style=='dashed'">
                  <div class="my-3" title="Расстояние между штрихами">
                    <img src="@/assets/images/Tools/Options/gapDash.png" alt="" height="20">
                    <input type="range" step="1" min="5" max="50" v-model="pathOpt.dashArray[1]">
                    <input type="number" step="1" min="5" max="50" class="input-number-style"
                           v-model="pathOpt.dashArray[1]">
                  </div>
                  <div class="my-3" title="Длина штриха">
                    <img src="@/assets/images/Tools/Options/dash.png" alt="" height="20">
                    <input type="range" step="1" min="10" max="50" v-model="pathOpt.dashArray[0]">
                    <input type="number" step="1" min="10" max="50" class="input-number-style"
                           v-model="pathOpt.dashArray[0]">
                  </div>
                </div>
              </Transition>
              <hr>
              Цвет линии: <br>
              <input type="color" v-model="pathOpt.color">
              <div class="mb-3">
                Последние цвета:
                <table class="colorTable">
                  <tr>
                    <td v-for="(color, index) in recentColors" :key="index"
                        class="colorCell interactive"
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
          <Transition name="show">
            <div id="textOpt" class="tools-options" v-if="(tool=='text' && optionVisible) || (selectedObj && selectedObj.type=='text')">
              <div class="d-flex justify-content-between">
                <b> Надпись </b>
                <img src="@/assets/images/arrow-left.png" class="closeOpt interactive" height="20" alt=""
                     v-on:click="closePanel">
              </div>
              <hr>
              <textarea id="text" class="px-1" cols="24" rows="3" v-model="textOpt.content"
                        :style="{'font-family':textOpt.fontFamily}"></textarea>
              <hr>
              <div class="d-flex align-items-center justify-content-between">
                Шрифт
                <div class="dropdown dropdownArea" :style="{'font-family':textOpt.fontFamily}">
                  <a class="fontDropDown btn btn-sm btn-outline-dark dropdown-toggle"
                     id="dropdownMenuBorder" data-bs-toggle="dropdown"
                     aria-expanded="false">
                    <div class="d-flex justify-content-between">
                      <div class="fontList"> {{ textOpt.fontFamily }}</div>
                      <img src="@/assets/images/downArrow.png" height="20" alt="">
                    </div>
                  </a>
                  <div class="dropdown-menu p-2">
                    <div class="dropdown-item"
                         v-for="font in fontsCollection" :key="font"
                         @click="textOpt.fontFamily=font"
                         :style="{'font-family':font}">{{ font }}
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <input type="checkbox" class="form-check-input me-2" id="textFillChbx" checked
                         v-model="textOpt.isFill" @change="setFill(textOpt)">
                  <label for="textFillChbx">Цвет текста</label>
                </div>
                <input type="color" v-model="textOpt.fillColor" v-if="textOpt.isFill">
                <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                     v-if="!textOpt.isFill">
              </div>
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
                <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
                <input type="range" step="1" min="-180" max="180" v-model="textOpt.rotation">
                <input type="number" step="1" min="-180" max="180" v-model="textOpt.rotation" class="input-number-style">
              </div>
              <hr>
              Положение текста:
              <div class="d-flex">
                <div class="card radio-icon me-2">
                  <input id="textLeftId" type="radio" value="left" name="shapeTypeRadio"
                         v-model="textOpt.justification">
                  <label for="textLeftId" title="Слева">
                    <img src="@/assets/images/Tools/Options/textLeft.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="textCenterId" type="radio" value="center" name="shapeTypeRadio"
                         v-model="textOpt.justification">
                  <label for="textCenterId" title="По центру">
                    <img src="@/assets/images/Tools/Options/textCenter.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
                <div class="card radio-icon mx-2">
                  <input id="textRightId" type="radio" value="right" name="shapeTypeRadio"
                         v-model="textOpt.justification">
                  <label for="textRightId" title="Справа">
                    <img src="@/assets/images/Tools/Options/textRight.png" class="card-img-top p-1 icon-sm" alt="">
                  </label>
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <input type="checkbox" class="form-check-input me-2" id="textBorderChbx"
                         v-model="textOpt.isBorder" @change="setBorder(textOpt)">
                  <label for="shapeFillChbx">Обводка</label>
                </div>
                <input type="color" v-model="textOpt.strokeColor" v-if="textOpt.isBorder">
                <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                     v-if="!textOpt.isBorder">
              </div>
              <Transition name="stretch" mode="out-in">
                <div title="Толщина обводки" class="mt-3" v-if="textOpt.isBorder">
                  <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                  <input type="range" step="1" min="1" max="10" v-model="textOpt.strokeWidth">
                  <input type="number" step="1" min="1" max="10" v-model="textOpt.strokeWidth"
                         class="input-number-style">
                </div>
              </Transition>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <input type="checkbox" class="form-check-input me-2 " id="textShadowChbx" v-model="textOpt.isShadow"
                         @change="setShadow(textOpt)" :disabled="!textOpt.isFill">
                  <label for="shapeBorderChbx">Тень</label>
                </div>
                <input type="color" v-model="textOpt.shadowColor" v-if="textOpt.isShadow">
                <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                     v-if="!textOpt.isShadow">
              </div>
              <Transition name="stretch" mode="out-in">
                <div v-if="textOpt.isShadow">
                <div title="Смещение тени по Х" class="mt-3">
                  <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                  <input type="range" step="1" min="-10" max="10" v-model="textOpt.shOffsetX">
                  <input type="number" step="1" min="-10" max="10" v-model="textOpt.shOffsetX"
                         class="input-number-style">
                </div>
                <div title="Смещение тени по Y" class="mt-3">
                  <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                  <input type="range" step="1" min="-10" max="10" v-model="textOpt.shOffsetY">
                  <input type="number" step="1" min="-10" max="10" v-model="textOpt.shOffsetY"
                         class="input-number-style">
                </div>
                <div title="Размытие тени" class="mt-3">
                  <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
                  <input type="range" step="1" min="1" max="10" v-model="textOpt.shadowBlur">
                  <input type="number" step="1" min="1" max="10" v-model="textOpt.shadowBlur"
                         class="input-number-style">
                </div>
                </div>
              </Transition>
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
    recentColors: {
      type: Array,
    },
    selectedObj:{
      type: Object
    },
    rotation:{
      type: Number
    },
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
      stampOpt:{
        size: 500,
        scale: 50,
        opacity: 1,
        rotation: 0,
        revert: "none",
        currentSet: "firstSet",
        currentStamp: "stampEx.svg",
        currentStampPath: undefined,
        stampSetArray: []
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
        strokeWidth: 1,
        strokeColor: "#000000",
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
        content: "Текст",
        fontFamily: "Cambria",
        fontSize: 10,
        justification: "left",
        fillColor: "#ffffff",
        strokeColor: "#000000",
        strokeWidth: 1,
        shadowColor: "#000000",
        shadowBlur:1,
        shOffsetX: 0,
        shOffsetY: 0,
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
    setFill(opt) {
      opt.fillColor = opt.isFill ? "#ffffff" : "transparent"
      if(opt.isShadow && !opt.isFill) opt.isShadow=false
    },
    setBorder(opt) {
      opt.strokeColor = opt.isBorder ? "#000000" : "transparent"
    },
    setShadow(opt) {
      opt.shadowColor = opt.isShadow ? "#000000" : "transparent"
    },
    closePanel(){
      this.optionVisible=false
      if(this.selectedObj)
        this.$emit("removeSelect")
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
        case "stamp":
          this.stampOpt.currentStampPath='../assets/images/Stamps/'+ this.stampOpt.currentSet + '/' + this.stampOpt.currentStamp
          console.log(this.stampOpt.currentStampPath)
          this.$emit('optChange', this.stampOpt)
          break
        case "shape":
          this.$emit('optChange', this.shapeOpt)
          break
        case "path":
          this.$emit('optChange', this.pathOpt)
          break
        case "text":
          this.$emit('optChange', this.textOpt)
          break
        default:
          return
      }
    },
    selectedObj:{
    handler(val){
      if(val) {
        this.optionVisible=false
        if(val.type=="text"){
          this.textOpt.content=val.content
          this.textOpt.fontFamily=val.fontFamily
          this.textOpt.fontSize=val.fontSize
          this.textOpt.justification=val.justification
          this.textOpt.fillColor=val.data.isFill? val.fillColor.toCSS(true) : "transparent"
          this.textOpt.strokeColor=val.data.isBorder? val.strokeColor.toCSS(true) : "transparent"
          this.textOpt.strokeWidth=val.data.isBorder? val.strokeWidth : 0
          this.textOpt.shadowColor=val.data.isShadow? val.shadowColor.toCSS(true) : "transparent"
          this.textOpt.shadowBlur=val.data.isShadow? val.shadowBlur : 0
          this.textOpt.shOffsetX=val.data.shOffsetX
          this.textOpt.shOffsetY=val.data.shOffsetY
          this.textOpt.opacity=val.opacity
          this.textOpt.isBorder=val.data.isBorder
          this.textOpt.isFill=val.data.isFill
          this.textOpt.isShadow=val.data.isShadow
        }
        if(val.type=="shape"){
          this.shapeOpt.strokeColor=val.data.isBorder? val.strokeColor.toCSS(true) : "transparent"
          this.shapeOpt.fillColor=val.data.isFill? val.fillColor.toCSS(true) : "transparent"
          this.shapeOpt.strokeWidth=val.data.isBorder? val.strokeWidth : 0
          this.shapeOpt.opacity=val.opacity
          this.shapeOpt.isBorder=val.data.isBorder
          this.shapeOpt.isFill=val.data.isFill
        }
        if(val.type=="stamp"){
          this.stampOpt.scale=val.data.scale
        }
      }
    }
    },
    rotation:{
      handler(val){
        if(!val) return
        switch (this.selectedObj.type) {
          case "text":
            this.textOpt.rotation = Math.round(val)
                break
          case "shape":
            this.shapeOpt.rotation = Math.round(val)
                break
          case "stamp":
            this.stampOpt.rotation = Math.round(val)
                break
        }
      }
    },
    brushOpt: {
      handler() {
        this.$emit('optChange', this.brushOpt)
      }, deep: true
    },
    stampOpt: {
      handler() {
        if(this.selectedObj) {
          Object.assign(this.selectedObj, this.stampOpt)
          this.$emit("update",this.selectedObj, this.stampOpt)
          this.$emit("newSelect", this.selectedObj)
        }
     /*   this.stampOpt.currentStampPath='../assets/images/Stamps/'+ this.stampOpt.currentSet + '/' + this.stampOpt.currentStamp
        console.log(this.stampOpt.currentStampPath)*/
        this.$emit('optChange', this.stampOpt)
      }, deep: true
    },
    shapeOpt: {
      handler() {
        if(this.selectedObj) {
          //Object.assign(this.selectedObj, this.shapeOpt)
          this.$emit("update",this.selectedObj, this.shapeOpt)
          this.$emit("newSelect", this.selectedObj)
        }
        this.$emit('optChange', this.shapeOpt)
      }, deep: true
    },
    pathOpt: {
      handler() {
        this.$emit('optChange', this.pathOpt)
      }, deep: true
    },
    textOpt: {
      handler() {
        if(this.selectedObj) {
          Object.assign(this.selectedObj, this.textOpt)
          this.$emit("update",this.selectedObj, this.textOpt)
          this.$emit("newSelect", this.selectedObj)
        }
        this.$emit('optChange', this.textOpt)
      }, deep: true
    },
  }
}
</script>
<style>
#toolsPanel {
  grid-area: ToolsPanel;
  position: fixed;
  left:0;
  z-index: 4;
}

#text {
  width: 235px;
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
  z-index: 2;
}

.options-table tr {
  height: 40px;
}

.options-table {
  width: 100%;
}
.stampsContainer{
  max-width:240px;
  max-height: 120px;
}
.bigStamp{
  border: 1px solid gainsboro;
  border-radius: 5px;
}
.bigStampContainer{
  width: 45%;
  height: 100%;
}
.bigStamp img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.smallStamp{
  width: 30%;
  height: 30%;
  border: 1px solid gainsboro;
  border-radius: 5px;
}
.smallStamp img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.stampsTable{
  width: 55%;
  max-width: 60%;
  max-height: 100%;
  height: 100%;
}
.dropdown-item:active {
  background: #232323;
  color: white;
}

.interactive{
  cursor: pointer;
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

.show-enter-active,
.show-leave-active {
  transition: all 0.3s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
  transform: translateX(-400px) scaleX(0);
}

.stretch-enter-from,
.stretch-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.stretch-enter-active,
.stretch-leave-active {
  transition: all 0.3s ease;
}
</style>
