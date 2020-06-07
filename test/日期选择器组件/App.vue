// vue serve
<template>
  <div class="app">
    <!-- v-model :value @input :date @choose-date -->
    <!-- 组件双向数据绑定  :date="date" @choose-date="chooseDate" -》v-model="date" -->
    <!-- <date-picker :date="date" @choose-date="chooseDate" /> -->
    <date-picker v-model="date" />
  </div>
</template>

<script>
import DatePicker from "./DatePicker";
export default {
  components: {
    DatePicker
  },
  data () {
    return {
      date: new Date(),
    }
  },
  // methods: {
  //   chooseDate (date) {
  //     this.date = date;
  //   }
  // }
};
</script>
// scoped 表示这些样式只在本组件下使用
<style scoped>
</style>