<template>
  <div class="dcs-loading" v-show="visible">
    <div class="dcs-loading-core">
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
    },
    data () {
      return {
        "visible": false
      }
    }
  }
</script>

<style scoped>
  .dcs-loading{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, .8);
  }
  .dcs-loading-core{
    position: absolute;
    top: 50%;
    margin-top: -8px;
    left: 50%;
    margin-left: -30px;
    width: 80px;
  }
  .dcs-loading-core i{
    display: inline-block;
    height: 12px;
    width: 12px;
    margin-right:5px;
    background: #0076ff;
    border-radius: 100%;
    animation: flashloading .6s linear alternate infinite both;
    opacity: .1;
  }
  .dcs-loading-core i:nth-child(2){
    animation-delay: .2s;
  }
  .dcs-loading-core i:nth-child(3){
    animation-delay: .4s;
  }
  @keyframes flashloading{
    0%{
      opacity: 1;
    }
    33%{
      opacity: .5;
    }
    66%{
      opacity: .1;
    }
  }
</style>
