<template>
    <div>
        <ul>
            <router-link
                tag="li"
                v-for="question in questionList"
                :key="question.id"
                :to="{name: 'question', params: { id: question.id}}"
            >
            {{ question.title }}
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            questionList: [],
        }
    },
    mounted () {
        // 模拟获取到数据 主路径下的question.json文件
        this.$axios.get('/question').then(res => {
            this.questionList = res;
        })
    }
}
</script>

<style scoped>

li {
  margin-bottom: 15px;
  cursor: pointer;
}
li:hover {
  text-decoration: underline;
  color: #3385ff;
}

</style>