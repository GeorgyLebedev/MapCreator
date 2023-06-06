<template>
  <details>
    <summary><u>Палитра:</u></summary>
    <table id="palette" class="colorTable">
      <tr v-for="row in 3" :key="row">
        <td class="colorCell"
            :class="{'cursorPointer':paletteCellColor(row,column)!='unset'}"
            :tabindex="((row-1)*8+(column-1))"
            v-for="column in 8"
            :key="column"
            :style="{'background-color': paletteCellColor(row,column)}"
            @click.right="openPaletteContextMenu($event,row,column)">
          <img src="@/assets/images/Tools/Options/noColor.png" alt="" v-if="paletteCellColor(row,column)=='unset'">
          <div class="contextContainer" @click="showPaletteContext=false" v-if="showPaletteContext">
            <div class="contextMenu" :style="paletteContextStyle" @contextmenu.prevent>
              <div class="contextMenuItem" @click="showPaletteContext=false">
                Отмена
              </div>
              <hr class="contextMenuDivider">
              <div class="contextMenuItem" @click="updatePalette(brushOptions.color)">
                Записать текущий цвет
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </details>
</template>

<script>
import AxiosRequest from "@/modules/services/axiosRequest";

export default {
  name: "colorsPalette",
  data(){
    return{
      error:"",
      paletteOpt:{
        paletteRow:0,
        paletteColumn:0
      },
      paletteColors: Array(24).fill(null),
      paletteContextStyle: {},
      showPaletteContext: false,
    }
  },
  methods:{
    async getPalette(){
      try {
        let request = new AxiosRequest('options/', 'get')
        let response = await request.sendRequest()
        if (response && response.options) return response.options
      } catch (e) {
        this.error = e
      }
    },
    async updatePalette(color) {
      let index=((this.paletteOpt.paletteRow-1)*8+(this.paletteOpt.paletteColumn-1))
      this.paletteColors[index] = color
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
    openPaletteContextMenu(event, row, column) {
      this.showPaletteContext = true;
      this.paletteContextStyle = {
        left: event.clientX + 'px',
        top: event.clientY + 'px'
      }
      this.paletteOpt.paletteRow=row
      this.paletteOpt.paletteColumn=column
    },
  },
  async mounted(){

  }
}
</script>

<style scoped>

</style>
