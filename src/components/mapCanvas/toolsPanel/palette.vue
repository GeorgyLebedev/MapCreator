<template>
  <details>
    <summary class="cursorPointer"><u>Палитра:</u></summary>
    <div id="palette" class="colorGrid">
      <div
          v-for="(color, index) in paletteColors"
          :key="index"
          class="colorCell"
          :class="{ 'cursorPointer': color !== null }"
          :style="{ backgroundColor: color }"
          @click.right="openPaletteContextMenu($event, index)"
          @click.left="setToolColor(color)"
          :tabindex="index">
        <img src="@/assets/images/Tools/Options/noColor.png"  v-if="color==null">
      </div>
      <div class="invisibleContainer" @click="showPaletteContext=false" v-if="showPaletteContext">
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
  </details>
</template>

<script>
import AxiosRequest from "@/modules/services/axiosRequest";

export default {
  name: "colorsPalette",
  props:{
    color: String,
    source: String
  },
  data(){
    return{
      error:"",
      index: null,
      paletteContextStyle: {},
      showPaletteContext: false,
    }
  },
  methods:{
    setToolColor(color) {
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
    async getPalette(){
      try {
        let request = new AxiosRequest('options/', 'get')
        let response = await request.sendRequest()
        if (response && response.options) return response.options.palette
      } catch (e) {
        this.error = e
      }
    },
    async updatePalette(index,color) {
      const options={index, color}
      console.log(options)
      this.$store.commit('colorsStore/updatePalette', options)
      try {
        let request = new AxiosRequest('options/', 'put', {palette: this.paletteColors})
        await request.sendRequest()
      } catch (e) {
        this.error = e
      }
    },
    paletteCellColor(row, column) {
      return this.paletteColors[((row - 1) * 8 + (column - 1))] ? this.paletteColors[((row - 1) * 8 + (column - 1))] : 'unset'
    },
    openPaletteContextMenu(event,index) {
      this.index=index
      this.showPaletteContext = true;
      this.paletteContextStyle = {
        left: event.clientX + 'px',
        top: event.clientY + 'px'
      }
    },
  },
  computed:{
    paletteColors(){
      return this.$store.state.colorsStore.paletteColors
    }
  },
  async mounted() {
    let palette=await this.getPalette()
    if(palette){
      this.$store.commit('colorsStore/setPalette',palette)
    }
  }
}
</script>

<style scoped>
summary:focus{
  outline: none;
}
summary{
  padding-bottom: 5px;
}
details{
  user-select: none;
  padding-block: 5px;
}
.colorGrid {
  display: grid;
  grid-template-columns: repeat(8, 30px);
  grid-template-rows: repeat(3, 30px);
  gap: 1px;
  padding: 3px;
  justify-content: space-between;
  border: 1px solid gainsboro;
}
.colorCell {
  max-height: 30px;
  width: 30px;
  height: 30px;
  max-width: 30px;
  border: 1px solid gainsboro;
}

.colorCell:focus {
  border: 1px solid black;
}

.colorCell img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
