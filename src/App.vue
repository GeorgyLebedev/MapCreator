<template>
  <Notification/>
  <router-view />
</template>
<script>
import Notification from "@/components/Notification.vue";
import {defineComponent} from "vue";
export default defineComponent({
  name: 'App',
  components:{
    Notification
  }
})
</script>
