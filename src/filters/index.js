/**
 * Created by hu.wenjun on 2018/5/17.
 */
/*常见的文本格式化*/

/*日期格式
* 5月17日 20:00
* */
export function DateFormat(date) {
  if(!date){return}
  let fmt = "M月d日 HH:mm";
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
  };

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}


