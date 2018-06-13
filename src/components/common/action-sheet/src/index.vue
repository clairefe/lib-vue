<template>
  <div class="dcs-action-sheet">
    <div class="dcs-action-sheet__pop"></div>
    <div class="dcs-action-sheet__inner">
      <div v-for="(item, index) in actions" :key="index" @click="itemClick" :data-index="index">
        {{ item.text }}
      </div>
      <div v-if="cancelShow" class="dcs-action-sheet__cancel" @click="cancel">{{cancelText}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dcs-action-sheet',
    props: {
      "actions":{
        type: Array,
        require: true
      },
      "cancelShow": {
        type: Boolean,
        default: true
      },
      "cancelText": {
        type: String,
        default: "取消"
      },
    },
    data () {
      return {
      }
    },
    methods: {
      cancel () {
        this.$emit("cancel")
      },
      itemClick (e) {
        this.actions[e.target.dataset.index].callback();
        this.$emit("cancel")
      }
    }
  }
</script>

<style scoped>
  .dcs-action-sheet{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100%;
    font-weight: normal;
  }
  .dcs-action-sheet__pop{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, .6);
    z-index: 9;
  }
  .dcs-action-sheet__inner{
    position: absolute;
    bottom: 0;
    left:0;
    z-index: 99;
    width: 100%;
  }
  .dcs-action-sheet__inner div{
    width: 100%;
    text-align: center;
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: #333;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
  }
  .dcs-action-sheet__cancel{
    margin-top: 5px;
  }
</style>
