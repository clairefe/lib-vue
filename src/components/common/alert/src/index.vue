<template>
  <div class="dcs-alert">
    <div class="dcs-alert-shade"></div>
    <transition name="dcs-alert-fade">
        <div class="dcs-alert-box" v-show="visible">
          <div class="dcs-alert-box__title">
            {{ title }}
          </div>
          <div class="dcs-alert-box__content" v-html="content"></div>
          <button @click="success" class="dcs-alerte-box__footer">{{ confirmButtonText }}</button>
        </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: [],
    data () {
      return {
        "visible": false,
        "title": "提示",
        "content": '<div>呵呵呵</div>',
        "confirmButtonText": "确定",
      }
    },
    methods: {
      success () {
        this.visible = false;
      }
    }
  }
</script>

<style scoped>
  .dcs-alert-fade-enter-active, .dcs-alert-fade-leave-active{
    transition: all .8s;
  }
  .dcs-alert-fade-enter, .dcs-alert-fade-leave-to{
    opacity: 0;
  }
  .dcs-alert-shade{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.8);
    height: 100%;
    width: 100%;
    z-index: 9;
  }
  .dcs-alert-box{
    width: 85%;
    background: #fff;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
  .dcs-alert-box__title{
    padding-top: 15px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
  .dcs-alert-box__content{
    padding: 15px;
    color: #999;
    margin: 0;
    text-align: center;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
  }
  button{
    line-height: 35px;
    background-color: #fff;
    margin: 0;
    border: 0;
    outline: 0;
    color: #26a2ff;
    width: 100%;
  }
</style>
