<style scoped>
  .dcs-cell{
    background: #fff;
    position: relative;
    padding: 12px;
  }
  .dcs-cell:after{
    position: absolute;
    content: " ";
    display: block;
    height: 1px;
    width: 100%;
    transform: scaleY(.5);
    background: #ccc;
    bottom: 0;
  }
  .dcs-cell__title{
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }
  .dcs-cell__text{
    font-size: 12px;
    color: #999;
  }
  .dcs-cell__key{
    color: #ff9010;
  }
</style>

<template>
  <div class="dcs-cell">
    <div class="dcs-cell__title" v-html="title"></div>
    <div class="dcs-cell__text">{{text}}</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'dcs-cell',
    props: {
      title: String,
      text: String,
      skey: String
    },
    data () {
        return {}
    },
  }
</script>

