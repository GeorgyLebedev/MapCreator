<template>
  <div class="modalContainer" v-if="true && showWindow">
    <div id="stampsWindow">
      <div class="modalHeader">
        <b>Каталог штампов</b>
        <img class="c-pointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
             @click="showWindow=false">
      </div>
      <hr>
      <div class="modalBody">
        <div class="sideMenu">
          <div class="stampKit c-pointer" v-for="kit in stampsList" :key=kit>
            <hr>
            <div class="stampKitName">{{kit}} </div>
            <hr>
          </div>
          <div class="stampKit " v-if="addNewKit">
            <hr>
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
            <hr>
          </div>
          <div  class="stampKit c-pointer">
            <hr>
            <div class="stampKitName c-pointer addNewKit" @click="()=>{
              this.addNewKit=true
              this.$refs.newKitInput.focus()
            }">
            Создать новый набор
              <img src="@/assets/images/new.png" alt="" width="30" height="30">
            </div>
            <hr>
          </div>
        </div>
        <div class="stampList">
          <div class="stampIcon" v-for="i in 30" :key=i>
            <img class="stampImage c-pointer" src="@/assets/images/Stamps/firstSet/stampEx.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
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
      showWindow: true,
      stampsList:["Набор №1","Набор №2","Набор №3","Набор №4","Набор №5","Набор №6","Набор №7"],
      addNewKit:false,
      newKitName:"",
    }
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
}
.stampKitName {
  margin-top: 5px;
  margin-bottom: 5px;
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
  border: 1px solid gainsboro;
  margin: 10px;
}
.stampImage{
  width:100px;
  height: 100px;
  min-width: 30px;
  min-height:30px;
  padding: 5px
}
</style>
