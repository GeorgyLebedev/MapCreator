<template>
    <div id="brushOptions" class="tools-options">
	<div class="scroll-container">
	    <div class="flex-row justify-between align-center">
		<b> Кисть </b>
		<svg class="close-options-img" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" @click="$emit('closePanel')">
		    <g>
			<path d="  M 17.05 31.58  A 0.46 0.45 46.3 0 0 17.04 32.24  Q 26.02 41.06 34.88 50.04  C 36.05 51.23 36.53 52.34 35.07 53.54  A 1.86 1.86 0.0 0 1 32.58 53.42  Q 22.85 43.77 13.02 33.97  Q 11.05 32.01 13.03 30.04  Q 22.85 20.25 32.67 10.47  Q 34.39 8.75 35.63 10.84  Q 36.35 12.05 35.35 13.11  Q 26.50 22.63 17.05 31.58  Z"/>
			<path d="  M 33.04 31.58  A 0.47 0.46 44.6 0 0 33.05 32.24  Q 42.02 41.07 50.88 50.04  C 52.05 51.23 52.53 52.34 51.07 53.54  A 1.86 1.86 0.0 0 1 48.58 53.42  Q 38.85 43.77 29.02 33.97  Q 27.05 32.01 29.03 30.04  Q 38.74 20.36 48.56 10.81  Q 50.10 9.32 51.51 10.67  A 1.80 1.79 -45.5 0 1 51.53 13.24  L 33.04 31.58  Z"/>
		    </g>
		</svg>
	    </div>
	    <hr>
	    <table class="style-table">
		<tr>
		    <td>
			<div class="flex-row align-center">Цвет кисти:</div>
		    </td>
		    <div :style="{'background-color': color}" class="color-picker-cell" @click="$refs.brushColor.click()">
			<input ref="brushColor" v-model="color" type="color" @input="this.$store.commit('colorsStore/updateLastColor', color)">
		    </div>
		</tr>
	    </table>
	    <recentColors :source="'brushColor'" @setBrushColor="color=>this.color=color"/>
	    <colors-palette :color="color" :source="'brushColor'" @setBrushColor="color=>this.color=color"/>
	    <hr>
	    <div class="flex-row align-center" title="Размер кисти">
		<img alt="" height="20" src="../../../../assets/images/Tools/Options/thicknss.png">
		<input v-model="size" max="200" min="1" step="5" type="range">
		<input v-model="size" class="input-number-style" max="200" min="1" step="1" type="number">
	    </div>
	    <hr>
	    <div class="flex-row align-center" title="Непрозрачность кисти">
		<img alt="" height="20" src="../../../../assets/images/Tools/Options/opacity.png">
		<input v-model="opacity" max="1" min="0" step="0.01" type="range">
		<input v-model="opacity" class="input-number-style" max="1" min="0" step="0.01" type="number">
	    </div>
	</div>
    </div>
</template>

<script lang="ts">
import recentColors from "@/components/mapCanvas/toolsPanel/colors/recentColors.vue";
import ColorsPalette from "@/components/mapCanvas/toolsPanel/colors/palette.vue";
import {defineComponent} from "vue";
import store from "@/modules/store/store";

export default defineComponent({
    name: "brushPanel",
    components: {
        ColorsPalette,
        recentColors
    },
    computed: {
        size: {
            get(): number {
                return store.getters['brushOptions/getBrushSize']
            },
            set(value: number): void {
                store.commit('brushOptions/setBrushSize', Number(value))
            }
        },
        color: {
            get(): string {
                return store.getters['brushOptions/getBrushColor']
            },
            set(value: string): void {
                store.commit('brushOptions/setBrushColor', value)
            }
        },
        opacity: {
            get(): number {
                return store.getters['brushOptions/getBrushOpacity']
            },
            set(value: number): void {
                store.commit('brushOptions/setBrushOpacity', Number(value))
            }
        }
    }
})
</script>
