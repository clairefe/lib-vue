<template>
  <div class="dcs-nav">
    <div class="dcs-nav__back" @click="goBack">
      <i class="icon-sarrow dcs-nav__icon"></i>
    </div>
    <div class="dcs-nav__title" ft="17">
      {{ title }}
    </div>
    <div class="dcs-nav__exp">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   * dcs-nav
   * @module components/nav
   *
   * @param  title - nav标题
   *
   * @example
   * <dcs-nav :title="title">
   *    <p>确定</p>
   * </dcs-nav>
   *
   */
  export default {
    name: 'dcs-nav',
    props: {
      "title": String,
    },
    data () {
        return {}
    },
    methods: {
      goBack (){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .dcs-nav{
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    text-align: center;
    height: 44px;
    width: 100%;
    line-height: 44px;
    margin-bottom: 44px;
    z-index: 3001;
  }
  .dcs-nav__back{
    position: absolute;
    left: 0;
    top: 0;
    width: 44px;
    transform: rotate(180deg);
  }
  .dcs-nav__title{
    width: 100%;
  }
  .dcs-nav__exp{
    position: absolute;
    right: 15px;
    top: 0;
  }

</style>
