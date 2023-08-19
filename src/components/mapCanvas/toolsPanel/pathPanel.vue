<template>
    <div id="pathOptions" class="tools-options">
	<div class="scroll-container">
	    <div class="flex-row justify-between align-center">
		<b> Пути/кривые </b>
		<svg class="close-options-img" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64" @click="$emit('closePanel')">
		    <g><path d="  M 17.05 31.58  A 0.46 0.45 46.3 0 0 17.04 32.24  Q 26.02 41.06 34.88 50.04  C 36.05 51.23 36.53 52.34 35.07 53.54  A 1.86 1.86 0.0 0 1 32.58 53.42  Q 22.85 43.77 13.02 33.97  Q 11.05 32.01 13.03 30.04  Q 22.85 20.25 32.67 10.47  Q 34.39 8.75 35.63 10.84  Q 36.35 12.05 35.35 13.11  Q 26.50 22.63 17.05 31.58  Z"/><path d="  M 33.04 31.58  A 0.47 0.46 44.6 0 0 33.05 32.24  Q 42.02 41.07 50.88 50.04  C 52.05 51.23 52.53 52.34 51.07 53.54  A 1.86 1.86 0.0 0 1 48.58 53.42  Q 38.85 43.77 29.02 33.97  Q 27.05 32.01 29.03 30.04  Q 38.74 20.36 48.56 10.81  Q 50.10 9.32 51.51 10.67  A 1.80 1.79 -45.5 0 1 51.53 13.24  L 33.04 31.58  Z"/></g>
		</svg>
	    </div>
	    <hr>
	    <p>Тип линии:</p>
	    <div class="flex-row">
		<button class="type-select-button"
			:class="{'selected':pathType=='line'}"
			@click="pathType='line'"
			title="Прямая">
		    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
			<rect  x="-41.68" y="-2.03" transform="translate(32.05,32.20) rotate(-45.0)" width="83.36" height="4.06" rx="2.00"/>
		    </svg>
		</button>
		<button class="type-select-button"
			:class="{'selected':pathType=='polyline'}"
			@click="pathType='polyline'"
			title="Ломаная">
		    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
			<path d="  M 43.86 37.01  A 0.33 0.33 0.0 0 0 44.46 36.97  L 57.93 3.95  A 1.79 1.78 23.7 0 1 60.35 3.01  Q 61.99 3.79 61.28 5.67  Q 54.40 23.71 47.04 41.56  C 46.01 44.05 43.73 44.35 42.27 41.99  Q 36.26 32.23 30.28 22.35  A 0.30 0.30 0.0 0 0 29.72 22.52  Q 30.24 36.65 30.51 50.99  C 30.56 54.13 28.91 54.86 26.23 53.64  Q 21.44 51.45 16.72 49.19  A 0.68 0.66 -55.7 0 0 15.94 49.35  Q 10.73 55.11 5.80 61.00  Q 4.35 62.74 2.42 62.00  A 1.60 1.60 0.0 0 1 1.74 59.50  Q 7.62 52.27 13.62 45.61  C 16.00 42.98 23.10 47.62 25.86 48.62  A 0.34 0.34 0.0 0 0 26.32 48.29  L 25.46 13.57  A 1.59 1.58 3.5 0 1 27.28 11.97  Q 29.12 12.25 29.95 13.60  Q 37.08 25.15 43.86 37.01  Z"/>
		    </svg>
		</button>
		<button class="type-select-button"
			:class="{'selected':pathType=='curve'}"
			@click="pathType='curve'"
			title="Кривая">
		    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
			<path d="  M 29.69 16.19  C 33.83 6.63 50.76 1.96 60.01 0.98  C 64.03 0.56 64.39 5.76 60.10 6.51  C 52.40 7.85 43.27 10.12 37.46 15.22  C 29.86 21.89 35.56 36.74 32.91 45.76  C 29.58 57.11 13.62 62.01 3.31 63.24  A 2.16 2.16 0.0 0 1 1.03 61.83  C 0.00 58.95 1.65 57.98 4.21 57.48  C 11.97 55.96 26.19 52.33 27.80 42.80  C 29.34 33.72 25.78 25.19 29.69 16.19  Z"/>
		    </svg>
		</button>
	    </div>
	    <hr>
	    <p>Стиль линии:</p>
	    <div class="flex-row">
		<button class="type-select-button"
			:class="{'selected':style=='default'}"
			@click="style='default'"
			title="Прямая">
		    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
			<rect  x="-41.68" y="-2.03" transform="translate(32.05,32.20) rotate(-45.0)" width="83.36" height="4.06" rx="2.00"/>
		    </svg>
		</button>
		<button class="type-select-button"
			:class="{'selected':style=='dashed'}"
			@click="style='dashed'"
			title="Пунктирная">
		    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
			<rect x="-1.72" y="-9.13" transform="translate(55.29,8.92) rotate(44.2)" width="3.44" height="18.26" rx="1.67"/><rect x="-1.72" y="-11.64" transform="translate(32.63,32.01) rotate(44.3)" width="3.44" height="23.28" rx="1.60"/><rect x="-1.73" y="-9.10" transform="translate(10.07,55.10) rotate(44.4)" width="3.46" height="18.20" rx="1.55"/>
		    </svg>
		</button>
		<button class="type-select-button"
			:class="{'selected':style=='dotted'}"
			@click="style='dotted'"
			title="Точечная">
		    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
			<g><circle cx="60.45" cy="3.65" r="2.61"/><circle cx="53.57" cy="10.73" r="2.63"/><circle cx="46.59" cy="17.83" r="2.64"/><circle cx="39.60" cy="25.02" r="2.63"/><circle cx="32.64" cy="32.08" r="2.63"/><circle cx="25.67" cy="39.19" r="2.61"/><circle cx="18.73" cy="46.27" r="2.61"/><circle cx="11.82" cy="53.37" r="2.60"/><circle cx="4.87" cy="60.42" r="2.53"/></g>
		    </svg>
		</button>
	    </div>
	    <Transition name="stretch" mode="out-in">
		<div v-if=" style=='dotted'">
		    <hr>
		    <div class="flex-row align-center" title="Расстояние между точками">
			<img src="@/assets/images/Tools/Options/gapDot.png" alt="" height="20">
			<input type="range" step="1" min="5" max="50" v-model="dotArray[1]">
			<input type="number" step="1" min="5" max="50"
			       v-model="dotArray[1]">
		    </div>
		</div>
	    </Transition>
	    <Transition name="stretch" mode="out-in">
		<div v-if="style=='dashed'">
		    <hr>
		    <div class="flex-row align-center" title="Расстояние между штрихами">
			<img src="@/assets/images/Tools/Options/gapDash.png" alt="" height="20">
			<input type="range" step="1" min="5" max="50" v-model="dashArray[1]">
			<input type="number" step="1" min="5" max="50"
			       v-model="dashArray[1]">
		    </div>
		    <hr>
		    <div class="flex-row align-center" title="Длина штриха">
			<img src="@/assets/images/Tools/Options/dash.png" alt="" height="20">
			<input type="range" step="1" min="5" max="50" v-model="dashArray[0]">
			<input type="number" step="1" min="5" max="50"
			       v-model="dashArray[0]">
		    </div>
		</div>
	    </Transition>
	    <hr>
	    <table class="style-table">
		<tr>
		    <td>
			<div class="flex-row">
			    Цвет линии:
			</div>
		    </td>
		    <div :style="{'background-color': color}" class="color-picker-cell" @click="$refs.brushColor.click()">
			<input type="color" ref="brushColor" v-model="color" @input="this.$store.commit('colorsStore/updateLastColor', color)">
		    </div>
		</tr>
	    </table>
	    <recent-colors :source="'lineColor'" @setLineColor="color=>this.color=color"/>
	    <colors-palette :color="color" :source="'lineColor'" @setLineColor="color=>this.color=color"/>
	    <hr>
	    <div class="flex-row">
		<input type="checkbox" id="roundCapChbxId" v-model="roundCap" checked>
		<label for="roundCapChbxId">
		    Скругления на концах
		</label>
	    </div>
	    <hr>
	    <div class="flex-row align-center" title="Толщина линии">
		<img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
		<input type="range" step="1" min="1" max="50" v-model="size">
		<input type="number" step="1" min="1" max="50" v-model="size">
	    </div>
	    <hr>
	    <div class="flex-row align-center" title="Непрозрачность линии">
		<img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
		<input type="range" step="0.01" min="0" max="1" v-model="opacity">
		<input type="number" step="0.01" min="0" max="1" v-model="opacity">
	    </div>
	</div>
    </div>
