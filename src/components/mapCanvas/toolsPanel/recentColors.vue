<template>
	<details>
		<summary class="cursor-pointer flex-row align-center" @click="isOpen=!isOpen">
			<svg width="20px" height="20px" class="dropdown-flag svg-dark-fill svg-light" :class="{opened:isOpen}" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
			</svg>
			<u>Последние цвета:</u></summary>
		<transition name="show-opt">
			<div v-if="isOpen" class="color-table">
				<div v-for="(color, index) in recentColors" :key="index">
					<template v-if="color !== null">
						<div
								:style="{ backgroundColor: color }"
								class="color-cell cursor-pointer"
								@click="setToolColor(color)"
						/>
					</template>
					<template v-else>
						<div class="color-cell">
							<img src="@/assets/images/Tools/Options/noColor.png"/>
						</div>
					</template>
				</div>
			</div>
		</transition>
	</details>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters} from "vuex";

export default defineComponent({
	name: "recentColors",
	data() {
		return {
			isOpen: false as boolean
		}
	},
	props: {
		source: {
			type: String,
		}
	},
	emits: ['setBrushColor', 'setShapeFill', 'setShapeStroke', 'setLineColor', 'setTextFill', 'setTextStroke', 'setTextShadow'],
	methods: {
		setToolColor(color: string): void {
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
		}
	},
	computed: {
		...mapGetters({
			recentColors: 'colorsStore/getRecentColors'
		})
	}
})
</script>

<style lang="sass" scoped>
@use "@/assets/styles/Variables"
details
	user-select: none
	padding-block: 5px

summary
	padding-bottom: 5px

summary:focus
	outline: none

.color-table
	display: flex
	flex-direction: row
	justify-content: space-between
	border: 1px solid Variables.$medium-light-color
	width: 100%
	padding: 3px
	transition: all 0.3s ease-in
.color-cell
	max-height: 30px
	height: 30px
	width: 30px
	min-width: 30px
	border: 1px solid Variables.$medium-light-color
	border-radius: 5px

.color-cell img
	width: 100%
	height: 100%
	object-fit: cover
	border-radius: inherit
</style>
