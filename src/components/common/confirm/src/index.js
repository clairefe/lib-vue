/**
 * Created by hu.wenjun on 2018/5/23.
 */
import Vue from 'vue'
import ConfirmComponenet from './index.vue'
import merge from '../../../../Utils/merge'

let instance;
//extend 是构造一个组件的语法器.传入参数，返回一个组件
let ConfirmtConstructor = Vue.extend(ConfirmComponenet);

let initInstance = ()=>{
  //实例化ConfirmConstructor组件
  instance = new ConfirmtConstructor({
    el: document.createElement('div')
  });
  //添加到boby
  document.body.appendChild(instance.$el);
}

let Confirm = (options={}) => {
  //初始化
  initInstance();
  // 将单个 confirm instance 的配置合并到默认值（instance.$data，就是main.vue里面的data）中
  merge(instance.$data, options);
  //返回Promise
  return new Promise((resolve, reject)=>{
    instance.visible = true;
    let confirm = instance.confirm;
    let cancel = instance.cancel;
    instance.confirm = () => {
      //先移除element
      document.body.removeChild(instance.$el);
      //先执行instance.success（main.vue里面的success函数）
      confirm();
      //再执行自定义函数
      resolve('ok');
    }
    instance.cancel = () => {
      document.body.removeChild(instance.$el);
      cancel();
      reject('cancel');
    }
  });

}
export default Confirm;

