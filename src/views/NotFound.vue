<template>
  <div class="ms-4 mt-4 d-flex ">
    <div class="fw-bold main">
      <img src="@/assets/images/404.png" height="150" alt="">
      <p class="fs-1">Кажется, такой страницы не существует</p>
      <a href="/" class="text-decoration-underline fw-bolder fs-5">На главную</a>
    </div>
    <div class="arrowContainer">
      <div class="main-arrow">
        <div class="arrow-up"></div>
        <div class="arrow-down"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound"
}
</script>
<style scoped>
.main{
  width: 80%;
  min-width: 700px;
}
.arrowContainer{
  min-width: 400px;
  background-image: url("../assets/images/compasBack.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
}
.main-arrow {
  height: 100%;
  left: 138px;
  width: 30px;
  position: relative;
  padding-top: 5px;
  box-sizing:border-box;
  transform: rotate(20deg);
  animation: spin 2.0s alternate infinite;
  -ms-transform: rotate(20deg);
  -o-transform: rotate(20deg);
  -o-animation: spin 2.0s alternate infinite;
  -moz-transform: rotate(20deg);
  -moz-animation: spin 2.0s alternate infinite;
  -webkit-transform: rotate(20deg);
  -webkit-animation: spin 2.0s alternate infinite;

}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 150px solid #3d4551;
  position: relative;
}

.arrow-down {
  -webkit-transform: rotate(180deg); /* Safari and Chrome */
  width: 0;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 150px solid #F3F3F3;
  position: relative;
}
@keyframes spin {
  0%{
    transform:scale(1) rotate(0deg);
  }
  50% {
    transform:scale(1) rotate(80deg);
  }
  100% {
    transform:scale(1) rotate(-180deg);
  }
}

@-o-keyframes spin {
  0%{
    -webkit-transform:scale(1) rotate(0deg);
  }
  50% {
    -webkit-transform:scale(1) rotate(80deg);
  }
  100% {
    -webkit-transform:scale(1) rotate(-180deg);
  }
}

@-moz-keyframes spin {
  0%{
    -webkit-transform:scale(1) rotate(0deg);
  }
  50% {
    -webkit-transform:scale(1) rotate(80deg);
  }
  100% {
    -webkit-transform:scale(1) rotate(-180deg);
  }
}

@-webkit-keyframes spin {
  0%{
    -webkit-transform:scale(1) rotate(0deg);
  }
  50% {
    -webkit-transform:scale(1) rotate(80deg);
  }
  100% {
    -webkit-transform:scale(1) rotate(-180deg);
  }
}
</style>
