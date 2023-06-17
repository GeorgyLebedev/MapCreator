<template>
  <Notification/>
  <router-view />
</template>
<script>
import Notification from "@/components/Notification";
export default {
  name: 'App',
  components:{
    Notification
  }
}
</script>
<style>
.cursorPointer{
  cursor: pointer;
}
</style>
