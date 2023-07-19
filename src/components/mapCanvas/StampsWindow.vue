<template>
    <div class="modal-container">
	<div class="modal-window">
	    <div class="modal-header">
		<svg class="svg-light" fill="none" viewBox="0 0 24 24" width="30px" xmlns="http://www.w3.org/2000/svg">
		    <path d="M18 10L13 10" stroke-linecap="round" stroke-width="1.5"/>
		    <path d="M10 3H16.5C16.9644 3 17.1966 3 17.3916 3.02567C18.7378 3.2029 19.7971 4.26222 19.9743 5.60842C20 5.80337 20 6.03558 20 6.5"
			  stroke-width="1.5"/>
		    <path d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11"
			  stroke-linecap="round" stroke-width="1.5"/>
		</svg>
		<b>Каталог штампов</b>
		<svg class="cursor-pointer modal-close-icon" fill="none" viewBox="0 0 24 24"
		     xmlns="http://www.w3.org/2000/svg" @click="this.$emit('closeWindow')">
		    <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke-linecap="round" stroke-linejoin="round"
			  stroke-width="2"/>
		</svg>
	    </div>
	    <div class="modal-body">
		<aside class="side-menu">
		    <div v-for="(val, key) in stamps" :key=key
			 :class="{'selected-kit':(key==selectedKit)}" class="stamp-kit-name-container cursor-pointer" @click.self="selectedKit=key">
			<div v-if="!editKit[key]" class="flex-row justify-between align-center w-100">
			    <div v-if="editKit[key]!==key" :title="key" class="stamp-kit-name"
				 @click.self="selectedKit=key">{{ key }}
			    </div>
			    <transition name="scale">
				<div v-if="kitDeleteConfirm[key]" :key=key class="delete-confirm kit-confirm">
				    Вы уверены, что хотите удалить данный набор?
				    <div class="flex-row">
					<button class="button-dark button-small" type="button" @click="deleteKit(key)">
					    Удалить
					</button>
					<button class="button-light button-small" type="button"
						@click="kitDeleteConfirm[key]=false">Отмена
					</button>
				    </div>
				</div>
			    </transition>
				<div class="flex-row">
					<div class="stamp-kit-options" title="Удалить">
						<svg class="cursor-pointer option svg-orange stamp-kit-button" fill="none"
								 stroke="#1C274C" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
								 @click.prevent="showKitDeleteConfirm(key)">
							<path d="M20.5001 6H3.5 M9.5 11L10 16 M14.5 11L14 16 M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6 M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
										stroke-linecap="round" stroke-width="1.5"/>
						</svg>
					</div>
					<div class="stamp-kit-options" title="Изменить">
						<svg class="cursor-pointer option svg-orange stamp-kit-button" fill="none"
								 stroke="#1C274C" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
								 @click.prevent="()=>{
                         editKit={}
                         editKit[key]=true
                       editKitName=key}">
							<path d="M14.3601 4.07866L15.2869 3.15178C16.8226 1.61607 19.3125 1.61607 20.8482 3.15178C22.3839 4.68748 22.3839 7.17735 20.8482 8.71306L19.9213 9.63993M14.3601 4.07866C14.3601 4.07866 14.4759 6.04828 16.2138 7.78618C17.9517 9.52407 19.9213 9.63993 19.9213 9.63993M14.3601 4.07866L12 6.43872M19.9213 9.63993L14.6607 14.9006L11.5613 18L11.4001 18.1612C10.8229 18.7383 10.5344 19.0269 10.2162 19.2751C9.84082 19.5679 9.43469 19.8189 9.00498 20.0237C8.6407 20.1973 8.25352 20.3263 7.47918 20.5844L4.19792 21.6782M4.19792 21.6782L3.39584 21.9456C3.01478 22.0726 2.59466 21.9734 2.31063 21.6894C2.0266 21.4053 1.92743 20.9852 2.05445 20.6042L2.32181 19.8021M4.19792 21.6782L2.32181 19.8021M2.32181 19.8021L3.41556 16.5208C3.67368 15.7465 3.80273 15.3593 3.97634 14.995C4.18114 14.5653 4.43213 14.1592 4.7249 13.7838C4.97308 13.4656 5.26166 13.1771 5.83882 12.5999L8.5 9.93872"
										stroke-linecap="round" stroke-width="1.5"/>
						</svg>
					</div>
				</div>
			</div>
			<div v-else class=" stamp-kit-name">
			    <input ref="editKitInput" v-model="editKitName"
				   class="new-kit-name-input"
				   placeholder="Минимум 5 символов" type="text">
			    <div class="flex-row">
						<svg class="svg-cross-tick" width="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 	@click="()=>{
                     editKitName=''
                     editKit={}
                   }">
							<path d="M19 5L4.99998 19M5.00001 5L19 19"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<transition name="scale">
						<svg v-if="editKitName.length>=5" @click="updateKitName(key)"  width="30px" class="svg-cross-tick" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.5 12.5L10.167 17L19.5 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						</transition>
					</div>
			</div>
		    </div>
			<transition name="show-opt">
		    <div v-if="addNewKit" class="stamp-kit-name-container ">
			<div class="stamp-kit-name add-kit-button">
			    <input ref="newKitInput" v-model="newKitName"
				   class="new-kit-name-input"
				   placeholder="Минимум 5 символов" type="text">
				<div class="flex-row">
					<svg class="svg-cross-tick" width="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 	@click="()=>{
                     newKitName=''
                     addNewKit=false
                   }">
						<path d="M19 5L4.99998 19M5.00001 5L19 19"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
						<svg v-if="newKitName.length>=5" @click="addKit"  width="30px" class="svg-cross-tick" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.5 12.5L10.167 17L19.5 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
			    </div>
			</div>
		    </div>
			</transition>
		    <div class="stamp-kit-name-container add-kit-button-container">
			<div class="stamp-kit-name cursor-pointer add-kit-button" @click="()=>this.addNewKit=true">
			    Создать новый набор
			    <svg class="svg-orange" fill="none" viewBox="0 0 24 24" width="30px"
				 xmlns="http://www.w3.org/2000/svg">
				<path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15 M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
				      stroke-linecap="round" stroke-width="1.5"/>
			    </svg>
			</div>
		    </div>
		</aside>
		<div v-if="selectedKit" class="stamp-list">
		    <div v-for="(val,key) in stamps[selectedKit]"
			 :key=key
			 :class="{'selected-icon':val==selectedStampVal, 'focus-stamp':isFocusStamp[key]}" class="stamp-icon">
			<transition name="scale">
			    <div v-if="stampDeleteConfirm[key]" :key=key class="delete-confirm stamp-confirm">
				Вы уверены, что хотите удалить данный штамп?
				<div class="flex-row">
				    <button class="button-dark button-small" type="button" @click="deleteStamp(key)">
					Удалить
				    </button>
				    <button class="button-light button-small" type="button"
					    @click="stampDeleteConfirm[key]=false">Отмена
				    </button>
				</div>
			    </div>
			</transition>
					<svg viewBox="0 0 24 24" class="delete-stamp-button" fill="none" xmlns="http://www.w3.org/2000/svg" @click.prevent="showStampDeleteConfirm(key)">
						<path class="svg-light-fill" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
						<path class="svg-orange" d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
			<img :src=val alt="" class="stamp-image cursor-pointer" @click.self="selectStamp(val,key)">
		    </div>
		    <div class="stamp-icon new-stamp-image-button" title="Загрузить новый штамп">
			<input ref="fileInput" :hidden="true" accept="image/svg+xml" type="file" @change="getFile">
			<svg class="cursor-pointer svg-orange new-stamp-image" fill="none" viewBox="0 0 24 24"
			     xmlns="http://www.w3.org/2000/svg" @click="pickFile">
			    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15 M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
				  stroke-linecap="round" stroke-width="1.5"/>
			</svg>
		    </div>
		</div>
	    </div>
	</div>
    </div>
