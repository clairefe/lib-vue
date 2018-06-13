<template>
  <label class="dcs-switch__wrap" :class="{current: check}">
      <input type="checkbox" v-model="check" @change="$emit('change', check)">
      <span class="dcs-switch__core"></span>
  </label>
</template>

<script>
    export default {
      name: 'dcs-switch',
      props: {
        "check": {
          type: Boolean,
          default: false
        }
      }
    }
</script>

<style scoped>
  .dcs-switch__wrap{
    position: relative;
    width: 44px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 24px;
    background-color: #ccc;
    cursor: pointer;
  }
  .dcs-switch__wrap.current{
    background-color: #ddd;
    background-image: linear-gradient(-45deg,#ffa300 0,#ff8c27 100%);
  }
  .dcs-switch__core{
    display: inline-block;
    position: absolute;
    top: 1px;
    left: 1px;
    right: 21px;
    height: 22px;
    border-radius: 22px;
    background-color: #fff;
    transition: 200ms width ease-in, 200ms left ease-in, 200ms right ease-in
  }
  .dcs-switch__wrap.current .dcs-switch__core{
    left: 21px;
    right: 1px;
  }
  input{
    display: none;
  }
</style>
