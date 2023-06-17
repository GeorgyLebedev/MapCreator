<template>
  <transition name="notification-anim">
    <div :class="'notification ' + notification.type" v-if="Object.keys(notification).length>0">
      <div class="notificationHeader">
        <b>{{ title }}</b>
        <img class="cursorPointer" src="@/assets/images/Service/close.png" alt="" width="20" height="20"
             @click="this.$store.commit('clearNotification')">
      </div>
      <div class="notificationBody">
        {{ notification.message }}
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "NotifyComponent",
  computed: {
    notification() {
      return this.$store.state.notification;
    },
    title() {
      let value = ""
      switch (this.notification.type) {
        case "error":
          value = "\u274c Ошибка!"
          break;
        case "message":
          value = "\u2755 Сообщение:"
          break;
        case "success":
          value = "\u2714\uFE0F Успешно!"
          break;
      }
      return value
    }
  }
}
</script>
<style scoped>
img{
  filter: invert(100%);
}
.notification {
  z-index: 6;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  color: white;
  border: 2px solid #3d4551;
  min-width: 400px;
  max-width: 400px;
}

.notificationHeader {
  padding: 5px;
  border-bottom: 1px solid #e3e9f4;
  display: flex;
  justify-content: space-between;
}

.notificationBody {
  padding: 5px;
  overflow-y: auto;
  min-height: 40px;
  max-height: 75px;
}
.notification.error {
  background-color: #a02f2f;
}

.notification.message {
  background-color: #3d78bd;
}

.notification.success {
  background-color: #308930;
}

.notification-anim-enter-active,
.notification-anim-leave-active {
  transition: all 0.3s ease-out;
}

.notification-anim-enter-from,
.notification-anim-leave-to {
  transform: translateY(-200px)
}
</style>