</template>

<script lang="ts">
import recentColors from "@/components/mapCanvas/toolsPanel/recentColors.vue";
import ColorsPalette from "@/components/mapCanvas/toolsPanel/palette.vue";
import {defineComponent} from "vue";

export default defineComponent({
    name: "pathPanel",
    components: {
        ColorsPalette,
        recentColors,
    },
    computed: {
        size: {
            get():number {
                return this.$store.getters['pathOptions/getPathSize']
            },
            set(value:number):void {
                this.$store.commit('pathOptions/setPathSize',  Number(value))
            }
        },
        opacity: {
            get():number {
                return this.$store.getters['pathOptions/getPathOpacity']
            },
            set(value:number):void {
                this.$store.commit('pathOptions/setPathOpacity', Number(value))
            }
        },
        color: {
            get():string {
                return this.$store.getters['pathOptions/getPathColor']
            },
            set(value:string):void {
                this.$store.commit('pathOptions/setPathColor',  value)
            }
        },
        pathType: {
            get():string {
                return this.$store.getters['pathOptions/getPathType']
            },
            set(value:string):void {
                this.$store.commit('pathOptions/setPathType',  value)
            }
        },
        roundCap: {
            get():boolean {
                return this.$store.getters['pathOptions/getPathRoundCap']
            },
            set(value:boolean):void {
                this.$store.commit('pathOptions/setPathRoundCap', value)
            }
        },
        style: {
            get():string {
                return this.$store.getters['pathOptions/getPathStyle']
            },
            set(value:string):void {
                this.$store.commit('pathOptions/setPathStyle',  value)
            }
        },
        dashArray: {
            get():number[] {
                return this.$store.getters['pathOptions/getPathDashArray']
            },
            set(value:number[]):void {
                this.$store.commit('pathOptions/setPathDashArray',  value)
            }
        },
        dotArray: {
            get():number[] {
                return this.$store.getters['pathOptions/getPathDotArray']
            },
            set(value:number[]):void {
                this.$store.commit('pathOptions/setPathDotArray',  value)
            }
        },
    }
})
</script>
