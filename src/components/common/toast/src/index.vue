<template>
  <transition name="dcs-toast-fade">
    <div class="dcs-toast" v-show="visible">
      <span class="dcs-toast__message">
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      "message": String,
    },
    data () {
      return {
        "visible": true
      }
    },
  }
</script>

<style scoped>
  .dcs-toast-fade-enter-active,.dcs-toast-fade-leave-active {
    transition: opacity .3s;
  }
  .dcs-toast-fade-enter,.dcs-toast-fade-leave-to{
    opacity: 0;
  }
  .dcs-toast__message{
    color: #fff;
    position: fixed;
    z-index: 9999;
    display: block;
    padding: 10px;
    text-align: center;
    font-size: 14px;
    background: rgba(0,0,0,.6);
    border-radius: 6px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