</template>
<script>
import AxiosRequest from "@/modules/services/axiosRequest";

export default {
    name: 'StampsWindow',
    props: {
	stampsProp: {
	    type: Object,
	},
	selectedKitProp: {
	    type: String
	},
	selectedStampProp: {
	    type: String
	},
    },
    emits: [
	'setStamp',
	'setKit',
	'showStampsWindow',
	'closeWindow'
    ],
    data() {
	return {
	    stamps: {},
	    addNewKit: false,
	    editKit: {},
	    newKitName: "",
	    editKitName: "",
	    selectedKit: null,
	    selectedStampVal: null,
	    selectedStampKey: null,
	    kitDeleteConfirm: {},
	    stampDeleteConfirm: {},
	    isFocusStamp: {},
	}
    },
    computed: {
	selectedKitObj() {
	    return this.stamps[this.selectedKit]
	}
    },
    methods: {
	selectStamp(val, key) {
	    this.selectedStampVal = val
	    this.selectedStampKey = key
	    this.$store.commit('stampOptions/updateStampOptions', {currentStamp: this.selectedStampVal})
	    this.$emit('closeWindow')
	},
	showStampDeleteConfirm(key) {
	    this.stampDeleteConfirm = this.kitDeleteConfirm = this.isFocusStamp = {}
	    this.stampDeleteConfirm[key] = true
	    this.isFocusStamp[key] = true
	},
	showKitDeleteConfirm(key) {
	    this.stampDeleteConfirm = this.kitDeleteConfirm = this.isFocusStamp = {}
	    this.kitDeleteConfirm[key] = true
	},
	async deleteStamp(key) {
	    this.stampDeleteConfirm = this.kitDeleteConfirm = this.isFocusStamp = {}
	    delete this.stamps[this.selectedKit][key]
	    await this.updateStamp()
	},
	addKit() {
	    this.stamps[this.newKitName] = {}
	    this.selectedKit = this.newKitName
	    this.newKitName = ''
	    this.addNewKit = false
	},
	async deleteKit(key) {
	    this.stampDeleteConfirm = this.kitDeleteConfirm = this.isFocusStamp = {}
	    delete this.stamps[key]
	    await this.updateStamp()
	},
	async updateKitName(key) {
	    this.stamps[this.editKitName] = this.stamps[key]
	    delete this.stamps[key]
	    this.editKitName = ""
	    this.editKit = ""
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
		    this.$store.commit("setNotification", ["message", "В выбранном наборе уже есть такой штамп!"])
		    return
		}
		if (Object.keys(this.stamps[this.selectedKit]).length == 0)
		    index = 0
		else {
		    index = Object.keys(this.stamps[this.selectedKit])
		    index = Number(index[index.length - 1].replace(/^\D+/g, ''))
		}
		this.stamps[this.selectedKit][`stamp${index + 1}`] = base64
		this.updateStamp()
	    };
	},
	async updateStamp() {
	    let response, request
	    request = await new AxiosRequest("options/", "put", {stamps: this.stamps})
	    response = await request.sendRequest()
	    if (response)
		this.$emit('updateStamps', this.stamps)
	}
    },
    watch: {
	selectedKit(value) {
	    this.$store.commit('stampOptions/updateStampOptions', {currentKit: value})
	    if (Object.values(this.selectedKitObj).indexOf(this.selectedStampVal) === -1) {
		this.selectedStampVal = this.selectedKitObj[(Object.keys(this.selectedKitObj))[0]]
		this.selectedStampKey = Object.keys(this.selectedKitObj)[0]
		this.$store.commit('stampOptions/updateStampOptions', {currentStamp: this.selectedStampVal})
	    }
	},
    },
    mounted() {
	if (this.stampsProp) {
	    this.stamps = this.stampsProp
	    this.selectedKit = this.$store.state.stampOptions.currentKit
	    this.selectedStampVal = this.$store.state.stampOptions.currentStamp
	}
    }
}
</script>
<style lang="sass" scoped>
@use "@/assets/styles/Variables"
.modal-window
  width: 80%
  height: 60%
  min-width: 700px
  min-height: 700px

