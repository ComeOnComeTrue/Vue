
<template>
    <div>
        xxx
        {{ msg }}
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            msg: "hello world"
        }
    }
}
</script>

// scoped 表示这些样式只在本组件下使用
<style scoped>
    div {
        background-color: blue;
    }
</style>
