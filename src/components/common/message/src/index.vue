<template>
  <transition :name="currentTransition">
    <div v-show="currentValue" class="dcs-message">
       <slot></slot>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import Popup from '../../../../Utils/popup/index'
  export default {
    name: 'dcs-message',
    props: {
      modal: {
        default: true
      },

      modalFade: {
        default: false
      },

      lockScroll: {
        default: false
      },

      closeOnClickModal: {
        default: true
      },

      popupTransition: {
        type: String,
        default: 'popup-slide'
      },

      position: {
        type: String,
        default: 'bottom'
      }
    },
    mixins: [Popup],
    data () {
        return {
          currentValue: false
        }
    },
    methods:{

    },
    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },

      value(val) {
        this.currentValue = val;
      }
    },
    beforeMount() {
      if (this.popupTransition !== 'popup-fade') {
        this.currentTransition = `popup-slide-${ this.position }`;
      }
    },
    mounted() {
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.open();
      }
    }
  }
</script>

<style scoped>

</style>
