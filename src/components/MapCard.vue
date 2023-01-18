<template>
  <div class="cardlist d-flex flex-wrap">
    <div class="card">
      <a class="maplink" href="/MapCanvas">
        <img src="@/assets/images/plug.jpg" class="card-img-top" alt="...">
        <div class="card-body py-1">
          <div class="card-text">
            <span class="fw-bold">Название</span><br>
            <div class="text-end ">
              Дата создания: <br>
              Дата изменения:
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="card bg-light text-center justify-content-center">
      <div class="maplink" id="newMapCard" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <img src="@/assets/images/new.png" :width="70">
        <p class="fs-5" style="color: #909090">Создать новую карту </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MapCard',
  props: {
    msg: String
  },
}
</script>
<style scoped>
.card{
  width:300px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.cardlist{
  margin-right: 20px
}
.card:hover{
  -webkit-box-shadow: 0px 0px 5px 3px rgba(35, 35, 35, 0.15);
  -moz-box-shadow: 0px 0px 5px 3px rgba(35, 35, 35, 0.15);
  box-shadow: 0px 0px 5px 3px rgba(35, 35, 35, 0.15);
}
.card-img-top{
  max-height:200px;
  object-fit: cover
}
#newMapCard{
  cursor: pointer;
}
</style>
