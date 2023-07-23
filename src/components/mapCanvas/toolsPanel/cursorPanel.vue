<template>
    <div id="cursorOpt" class="tools-options" >
        <div class="scroll-container">
      <div class="flex-row justify-between align-center">
        <b> Курсор </b>
	  <svg class="close-options-img" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64" @click="$emit('closePanel')">
	      <g><path d="  M 17.05 31.58  A 0.46 0.45 46.3 0 0 17.04 32.24  Q 26.02 41.06 34.88 50.04  C 36.05 51.23 36.53 52.34 35.07 53.54  A 1.86 1.86 0.0 0 1 32.58 53.42  Q 22.85 43.77 13.02 33.97  Q 11.05 32.01 13.03 30.04  Q 22.85 20.25 32.67 10.47  Q 34.39 8.75 35.63 10.84  Q 36.35 12.05 35.35 13.11  Q 26.50 22.63 17.05 31.58  Z"/><path d="  M 33.04 31.58  A 0.47 0.46 44.6 0 0 33.05 32.24  Q 42.02 41.07 50.88 50.04  C 52.05 51.23 52.53 52.34 51.07 53.54  A 1.86 1.86 0.0 0 1 48.58 53.42  Q 38.85 43.77 29.02 33.97  Q 27.05 32.01 29.03 30.04  Q 38.74 20.36 48.56 10.81  Q 50.10 9.32 51.51 10.67  A 1.80 1.79 -45.5 0 1 51.53 13.24  L 33.04 31.58  Z"/></g>
	  </svg>
      </div>
      <hr>
      <p>
      Выбирать:</p>
      <div class="select-options-container">
        <div class="select-option"
             :class="{'option-checked': selectionTypes.length===5 }"
             @click="setAllSelectTypes">Всё
        </div>
        <div class="select-option" :class="{'option-checked': getSelectType('brush') }"
             @click="setSelectType('brush')">
          <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
              <g><path d="  M 74.17 84.42  C 55.52 67.60 31.63 44.61 13.58 26.47  Q 9.63 22.50 8.66 20.03  C 5.70 12.56 13.77 5.58 20.96 8.97  Q 22.46 9.68 24.74 11.92  Q 55.64 42.22 84.78 74.25  A 0.42 0.41 -35.8 0 1 84.67 74.89  C 80.02 77.53 78.27 80.28 74.87 84.37  A 0.50 0.49 -48.7 0 1 74.17 84.42  Z"/><path d="  M 108.82 84.93  C 118.96 93.97 123.81 107.08 116.07 119.51  A 0.43 0.43 0.0 0 1 115.43 119.62  C 107.41 113.01 97.76 115.58 89.23 111.13  C 79.91 106.27 76.99 94.56 83.42 86.13  C 89.58 78.03 101.54 78.44 108.82 84.93  Z"/></g>
          </svg>
        </div>
        <div class="select-option" :class="{'option-checked': getSelectType('stamp') }"
             @click="setSelectType('stamp')">
          <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
            <g ><path d="  M 62.56 0.00  L 65.56 0.00  Q 80.74 2.31 85.16 15.36  C 87.49 22.28 86.50 32.71 86.46 40.73  A 0.50 0.50 0.0 0 1 85.96 41.23  L 41.94 41.24  A 0.46 0.46 0.0 0 1 41.48 40.78  C 41.59 33.22 40.70 23.57 42.31 17.18  Q 46.01 2.54 62.56 0.00  Z"/><path d="  M 128.00 97.06  L 128.00 109.06  L 0.44 109.19  A 0.37 0.36 -25.1 0 1 0.21 109.11  L 0.00 108.94  L 0.00 96.44  Q 2.02 86.24 12.25 86.24  Q 64.13 86.27 116.00 86.24  Q 126.43 86.23 128.00 97.06  Z"/><path d="  M 120.19 128.00  L 7.44 128.00  L 7.65 117.31  A 0.57 0.57 0.0 0 1 8.22 116.75  L 119.72 116.75  A 0.55 0.54 86.4 0 1 120.26 117.23  Q 120.93 122.67 120.19 128.00  Z"/></g><g><path d="  M 49.26 59.97  C 43.42 59.96 40.48 54.47 41.69 49.22  A 0.62 0.61 6.5 0 1 42.29 48.75  L 85.72 48.75  A 0.58 0.57 -4.7 0 1 86.29 49.23  C 87.71 56.82 83.33 60.03 76.40 60.01  Q 62.81 59.98 49.26 59.97  Z"/><rect x="52.75" y="67.50" width="22.50" height="11.24" rx="0.43"/></g>
          </svg>
        </div>
        <div class="select-option"
             :class="{'option-checked': getSelectType('shape') }"
             @click="setSelectType('shape')">
					<svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
						<ellipse cx="0.00" cy="0.00" transform="translate(28.79,17.13) rotate(11.2)" rx="14.08" ry="13.99"/><path d="  M 27.31 56.82  C 32.27 46.87 38.13 36.95 43.45 27.43  A 1.73 1.73 0.0 0 1 46.47 27.44  L 62.97 57.13  A 1.92 1.92 0.0 0 1 61.29 59.98  L 28.52 59.98  A 1.21 1.18 -21.7 0 1 27.66 59.62  Q 26.51 58.43 27.31 56.82  Z"/><path d="  M 35.62 33.69  A 0.39 0.38 14.5 0 1 35.96 34.26  Q 29.88 45.24 23.76 56.27  Q 23.06 57.52 23.50 59.44  A 0.40 0.39 -6.4 0 1 23.11 59.92  L 4.43 59.98  A 1.66 1.65 89.8 0 1 2.77 58.32  L 2.75 35.41  A 1.66 1.66 0.0 0 1 4.41 33.75  L 35.62 33.69  Z"/>
					</svg>
        </div>
        <div class="select-option" :class="{'option-checked': getSelectType('path') }"
             @click="setSelectType('path')">
					<svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
						<g ><path d="  M 90.22 64.46  C 80.72 55.50 70.09 41.43 72.46 27.67  C 75.86 7.88 101.22 2.19 114.18 16.58  C 125.46 29.11 118.13 44.87 109.48 55.99  Q 102.86 64.51 98.65 67.47  C 94.88 70.13 92.68 66.78 90.22 64.46  Z  M 96.36 58.45  C 105.43 50.17 117.59 34.36 108.94 22.43  C 100.34 10.57 81.45 15.50 80.08 29.67  C 79.10 39.81 88.16 51.94 95.57 58.46  A 0.59 0.59 0.0 0 0 96.36 58.45  Z"/><path d="  M 65.84 49.35  C 83.20 72.51 59.28 105.61 41.97 119.47  C 40.36 120.76 38.07 119.48 36.58 118.16  C 24.09 107.09 11.07 90.19 8.56 73.88  C 3.35 40.14 45.29 21.95 65.84 49.35  Z  M 40.55 109.78  C 54.47 96.55 73.56 70.87 58.22 52.30  C 44.52 35.72 16.84 45.56 16.10 67.18  C 15.56 82.92 28.98 99.81 39.35 109.78  A 0.87 0.87 0.0 0 0 40.55 109.78  Z"/><path d="  M 92.17 81.70  C 91.34 75.50 99.12 74.62 99.86 79.94  C 100.35 83.43 106.23 89.39 100.19 91.43  C 95.41 93.04 92.60 84.91 92.17 81.70  Z"/><path d="  M 114.18 89.32  C 117.41 89.90 121.45 94.86 122.64 97.97  C 124.27 102.24 118.36 105.39 115.45 100.87  Q 113.47 97.80 110.28 95.86  A 1.67 1.65 -86.9 0 1 109.65 95.15  C 108.19 91.88 110.55 88.65 114.18 89.32  Z"/><path d="  M 113.32 110.27  C 116.20 108.64 119.58 111.04 119.05 114.19  C 118.38 118.14 111.33 119.88 108.06 119.96  C 104.52 120.05 102.76 115.74 105.15 113.36  C 106.85 111.66 110.74 111.72 113.32 110.27  Z"/><rect x="-7.90" y="-3.95" transform="translate(64.00,116.00) rotate(-0.4)" width="15.80" height="7.90" rx="3.75"/><rect x="-7.91" y="-3.96" transform="translate(88.00,116.00) rotate(-0.5)" width="15.82" height="7.92" rx="3.75"/></g><g><circle cx="96.00" cy="32.00" r="5.92"/><path d="  M 51.91 67.99  A 11.91 11.91 0.0 0 1 40.00 79.90  A 11.91 11.91 0.0 0 1 28.09 67.99  A 11.91 11.91 0.0 0 1 40.00 56.08  A 11.91 11.91 0.0 0 1 51.91 67.99  Z  M 43.94 67.99  A 3.94 3.94 0.0 0 0 40.00 64.05  A 3.94 3.94 0.0 0 0 36.06 67.99  A 3.94 3.94 0.0 0 0 40.00 71.93  A 3.94 3.94 0.0 0 0 43.94 67.99  Z"/></g>
					</svg>
        </div>
        <div class="select-option" :class="{'option-checked': getSelectType('text') }"
             @click="setSelectType('text')">
					<svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
						<g><rect x="109.25" y="1.28" width="3.00" height="125.46" rx="1.48"/><path d="  M 35.03 32.01  A 1.41 1.41 0.0 0 0 33.73 33.44  Q 33.84 41.02 33.66 48.48  C 33.33 61.79 17.53 61.30 17.36 49.30  Q 17.14 33.07 17.29 17.26  A 2.36 2.35 0.4 0 1 19.66 14.93  L 100.87 15.24  A 2.00 2.00 0.0 0 1 102.87 17.19  Q 103.30 33.07 102.74 48.72  Q 102.60 52.72 101.47 54.55  C 98.18 59.91 89.88 59.51 87.44 53.74  C 85.50 49.14 86.47 39.22 86.46 33.73  A 1.96 1.95 89.9 0 0 84.50 31.77  L 69.26 31.78  A 1.00 1.00 0.0 0 0 68.26 32.78  L 68.26 94.27  A 2.19 2.19 0.0 0 0 70.43 96.46  C 76.80 96.49 93.09 94.48 89.95 106.73  C 88.30 113.16 82.51 112.81 76.17 112.92  Q 51.17 113.35 37.49 112.79  C 30.41 112.50 27.07 103.78 31.90 98.89  C 35.27 95.48 44.37 96.52 49.00 96.52  C 51.26 96.53 51.74 95.09 51.74 93.06  Q 51.77 63.31 51.73 33.48  A 1.64 1.63 1.7 0 0 50.19 31.85  Q 42.42 31.42 35.03 32.01  Z"/></g>
					</svg>
        </div>
      </div>
	</div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import cursorOptions from "@/modules/store/toolsOptions/cursorOptions";
