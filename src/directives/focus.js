/**
 * Created by hu.wenjun on 2018/5/23.
 */
export default {
  bind (el,binding) {
    console.log(el);
    console.log(binding)
  },
  inserted (el){
    el.focus();
  }
}
