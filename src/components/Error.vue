<template>
  <transition name="error-anim">
    <div class="errorNotice" v-if="error">
      <div class="errorHeader">
        <b>{{error?'Ошибка':'Сообщение'}}</b>
        <img class="cursorPointer" src="@/assets/images/Service/close.png" alt="" width="20" height="20"
             @click="this.$emit('clearError')">
      </div>
      <div class="errorContent">
        {{ error }}
        {{ message }}
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "ErrorComponent",
  props: {
    error: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
  },
}
</script>
<style>
.errorNotice{
  z-index: 6;
  position: absolute;
  top: 10px;
  right: 10px;
  border: 2px solid #ea5c41;
  border-radius: 10px;
  background: #e3e9f4;
  color: #3d4551;
  min-width: 400px;
  max-width: 400px;
}
.errorHeader{
  padding:5px;
  border-bottom: 2px solid #ea5c41;
  display: flex;
  justify-content: space-between;
}
.errorContent{
  padding: 5px;
  overflow-y: auto;
  min-height: 40px;
  max-height: 75px;
}
.error-anim-enter-active,
.error-anim-leave-active {
  transition: all 0.3s ease-out;
}
.error-anim-enter-from,
.error-anim-leave-to {
  transform: translateY(-200px)
}
</style>
