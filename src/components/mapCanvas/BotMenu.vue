<template>
  <div class="bot-menu" id="footer">
    <div class="flex-row justify-between align-center">
      <div class="flex-row align-center">
        <button type="button" class="save-button" title="Сохранить" @click="saveMap">
	    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
		    <path  d="  M 12.81 0.00  L 100.81 0.00  Q 101.64 0.37 102.27 0.98  Q 114.58 12.96 126.73 25.10  C 127.39 25.76 127.58 26.51 128.00 27.31  L 128.00 115.06  Q 126.28 126.37 114.94 128.00  L 12.94 128.00  Q 1.64 126.27 0.00 114.94  L 0.00 12.94  Q 1.66 1.81 12.81 0.00  Z  M 86.06 68.29  C 97.58 68.34 103.65 72.09 103.85 84.39  Q 104.14 102.16 103.98 119.95  A 0.50 0.50 0.0 0 0 104.47 120.46  C 111.38 120.60 120.49 122.77 120.49 112.39  Q 120.50 71.21 120.51 29.99  A 1.24 1.23 23.0 0 0 120.16 29.13  Q 109.80 18.55 99.25 8.20  C 98.27 7.24 95.74 6.83 95.74 8.73  Q 95.76 21.89 95.75 35.05  C 95.74 48.97 88.89 51.72 75.79 51.73  Q 59.78 51.75 43.76 51.77  Q 36.20 51.78 32.87 50.50  C 23.06 46.71 24.05 38.03 24.00 27.31  Q 23.96 17.61 24.06 7.88  A 0.37 0.36 1.6 0 0 23.70 7.51  C 16.70 7.43 7.52 5.18 7.51 15.68  Q 7.48 64.20 7.51 112.71  C 7.52 122.34 15.99 120.80 23.59 120.37  A 0.53 0.53 0.0 0 0 24.09 119.84  Q 23.84 102.28 24.11 84.71  C 24.25 75.42 28.44 68.29 38.75 68.26  Q 62.41 68.20 86.06 68.29  Z  M 31.54 37.42  C 31.57 41.59 34.73 44.30 38.75 44.30  Q 59.59 44.29 80.43 44.22  C 86.57 44.20 88.32 41.57 88.27 35.49  Q 88.15 21.77 88.38 7.98  A 0.47 0.46 0.6 0 0 87.91 7.51  L 32.05 7.52  A 0.51 0.51 0.0 0 0 31.54 8.02  Q 31.42 22.79 31.54 37.42  Z  M 96.57 83.02  C 96.57 78.01 93.32 75.76 88.49 75.76  Q 64.76 75.75 41.01 75.74  C 35.37 75.74 31.44 76.95 31.45 83.26  Q 31.46 101.72 31.52 120.10  A 0.40 0.39 0.0 0 0 31.92 120.49  L 95.96 120.48  A 0.50 0.50 0.0 0 0 96.46 119.98  Q 96.57 101.43 96.57 83.02  Z"/><rect x="72.27" y="16.24" width="7.48" height="19.24" rx="3.58"/>
	    </svg>
        </button>
        <section class="changes-content">
        <u><b class="text-dark-colored">Изменений: {{ changes }}</b></u>
        <span class="text-dark-colored">{{changes>0?'Не сохранено':'Нет изменений'}}</span>
        </section>
      </div>
      <section class="flex-row align-center">
      <button type="button" class="reset-button" title="Сбросить" v-on:click="$emit('resetScale')" v-if="scale!=1">
	  <svg class="svg-light-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
	      <g><path d="  M 23.10 12.74  C 22.29 13.15 18.28 14.87 18.59 15.69  A 0.64 0.63 72.9 0 0 19.32 16.08  Q 22.29 15.37 23.83 17.70  A 1.42 1.40 -56.6 0 1 24.04 18.75  Q 23.56 21.20 21.76 21.23  Q 15.90 21.30 10.38 21.21  A 2.39 2.39 0.0 0 1 8.02 18.84  C 8.00 15.66 6.11 4.31 11.66 5.59  A 2.08 2.08 0.0 0 1 13.27 7.59  L 13.34 12.19  Q 13.35 12.74 13.78 12.40  Q 28.73 0.77 43.67 8.26  C 58.49 15.68 63.56 34.82 53.19 48.14  C 42.96 61.27 23.09 62.24 12.07 49.55  C 8.51 45.45 3.57 36.07 6.10 30.31  A 1.21 1.18 0.9 0 1 6.78 29.67  C 9.33 28.73 10.46 30.20 10.63 32.60  C 12.33 56.72 45.71 61.23 52.42 37.94  C 57.24 21.18 39.71 4.30 23.10 12.74  Z"/><path d="  M 26.06 24.94  Q 28.93 27.70 31.65 30.68  A 0.50 0.50 0.0 0 0 32.36 30.71  L 39.32 24.30  A 1.53 1.52 52.5 0 1 41.64 24.61  C 43.53 27.63 37.20 32.07 35.22 33.82  A 0.52 0.52 0.0 0 0 35.20 34.58  C 36.70 36.01 43.55 41.65 41.06 43.84  A 1.97 1.97 0.0 0 1 38.34 43.72  L 32.33 37.49  A 0.53 0.53 0.0 0 0 31.60 37.46  C 29.17 39.61 24.94 44.64 22.62 43.80  A 1.10 1.09 89.3 0 1 21.96 43.15  C 20.94 40.52 26.79 36.17 28.55 34.35  A 0.52 0.52 0.0 0 0 28.57 33.63  Q 25.69 30.40 22.86 27.43  C 20.52 24.98 23.23 22.20 26.06 24.94  Z"/></g>
	  </svg>
      </button>
      <div class="flex-row align-center justify-between control-panel">
	  <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
	      <path d="  M 49.06 0.00  L 53.06 0.00  C 94.97 2.53 116.57 49.70 90.75 82.88  A 0.56 0.55 -48.3 0 0 90.79 83.62  Q 108.61 101.53 126.43 119.30  Q 127.32 120.18 128.00 122.31  L 128.00 123.81  Q 127.00 127.08 123.69 128.00  L 122.19 128.00  Q 120.08 127.22 119.30 126.43  Q 101.56 108.65 83.68 90.84  A 0.58 0.57 48.6 0 0 82.92 90.79  C 49.04 116.70 1.90 94.58 0.00 52.19  L 0.00 49.69  C 1.26 22.17 21.61 1.94 49.06 0.00  Z  M 91.92 50.99  A 40.93 40.93 0.0 0 0 50.99 10.06  A 40.93 40.93 0.0 0 0 10.06 50.99  A 40.93 40.93 0.0 0 0 50.99 91.92  A 40.93 40.93 0.0 0 0 91.92 50.99  Z"/><path d="  M 56.06 56.56  Q 55.95 66.28 56.00 76.00  C 56.03 81.39 45.96 82.95 46.01 73.71  Q 46.06 65.15 45.91 56.61  A 0.53 0.53 0.0 0 0 45.39 56.09  Q 35.64 55.93 26.08 55.99  C 20.52 56.03 19.06 46.02 28.02 46.01  Q 36.73 46.01 45.47 45.97  A 0.51 0.50 -90.0 0 0 45.97 45.46  Q 46.02 35.70 46.00 26.01  C 45.99 21.61 52.77 19.95 55.11 23.86  C 57.10 27.17 56.01 41.01 56.03 45.48  A 0.50 0.49 0.0 0 0 56.53 45.97  Q 65.67 46.00 74.76 46.02  C 79.96 46.03 82.67 52.15 78.55 54.93  C 75.33 57.10 61.04 56.02 56.56 56.06  A 0.50 0.50 0.0 0 0 56.06 56.56  Z"/>
	  </svg>
        <div class="flex-row align-center">
          <input type="range" step="0.2" min="0.2" max="5" v-model="scale" @input="doZoom" class="zoomRange">
          <input type="number" min="0.2" max="5" step="0.2" v-model="scale" @input="doZoom">
        </div>
        <button type="button" class="button-light button-small" @click="$emit('resetAlign')">Выровнять</button>
      </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters} from "vuex";

