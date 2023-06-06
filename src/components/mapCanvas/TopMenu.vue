<template>
  <Error
      :error="this.error"
      @clearError="this.error=''"/>
  <div id="header" class="flexRow alignCenter topMenu">
    <div class="invisibleContainer" @click="showMenuOptions=showCanvasOptions=false" v-if="showMenuOptions||showCanvasOptions"></div>
    <button class="buttonLight" @click="openMenuOptions">
      <div class="flexRow alignCenter">
        <svg fill="#3d4551" class="dropdownFlag" :class="{'openedFlag':showMenuOptions}" width="800px" height="800px"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21,21H3L12,3Z"/>
        </svg>
        Меню
      </div>
    </button>
    <Transition name="popup-anim">
    <div class="dropdownMenu" v-if="showMenuOptions">
      <p class="" @click="this.$emit('showMapEditWindow')">Изменить информацию о карте</p>
      <p>Сохранить</p>
      <details>
        <summary>
          Открыть...
        </summary>
        <p @click="this.$refs.imgInput.click()" class="nestedDetails">Фоновое изображение</p>
        <p @click="this.$refs.jsonInput.click()" class="nestedDetails">Файл с картой (.JSON)</p>
      </details>
      <details>
        <summary>
          Экспортировать как...
        </summary>
        <p @click="this.$emit('saveAs','png')" class="nestedDetails">PNG</p>
        <p @click="this.$emit('saveAs','jpg')" class="nestedDetails">JPEG</p>
        <p @click="this.$emit('saveAs','pdf')" class="nestedDetails">PDF</p>
        <p @click="this.$emit('saveAs','svg')" class="nestedDetails">SVG</p>
        <p @click="this.$emit('saveAs','json')" class="nestedDetails">JSON</p>
      </details>
      <hr>
      <p>Дублировать карту</p>
      <p>Изменить размер холста</p>
      <hr>
      <p @click="this.$router.push('/')">На главную страницу</p>
    </div>
    </Transition>
    <div>
      <button class="buttonLight" @click="openCanvasOptions">
        <div class="flexRow alignCenter">
          <svg fill="#3d4551" class="dropdownFlag" :class="{'openedFlag':showCanvasOptions}" width="800px"
               height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21,21H3L12,3Z"/>
          </svg>
          Холст
        </div>
      </button>
      <Transition name="popup-anim">
      <div class="dropdownMenu" v-if="showCanvasOptions">
        <div class="flexRow alignCenter">
          <input id="backgroundCheckbox" v-model="backgroundFlag" type="checkbox" @change="updateBackground()">
          <label for="backgroundCheckbox">Цвет фона</label>
        </div>
        <div v-if="backgroundFlag">
          <hr>
          Значение:<br>
          <input type="color" v-model="backgroundColor"
                 @input="this.$emit('setCanvasBackground', {type: 'color', value:backgroundColor})">
        </div>
      </div>
      </Transition>
    </div>
    <input type="file" :hidden="true" ref="imgInput" accept=".png, .jpg, .jpeg, .svg" @change="imgLoad">
    <input type="file" :hidden="true" ref="jsonInput" accept=".json" @change="jsonLoad">
    <button type="button" class="buttonLight stepButton" title="На шаг назад" hidden>
      <img src="@/assets/images/undo.png" class="hoverInvert" alt="">
    </button>
    <button type="button" class="buttonLight stepButton" title="На шаг вперёд" hidden>
      <img src="@/assets/images/redo.png" class="hoverInvert" alt="">
    </button>
  </div>
</template>
<script>
import Error from "@/components/Error";

export default {
  name: "TopMenu",
  components: {
    Error
  },
  props: {
    canvasSize: {
      type: Object
    }
  },
  emits: [
    'saveAs',
    'showMapEditWindow',
    'showImageLoadWindow',
    'setCanvasBackground',
    'removeCanvasBackground',
    'loadJson'
  ],
  data() {
    return {
      error: "",
      backgroundColor: "#eeeeee",
      backgroundFlag: true,
      showMenuOptions: false,
      showCanvasOptions: false,
    }
  },
  methods: {
    openMenuOptions() {
      this.showMenuOptions = !this.showMenuOptions
      this.showCanvasOptions = false
    },
    openCanvasOptions() {
      this.showMenuOptions = false
      this.showCanvasOptions = !this.showCanvasOptions
    },
    updateBackground() {
      if (this.backgroundFlag)
        this.$emit('setCanvasBackground', {type: 'color', value: this.backgroundColor})
      else
        this.$emit('removeCanvasBackground')
    },
    imgLoad() {
      let extensions = ['png', 'jpeg', 'jpg', 'svg']
      const imgFile = event.target.files[0];
      if (extensions.indexOf(imgFile.name.split('.').pop().toLowerCase()) == -1) {
        this.error = "Расширение выбранного файла не поддерживается!"
        return
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
          try {
            this.loadBackgroundImage(reader.result)
            this.$refs.imgInput.value = ""
          } catch (e) {
            this.error = e.message
          }
        };
      }
    },
    jsonLoad() {
      try {
        const jsonFile = event.target.files[0];
        if (jsonFile.name.split('.').pop().toLowerCase() !== "json") {
          this.error = "Выбранный файл не является файлом формата JSON!"
        } else {
          const reader = new FileReader();
          reader.readAsText(jsonFile);
          reader.onload = () => {
            try {
              const jsonData = JSON.parse(reader.result);
              this.$refs.jsonInput.value = ""
              this.$emit("loadJson", jsonData)
            } catch (e) {
              this.error = e.message
            }
          };
        }
      } catch (e) {
        this.error = e.message
      }
    },
    loadBackgroundImage(base64) {
      let backgroundImage = new Image()
      backgroundImage.src = base64
      this.backgroundFlag = false
      backgroundImage.onload = () => {
        const background = {
          type: "image",
          source: base64,
          width: backgroundImage.width,
          height: backgroundImage.height
        }
        if (backgroundImage.width == this.canvasSize.width && backgroundImage.height == this.canvasSize.height) //если размер изображения соответствует размерам холста
          this.$emit('setCanvasBackground', background)
        else this.$emit("showImageLoadWindow", background)
        backgroundImage = null
      }
    }
  }
}
</script>
<style scoped>
summary:not(.buttonLight) {
  padding: 10px;
  cursor: pointer;
}

.dropdownMenu p:hover {
  cursor: pointer;
  background-color: #728391;
  color: white;
}

.dropdownMenu p {
  padding-top: 10px;
  padding-inline: 5px;
}

.nestedDetails {
  text-align: right;
}

.topMenu {
  padding-left: 41px;
  grid-area: TopMenu;
  background-color: white;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid #dcdcdc;
}

.stepButton {
  height: 30px;
}

.stepButton img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.dropdownMenu {
  position: absolute;
  top: 37px;
  background-color: white;
  max-width: 300px;
  z-index: 4;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 10px;
  user-select: none;
}
.buttonLight{
  font-size: large;
}
</style>
