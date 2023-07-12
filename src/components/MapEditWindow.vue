<template>
    <div class="modal-container">
      <div class="modal-window">
        <div class="modal-header">
	    <svg class="svg-light" stroke="#1C274C" width="30px" viewBox="0 0 24 24" fill="none"
		 xmlns="http://www.w3.org/2000/svg">
		<path d="M14.3601 4.07866L15.2869 3.15178C16.8226 1.61607 19.3125 1.61607 20.8482 3.15178C22.3839 4.68748 22.3839 7.17735 20.8482 8.71306L19.9213 9.63993M14.3601 4.07866C14.3601 4.07866 14.4759 6.04828 16.2138 7.78618C17.9517 9.52407 19.9213 9.63993 19.9213 9.63993M14.3601 4.07866L12 6.43872M19.9213 9.63993L14.6607 14.9006L11.5613 18L11.4001 18.1612C10.8229 18.7383 10.5344 19.0269 10.2162 19.2751C9.84082 19.5679 9.43469 19.8189 9.00498 20.0237C8.6407 20.1973 8.25352 20.3263 7.47918 20.5844L4.19792 21.6782M4.19792 21.6782L3.39584 21.9456C3.01478 22.0726 2.59466 21.9734 2.31063 21.6894C2.0266 21.4053 1.92743 20.9852 2.05445 20.6042L2.32181 19.8021M4.19792 21.6782L2.32181 19.8021M2.32181 19.8021L3.41556 16.5208C3.67368 15.7465 3.80273 15.3593 3.97634 14.995C4.18114 14.5653 4.43213 14.1592 4.7249 13.7838C4.97308 13.4656 5.26166 13.1771 5.83882 12.5999L8.5 9.93872"
		      stroke-width="1.5" stroke-linecap="round"/>
	    </svg>
          Изменить информацию о карте
	    <svg class="cursor-pointer modal-close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="this.$emit('closeWindow')">
		<path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	    </svg>
               </div>
        <div class="modal-body">
          <h3>Название карты:</h3>
          <input type="text" class="input-medium modal-input" placeholder="Минимум 6 символов" v-model="name">
          <h3>Описание карты:</h3>
          <textarea cols="30" rows="10" class="map-description" v-model="description"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="button-light button-middle" @click="this.$emit('closeWindow')">Отмена</button>
          <button type="button" class="button-dark button-middle" :disabled="!(name.length>=6)" @click="this.$emit('updateMapMetadata')">Завершить</button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "MapEditWindow",
  props: {
    mapName: {
      type: String,
      default: ""
    },
    mapDesc: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      name: "",
      description: ""
    }
  },
  watch: {
    name:{
      handler(val){
        this.$emit('updateName',val)
      }
    },
    description:{
      handler(val){
        this.$emit('updateDesc',val)
      }
    }
  },
  mounted() {
    this.name=this.mapName
    this.description=this.mapDesc
  }
}

</script>
<style scoped lang="sass">
@use "@/assets/styles/Variables"
.map-description
  border: 1px solid Variables.$dark-color
  border-radius: 15px
  font-size: 14pt
  width: 100%
  margin-block: 10px
  padding-inline: 10px
  padding-block: 5px
  outline: none
  height: 400px
  resize: none
</style>
