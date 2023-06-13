<template>
    <div id="cursorOpt" class="toolsOptions" >
      <div class="flexRow justifyBetween alignCenter">
        <b> Курсор </b>
        <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursorPointer" height="20" alt="">
      </div>
      <hr>
      <p>
      Выбирать:</p>
      <div class="selectOptionsContainer">
        <div class="selectOption"
             :class="{optionChecked: selectionTypes.length==5 }"
             @click="setAllSelectTypes">Всё
        </div>
        <div class="selectOption" :class="{optionChecked: getSelectType('brush') }"
             @click="setSelectType('brush')">
          <img src="@/assets/images/Tools/brush.png" alt="">
        </div>
        <div class="selectOption" :class="{optionChecked: getSelectType('stamp') }"
             @click="setSelectType('stamp')">
          <img src="@/assets/images/Tools/stamp.png" alt="">
        </div>
        <div class="selectOption"
             :class="{optionChecked: getSelectType('shape') }"
             @click="setSelectType('shape')">
          <img src="@/assets/images/Tools/shapes.png" alt="">
        </div>
        <div class="selectOption" :class="{optionChecked: getSelectType('path') }"
             @click="setSelectType('path')">
          <img src="@/assets/images/Tools/path.png" alt="">
        </div>
        <div class="selectOption" :class="{optionChecked: getSelectType('text') }"
             @click="setSelectType('text')">
          <img src="@/assets/images/Tools/text.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "cursorPanel",
  data(){
    return{
      selectionTypes:this.$store.state.cursorOptions.selectionTypes,
    }
  },
  methods:{
    getSelectType(type) {
      if (this.selectionTypes.indexOf(type) !== -1)
        return true
      else return false
    },
    setSelectType(type) {
      let index = this.selectionTypes.indexOf(type)
      if (index !== -1)
        this.selectionTypes.splice(index, 1)
      else
        this.selectionTypes.push(type)
      this.$store.commit('cursorOptions/updateCursorOptions', {selectionTypes:this.selectionTypes})
    },
    setAllSelectTypes() {
      if (this.selectionTypes.length == 5)
        this.selectionTypes = []
      else
        this.selectionTypes = ['brush', 'stamp', 'shape', 'path', 'text']
      this.$store.commit('cursorOptions/updateCursorOptions', {selectionTypes:this.selectionTypes})
    },
  },
}
</script>

<style scoped>

.selectOptionsContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  user-select: none;
}

.selectOption {
  display: flex;
  align-items: center;
  height: inherit;
  padding: 10px;
  cursor: pointer;
}

.selectOption:nth-last-child(n+2) {
  border-right: 1px solid #dcdcdc;
}

.selectOption img {
  height: 100%;
  object-fit: contain;
}

.optionChecked {
  background-color: #3d4551;
  color: #dcdcdc;
}

.optionChecked:nth-last-child(1) {
  border-radius: 0 10px 10px 0;
}

.optionChecked:nth-child(1) {
  border-radius: 10px 0 0 10px;
}

.optionChecked img {
  filter: invert(100%);
}
</style>