.modal-body
  padding: 0
  width: 100%
  height: 93%
  display: flex
  border-radius: 0 0 15px 15px

.side-menu
  height: 100%
  width: 20%
  display: flex
  flex-direction: column
  border-right: 1px solid Variables.$medium-color

.stamp-list
  width: 80%
  max-width: 80%
  display: flex
  flex-wrap: wrap
  align-content: flex-start

.stamp-kit-name-container
  cursor: pointer
  display: flex
  flex-direction: row
  height: 50px
  position: relative
  align-items: center
  justify-content: space-between
  margin: 10px
  background-color: Variables.$medium-light-color
  border-radius: 10px
  &.add-kit-button-container
    background-color: unset
    border: 2px dashed Variables.$orange-color
  &:hover
    font-weight: bolder
  &:not(.selected-kit):hover .stamp-kit-options
    display: flex
    align-items: center

.stamp-kit-name
  display: flex
  overflow: hidden
  white-space: nowrap
  margin-inline: 10px
  margin-block: 5px
  text-overflow: ellipsis

.stamp-kit-options
  display: none
  width: 30px
  height: 30px
  justify-self: flex-end
  background-color: Variables.$light-color
  margin-right: 10px
  border-radius: 50%
  transition: all 0.4s ease-in-out
  padding: 5px
  border: 1px solid Variables.$orange-color
  &:hover
    border: 2px solid Variables.$orange-color
    transform: scale(1.3)
  & svg
    width: 100%
    height: 100%

