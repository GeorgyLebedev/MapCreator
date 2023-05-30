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
                 v-for="(val, key) in stamps" :key=key>
              <div class="stampInnerContainer" v-if="!editKit[key]" @click.self="this.selectedKit=key">
              <div class="stampKitName" :title="key" @click.self="this.selectedKit=key" v-if="editKit[key]!==key">{{ key }}</div>
              <div style="display: flex; flex-direction: row">
                <div class="stampKitOptions">
                  <img class="stampKitButton" title="Удалить" src="@/assets/images/Service/delete.png" alt="" @click.prevent="showKitDeleteConfirm(key)">
                </div>
                <div class="stampKitOptions">
                  <img class="stampKitButton" title="Редактировать" src="@/assets/images/Service/edit.png" alt=""
                       @click.prevent="()=>{
                         this.editKit={}
                         this.editKit[key]=true
                       this.editKitName=key}">
                </div>
              </div>
              <transition name="scale-anim">
              <div class="deleteConfirm kitConfirm" v-if="kitDeleteConfirm[key]" :key=key>
                Вы уверены, что хотите удалить данный набор?
                <div class="flexRow">
                  <button type="button" class="buttonDark" @click="deleteKit(key)">Удалить</button>
                  <button type="button" class="buttonLight" @click="kitDeleteConfirm[key]=false">Отмена</button>
                </div>
              </div>
              </transition>
              </div>
              <div  class="stampInnerContainer stampKitName" v-else>
                <input type="text" class="likeStringInput"
                       placeholder="Минимум 5 символов"
                       ref="editKitInput" v-model="editKitName">
                <div style="display: flex">
                  <img class="c-pointer interactive" src="@/assets/images/Service/close.png" alt=""
                       @click="()=>{
                     this.editKitName=''
                     this.editKit={}
                   }">
                  <img class="c-pointer interactive" src="@/assets/images/Service/tick.png" v-if="editKitName.length>=5" alt=""
                       @click="updateKitName(key)">
                </div>
              </div>
            </div>
            <div class="stampKit " v-if="addNewKit">
              <div class="stampKitName addNewKit">
                <input type="text" class="likeStringInput"
                       placeholder="Минимум 5 символов"
                       ref="newKitInput" v-model="newKitName">
                <div style="display: flex">
                  <img class="c-pointer interactive" src="@/assets/images/Service/close.png" alt=""
                       @click="()=>{
                     this.newKitName=''
                     this.addNewKit=false
                   }">
                  <img class="c-pointer interactive" src="@/assets/images/Service/tick.png" v-if="newKitName.length>=5" alt=""
                       @click="addKit">
                </div>
              </div>
            </div>
            <div class="stampKit c-pointer">
              <div class="stampKitName c-pointer addNewKit" @click="()=>this.addNewKit=true">
                Создать новый набор
                <img src="@/assets/images/new.png" alt="" width="30" height="30">
              </div>
            </div>
          </div>
          <div class="stampList" v-if="this.selectedKit">
            <div class="stampIcon" :class="{selectedIcon:val==selectedStamp, focusStamp:isFocusStamp[key]}"
                 v-for="(val,key) in this.stamps[this.selectedKit]" :key=key>
              <transition name="scale-anim">
                <div class="deleteConfirm stampConfirm" v-if="stampDeleteConfirm[key]" :key=key>
                  Вы уверены, что хотите удалить данный штамп?
                  <div class="flexRow">
                    <button type="button" class="buttonDark" @click="deleteStamp(key)">Удалить</button>
                    <button type="button" class="buttonLight" @click="stampDeleteConfirm[key]=false">Отмена</button>
                  </div>
                </div>
              </transition>
              <img class="deleteStampCross c-pointer" src="@/assets/images/Service/crossRounded.png"
                   @click.prevent="showStampDeleteConfirm(key)">
              <img class="stampImage c-pointer" :src=val alt=""  @click.self="selectedStamp=val">
            </div>
            <div class="stampIcon">
              <input type="file" :hidden="true" ref="fileInput" accept="image/svg+xml" @change="getFile">
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
    stampsProp: {
      type: Object,
    }
  },
  data() {
    return {
      stamps: {},
      addNewKit: false,
      editKit: {},
      newKitName: "",
      editKitName: "",
      selectedKit: null,
      selectedStamp: null,
      kitDeleteConfirm: {},
      stampDeleteConfirm: {},
      isFocusStamp: {},
    }
  },
  methods: {
    showStampDeleteConfirm(key){
      this.stampDeleteConfirm=this.kitDeleteConfirm=this.isFocusStamp={}
      this.stampDeleteConfirm[key]=true
      this.isFocusStamp[key]=true
    },
    showKitDeleteConfirm(key){
      this.stampDeleteConfirm=this.kitDeleteConfirm=this.isFocusStamp={}
      this.kitDeleteConfirm[key]=true
    },
    async deleteStamp(key){
      this.stampDeleteConfirm=this.kitDeleteConfirm=this.isFocusStamp={}
      delete this.stamps[this.selectedKit][key]
      await this.updateStamp()
    },
    addKit(){
      this.stamps[this.newKitName]={}
      this.selectedKit=this.newKitName
      this.newKitName=''
      this.addNewKit=false
    },
    async deleteKit(key){
      this.stampDeleteConfirm=this.kitDeleteConfirm=this.isFocusStamp={}
      delete this.stamps[key]
      await this.updateStamp()
    },
    async updateKitName(key){
      this.stamps[this.editKitName]=this.stamps[key]
      delete this.stamps[key]
      this.editKitName=""
      this.editKit=""
      await this.updateStamp()
    },
    pickFile() {
      this.$refs.fileInput.click()
    },
    getFile(event) {
      const reader = new FileReader();
      const file = event.target.files[0];
      let base64, index
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        base64 = reader.result
        if (Object.values(this.stamps[this.selectedKit]).includes(base64)) {
          this.$emit('errorAlert', "В выбранном наборе уже есть такой штамп!")
          return
        }
        if(Object.keys(this.stamps[this.selectedKit]).length==0)
          index = 0
        else {
          index = Object.keys(this.stamps[this.selectedKit])
          index=Number(index[index.length-1].replace(/^\D+/g, ''))
        }
        this.stamps[this.selectedKit][`stamp${index + 1}`] = base64
        console.log(this.stamps)
        this.updateStamp()
      };
    },
    async updateStamp() {
      let response, request
      request = await new AxiosRequest("options/", "put", {stamps: this.stamps})
      response = await request.sendRequest()
      if (!response.msg)
        this.$emit('updateStamps', this.stamps)
      else this.$emit('errorAlert', response.msg)
    }
  },
  watch:{
    selectedKit(val){
      if(Object.keys(this.stamps[val]).length>0)
      this.selectedStamp = this.stamps[val][Object.keys(this.stamps[val])[0]]
    }
  },
  mounted() {
    if (this.stampsProp) {
      this.stamps = this.stampsProp
      this.selectedKit = Object.keys(this.stamps)[0]
      this.selectedStamp = this.stamps[this.selectedKit][Object.keys(this.stamps[this.selectedKit])[0]]
    }
  }
}
</script>
<style scoped>
hr {
  margin: 0 !important;
  padding: 0 !important;
}

