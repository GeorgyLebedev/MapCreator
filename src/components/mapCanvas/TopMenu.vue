<template>
  <div class="d-flex flex-wrap border-bottom align-items-center topMenu" id="header">
    <div class="col-6 text-start">
      <div class="d-flex align-items-center " style="margin-left: 40px">
        <div class="dropdown">
          <button class=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuFile"
                  data-bs-auto-close="outside" data-bs-toggle="dropdown">
            Меню
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <span class="dropdown-item" @click="this.$emit('showMapEditWindow')">Изменить информацию о карте</span>
            <span class="dropdown-item">Сохранить</span>
            <div class="accordion" id="MenuAccordion">
              <button class="py-1 px-3 dropdown-item accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#block1">
                Открыть...
              </button>
              <div id="block1" class="accordion-collapse collapse" data-bs-parent="#MenuAccordion">
                <div class="py-0 accordion-body text-end">
                  <span class="dropdown-item" @click="this.$refs.imgInput.click()">Фоновое изображение</span>
                  <span class="dropdown-item" @click="this.$refs.jsonInput.click()">Файл с картой (.JSON)</span>
                </div>
              </div>
              <button class="py-1 px-3 dropdown-item accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#acBlock2">
                Экспортировать как...
              </button>
              <div id="acBlock2" class="accordion-collapse collapse" data-bs-parent="#MenuAccordion">
                <div class="py-0 accordion-body text-end">
                  <span class="dropdown-item" @click="this.$emit('saveAs','png')">PNG</span>
                  <span class="dropdown-item" @click="this.$emit('saveAs','jpg')">JPEG</span>
                  <a class="dropdown-item" @click="this.$emit('saveAs','pdf')">PDF</a>
                  <a class="dropdown-item" @click="this.$emit('saveAs','svg')">SVG</a>
                  <a class="dropdown-item" @click="this.$emit('saveAs','json')">JSON</a>
                </div>
              </div>
            </div>
            <a class="dropdown-item">Дублировать карту</a>
            <a class="dropdown-item">Изменить размер холста</a>
            <hr class="dropdown-divider">
            <a class="dropdown-item" href="/">На главную страницу</a>
          </div>
        </div>
        <div class="dropdown ms-2 me-4">
          <button class=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuBorder"
                  data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false">
            Холст
          </button>
          <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton1">
            <div class="form-check">
              <input id="chbxborder" class="form-check-input" type="checkbox">
              <label for="chbxborder">Рамка</label>
            </div>
            <hr class="dropdown-divider">
            Толщина рамки:<br><input id="borderwidth" type="number" class="w-50" max="50" min="1" value="1"
                                     placeholder="В пикселях"> px
            <hr class="dropdown-divider">
            Цвет рамки:<br><input type="color">
          </div>
        </div>
        <input type="file" :hidden="true" ref="imgInput" accept=".png, .jpg, .jpeg, .svg" @change="imgLoad">
        <input type="file" :hidden="true" ref="jsonInput" accept=".json" @change="jsonLoad">
        <button type="button" class="btn btn-outline-dark px-1 py-0 ms-1" data-bs-toggle="tooltip"
                data-bs-placement="bottom" title="На шаг назад">
          <img src="@/assets/images/undo.png" class="hoverinv" alt="" style="height: 15px;">
        </button>
        <button type="button" class="btn btn-outline-dark px-1 py-0 ms-1" data-bs-toggle="tooltip"
                data-bs-placement="bottom" title="На шаг вперёд">
          <img src="@/assets/images/redo.png" class="hoverinv" alt="" style="height: 15px; ">
        </button>
      </div>
    </div>
    <div class="col text-end me-3 position-fixed end-0">
      <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling" style="border: none; background-color: transparent;">
        <img src="@/assets/images/arrow-left.png" alt="" style="height: 25px; ">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopMenu",
  methods: {
    imgLoad() {
      let extensions = ['png', 'jpeg', 'jpg', 'svg']
      const img = event.target.files[0];
      if (extensions.indexOf(img.name.split('.').pop().toLowerCase()) == -1) {
        this.$emit('errorAlert', "Расширение выбранного файла не поддерживается!")
        return
      }
      else this.$emit("loadImg", img)
    },
    jsonLoad() {
      try {
        const jsonFile = event.target.files[0];
        if (jsonFile.name.split('.').pop().toLowerCase() !== "json") {
          this.$emit('errorAlert', "Выбранный файл не является файлом формата JSON!")
        } else {
          const reader = new FileReader();
          reader.readAsText(jsonFile);
          reader.onload = () => {
            try {
              const jsonData = JSON.parse(reader.result);
              this.$emit("loadJson", jsonData)
            }
            catch (e){
              this.$emit('errorAlert',e.message)
            }
          };
        }
      }
      catch (e) {
        this.$emit('errorAlert',e.message)
      }
    }
  }
}
</script>
<style scoped>
.topMenu {
  grid-area: TopMenu;
  background-color: white;
  position: relative;
  z-index: 2;
}

.dropdown-item:active {
  background: #232323;
  color: white;
}
</style>
