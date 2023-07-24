<template>
    <div id="header" class="flex-row align-center top-menu">
	<div v-if="showMenuOptions||showCanvasOptions" class="container-invisible" @click="showMenuOptions=showCanvasOptions=false"></div>
	<button class="button-light button-small" @click="openMenuOptions">
	    <div class="flex-row align-center">
		<svg :class="{opened:showMenuOptions}" class="dropdown-flag svg-light-fill" height="20px" version="1.1" viewBox="-6.5 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg">
		    <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
		</svg>
		Меню
	    </div>
	</button>
	<Transition name="dropdown-show">
	    <div v-if="showMenuOptions" class="dropdown-menu">
		<p class="" @click="this.$emit('showMapEditWindow')">Изменить информацию о карте</p>
		<p>Сохранить</p>
		<details>
		    <summary @click="fileOpenFlag=!fileOpenFlag">
			<svg :class="{opened:fileOpenFlag}" class="dropdown-flag svg-dark-fill" height="20px" version="1.1" viewBox="-6.5 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg">
			    <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
			</svg>
			Открыть...
		    </summary>
		    <p class="nested-details" @click="this.$refs.imgInput.click()">Фоновое изображение</p>
		    <p class="nested-details" @click="this.$refs.jsonInput.click()">Файл с картой (.JSON)</p>
		</details>
		<details>
		    <summary @click="fileExportFlag=!fileExportFlag">
			<svg :class="{opened:fileExportFlag}" class="dropdown-flag svg-dark-fill" height="20px" version="1.1" viewBox="-6.5 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg">
			    <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
			</svg>
			Экспортировать как...
		    </summary>
		    <p class="nested-details" @click="this.$emit('saveAs','png')">PNG</p>
		    <p class="nested-details" @click="this.$emit('saveAs','jpg')">JPEG</p>
		    <p class="nested-details" @click="this.$emit('saveAs','pdf')">PDF</p>
		    <p class="nested-details" @click="this.$emit('saveAs','svg')">SVG</p>
		    <p class="nested-details" @click="this.$emit('saveAs','json')">JSON</p>
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
		    <svg :class="{opened:showCanvasOptions}" class="dropdown-flag svg-light-fill" height="20px" version="1.1" viewBox="-6.5 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg">
			<path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
		    </svg>
		    Холст
		</div>
	    </button>
	    <Transition name="dropdown-show">
		<div v-if="showCanvasOptions" class="dropdown-menu">
		    <div class="flex-row align-center">
			<input id="backgroundCheckbox" v-model="backgroundFlag" type="checkbox" @change="updateBackground()">
			<label for="backgroundCheckbox">Цвет фона</label>
		    </div>
		    <div v-if="backgroundFlag">
			<hr>
			Значение:<br>
			<div :style="{'background-color': backgroundColor}" class="color-picker-cell" @click="$refs.backgroundColor.click()">
			    <input ref="backgroundColor" v-model="backgroundColor" type="color" @input="this.$emit('setCanvasBackground', {type: 'color', value:backgroundColor})">
			</div>
		    </div>
		</div>
	    </Transition>
	</div>
	<input ref="imgInput" :hidden="true" accept=".png, .jpg, .jpeg, .svg" type="file" @change="imgLoad">
	<input ref="jsonInput" :hidden="true" accept=".json" type="file" @change="jsonLoad">
	<button class="button-light step-button" hidden title="На шаг назад" type="button">
	    <img alt="" class="hoverInvert" src="@/assets/images/undo.png">
	</button>
	<button class="button-light step-button" hidden title="На шаг вперёд" type="button">
	    <img alt="" class="hoverInvert" src="@/assets/images/redo.png">
	</button>
    </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "TopMenu",
    props: {
        canvasSize: {
            type: Object as () => { width: number, height: number },
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
            backgroundColor: "#eeeeee" as string,
            backgroundFlag: true as boolean,
            showMenuOptions: false as boolean,
            showCanvasOptions: false as boolean,
            fileExportFlag: false as boolean,
            fileOpenFlag: false as boolean,
        }
    },
    methods: {
        openMenuOptions():void {
            this.showMenuOptions = !this.showMenuOptions
            this.showCanvasOptions = false
        },
        openCanvasOptions():void {
            this.showMenuOptions = false
            this.showCanvasOptions = !this.showCanvasOptions
        },
        updateBackground():void {
            if (this.backgroundFlag)
                this.$emit('setCanvasBackground', {type: 'color', value: this.backgroundColor})
            else
                this.$emit('removeCanvasBackground')
        },
        imgLoad(event: Event & { target: HTMLInputElement }):void {
            let extensions = ['png', 'jpeg', 'jpg', 'svg']
            const imgFile = event.target.files?.[0];
						if(!imgFile) return
            if (extensions.indexOf(imgFile.name.split('.').pop()?.toLowerCase()  as string) == -1) {
                this.$store.commit("setNotification", ["message", "Расширение выбранного файла не поддерживается."])
                return
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(imgFile);
                reader.onload = () => {
                    try {
                        this.loadBackgroundImage(reader.result as string)
                        const input = this.$refs.jsonInput as HTMLInputElement
                        input.value = ""
                    } catch (e: any) {
                        this.$store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
                    }
                };
            }
        },
        jsonLoad(event: Event & { target: HTMLInputElement }):void{
            try {
                const jsonFile = event.target.files?.[0];
								if(!jsonFile) return
                if (jsonFile.name.split('.').pop()?.toLowerCase() !== "json") {
                    this.$store.commit("setNotification", ["message", "Выбранный файл не является файлом формата JSON."])
                } else {
                    const reader = new FileReader();
                    reader.readAsText(jsonFile);
                    reader.onload = () => {
                        try {
                            const jsonData = JSON.parse(reader.result as string);
                            const input = this.$refs.jsonInput as HTMLInputElement
                            input.value = ""
                            this.$emit("loadJson", jsonData)
                        } catch (e: any) {
                            this.$store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
                        }
                    };
                }
            } catch (e: any) {
                this.$store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
            }
        },
        loadBackgroundImage(base64: string):any{
            let backgroundImage = new Image() as any
            backgroundImage.src = base64
            this.backgroundFlag = false
            backgroundImage.onload = () => {
                const background = {
                    type: "image",
                    source: base64,
                    width: backgroundImage.width,
                    height: backgroundImage.height
                }
                if (backgroundImage.width == this.canvasSize?.width && backgroundImage.height == this.canvasSize?.height) //если размер изображения соответствует размерам холста
                    this.$emit('setCanvasBackground', background)
                else this.$emit("showImageLoadWindow", background)
                backgroundImage = undefined
            }
        }
    }
})
</script>
<style lang="sass" scoped>
@use '@/assets/styles/Variables'
#header
  background-color: Variables.$medium-light-color

summary:not(.button-light)
  padding: 10px
  cursor: pointer

summary
  display: flex
  flex-direction: row
  align-items: center

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
