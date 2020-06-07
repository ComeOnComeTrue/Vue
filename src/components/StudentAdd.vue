<template>
  <div class="student-add">
    <div>添加学生：</div>
    <div>
      姓名：<input type="text" v-model="name">
    </div>
    <div>
      年龄：<input type="text" v-model="age">
    </div>
    <button @click="handleClick">添加</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '', // 临时数据
      age: '',
    }
  },
  methods: {
    handleClick () {
      const { name, age } = this;
      let id = +new Date();

      let flag = [...this.$store.state.student.studentList].some(ele => ele.age === age && ele.name === name)

      if(name === "" || age === "" || flag) {
        this.name = '';
        this.age = '';
        alert('已存在');
        return;
      }


      this.$store.commit('student/setState', {name, age, id}); // 得到数据，调用setState重新赋值改状态

      // this.$store.state.student.studentList.push({ 
      //   name,
      //   age,
      //   id: +new Date(),
      // })
    }
  },
}
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
</style>