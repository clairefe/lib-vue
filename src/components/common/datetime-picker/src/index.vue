<template>
  <div class="dcs-datetime__picker">
    <mt-popup v-model="visible" :closeOnClickModal="closeOnClickModal" position="bottom" class="dcs-datetime">
      <mt-picker
        :slots="dateSlots"
        @change="onChange"
        :visible-item-count="visibleItemCount"
        class="dcs-datetime-picker"
        ref="picker"
        show-toolbar
        :item-height="itemHeight">
        <span class="dcs-datetime-action dcs-datetime-cancel" @click="visible = false;$emit('cancel')">{{ cancelText }}</span>
        <span class="dcs-datetime-title">{{ titleText }}</span>
        <span class="dcs-datetime-action dcs-datetime-confirm" @click="confirm">{{ confirmText }}</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Picker, Popup } from 'mint-ui'
  Vue.component(Picker.name, Picker)
  Vue.component(Popup.name, Popup)

  export default {
    name: "dcs-datetime-picker",
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      titleText: {
        type: String,
        default: '选择用车时间'
      },
      type: {
        type: String,
        default: 'datetime'
      },
      startDate: {
        type: Date,
        default() {
          return new Date(new Date().getFullYear() - 10, 0, 1,0,0);
        }
      },
      endDate: {
        type: Date,
        default() {
          return new Date(new Date().getFullYear() + 10, 11, 31,0,0);
        }
      },
      dateFormat: {
        type: String,
        default: '{value}'
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      itemHeight: {
        type: Number,
        default: 44
      },
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      value: null
    },

    data() {
      return {
        visible: false,
        currentValue: null,
        selfTriggered: false,
        dateSlots: [],
      };
    },
    methods: {
      open() {
        this.visible = true;
      },

      close() {
        this.visible = false;
      },

      isLeapYear(year) {
        return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
      },

      isShortMonth(month) {
        return [4, 6, 9, 11].indexOf(month) > -1;
      },

      getMonthEndDay(year, month) {
        if (this.isShortMonth(month)) {
          return 30;
        } else if (month === 2) {
          return this.isLeapYear(year) ? 29 : 28;
        } else {
          return 31;
        }
      },

      getTrueValue(formattedValue) {
        if (!formattedValue) return;
        while (isNaN(parseInt(formattedValue, 10))) {
          formattedValue = formattedValue.slice(1);
        }
        return parseInt(formattedValue, 10);
      },

      getValue(values) {
        let value;
        let day  = values[0].replace(/[\u4e00-\u9fa5]/g, ',').split(',');
        let year = this.getTrueValue(day[0].trim());
        let month = this.getTrueValue(day[1].trim());
        let date = this.getTrueValue(day[2].trim());
        let maxDate = this.getMonthEndDay(year, month);
        if (date > maxDate) {
          this.selfTriggered = true;
          date = 1;
        }
        let hour = this.typeStr.indexOf('H') > -1 ? this.getTrueValue(values[this.typeStr.indexOf('H')]) : 0;
        let minute = this.typeStr.indexOf('m') > -1 ? this.getTrueValue(values[this.typeStr.indexOf('m')]) : 0;
        value = new Date(year, month - 1, date, hour, minute);

        return value;
      },

      onChange(picker) {
        let values = picker.$children.filter(child => child.currentValue !== undefined).map(child => child.currentValue);
        if (this.selfTriggered) {
          this.selfTriggered = false;
          return;
        }
        if (values.length !== 0) {
          this.currentValue = this.getValue(values);
          this.handleValueChange();
        }
      },

      fillValues(type, start, end) {
        let values = [];
        if(type == "D"){
          let dur = Number.parseInt((end.getTime() - start.getTime())/86400000);
          for (let i = 0; i <= dur; i++) {
            values.push(this.getFullDate(new Date((start.getTime() + (i *86400000)))) );
          }
        }else if (type == "m"){
          for (let i = start/10; i <= end/10; i++) {
            if(i==0){
              values.push('0'+i*10);
            }else{
              values.push( i*10);
            }
          }
        } else {
          for (let i = start; i <= end; i++) {
            if (i < 10) {
              values.push('0' + i);
            } else {
              values.push(i);
            }
          }
        }
        return values;
      },

      pushSlots(slots, type, start, end) {
        if(type == "D"){
          slots.push({
            flex: 3,
            values: this.fillValues(type, start, end),
          });
        }else{
          slots.push({
            flex: 1,
            values: this.fillValues(type, start, end)
          });
        }
      },

      generateSlots() {
        let dateSlots = [];
        const INTERVAL_MAP = {
          D: this.rims.date,
          H: this.rims.hour,
          m: this.rims.min
        };
        let typesArr = this.typeStr.split('');
        typesArr.forEach(type => {
          if (INTERVAL_MAP[type]) {
            this.pushSlots.apply(null, [dateSlots, type].concat(INTERVAL_MAP[type]));
          }
        });
        this.dateSlots = dateSlots;
      },
      rimDetect(result, rim) {
        let position = rim === 'start' ? 0 : 1;
        let rimDate = rim === 'start' ? this.startDate : this.endDate;

        let Date1 = new Date(this.getYear(this.currentValue),this.getMonth(this.currentValue),this.getDate(this.currentValue), 0, 0).getTime(),
          Date2 = new Date(rimDate.getFullYear(),rimDate.getMonth() + 1,rimDate.getDate(), 0, 0).getTime();
        if (Date1 === Date2) {
          result.hour[position] = rimDate.getHours();
          if (this.getHour(this.currentValue) === rimDate.getHours()) {
            result.min[position] = Math.ceil(rimDate.getMinutes()/10)*10;
          }
        }
      },

      isDateString(str) {
        return /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/.test(str);
      },

      getYear(value) {
        return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[0] : value.getFullYear();
      },

      getMonth(value) {
        return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[1] : value.getMonth() + 1;
      },

      getDate(value) {
        return this.isDateString(value) ? value.split(' ')[0].split(/-|\/|\./)[2] : value.getDate();
      },
      getFullDate (value) {
        let week;
        switch(value.getDay()){
          case 1:
            week = "一"; break;
          case 2:
            week = "二"; break;
          case 3:
            week = "三"; break;
          case 4:
            week = "四"; break;
          case 5:
            week = "五"; break;
          case 6:
            week = "六"; break;
          default:
            week = "日"; break;
        }
        return this.getYear(value)+"年 "+this.getMonth(value)+"月 "+this.getDate(value)+"日 "+"周"+week;
      },
      getHour(value) {
        if (this.isDateString(value)) {
          const str = value.split(' ')[1] || '00:00:00';
          return str.split(':')[0];
        }
        return value.getHours();
      },

      getMinute(value) {
        if (this.isDateString(value)) {
          const str = value.split(' ')[1] || '00:00:00';
          return str.split(':')[1];
        }
        return value.getMinutes();
      },

      confirm() {
        this.visible = false;
        this.$emit('confirm', this.currentValue);
      },

      handleValueChange() {
        this.$emit('input', this.currentValue);
      }
    },

    computed: {
      rims() {
        if (!this.currentValue) return { date: [], hour: [], min: [] };
        let result;
        result = {
          date: [this.startDate, this.endDate],
          hour: [0, 23],
          min: [0, 50]
        };
        this.rimDetect(result, 'start');
        this.rimDetect(result, 'end');
        return result;
      },

      typeStr() {
        if (this.type === 'time') {
          return 'Hm';
        } else if (this.type === 'date') {
          return 'YMD';
        } else {
          return 'DHm';
        }
      }
    },

    watch: {
      value(val) {
        this.currentValue = val;
      },

      rims() {
        this.generateSlots();
      },

      visible(val) {
        this.$emit('visible-change', val);
      }
    },

    mounted() {
      this.currentValue = this.value;
      if (!this.value) {
        this.currentValue = this.startDate;
      }
      this.generateSlots();
    }
  }
</script>

<style scoped >
  .dcs-datetime {
    width: 100%;
  }
  .dcs-datetime-title{
    width: 60%;
    display: inline-block;
    line-height: 48px;
    text-align: center;
    font-weight: normal;
  }


  .dcs-datetime-action {
    display: inline-block;
    width: 20%;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    color: #0899e2;
  }
  .dcs-datetime-cancel {
    float: left;
  }
  .dcs-datetime-confirm {
    float: right;
  }
</style>
