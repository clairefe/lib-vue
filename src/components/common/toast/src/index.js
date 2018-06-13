/**
 * Created by hu.wenjun on 2018/5/22.
 */
import Vue from 'vue'
import ToastTpl from './index.vue'
const ToastConstructor = Vue.extend(ToastTpl);

const getAnInstance = function() {
  return new ToastConstructor({
    el: document.createElement("div")
  });
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild( event.target );
  }
};

ToastConstructor.prototype.close = function () {
  this.visible = false;
  this.$el.addEventListener( 'transitionend', removeDom );
}

let Toast = ( options = {} ) => {
  let instance, duration
  instance = getAnInstance();
  clearTimeout(instance.timer);

  document.body.appendChild(instance.$el);
  instance.message = options.message;
  duration = options.duration || 3000;

  Vue.nextTick(function() {
    instance.visible = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    ~duration && (instance.timer = setTimeout(function() {
      instance.close();
    }, duration));
  });

  return instance
}

export default Toast