.add-kit-button
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  color: Variables.$orange-color
  & svg
    transition: all 0.2s ease-in

.stamp-kit-name-container:hover>.add-kit-button
    font-weight: bolder
    svg
      transform: scale(1.1)

.stamp-icon:not(.delete-confirm)
  position: relative
  width: 100px
  height: 100px
  border-radius: 10px
  margin: 10px

.stamp-icon:not(.selected-icon)
  background-color: Variables.$medium-light-color

.stamp-icon:hover:not(.selected-icon)
  border-width: 2px


.stamp-icon:hover:not(.selected-icon) .delete-stamp-button
  display: block

.stamp-icon:hover > .new-stamp-image
  transform: scale(1)

.selected-icon
  opacity: 1
  background-color: Variables.$medium-color

.stamp-image
  width: 100%
  height: 100%
  object-fit: contain
  padding: 5px

.new-stamp-image
  width: 100%
  height: 100%
  object-fit: contain
  padding: 5px
  transform: scale(0.85)
  transition: all 0.3s ease-in-out

.stamp-icon.new-stamp-image-button
  background-color: unset
  border: 2px dashed Variables.$orange-color

.selected-kit
  background-color: Variables.$medium-color
  color: Variables.$light-color
  font-weight: bolder
  border-color: Variables.$medium-color

.new-kit-name-input
  border: none
  padding: 5px
  margin-right: 10px
  max-width: 75%
  border-radius: 5px
  outline: none
  font-size: 12pt
  background-color: Variables.$light-color

.delete-stamp-button
  position: absolute
  width: 20px
  top: 5px
  right: 5px
  display: none
  cursor: pointer
  transition: all 0.3s ease-in-out
  &:hover
    transform: scale(1.4)

.delete-confirm
  position: absolute
  display: flex
  align-items: center
  text-align: center
  z-index: 4
  font-size: 11pt
  flex-direction: column
  width: 230px
  background-color: Variables.$light-color
  border: 1px solid Variables.$medium-color
  padding: 5px
  border-radius: 5px
  cursor: default

.kit-confirm
  top: 40px
  left: 115px
  font-weight: normal

.stamp-confirm
  bottom: 100px
  right: -66%
  opacity: 1

.focus-stamp
  opacity: 1

</style>
