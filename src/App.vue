<template>
  <router-view/>
</template>
<script>
export default {
  name: 'App',

}
</script>
<style>
.c-pointer{
  cursor: pointer;
}
input[type=radio] + label{
  font-weight: bolder;
}

.radio-icon label {
  display: inline-block;
  cursor: pointer;
  user-select: none;
}
.radio-icon-group input[type=radio]:checked + label {
  border-radius: 3px;
  background: #232323;
  color:white;
}
.radio-icon-group input[type=radio]:disabled + label {
  opacity: 0.5;
  cursor: default;
}
.radio-icon > label{
  height: inherit;
}
.radio-icon-group input[type=radio]:checked + label > img {
  filter: invert(1);
}
.radio-icon-group input[type=radio] {
  display: none;
}
</style>
