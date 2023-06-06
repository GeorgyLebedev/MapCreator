<template>
  <p>Последние цвета:</p>
  <table class="colorTable">
    <tr>
      <td v-for="(color, index) in recentColors" :key="index"
          class="colorCell cursorPointer"
          :style="{ 'background-color': color}"
          @click="optionsProp.color=color ">
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "recentColors",
  props:{
    recentColors:{
      type: Array,
      default: Array(8).fill('transparent')
    },
    optionsProp:Object,
  }
}
</script>

<style scoped>

</style>
