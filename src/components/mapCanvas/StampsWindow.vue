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
              <div class="stampKitName" :title="kit">{{ kit }}</div>
            </div>
            <div class="stampKit " v-if="addNewKit">
              <div class="stampKitName addNewKit">
                <input type="text" style="border: none; outline: none" placeholder="Минимум 5 символов"
                       ref="newKitInput" v-model="newKitName">
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
            <div class="stampKit c-pointer">
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
            <div class="stampIcon" v-for="i in 0" :key=i @click="this.$emit('showStampsWindow', false)">
              <img class="stampImage c-pointer" src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0naXNvLTg4NTktMSc/Pgo8IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIGZpbGw9IiMwMDAwMDAiIGhlaWdodD0iODAwcHgiIHdpZHRoPSI4MDBweCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NjMuMDAxIDQ2My4wMDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0NjMuMDAxIDQ2My4wMDEiPgogIDxnPgogICAgPHBhdGggZD0ibTQ1NS41LDI5Mi4wMDFoLTczLjgzOGwyNC4wOS0zNi4zNTdjMC41MTktMC43ODIgMC44ODUtMS42NTQgMS4wODItMi41NzFsMTMuNzE0LTYzLjk5OWMwLjg2Ny00LjA1LTEuNzEyLTguMDM3LTUuNzYzLTguOTA1LTQuMDQtMC44NjctOC4wMzYsMS43MTEtOC45MDUsNS43NjJsLTEzLjQxNiw2Mi42MS0yOC43OTUsNDMuNDU5aC0xNjUuMzM5bDQ1LjY5LTM0LjUxNmMwLjkyMi0wLjY5NiAxLjY3MS0xLjU5NyAyLjE4OC0yLjYzbDQ2LjUyNC05My4wNDkgNDEuNDE4LTExLjgzNC0xMy43NDksODIuNDkyLTIyLjkwMSwzMC41MzhjLTIuNDg1LDMuMzEzLTEuODEzLDguMDE1IDEuNSwxMC41IDEuMzUsMS4wMTIgMi45MjksMS41IDQuNDk0LDEuNSAyLjI4LDAgNC41MzItMS4wMzYgNi4wMDYtM2wyNC0zMmMwLjcyMS0wLjk2MSAxLjItMi4wODIgMS4zOTgtMy4yNjdsMTUuNTI4LTkzLjE2OSAzNi4wNjItMjguODQ5IDY5Ljg0LTcuNzZjNC4xMTctMC40NTggNy4wODMtNC4xNjYgNi42MjYtOC4yODJzLTQuMTYtNy4wODMtOC4yODItNi42MjZsLTcyLDhjLTEuNDExLDAuMTU3LTIuNzQ4LDAuNzExLTMuODU3LDEuNTk4bC0zOC44MjMsMzEuMDU5LTU0LjU1MiwxNS41ODZjLTIuMDIxLDAuNTc4LTMuNzA3LDEuOTc3LTQuNjQ3LDMuODU3bC0xNy45NDMsMzUuODg2Yy0wLjAzMiwwLjAwMy0wLjA2MywwLjAwMS0wLjA5NSwwLjAwNWwtODAsOGMtMi41NjEsMC4yNTYtNC44MTIsMS44MDctNS45NjIsNC4xMDlsLTE0LjY4MywyOS4zNjUtNjEuMjQzLDIyLjk2NmMtMS41OTQsMC41OTgtMi45MzcsMS43Mi0zLjgwOCwzLjE4MmwtMjEuNjY3LDM2LjM0MWgtNjcuODkyYy00LjE0MywwLTcuNSwzLjM1OC03LjUsNy41czMuMzU3LDcuNSA3LjUsNy41aDQ0OGM0LjE0MywwIDcuNS0zLjM1OCA3LjUtNy41cy0zLjM1Ny03LjUwMS03LjUtNy41MDF6bS0yNjcuMTQxLTgxLjQ0OWw2Ni41NTctNi42NTYtMjEuMzQsNDIuNjc5LTYwLjEzMiw0NS40MjVoLTM1LjgzOGwxOS4xOTctMTkuMTk3YzAuNTY5LTAuNTcgMS4wNDQtMS4yMjggMS40MDQtMS45NDlsMzAuMTUyLTYwLjMwMnptLTc5Ljc2Myw1NS4wNDhsNDMuNjU1LTE2LjM3LTYuOTE1LDEzLjgyOS0yOC45NDMsMjguOTQyaC0yMy41MzlsMTUuNzQyLTI2LjQwMXoiLz4KICAgIDxwYXRoIGQ9Im0zMTEuNSwzMjQuMDAxaC0xNDRjLTQuMTQzLDAtNy41LDMuMzU4LTcuNSw3LjVzMy4zNTcsNy41IDcuNSw3LjVoMTQ0YzQuMTQzLDAgNy41LTMuMzU4IDcuNS03LjVzLTMuMzU3LTcuNS03LjUtNy41eiIvPgogICAgPHBhdGggZD0ibTEzNS41LDMyNC4wMDFoLTY0Yy00LjE0MywwLTcuNSwzLjM1OC03LjUsNy41czMuMzU3LDcuNSA3LjUsNy41aDY0YzQuMTQzLDAgNy41LTMuMzU4IDcuNS03LjVzLTMuMzU3LTcuNS03LjUtNy41eiIvPgogICAgPHBhdGggZD0ibTM1OS41LDMyNC4wMDFoLTE2Yy00LjE0MywwLTcuNSwzLjM1OC03LjUsNy41czMuMzU3LDcuNSA3LjUsNy41aDE2YzQuMTQzLDAgNy41LTMuMzU4IDcuNS03LjVzLTMuMzU3LTcuNS03LjUtNy41eiIvPgogICAgPHBhdGggZD0ibTI5NS41LDM1Ni4wMDFoLTc5Ljk5OGMtNC4xNDMsMC03LjUsMy4zNTgtNy41LDcuNXMzLjM1Nyw3LjUgNy41LDcuNWg3OS45OThjNC4xNDMsMCA3LjUtMy4zNTggNy41LTcuNXMtMy4zNTctNy41LTcuNS03LjV6Ii8+CiAgICA8cGF0aCBkPSJtMTgzLjUwMSwzNTYuMDAxaC0xNi4wMDFjLTQuMTQzLDAtNy41LDMuMzU4LTcuNSw3LjVzMy4zNTcsNy41IDcuNSw3LjVoMTYuMDAxYzQuMTQzLDAgNy41LTMuMzU4IDcuNS03LjVzLTMuMzU3LTcuNS03LjUtNy41eiIvPgogICAgPHBhdGggZD0ibTQxNi4xNjYsMTM3LjkyOWwtMy40MjksMTYuMDAyYy0wLjg2Nyw0LjA1IDEuNzEzLDguMDM3IDUuNzYzLDguOTA1IDAuNTI5LDAuMTE0IDEuMDU4LDAuMTY4IDEuNTc5LDAuMTY4IDMuNDYsMCA2LjU3MS0yLjQxIDcuMzI2LTUuOTNsMy40MjktMTYuMDAyYzAuODY3LTQuMDUtMS43MTMtOC4wMzctNS43NjMtOC45MDUtNC4wMzctMC44NjctOC4wMzYsMS43MTEtOC45MDUsNS43NjJ6Ii8+CiAgPC9nPgo8L3N2Zz4=' alt="">
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
      stampsList: null,
      addNewKit: false,
      newKitName: "",
      selectedKit: null
    }
  },
  methods:{
    pickFile(){
      this.$refs.fileInput.click()
    },
    getFile(event){
      const fileList = event.target.files;
      console.log(fileList);
    }
  },
  mounted() {
    if (this.stampsList)
      this.selectedKit = this.stampsList[0]
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
