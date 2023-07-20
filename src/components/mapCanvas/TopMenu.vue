<template>
  <div id="header" class="flex-row align-center top-menu">
    <div class="container-invisible" @click="showMenuOptions=showCanvasOptions=false" v-if="showMenuOptions||showCanvasOptions"></div>
    <button class="button-light button-small" @click="openMenuOptions">
      <div class="flex-row align-center">
        <svg fill="#3d4551" class="dropdown-flag svg-light-fill" :class="{'opened':showMenuOptions}" width="800px" height="800px"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21,21H3L12,3Z"/>
        </svg>
        Меню
      </div>
    </button>
    <Transition name="dropdown-show">
    <div class="dropdown-menu" v-if="showMenuOptions">
      <p class="" @click="this.$emit('showMapEditWindow')">Изменить информацию о карте</p>
      <p>Сохранить</p>
      <details>
        <summary>
          Открыть...
        </summary>
        <p @click="this.$refs.imgInput.click()" class="nested-details">Фоновое изображение</p>
        <p @click="this.$refs.jsonInput.click()" class="nested-details">Файл с картой (.JSON)</p>
      </details>
      <details>
        <summary>
          Экспортировать как...
        </summary>
        <p @click="this.$emit('saveAs','png')" class="nested-details">PNG</p>
        <p @click="this.$emit('saveAs','jpg')" class="nested-details">JPEG</p>
        <p @click="this.$emit('saveAs','pdf')" class="nested-details">PDF</p>
        <p @click="this.$emit('saveAs','svg')" class="nested-details">SVG</p>
        <p @click="this.$emit('saveAs','json')" class="nested-details">JSON</p>
      </details>
      <hr>
      <p>Дублировать карту</p>
      <p>Изменить размер холста</p>
      <hr>
      <p @click="this.$router.push('/')">На главную страницу</p>
    </div>
    </Transition>
    <div>
      <button class="button-light button-small" @click="openCanvasOptions">
        <div class="flex-row align-center">
          <svg fill="#3d4551" class="dropdown-flag svg-light-fill" :class="{'opened':showCanvasOptions}" width="800px"
               height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21,21H3L12,3Z"/>
          </svg>
          Холст
        </div>
      </button>
      <Transition name="dropdown-show">
      <div class="dropdown-menu" v-if="showCanvasOptions">
        <div class="flex-row align-center">
          <input id="backgroundCheckbox" v-model="backgroundFlag" type="checkbox" @change="updateBackground()">
          <label for="backgroundCheckbox">Цвет фона</label>
        </div>
        <div v-if="backgroundFlag">
          <hr>
          Значение:<br>
	    <div :style="{'background-color': backgroundColor}" class="color-picker-cell" @click="$refs.backgroundColor.click()">
		    <input type="color" ref="backgroundColor" v-model="backgroundColor" @input="this.$emit('setCanvasBackground', {type: 'color', value:backgroundColor})">
	    </div>
        </div>
      </div>
      </Transition>
    </div>
    <input type="file" :hidden="true" ref="imgInput" accept=".png, .jpg, .jpeg, .svg" @change="imgLoad">
    <input type="file" :hidden="true" ref="jsonInput" accept=".json" @change="jsonLoad">
    <button type="button" class="button-light step-button" title="На шаг назад" hidden>
      <img src="@/assets/images/undo.png" class="hoverInvert" alt="">
    </button>
    <button type="button" class="button-light step-button" title="На шаг вперёд" hidden>
      <img src="@/assets/images/redo.png" class="hoverInvert" alt="">
    </button>
  </div>
</template>
<script>

export default {
  name: "TopMenu",
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
        this.$store.commit("setNotification", ["message","Расширение выбранного файла не поддерживается."])
        return
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
          try {
            this.loadBackgroundImage(reader.result)
            this.$refs.imgInput.value = ""
          } catch (e) {
            this.$store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
          }
        };
      }
    },
    jsonLoad() {
      try {
        const jsonFile = event.target.files[0];
        if (jsonFile.name.split('.').pop().toLowerCase() !== "json") {
          this.$store.commit("setNotification", ["message","Выбранный файл не является файлом формата JSON."])
        } else {
          const reader = new FileReader();
          reader.readAsText(jsonFile);
          reader.onload = () => {
            try {
              const jsonData = JSON.parse(reader.result);
              this.$refs.jsonInput.value = ""
              this.$emit("loadJson", jsonData)
            } catch (e) {
              this.$store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
            }
          };
        }
      } catch (e) {
        this.$store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
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
<style scoped lang="sass">
@use '@/assets/styles/Variables'
#header
  background-color: Variables.$medium-light-color

summary:not(.button-light)
  padding: 10px
  cursor: pointer


.dropdown-menu p:hover
  cursor: pointer
  background-color: Variables.$medium-color
  color: Variables.$light-color


.dropdown-menu p
  padding-top: 10px
  padding-inline: 5px


.nested-details
  text-align: right


.top-menu
  padding-left: 41px
  grid-area: TopMenu
  background-color: Variables.$light-color
  position: relative
  z-index: 2
  border-bottom: 1px solid Variables.$medium-color


.step-button
  height: 30px


.step-button img
  width: 100%
  height: 100%
  object-fit: contain


.dropdown-menu
  position: absolute
  top: 37px
  background-color: Variables.$light-color
  max-width: 300px
  z-index: 4
  border: 1px solid Variables.$medium-color
  border-radius: 10px
  padding: 10px
  user-select: none

</style>
