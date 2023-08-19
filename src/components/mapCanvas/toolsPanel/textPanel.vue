<template>
	<div v-if="true||(selectedObject && selectedObject.data.type=='text')" id="textOptions"
			 class="tools-options">
		<div class="scroll-container">
			<div class="flex-row justify-between align-center">
				<b> Надпись </b>
				<svg class="close-options-img" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
						 @click="$emit('closePanel')">
					<g>
						<path d="  M 17.05 31.58  A 0.46 0.45 46.3 0 0 17.04 32.24  Q 26.02 41.06 34.88 50.04  C 36.05 51.23 36.53 52.34 35.07 53.54  A 1.86 1.86 0.0 0 1 32.58 53.42  Q 22.85 43.77 13.02 33.97  Q 11.05 32.01 13.03 30.04  Q 22.85 20.25 32.67 10.47  Q 34.39 8.75 35.63 10.84  Q 36.35 12.05 35.35 13.11  Q 26.50 22.63 17.05 31.58  Z"/>
						<path d="  M 33.04 31.58  A 0.47 0.46 44.6 0 0 33.05 32.24  Q 42.02 41.07 50.88 50.04  C 52.05 51.23 52.53 52.34 51.07 53.54  A 1.86 1.86 0.0 0 1 48.58 53.42  Q 38.85 43.77 29.02 33.97  Q 27.05 32.01 29.03 30.04  Q 38.74 20.36 48.56 10.81  Q 50.10 9.32 51.51 10.67  A 1.80 1.79 -45.5 0 1 51.53 13.24  L 33.04 31.58  Z"/>
					</g>
				</svg>
			</div>
			<hr>
			<section class="text-settings">
				<div class="flex-row">
					<button :class="{'selected':justification=='left'}"
									class="type-select-button"
									title="Слева"
									@click="justification='left'">
						<svg class="svg-dark-fill" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
							<g>
								<rect height="3.98" rx="1.96" width="63.52" x="0.24" y="6.01"/>
								<rect height="3.74" rx="1.84" width="45.76" x="0.22" y="22.01"/>
								<rect height="3.74" rx="1.78" width="63.54" x="0.22" y="38.25"/>
								<rect height="3.98" rx="1.94" width="30.50" x="0.24" y="54.01"/>
							</g>
						</svg>
					</button>
					<button :class="{'selected':justification=='center'}"
									class="type-select-button"
									title="По центру"
									@click="justification='center'">
						<svg class="svg-dark-fill" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
							<g>
								<rect height="3.98" rx="1.96" width="63.52" x="0.24" y="6.01"/>
								<rect height="3.74" rx="1.80" width="63.52" x="0.23" y="22.01"/>
								<rect height="3.74" rx="1.78" width="63.54" x="0.22" y="38.25"/>
								<rect height="3.96" rx="1.93" width="23.42" x="20.33" y="54.02"/>
							</g>
						</svg>
					</button>
					<button :class="{'selected':justification=='right'}"
									class="type-select-button"
									title="По центру"
									@click="justification='right'">
						<svg class="svg-dark-fill" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
							<g>
								<rect height="3.98" rx="1.96" width="63.52" x="0.24" y="6.01"/>
								<rect height="3.74" rx="1.84" width="45.74" x="18.02" y="22.01"/>
								<rect height="3.74" rx="1.78" width="63.54" x="0.22" y="38.25"/>
								<rect height="3.98" rx="1.94" width="30.48" x="33.26" y="54.01"/>
							</g>
						</svg>
					</button>
				</div>
			</section>
			<textarea v-model="content" spellcheck="false" :style="textAreaStyle"></textarea>
			<hr>
			<div v-if="showFontsList" class="invisibleContainer" @click="showFontsList=false"></div>
			<div class="flex-row align-center justify-between">
				Шрифт
				<button class="button-light button-small" @click="openFontsList">
					<div class="flex-row align-center">
						<svg :class="{opened:showFontsList}" class="dropdown-flag svg-light-fill" height="20px" version="1.1" viewBox="-6.5 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
						</svg>
						{{ fontFamily }}
					</div>
				</button>
			</div>
			<Transition name="popup-anim">
				<div v-if="showFontsList" class="dropdown-text">
					<div v-for="font in fontsCollection"
							 :key="font" :style="{'font-family':font}"
							 class="font"
							 @click="fontFamily=font; showFontsList=false">{{ font }}
					</div>
				</div>
			</Transition>
			<hr>
			<table class="style-table">
				<tr>
					<td>
						<div class="flex-row">
							<input id="textFillChbx" v-model="fillEnabled" checked
										 type="checkbox" @change="setFill()">
							<label for="textFillChbx">Цвет текста</label>
						</div>
					</td>
					<div :style="{'background-color': fillEnabled?fillColor:'unset'}" class="color-picker-cell"
							 @click="$refs.fillColor.click()">
						<input v-if="fillEnabled" ref="fillColor" v-model="fillColor" type="color"
									 @input="this.$store.commit('colorsStore/updateLastColor', fillColor)">
						<img v-if="!fillEnabled" alt="" class="none-color-placeholder"
								 src="@/assets/images/Tools/Options/noColor.png">
					</div>
				</tr>
			</table>
			<transition name="stretch">
				<div v-if="fillEnabled">
					<recent-colors :source="'textFill'" @setTextFill="color=>fillColor=color"/>
					<colors-palette :color="fillColor" :source="'textFill'" @setTextFill="color=>fillColor=color"/>
				</div>
			</transition>
			<hr>
			<div class="flex-row justify-between align-center" title="Размер шрифта">
				<img alt="" height="20" src="@/assets/images/Tools/Options/font-size.png">
				<input v-model="fontSize" max="500" min="5" step="5" type="range">
				<input v-model="fontSize" max="500" min="5" step="1" type="number">
			</div>
			<hr>
			<div class="flex-row justify-between align-center" title="Непрозрачность текста">
				<img alt="" height="20" src="@/assets/images/Tools/Options/opacity.png">
				<input v-model="opacity" max="1" min="0" step="0.1" type="range">
				<input v-model="opacity" max="1" min="0" step="0.1" type="number">
			</div>
			<hr>
			<div class="flex-row justify-between align-center" title="Поворот текста">
				<img alt="" height="20" src="@/assets/images/Tools/Options/rotate.png">
				<input v-model="rotation" max="180" min="-180" step="1" type="range">
				<input v-model="rotation" max="180" min="-180" step="1" type="number">
			</div>

			<hr>
			<table class="style-table">
				<tr>
					<td>
						<div class="flex-row">
							<input id="textBorderChbx" v-model="strokeEnabled"
										 type="checkbox" @change="setBorder()">
							<label for="textBorderChbx">Обводка</label>
						</div>
					</td>
					<div :style="{'background-color': strokeEnabled?strokeColor:'unset'}" class="color-picker-cell"
							 @click="$refs.strokeColor.click()">
						<input v-if="strokeEnabled" ref="strokeColor" v-model="strokeColor" type="color"
									 @input="this.$store.commit('colorsStore/updateLastColor', strokeColor)">
						<img v-if="!strokeEnabled" alt="" class="none-color-placeholder"
								 src="@/assets/images/Tools/Options/noColor.png">
					</div>
				</tr>
			</table>
			<Transition mode="out-in" name="stretch">
				<div v-if="strokeEnabled">
					<recent-colors :source="'textStroke'" @setTextStroke="color=>strokeColor=color"/>
					<colors-palette :color="strokeColor" :source="'textStroke'"
													@setTextStroke="color=>strokeColor=color"/>
					<hr>
					<div class="flex-row justify-between align-center" title="Толщина обводки">
						<img alt="" height="20" src="@/assets/images/Tools/Options/thicknss.png">
						<input v-model="strokeWidth" max="10" min="1" step="1" type="range">
						<input v-model="strokeWidth" max="10" min="1" step="1" type="number">
					</div>
				</div>
			</Transition>
			<hr>
			<table class="style-table">
				<tr>
					<td>
						<div class="flex-row ">
							<input id="textShadowChbx" v-model="shadowEnabled" :disabled="!fillEnabled"
										 type="checkbox" @change="setShadow()">
							<label for="textShadowChbx">Тень</label>
						</div>
					</td>
					<div :style="{'background-color': shadowEnabled?shadowColor:'unset'}" class="color-picker-cell"
							 @click="$refs.shadowColor.click()">
						<input v-if="shadowEnabled" ref="shadowColor" v-model="shadowColor" type="color"
									 @input="this.$store.commit('colorsStore/updateLastColor', shadowColor)">
						<img v-if="!shadowEnabled" alt="" class="none-color-placeholder"
								 src="@/assets/images/Tools/Options/noColor.png">
					</div>
				</tr>
			</table>
			<Transition mode="out-in" name="stretch">
				<div v-if="shadowEnabled">
					<recent-colors :source="'textShadow'" @setTextShadow="color=>shadowColor=color"/>
					<colors-palette :color="shadowColor" :source="'textShadow'"
													@setTextShadow="color=>shadowColor=color"/>
					<hr>
					<div class="flex-row justify-between align-center" title="Смещение тени по Х">
						<img alt="" src="@/assets/images/Tools/Options/shadowOffsetX.png" width="20">
						<input v-model="shadowOffsetX" max="10" min="-10" step="1" type="range">
						<input v-model="shadowOffsetX" max="10" min="-10" step="1" type="number">
					</div>
					<hr>
					<div class="flex-row justify-between align-center" title="Смещение тени по Y">
						<img alt="" src="@/assets/images/Tools/Options/shadowOffsetY.png" width="20">
						<input v-model="shadowOffsetY" max="10" min="-10" step="1" type="range">
						<input v-model="shadowOffsetY" max="10" min="-10" step="1" type="number">
					</div>
					<hr>
					<div class="flex-row justify-between align-center" title="Размытие тени">
						<svg class="svg-dark-fill font-blurred-img" fill="white" version="1.1" viewBox="0 0 20 20"
								 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<g id="Page-1" stroke="none" stroke-width="1">
								<g id="Dribbble-Light-Preview" transform="translate(-60.000000, -2759.000000)">
									<g id="icons" transform="translate(56.000000, 160.000000)">
										<path id="text_style-[#1212]"
													d="M24,2599 L24,2605 L22,2605 C22,2602.791 20.209,2601 18,2601 L16.586,2601 C15.71,2601 15,2601.71 15,2602.586 L15,2616 C15,2616.552 15.448,2617 16,2617 L18,2617 L18,2619 L10,2619 L10,2617 L12,2617 C12.552,2617 13,2616.552 13,2616 L13,2602.586 C13,2601.71 12.29,2601 11.414,2601 L10,2601 C7.791,2601 6,2602.791 6,2605 L4,2605 L4,2599 L24,2599 Z"/>
									</g>
								</g>
							</g>
						</svg>
						<input v-model="shadowBlur" max="10" min="1" step="1" type="range">
						<input v-model="shadowBlur" max="10" min="1" step="1" type="number">
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>
<script lang="ts">
import ColorsPalette from "@/components/mapCanvas/toolsPanel/palette.vue";
import RecentColors from "@/components/mapCanvas/toolsPanel/recentColors.vue";
import {defineComponent} from "vue";

