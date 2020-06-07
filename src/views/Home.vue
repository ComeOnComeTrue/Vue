<template>
    <div class="home">
        首页
        <!-- 关于页面设置一个ID为a的元素 就可以通过hash值去找 -->
        <router-link to="/about#a">去关于的a</router-link>
        <div class="test">测试</div>
    </div>
</template>

<style scoped>
.test{
    margin-top: 1200px;
}
</style>