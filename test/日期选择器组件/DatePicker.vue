<template>
  <div class="date-picker" v-click-outside>
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input 
        type="text" 
        :value="chooseDate" 
      />
    </div>
    <div class="picker-panel" v-if="showPanel">
      <div class="picker-arrow" />
      <div class="picker-body">
        <div class="picker-header">
          <span class="picker-btn iconfont icon-prev-year" @click="onChangeYear('prev')"/>
          <span class="picker-btn iconfont icon-prev-month" @click="onChangeMonth('prev')" />
          <span class="picker-date">
            {{ showDate.year }}年{{ showDate.month+1 }}月
          </span>
          <span class="picker-btn iconfont icon-next-month" @click="onChangeMonth('next')"/>
          <span class="picker-btn iconfont icon-next-year" @click="onChangeYear('next')"/>
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div
              v-for="week in ['日', '一', '二', '三', '四', '五', '六']"
              :key="week"
            >{{ week }}</div>
          </div>
          <div class="picker-days">
            <div
              v-for="date in showDay"
              :key="date.getTime()"
              :class="{
                'other-month': !isCur(date).month,
                'is-select': isCur(date).select,
                'is-today': isCur(date).today,
              }"
              @click="onChooseDate(date)"
            >
              {{ date.getDate() }}
              <!-- 显示天数 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: { // 自定义指令 v-click-outside  点击的区域是否在这个区域，是就显示，否则隐藏, 前提dom元素要是inline-block
    'click-outside': {
      bind(el, binding, vnode) { // 绑定事件 
        const vm = vnode.context; // 可拿data信息
        document.onclick = function (e) {
          const dom = e.target; // 拿到点击的元素
          const isElSon = el.contains(dom); // 自身是否包含了点击的dom元素
          if(isElSon && !vm.showPanel) {  // 当包含点击的元素 并且 为true 就显示
            vm.changePanel(true);
          } else if (!isElSon && vm.showPanel) {// 当不包含点击的元素 并且 为false 就隐藏
            vm.changePanel(false);
          }
          // 判断两种值，有四种可能，所以用 else if
        }
      },
    },
  },
  model: {// 组件双向数据绑定 规定v-model选项的特性与事件 App.vue
    prop: 'date', // 绑定特性的名字
    event: 'choose-date', // 监听事件的名字
  },
  props: { // 高级验证
    date: { // 接收App.vue传过来的值
      type: Date, // 类型
      default: () => new Date(), // 设置默认值
    }
  },
  computed: { // 计算属性
    chooseDate () { // input 框内 显示当前时间
      const { year, month, day } = this.getYearMonthDay(this.date);
      return `${year}-${month+1}-${day}`;
    },
    showDay () { // 
    // 一天的毫秒数 24 * 60 * 60 * 1000
      const { year, month } = this.showDate;
      const firstDay = new Date(year, month, 1); // 当前的年和月，的一号
      const week = firstDay.getDay(); // 得到当前月的一号是周几  周三

      const startDay = firstDay - week * 24 * 60 * 60 * 1000; // 开始天数 往前三天 
      var arr = []; // 放42天的时间戳
      for(let i = 0; i < 42; i ++) { // 6 * 7  
        arr.push(new Date( startDay + i * 24 * 60 * 60 * 1000));
      }
      return arr;
    },
  },
  data () {
    return {
      showPanel: false, // 日期面板 显示与隐藏
      showDate: { // 显示的时间
        year: 0,
        month: 0,
        day: 0,
      },
    }
  },
  created () { // 创建后执行 
    this.getShowDate(this.date);// 调用获取时间并赋值
  },
  methods: {
    changePanel (flag) { // 时间面板显示与隐藏
      this.showPanel = flag;
    },
    getShowDate (date) { // 获取时间并赋值
      const { year, month, day } = this.getYearMonthDay(date);
      this.showDate = {
        year,
        month,
        day,
      }
    },
    getYearMonthDay (date) {// 获取时间
      const year = date.getFullYear(); // 获取年方法
      const month = date.getMonth(); // 获取月方法
      const day = date.getDate(); // 获取日方法
      return {
        year,
        month,
        day,
      }
    },
    isCur (date) { // 日期天数的样式 
      const chooseDate = new Date(this.chooseDate); // 得到input框里的时间
      const { year:showYear, month:showMonth } = this.showDate; // 获取本年和本月信息
      const { year:chooseYear, month:chooseMonth, day:chooseDay } = this.getYearMonthDay(chooseDate); // 赋input框内的值并添加名
      const { year:curYear, month:curMonth, day:curDay } = this.getYearMonthDay(new Date());// 获取当前时间并起名字
      const { year, month, day } = this.getYearMonthDay(date); 
      return {
        month: year === showYear && month === showMonth, // 其它: 给不是本年 本月的 添加样式 
        select: year === chooseYear && month === chooseMonth && day === chooseDay,// 年月日是否与input的相同，相同添加选择后的样式
        today: year === curYear && month === curMonth && day === curDay,
      }
    },
    onChooseDate (date) { // 点击选择地时间触发
      this.$emit('choose-date', date); // 自定义事件，在父组件改变时间，App.vue
      this.changePanel(false); // 点击选择完之后 面板消失
      this.getShowDate(date); // 选择完之后，重新打开显示面板改变
    },
    onChangeMonth (type) { // 改变月
    // 方法一 通过提供的方法改变月
      const { year, month, day } = this.showDate;
      const moveMonth = type === 'prev' ? -1 : 1; // 上一个月数就减一，下一个加一
      const showDate = new Date(year, month, day);
      showDate.setMonth(month + moveMonth); // setMonth() 方法用于设置月份。
      const { year:showYear, month:showMonth } = this.getYearMonthDay(showDate); // 获取当前月份的年和月
      this.showDate.year = showYear;
      this.showDate.month = showMonth;
      // const showDate = new Date(...this.showDate);
      // console.log(showDate);
      // 方法二 自己手动改变
      // let { year, month} = this.showDate;
      // const moveMonth = type === 'prev' ? -1 : 1; // 上一个月数就减一，下一个加一
      // const minMonth = 0;
      // const maxMonth = 11;
      // month += moveMonth;
      // if(month < minMonth) {
      //   month = maxMonth;
      //   year --;
      // } else if (month > maxMonth ){
      //   month = minMonth;
      //   year ++;
      // }
      // this.showDate.month = month;
      // this.showDate.year = year;
    },
    onChangeYear (type) {// 改变年
      const moveYear = type === 'prev' ? -1 : 1;
      this.showDate.year += moveYear;
    }
  },
}
</script>

