<template>
  <div class="d-flex flex-wrap border-bottom align-items-center topMenu" id="header">
    <div class="col-6 text-start">
      <div class="d-flex align-items-center " style="margin-left: 40px">
        <div class="dropdown">
          <button class=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuFile"  data-bs-auto-close="outside"  data-bs-toggle="dropdown" >
            Меню
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <a class="dropdown-item" href="#">Изменить информацию о карте</a>
            <a class="dropdown-item" href="#">Сохранить</a>
            <div class="accordion" id="MenuAccordion">
              <button class="py-1 px-3 dropdown-item accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#block1"  >
                Открыть...
              </button>
              <div id="block1" class="accordion-collapse collapse" data-bs-parent="#MenuAccordion">
                <div class="py-0 accordion-body text-end">
                  <a class="dropdown-item" href="#">Фоновое изображение</a>
                  <a class="dropdown-item" href="#">Файл с картой</a>
                </div>
              </div>
              <button class="py-1 px-3 dropdown-item accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acBlock2">
                Экспортировать как...
              </button>
              <div id="acBlock2" class="accordion-collapse collapse" data-bs-parent="#MenuAccordion">
                <div class="py-0 accordion-body text-end">
                  <a class="dropdown-item" href="#">PNG</a>
                  <a class="dropdown-item" href="#">JPEG</a>
                  <a class="dropdown-item" href="#">PDF</a>
                </div>
              </div>
            </div>
            <a class="dropdown-item" href="#">Дублировать карту</a>
            <a class="dropdown-item" href="#">Изменить размер холста</a>
            <hr class="dropdown-divider" href="#">
            <a class="dropdown-item" href="/">На главную страницу</a>
          </div>
        </div>
        <div class="dropdown ms-2 me-4">
          <button class=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuBorder" data-bs-auto-close="outside"  data-bs-toggle="dropdown" aria-expanded="false">
            Рамка
          </button>
          <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton1">
            <div class="form-check">
              <input id="chbxborder" class="form-check-input" type="checkbox">
              <label for="chbxborder">Рамка</label>
            </div>
            <hr class="dropdown-divider">
            Толщина рамки:<br><input id="borderwidth" type="number" class="w-50" max="50" min="1" value="1" placeholder="В пикселях"> px
            <hr class="dropdown-divider" >
            Цвет рамки:<br><input type="color">
          </div>
        </div>

        <button type="button" class="btn btn-outline-dark px-1 py-0 ms-1" data-bs-toggle="tooltip" data-bs-placement="bottom"  title="На шаг назад">
          <img src="@/assets/images/undo.png" class="hoverinv"  alt="" style="height: 15px;">
        </button>
        <button type="button" class="btn btn-outline-dark px-1 py-0 ms-1" data-bs-toggle="tooltip" data-bs-placement="bottom"  title="На шаг вперёд">
          <img src="@/assets/images/redo.png" class="hoverinv" alt="" style="height: 15px; ">
        </button>
      </div>
    </div>
    <div class="col text-end me-3 position-fixed end-0">
      <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" style="border: none; background-color: transparent;">
        <img src="@/assets/images/arrow-left.png" alt="" style="height: 25px; ">
      </button>
    </div>
  </div>

</template>
<script>
export default {
  name: "TopMenu"
}
</script>
<style scoped>
.topMenu{
  grid-area: TopMenu;
  background-color: white;
  position: relative;
  z-index: 2;
}
.dropdown-item:active{
  background:#232323;
  color:white;
}
</style>