import store from "@/modules/store/store";
export default defineComponent({
  name: "cursorPanel",
  data(){
    return{
      selectionTypes:cursorOptions.state.selectionTypes as string[],
    }
  },
  methods:{
    getSelectType(type:string):boolean {
      if (this.selectionTypes.indexOf(type) !== -1)
        return true
      else return false
    },
    setSelectType(type:string):void {
      let index = this.selectionTypes.indexOf(type)
      if (index !== -1)
        this.selectionTypes.splice(index, 1)
      else
        this.selectionTypes.push(type)
      store.commit('cursorOptions/updateCursorOptions', {selectionTypes:this.selectionTypes})
    },
    setAllSelectTypes():void {
      if (this.selectionTypes.length == 5)
        this.selectionTypes = []
      else
        this.selectionTypes = ['brush', 'stamp', 'shape', 'path', 'text']
      store.commit('cursorOptions/updateCursorOptions', {selectionTypes:this.selectionTypes})
    },
  },
})
</script>
<style lang="sass" scoped>
@use "@/assets/styles/Variables"
.select-options-container
  display: flex
  flex-direction: row
  align-items: center
  height: 40px
  background-color: Variables.$medium-light-color
  border: 1px solid Variables.$medium-color
  border-radius: 10px
  user-select: none


.select-option
  display: flex
  align-items: center
  height: inherit
  padding: 10px
  cursor: pointer
  & svg
    height: 100%
    object-fit: contain
    transition: 0.3s all ease-in-out
  &:hover
    color: Variables.$orange-color
    svg
      fill: Variables.$orange-color
  &:nth-last-child(n+2)
    border-right: 1px solid Variables.$medium-color


.option-checked
  transition: 0.3s all ease-in-out
  background-color: Variables.$dark-color
  color: Variables.$orange-color
  & svg
    fill: Variables.$orange-color
  &:nth-last-child(1)
    border-radius: 0 10px 10px 0
  &:nth-child(1)
    border-radius: 10px 0 0 10px

</style>
