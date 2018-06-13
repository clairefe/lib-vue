/**
 * Created by hu.wenjun on 2018/5/11.
 */
// stores
import store from './vueStore/index'
//
import mixins from './minixs'
import * as filters from './filters'
import focus from './directives/focus'

// basic components
import DatetimePicker from './components/common/datetime-picker/index';
import Switch from './components/common/switch/index'
import Nav from './components/common/nav/index';
import ActionSheet from './components/common/action-sheet/index'
import Search from './components/common/search/index'
import Cell from './components/common/cell/index'
// special basic components
import Confirm from './components/common/confirm/index'
import Loading from './components/common/loading/index'
import Toast from './components/common/toast/index'
import Alert from './components/common/alert/index'
import Message from './components/common/message/index'
// releation components
// utils

/*
* 基本组件，不需要单独注册
* */
const baseComponents = [
  DatetimePicker,
  Switch,
  Nav,
  ActionSheet,
  Message,
  Search,
  Cell
];

const install = function(Vue) {
  if(install.installed) return
  baseComponents.map(component => {
    Vue.component(component.name, component);
  });

  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })

  Vue.directive("focus", focus)

  Vue.mixin( mixins );

  Vue.$dcsloading = Vue.prototype.$dcsloading = Loading;
  Vue.$dcstoast = Vue.prototype.$dcstoast = Toast;
  Vue.$dcsalert = Vue.prototype.$dcsalert = Alert;
  Vue.$dcsconfirm = Vue.prototype.$dcsconfirm = Confirm;
  // Vue.$message = Vue.prototype.$message = Message;
};
//业务组件，使用时需要单独注册
export {
  store
}

export default { install }