export default defineComponent({
  name: "BotMenu",
  data() {
    return {
      scale: 1 as number,
    }
  },
  methods: {
    doZoom() {
      this.$emit("zoom", event, Number(this.scale), "=")
    },
    saveMap() {
      this.$emit('saveMap')
    }
  },
  props: {
    scaleProp: Number,
  },
  emits:['resetAlign','zoom','resetScale','saveMap'],
  computed:{
    ...mapGetters({
    changes: "getChangesCount"
    })
  },
  watch: {
    scaleProp(val:number) {
      this.scale = val
    },
    changesProp(val:number) {
      this.changes = val
    }
  }
})
</script>
<style scoped lang="sass">
@use "@/assets/styles/Variables"
.bot-menu
  background-color: Variables.$medium-light-color
  grid-area: BotMenu
  position: fixed
  bottom: 0
  border-top: 1px solid Variables.$medium-color
  width: 100%
  z-index: 4

.save-button
  border-radius: 0
  border-top: none
  border-left: none
  border-bottom: none
  transition: 0.5s all
  background-color: Variables.$medium-light-color
  max-width: 41px
  max-height: 40px
  border-right: 1px solid Variables.$medium-color
  cursor: pointer
  padding: 5px

.save-button svg, .reset-button svg
  width: 100%
  height: 100%
  object-fit: contain

.save-button:hover, .reset-button:hover
  background-color: Variables.$dark-color
  & svg
    fill: Variables.$orange-color

.changes-content
  margin-inline: 10px

.changes-content span
  margin-inline: 5px

.control-panel
  margin-inline: 20px
  width: 400px


.reset-button
  max-height: 40px
  max-width: 40px
  background-color: Variables.$orange-color
  border-radius: 10px
  border: none
  cursor: pointer
  display: flex
  align-items: center
</style>
