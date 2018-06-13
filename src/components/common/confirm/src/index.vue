<template>
  <div class="dcs-messag">
    <div class="dcs-message-shade"></div>
    <transition name="dcs-message-fade">
      <div class="dcs-message-box" v-show="visible">
        <div class="dcs-message-box__title">
          {{ title }}
        </div>

        <div class="dcs-message-box__content" v-html="content"></div>

        <div class="dcs-message-box__footer flex">
          <button flex="1" @click="cancel">{{ cancelButtonText }}</button>
          <button flex="1" @click="confirm">{{ confirmButtonText }}</button>
        </div>
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
        "title": "confirm提示",
        "content": '<div>confirm数据测试</div>',
        "cancelButtonText": "取消",
        "confirmButtonText": "确定",
      }
    },
    methods: {
      cancel () {
        this.visible = false;
      },
      confirm () {
        this.visible = false;
      }
    }
  }
</script>

<style scoped>
  .dcs-message-fade-enter-active, .dcs-message-fade-leave-active {
    transition: opacity .8s;
  }
  .dcs-message-fade-enter, .dcs-message-fade-leave-to {
    opacity: 0;
  }
  .dcs-message-shade{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.8);
    height: 100%;
    width: 100%;
    z-index: 9;
  }
  .dcs-message-box{
    width: 85%;
    background: #fff;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
  .dcs-message-box__title{
    padding-top: 15px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
  .dcs-message-box__content{
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
  }
  button:first-child{
    border-right: 1px solid #ddd;
  }
  button:last-child{
    color: #26a2ff;
  }
  button:active{
    border: none;
  }
  @keyframes cofirm {
    0%{
      opacity: 0;
    }
    50%{
      opacity: .8;
    }
    100%{
      opacity: 0;
    }
  }
</style>
