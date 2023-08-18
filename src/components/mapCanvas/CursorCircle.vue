<template>
    <div class="tool-cursor-circle" :style="{top:currentPosition.top, left:currentPosition.left, width:(cursorSize+'px'),height:(cursorSize+'px')}"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import store from "@/modules/store/store";
export default defineComponent({
    name: "cursorCircle",

    computed: {
        top(){
            return store.getters['cursorState/getCursorPosition'].top
        },
        left(){
            return store.getters['cursorState/getCursorPosition'].left
        },
        currentPosition():{top:string, left:string} {
            return {
                top: `${this.top}px`,
                left: `${this.left}px`
            };
        },
        cursorSize(){
            return store.getters['cursorState/getCursorSize']
        }
    },
})
</script>

<style lang="sass" scoped>
@use "@/assets/styles/Variables"
.tool-cursor-circle
  background-color: Variables.$orange-color
  border: 1px solid Variables.$medium-color
  border-radius: 50%
  position: fixed
  transform: translate(-50%, -50%)
  opacity: 0.75
  user-select: none
  pointer-events: none
  z-index: 2
  mix-blend-mode: difference
  cursor: none
</style>
