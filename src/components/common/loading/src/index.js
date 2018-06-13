/**
 * Created by hu.wenjun on 2018/5/22.
 */
import Vue from 'vue'
import LoadingComponent from './index.vue'
const LoadingConstructor = Vue.extend(LoadingComponent)
let instance;

function initInstance() {
  instance = new LoadingConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el);
}
LoadingConstructor.prototype.showLoading = function () {
  this.visible = true;
}
LoadingConstructor.prototype.hideLoading = function () {
  this.visible = false;
}
let Loading = () => {
  initInstance();
  return instance;
}

export default Loading