#stampsWindow {
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
  padding: 0;
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
}

.stampList {
  width: 80%;
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.stampKit {
  display: flex;
  height: 42px;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
}

.stampKit:hover, .stampKitOptions:hover {
  -webkit-box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
}

.stampKit:not(.selectedKit):hover .stampKitOptions {
  display: flex;
  align-items: center;
}
.stampInnerContainer{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.stampKitName {
  overflow: hidden;
  white-space: nowrap;
  margin-inline: 10px;
  margin-block: 5px;
  text-overflow: ellipsis;
}

.stampKitButton {
  height: 25px;
  width: auto;
  object-fit: cover;
}

.stampKitOptions {
  display: none;
  background-color: white;
  margin-right: 10px;
  border-radius: 5px;
  padding: 2px;
  border: 1px solid #dcdcdc;
}

.addNewKit {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  color: gray;
}

.stampIcon:not(.deleteConfirm) {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin: 10px;
}
.stampIcon:not(.selectedIcon){
  border: 1px solid #dcdcdc;
}
.stampIcon:not(.focusStamp):not(.selectedIcon){
  opacity: 0.8;
}
.stampIcon:hover:not(.selectedIcon) {
  -webkit-box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  opacity: 1;
}

.stampIcon:hover:not(.selectedIcon) .deleteStampCross {
  display: block;
}

.selectedIcon {
  opacity: 1;
  border: 3px solid #e6e6e6;
  background-color: #F3F3F3;
}

.stampImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 5px;
}

.selectedKit {
  background-color: #232323;
  color: #dcdcdc;
  font-weight: bolder;
  border-color: #232323;
}
.likeStringInput{
  border: none;
  outline: none;
  padding-inline: 0;
}
.deleteStampCross {
  position: absolute;
  width: 20px;
  top: 5px;
  right: 5px;
  display: none;
}
.deleteConfirm {
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 4;
  flex-direction: column;
  width: 200px;
  background-color: white;
  font-size: small;
  border: 1px solid #dcdcdc;
  padding: 5px;
  border-radius: 5px;
  cursor: default;
}
.kitConfirm{
  top:40px;
  left: 115px;
}
.stampConfirm{
  bottom: 100px;
  right: -48px;
  opacity: 1;
}
.focusStamp{
  opacity: 1;
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
