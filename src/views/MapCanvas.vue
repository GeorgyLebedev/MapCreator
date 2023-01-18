<template>
  <div class="MainContainer">
    <TopMenu/>
    <Accordion/>
    <ToolsPanel/>
    <BotMenu @scaleChange="updateScale"/>
    <div class="CanvasArea">
      <canvas id="map" width="1560" height="680" v-on:click="Draw()"></canvas>
    </div>
  </div>
</template>
<script>
import TopMenu from "@/components/TopMenu.vue"
import Accordion from "@/components/Accordion";
import BotMenu from "@/components/BotMenu";
import ToolsPanel from "@/components/ToolsPanel";
import * as paper from "paper" ;
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
export default {
  name: "MapCanvas",
  components: {
    TopMenu,
    Accordion,
    BotMenu,
    ToolsPanel
  },
  data (){
    return {
      scale: 100
    }
  },
  methods:{
    Draw(){
      let path = new paper.Path();
      path.strokeColor = 'black';

      var start = new paper.Point(100, 100);
      path.moveTo(start);
      path.lineTo(start.add([ 200, -50 ]));

      path.closed = true;
    },
    updateScale(data){
     this.scale=data.newScale
    }
  },
  mounted() {
    let canvas=document.getElementById("map")
    paper.setup(canvas)
  }
}
</script>
<style>
.MainContainer {
  display: grid;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 40px 1fr 40px;
  gap: 0px 0px;
  grid-auto-flow: row dense;
  justify-items: stretch;
  grid-template-areas:
    "TopMenu TopMenu"
    "ToolsPanel CanvasArea"
    "BotMenu BotMenu";
}

.CanvasArea {
  grid-area: CanvasArea;
  z-index: 1;
  justify-content: center;
  align-items: center;
}
* {
  z-index: 3;
}
#map{
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
}
input[type=color] {
  border: none;
  width: 25px;
  height: 25px;
  background-color: transparent;
  padding: 0;
  margin: 0
}

input[type=color]::-webkit-color-swatch {
  border-radius: 0;
  border: 1px solid gray;
  cursor: pointer
}

*:hover > .hoverinv {
  filter: invert(1);
}

input[type=number] {
  font-size: smaller;
  font-weight: bolder;
  max-width: 50px;
  border: 1px solid #8a8a8a;
  border-radius: 5px;
  padding: 3px 0 2px 5px
}
.tools-options input[type=range]{
  width: 150px;
  margin: 0 10px;
}
input[type=range] {
  width: 175px;
  height: 12px;
  -webkit-appearance: none;
  background: silver;
  outline: none;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 7px;
  padding-left: 1px;
  padding-right: 1px;
  -webkit-box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
  -moz-box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
  box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: white;
  width: 12px;
  height: 12px;

  border: 1px solid #232323;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: -180px 0 0 173px #232323;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  background: white;
  width: 12px;
  height: 12px;
  border: 1px solid #232323;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: -180px 0 0 173px #232323;
}
</style>
