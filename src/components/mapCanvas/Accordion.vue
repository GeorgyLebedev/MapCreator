<template>
  <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header" style="min-height: 40px; padding: 0">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel"></h5>
      <button type="button" class="me-3"  data-bs-dismiss="offcanvas" aria-label="Закрыть" style="border: none; background-color: transparent;">
        <img src="@/assets/images/arrow-right.png" alt="" style="height: 25px; ">
      </button>
    </div>
  <div class="accordion" id="accordionPanelsStayOpenExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne">
          Аккордеонный элемент #1
        </button>
      </h2>
      <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
        <div class="accordion-body">
          <strong>Это тело аккордеона первого элемента.</strong>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" >
          Аккордеонный элемент #2
        </button>
      </h2>
      <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
        <div class="accordion-body">
          <strong>Это тело аккордеона второго элемента.</strong>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree">
          Аккордеонный элемент #3
        </button>
      </h2>
      <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
        <div class="accordion-body">
          <strong>Это тело аккордеона третьего элемента.</strong>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: "AccordionRight"
}
</script>
<style scoped>
.offcanvas-end{
  bottom:40px;
}
</style>