<style scoped>
@import "./assets/font.css";
.date-picker {
  display: inline-block;
}
.picker-input {
  position: relative;
}
.picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}
.picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  color: #c0c4cc;
}
.picker-panel {
  position: absolute;
  width: 322px;
  height: 329px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  background-color: #fff;
}
.picker-panel .picker-arrow {
  position: absolute;
  top: -12px;
  left: 30px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ebeef5;
}
.picker-panel .picker-arrow::after {
  position: absolute;
  left: -6px;
  top: 1px;
  content: '';
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #fff;
  border-top-width: 0;
  /* 上边框不要，下边框就上去了 */
}
.picker-panel .picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 10px;
}
.picker-panel .picker-btn {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #303133;
  cursor: pointer;
}
.picker-panel .picker-date {
  margin-left: 60px;
  margin-right: 60px;
  font-size: 14px;
  user-select: none;
}
.picker-panel .picker-content {
  padding: 0 10px 10px 10px;
  color: #606266;
  user-select: none;
}
.picker-panel .picker-weeks {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}
.picker-panel .picker-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.picker-panel .picker-days div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 4px 6px;
  font-size: 12px;
  cursor: pointer;
}
.picker-panel .picker-days div:hover {
  color: #409eff;
}
/* 今天样式 */
.picker-panel .picker-days div.is-today {
  color: #409eff;
  font-weight: 700;
}
/* 选择后样式 */
.picker-panel .picker-days div.is-select {
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}
/* 当月其他多余的样式 */
.picker-panel .picker-days div.other-month {
  color: #c0c4cc;
}
</style>