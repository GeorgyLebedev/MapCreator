<template>
	<details>
		<summary class="cursor-pointer flex-row align-center" @click="isOpen=!isOpen">
			<svg width="20px" height="20px" class="dropdown-flag svg-dark-fill svg-light" :class="{opened:isOpen}" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
			</svg>
			<u>Палитра:</u>
		</summary>
		<transition name="show-opt">
		<div id="palette" class="color-grid" v-if="isOpen">
			<div
					v-for="(color, index) in paletteColors"
					:key="index"
					class="color-cell"
					:class="{ 'cursor-pointer': color !== null }"
					:style="{ backgroundColor: color }"
					@click.right="openPaletteContextMenu($event, index)"
					@click.left="setToolColor(color)"
					:tabindex="index">
				<img src="@/assets/images/Tools/Options/noColor.png"  v-if="color==null">
			</div>
			<div class="invisible-container" @click="showPaletteContext=false" v-if="showPaletteContext">
				<div class="contextMenu" :style="paletteContextStyle" @contextmenu.prevent>
					<div class="contextMenuItem" @click="showPaletteContext=false">
						Отмена
					</div>
					<hr class="contextMenuDivider">
					<div class="contextMenuItem" @click="updatePalette(index,this.$props.color)">
						Записать текущий цвет
					</div>
				</div>
			</div>
		</div>
		</transition>
	</details>
</template>

<script lang="ts">
import {updatePalette} from "@/modules/api/paletteMethods";
import {getPalette} from "@/modules/api/paletteMethods";
import {defineComponent} from "vue";
import {mapGetters} from "vuex";
export default defineComponent({
	name: "colorsPalette",
	props:{
		color: String,
		source: String
	},
	data(){
		return{
			isOpen: false as boolean,
			index: -1 as number,
			paletteContextStyle: {} as {top?:string, bottom?:string, left?:string, right?:string},
			showPaletteContext: false,
		}
	},
	methods:{
		updatePalette: updatePalette,
		getPalette: getPalette,
		setToolColor(color:string):void|string {
			if(!color) return
			switch (this.source) {
				case "brushColor":
					this.$emit('setBrushColor', color)
					break
				case "shapeFill":
					this.$emit('setShapeFill', color)
					break
				case "shapeStroke":
					this.$emit('setShapeStroke', color)
					break
				case "lineColor":
					this.$emit('setLineColor', color)
					break
				case "textFill":
					this.$emit('setTextFill', color)
					break
				case "textStroke":
					this.$emit('setTextStroke', color)
					break
				case "textShadow":
					this.$emit('setTextShadow', color)
					break
			}
		},

		paletteCellColor(row:number, column:number):string {
			return this.paletteColors[((row - 1) * 8 + (column - 1))] ? this.paletteColors[((row - 1) * 8 + (column - 1))] : 'unset'
		},
		openPaletteContextMenu(event:MouseEvent,index:number):void {
			this.index=index
			this.showPaletteContext = true;
			this.paletteContextStyle = {
				left: event.clientX + 'px',
				top: event.clientY + 'px'
			}
		},
	},
	computed:{
		...mapGetters({
			paletteColors:'colorsStore/getPaletteColors'
		})
	},
	async mounted():Promise<void>  {
		let palette=await this.getPalette()
		if(palette){
			this.$store.commit('colorsStore/setPalette',palette)
		}
	}
})
</script>

<style scoped lang="sass">
@use "@/assets/styles/Variables"
summary:focus
	outline: none

summary
	padding-bottom: 5px

details
	user-select: none
	padding-block: 5px

.color-grid
	display: grid
	grid-template-columns: repeat(8, 30px)
	grid-template-rows: repeat(3, 30px)
	gap: 1px
	padding: 3px
	justify-content: space-between
	border: 1px solid Variables.$medium-light-color

.color-cell
	max-height: 30px
	width: 30px
	height: 30px
	max-width: 30px
	border: 1px solid Variables.$medium-light-color


.color-cell:focus
	border: 1px solid Variables.$dark-color


.color-cell img
	width: 100%
	height: 100%
	object-fit: contain

</style>
