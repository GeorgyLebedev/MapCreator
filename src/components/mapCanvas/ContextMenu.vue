<template>
    <div class="context-menu" :style="contextMenuStyle" @contextmenu.prevent>
	<div class="context-menu-item" @click="this.$emit('copyItem')">
	    <img src="@/assets/images/Service/copy.png" alt="">
	    Копировать
	</div>
	<hr class="contextMenuDivider">
	<div class="context-menu-item" @click="this.$emit('toFront')">
	    <img src="@/assets/images/Service/toFront.png" alt="">
	    На передний план
	</div>
	<div class="context-menu-item" @click="this.$emit('toBack')">
	    <img src="@/assets/images/Service/toBack.png" alt="" >
	    На задний план
	</div>
	<hr class="contextMenuDivider">
	<div class="context-menu-item" @click="this.$emit('removeItem')">
	    <img src="@/assets/images/Service/delete.png" alt="">
	    Удалить
	</div>
    </div>

</template>
<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters} from "vuex";
export default defineComponent({
    name: "ContextMenu",
    computed: {
        ...mapGetters({
            contextMenuPosition: 'cursorOptions/getContextMenuPos'
        }),
        contextMenuStyle() {
            if (!this.contextMenuPosition) return
            return {
                top: this.contextMenuPosition.top ? `${this.contextMenuPosition.top}px` : 'auto',
                right: this.contextMenuPosition.right ? `${this.contextMenuPosition.right}px` : 'auto',
                left: this.contextMenuPosition.left ? `${this.contextMenuPosition.left}px` : 'auto',
                bottom: this.contextMenuPosition.bottom ? `${this.contextMenuPosition.bottom}px` : 'auto',
            };
        },
    }
})
</script>
<style scoped lang="sass">
@use "@/assets/styles/Variables"
.context-menu
  user-select: none
  z-index: 5
  padding-block: 7px
  position: fixed
  background-color: Variables.$light-color
  border: 1px solid Variables.$medium-color
  border-radius: 10px
  width: auto
  height: auto

.context-menu-item
  display: flex
  flex-direction: row
  align-items: center
  height: 40px
  padding-block: 5px
  padding-inline: 10px
  color: #3d4551
  cursor: pointer

.context-menu-item:hover
  background-color: Variables.$dark-color
  color: Variables.$light-color

.context-menu-item img
  margin-right: 5px
  object-fit: contain
  height: 80%


</style>