export default defineComponent({
	name: "textPanel",
	components: {
		RecentColors,
		ColorsPalette
	},
	props: {
		selectedObject: Object,
	},
	data() {
		return {
			fontsCollection: ["Cambria", "Roboto", "Neucha", "Comic Sans MS", "Consolas", "Mason Chronicles", "Linux Biolinum", "Aniron"] as string[],
			showFontsList: false as boolean,
		}
	},
	methods: {
		openFontsList(): void {
			this.showFontsList = !this.showFontsList
		},
		setShadow(): void {
			this.shadowColor = this.shadowEnabled ? "#000000" : "transparent"
		},
		setFill(): void {
			this.fillColor = this.fillEnabled ? "#ffffff" : "transparent"
		},
		setBorder(): void {
			this.strokeColor = this.strokeEnabled ? "#000000" : "transparent"
		},
	},
	computed: {
		content: {
			get(): string {
				return this.$store.getters['textOptions/getContent']
			},
			set(value: string): void {
				this.$store.commit('textOptions/setContent', value)
			}
		},
		fontFamily: {
			get(): string {
				return this.$store.getters['textOptions/getFontFamily']
			},
			set(value: string): void {
				this.$store.commit('textOptions/setFontFamily', value)
			}
		},
		fontSize: {
			get(): number {
				return this.$store.getters['textOptions/getFontSize']
			},
			set(value: number): void {
				this.$store.commit('textOptions/setFontSize', Number(value))
			}
		},
		justification: {
			get(): string {
				return this.$store.getters['textOptions/getJustification']
			},
			set(value: string): void {
				this.$store.commit('textOptions/setJustification', value)
			}
		},
		fillColor: {
			get(): string {
				return this.$store.getters['textOptions/getFillColor']
			},
			set(value: string): void {
				this.$store.commit('textOptions/setFillColor', value)
			}
		},
		fillEnabled: {
			get(): boolean {
				return this.$store.getters['textOptions/getFillEnabled']
			},
			set(value: boolean): void {
				this.$store.commit('textOptions/setFillEnabled', value)
			}
		},
		strokeColor: {
			get(): string {
				return this.$store.getters['textOptions/getStrokeColor']
			},
			set(value: string): void {
				this.$store.commit('textOptions/setStrokeColor', value)
			}
		},
		strokeEnabled: {
			get(): boolean {
				return this.$store.getters['textOptions/getStrokeEnabled']
			},
			set(value: boolean): void {
				this.$store.commit('textOptions/setStrokeEnabled', value)
			}
		},
		strokeWidth: {
			get(): number {
				return this.$store.getters['textOptions/getStrokeWidth']
			},
			set(value: number): void {
				this.$store.commit('textOptions/setStrokeWidth', Number(value))
			}
		},
		shadowColor: {
			get(): string {
				return this.$store.getters['textOptions/getShadowColor']
			},
			set(value: string): void {
				this.$store.commit('textOptions/setShadowColor', value)
			}
		},
		shadowEnabled: {
			get(): boolean {
				return this.$store.getters['textOptions/getShadowEnabled']
			},
			set(value: boolean): void {
				this.$store.commit('textOptions/setShadowEnabled', value)
			}
		},
		shadowBlur: {
			get(): number {
				return this.$store.getters['textOptions/getShadowBlur']
			},
			set(value: number): void {
				this.$store.commit('textOptions/setShadowBlur', Number(value))
			}
		},
		shadowOffsetX: {
			get(): number {
				return this.$store.getters['textOptions/getShadowOffsetX']
			},
			set(value: number): void {
				this.$store.commit('textOptions/setShadowOffsetX', Number(value))
			}
		},
		shadowOffsetY: {
			get(): number {
				return this.$store.getters['textOptions/getShadowOffsetY']
			},
			set(value: number): void {
				this.$store.commit('textOptions/setShadowOffsetY', Number(value))
			}
		},
		opacity: {
			get(): number {
				return this.$store.getters['textOptions/getOpacity']
			},
			set(value: number): void {
				this.$store.commit('textOptions/setOpacity', Number(value))
			}
		},
		rotation: {
			get(): number {
				return this.$store.getters['textOptions/getRotation']
			},
			set(value: number): void {
				this.$store.commit('textOptions/setRotation', Number(value))
			}
		},

		textAreaStyle(){
			const style={
				fontFamily: this.fontFamily,
				borderColor: this.content.length>0? 'inherit':'red'
			}
			return style
		}
	}
})
</script>

<style lang="sass" scoped>
textarea
	width: 100%
	height: 100px
	font-size: 14pt
	padding: 5px
	border-radius: 5px

.dropdown-text
	position: absolute
	background-color: white
	max-width: 300px
	right: 12px
	z-index: 4
	border: 1px solid #dcdcdc
	border-radius: 10px
	padding-block: 10px

.font
	padding: 5px
	cursor: pointer
	font-size: 12pt

.font:hover
	color: white
	background-color: #3d4551

.font-blurred-img
	width: 20px
	height: 20px
	filter: blur(1px)

.text-settings
	display: flex
	flex-direction: row
	justify-content: space-between
	padding-bottom: 10px
</style>
