/**
 * Created by hu.wenjun on 2018/5/23.
 */
import Vue from 'vue'
import merge from '../../../../Utils/merge'
import AlertComponenet from './index.vue'

let instance;
//extend 是构造一个组件的语法器.传入参数，返回一个组件
let AlertConstructor = Vue.extend(AlertComponenet);

let initInstance = ()=>{
  //实例化ConfirmConstructor组件
  instance = new AlertConstructor({
    el: document.createElement('div')
  });
  //添加到boby
  document.body.appendChild(instance.$el);
}

let Alert = (options={}) => {
  //初始化
  initInstance();
  // 将单个 confirm instance 的配置合并到默认值（instance.$data，就是main.vue里面的data）中
  merge(instance.$data, options);
  //返回Promise
  return new Promise((resolve, reject)=>{
    instance.visible = true;
    let success = instance.success;
    instance.success = () => {
      //先移除element
      document.body.removeChild(instance.$el);
      //先执行instance.success（main.vue里面的success函数）
      success();
      //再执行自定义函数
      resolve('ok');
    }
  });

}
export default Alert;

