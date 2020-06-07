<template>
  <div id="app">
    <div class="nav-box">
      <!-- 编程式导航 -->
      <div class="logo" @click="handleClick">渡一教育</div>
      <!-- 命名导航 -->
      <!-- <router-link to="/home" tag="div" class="logo">渡一教育</router-link> -->

      <div class="nav-list">
        <router-link to="/home">首页</router-link>
        <router-link to="/learn">课程学习</router-link>
        <router-link to="/student">学员展示</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/activity">社区</router-link>
      </div>
    </div>
    <div class="container">
      <transition> 
        <router-view></router-view><!-- 视图 -->
      </transition>
      <!-- <router-view name="student"></router-view>命名视图 -->
    </div>
  </div>
</template>


<script>
export default {
  name: 'app',
  methods: {
    handleClick () {
      console.log(this.$router)
      // if() {
      //   return;
      // }
      this.$router.push('/home'); // 添加跳转历史记录
    }
  }
}
</script>

<style scoped>
/* #app {
  overflow-x: hidden;
  overflow-y: hidden;
} */

/* enter 过渡动效*/ 
.v-enter{
  transform: translateX(1000px);
}
.v-enter-active {
  transition: all .3s;
}
.v-enter-to{
  transform: translateX(0px);
}

/*  */
.nav-box {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  background-color: #3385ff
}
.nav-box .logo {
  color: #fff;
  cursor: pointer;
}
.nav-list a {
  margin-left: 40px;
  color: #fff;
  text-decoration: none;
}
.nav-list a.router-link-active {
  font-weight: bold;
}
.container {
  margin-top: 60px;
}
.nav-box,
.container {
  padding-left: 200px;
  padding-right: 200px;
}
</style>
