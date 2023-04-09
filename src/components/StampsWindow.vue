<template>
  <transition name="popup-anim">
  <div class="modalContainer" v-if="windowVisible">
    <div id="stampsWindow">
      <div class="modalHeader">
        <b>Каталог штампов</b>
        <img class="c-pointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
             @click="this.$emit('showStampsWindow', false)">
      </div>
      <hr>
      <div class="modalBody">
        <div class="sideMenu">
          <div class="stampKit c-pointer" :class="{selectedKit:(kit==this.selectedKit)}"
               v-for="kit in stampsList" :key=kit
                @click="this.selectedKit=kit">
            <div class="stampKitName">{{kit}} </div>
          </div>
          <div class="stampKit " v-if="addNewKit">
            <div class="stampKitName addNewKit">
              <input type="text" style="border: none; outline: none" placeholder="Минимум 5 символов" ref="newKitInput" v-model="newKitName">
              <div style="display: flex">
              <img class="c-pointer" src="@/assets/images/Service/close.png" alt=""
                   @click="()=>{
                     this.newKitName=''
                     this.addNewKit=false
                   }">
              <img class="c-pointer" src="@/assets/images/Service/tick.png" alt=""
                   @click="()=>{
                     if(this.newKitName.length>=5){
                       this.stampsList.push(this.newKitName)
                     this.newKitName=''
                     this.addNewKit=false
                     }
                   }">
              </div>
            </div>
          </div>
          <div  class="stampKit c-pointer">
            <div class="stampKitName c-pointer addNewKit" @click="()=>{
              this.addNewKit=true
              this.$refs.newKitInput.focus()
            }">
            Создать новый набор
              <img src="@/assets/images/new.png" alt="" width="30" height="30">
            </div>
          </div>
        </div>
        <div class="stampList">
          <div class="stampIcon" v-for="i in 30" :key=i  @click="this.$emit('showStampsWindow', false)">
            <img class="stampImage c-pointer" src="@/assets/images/Stamps/firstSet/stampEx.svg" alt="">
          </div>
          <div class="stampIcon">
            <img class="stampImage c-pointer" src="@/assets/images/new.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'StampsWindow',
  props: {
    windowVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stampsList:["Набор №1","Набор №2","Набор №3","Набор №4","Набор №5","Набор №6","Набор №7"],
      addNewKit:false,
      newKitName:"",
      selectedKit: null
    }
  },
  mounted() {
    if(this.stampsList)
    this.selectedKit=this.stampsList[0]
  }
}
</script>
<style scoped>
hr {
  margin: 0 !important;
  padding: 0 !important;
}
.modalContainer {
  min-width: 700px;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
#stampsWindow {
  overflow-y: hidden;
  background-color: white;
  width: 80%;
  height: 60%;
  min-width: 700px;
  min-height: 700px;
  border-radius: 15px;
}
.modalHeader {
  display: flex;
  font-size: large;
  justify-content: space-between;
  padding: 10px;
  height: 7%;
  width: 100%
}
.modalBody {
  width: 100%;
  height: 93%;
  display: flex;
}
.sideMenu {
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gainsboro;
  overflow-y: auto;
}
.stampList {
  overflow-y: auto;
  width: 80%;
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.stampKit {
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid  #dcdcdc;
}
.stampKitName {
  margin-inline: 10px;
  margin-block: 5px;
}
.addNewKit{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  color:gray;
}
.stampIcon{
  width:100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  margin: 10px;
}
.stampImage{
  width:100px;
  height: 100px;
  min-width: 30px;
  min-height:30px;
  padding: 5px
}
.selectedKit{
  background-color: #232323;
  color: #dcdcdc;
  font-weight: bolder;
  border-color: #232323;
}
.popup-anim-enter-active,
.popup-anim-leave-active {
  transition: all 0.25s ease-out;
}

.popup-anim-enter-from,
.popup-anim-leave-to {
  opacity: 0;
}
</style>
