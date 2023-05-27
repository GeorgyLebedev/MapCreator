<template>
  <transition name="popup-anim">
    <div class="modalContainer">
      <div id="stampsWindow">
        <div class="modalHeader">
          <b>Каталог штампов</b>
          <img class="c-pointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
               @click="this.$emit('showStampsWindow', false)">
        </div>
        <hr>
        <div class="modalBody">
          <div class="sideMenu">
            <div class="stampKit c-pointer" :class="{selectedKit:(key==this.selectedKit)}"
                 v-for="(val, key) in stamps" :key=key
                 @click="this.selectedKit=key">
              <div class="stampKitName" :title="key">{{ key }}</div>
            </div>
            <div class="stampKit " v-if="addNewKit">
              <div class="stampKitName addNewKit">
                <input type="text" style="border: none; outline: none" placeholder="Минимум 5 символов"
                       ref="newKitInput" v-model="newKitName">
                <div style="display: flex">
                  <img class="c-pointer interactive" src="@/assets/images/Service/close.png" alt=""
                       @click="()=>{
                     this.newKitName=''
                     this.addNewKit=false
                   }">
                  <img class="c-pointer interactive" src="@/assets/images/Service/tick.png" alt=""
                       @click="()=>{
                     if(this.newKitName.length>=5){
                       this.stamps[this.newKitName]={}
                       this.selectedKit=this.newKitName
                     this.newKitName=''
                     this.addNewKit=false
                     }
                   }">
                </div>
              </div>
            </div>
            <div class="stampKit c-pointer">
              <div class="stampKitName c-pointer addNewKit" @click="()=>{
              this.addNewKit=true
            }">
                Создать новый набор
                <img src="@/assets/images/new.png" alt="" width="30" height="30">
              </div>
            </div>
          </div>
          <div class="stampList" v-if="this.selectedKit">
            <div class="stampIcon" v-for="(val,key) in this.stamps[this.selectedKit]" :key=key @click="this.$emit('showStampsWindow', false)">
              <img class="stampImage c-pointer" :src=val alt="">
            </div>
            <div class="stampIcon">
              <input type="file"
                     :hidden="true"
                     ref="fileInput"
                     accept="image/svg+xml"
                     @change="getFile">
              <img class="stampImage c-pointer" src="@/assets/images/new.png" alt="" @click="pickFile">
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import AxiosRequest from "@/modules/services/axiosRequest";
export default {
  name: 'StampsWindow',
  props: {
    stampsProp:{
      type: Object,
    }
  },
  data() {
    return {
      stamps:{},
      addNewKit: false,
      newKitName: "",
      selectedKit: null,
      selectedStamp: null,
    }
  },
  methods:{
    pickFile(){
      this.$refs.fileInput.click()
    },
    getFile(event){
      const reader = new FileReader();
      const file = event.target.files[0];
      let base64, kitLength
      reader.readAsDataURL(file);
        reader.onloadend = () => {
          base64=reader.result
          kitLength=Object.keys(this.stamps[this.selectedKit]).length
          this.stamps[this.selectedKit][`stamp${kitLength+1}`]=base64
          console.log(this.stamps)
          //this.kitUpdate()
        };
    },
    async kitUpdate(){
      let response, request
        request=await new AxiosRequest("/options/stamps","post", this.stamps)
        response=request.sendRequest()
        console.log(response)
      }
  },
  mounted() {
    if (this.stampsProp)
      this.stamps=this.stampsProp
      this.selectedKit = this.stamps[0]
  }
}
</script>
<style scoped>
hr {
  margin: 0 !important;
  padding: 0 !important;
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
  margin: 10px 10px 10px 0;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
}

.stampKitName {
  overflow: hidden;
  white-space: nowrap;
  margin-inline: 10px;
  margin-block: 5px;
  text-overflow: ellipsis;
}

.addNewKit {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  color: gray;
}

.stampIcon {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  margin: 10px;
}

.stampImage {
  width: 100px;
  height: 100px;
  min-width: 30px;
  min-height: 30px;
  padding: 5px
}

.selectedKit {
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
