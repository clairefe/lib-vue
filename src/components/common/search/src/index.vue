<template>
  <div class="dcs-search">
    <div class="dcs-search__bar">
      <i class="icon-search dcs-search_sicon"></i>
      <input type="text" v-model.trim="currentValue" :placeholder="placeholder" @click=" visible = true ">
      <i class="dcs-search_cancel icon-fullplus" v-show="visible" @click=" currentValue = '', visible = false"></i>
    </div>
    <div class="dcs-search__list" v-show="currentValue">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /*
  * dcs-search
  * @desc 搜索框
  * @param {string} value - 绑定值
  * @param {string} placeholder -  搜索placeholder
  * @param { slot } 搜索结果默认展示
  *
  * @example
  * <dcs-search v-model="value" placeholder=""></dcs-search>
  * */
  export default {
    name: 'dcs-search',
    props: {
      value: String,
      placeholder: {
        default: '搜索'
      },
    },
    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },
      value(val) {
        this.currentValue = val;
      }
    },
    data () {
        return {
          currentValue: this.value,
          visible: false
        }
    },
  }
</script>

<style scoped>
  .dcs-search__bar{
    position: relative;
  }
  .dcs-search_sicon{
    position: absolute;
    left: 0;
    text-align: center;
    width: 35px;
    height: 100%;
    line-height: 32px;
    color: #ccc;
    font-size: 14px;
  }
  input{
    width: 100%;
    height: 32px;
    background-color: #fff;
    border-radius: 2px;
    font-size: 14px;
    padding: 0 0 0 35px;
    border: 0;
  }
  .dcs-search_cancel{
    position: absolute;
    z-index: 10;
    top: 0!important;
    right: 0!important;
    width: 30px;
    height: 100%;
    color: #999;
    line-height: 2;
    transform: rotate(45deg);
  }
</style>
