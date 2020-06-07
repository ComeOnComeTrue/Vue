<template>
  <div class="question" v-if="question">
    <div class="main">问题：{{ question.title }}</div>

    <div class="other">
      <!-- title 鼠标移过去显示title属性的值 -->
      <!-- <div class="prev" :title="question.prev" >{{ question.prev }}</div>
      <div class="next" :title="question.next" >{{ question.next }}</div>-->
      <!-- 优化： -->
      <div
        v-for="other in otherQuestionList"
        :key="other.id"
        :title="other.title"
        :class="other.type"
        @click="handleClick(other.id)"
      >{{ other.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
    // beforeRouteUpdate (to, from, next) { // 动态id 改变触发
    //     this.id = to.params.id
    //     this.getData();
    //     next();
    // },
    props: { //  注册 路由组件传过来的参数 高级校验
        id: {
            type: [Number, String],
        },
        // name: {
        //     type: String,
        //     defalut: 'question',
        // }
    },
    data () {
        return {
            question: null,
        }
    },
    // mounted () {
    //     // const { id } = this.$route.params; 
    //     // // 获取对应文件信息 
    //     // this.$axios.get(`/question/${id}`).then(res => {
    //     //     this.question = res;
    //     // })
    //     this.getData();
    //     // console.log(this.id, this.name)
    // },
    computed: {
        otherQuestionList () { // 过滤数组，节省性能
            const arr = [];
            if (this.question.prev) {// 有值为true生效
                const { prev, prevId } = this.question;
                arr.push({
                    type: 'prev',
                    title: prev,
                    id: prevId
                })
            }
            if (this.question.next) {// 有值为true生效
                const { next, nextId } = this.question;
                arr.push({
                    type: 'next',
                    title: next,
                    id: nextId
                })
            }
            return arr;
        }
    },
    methods: {
        handleClick (id) {
            // const { name } = this.$route;
            // const { name } = this;
            this.$router.push({ // 点击添加一条历史纪录
                name: 'question',// name, // name: 'question'
                params: { // 
                    id,
                },
            });
        },
        getData () {
        // const { id } = this.$route.params; 
        const { id } = this;
        // 获取对应文件信息 
        this.$axios.get(`/question/${id}`).then(res => {
            this.question = res;
        })
        }
    },
    watch: { // 侦听器 一个改变 渲染多个
    // 对象形式 obj: {} handler (newVal,oldVal) {console.log(1)},
        '$route' : { // 侦听路由路径有没有改变
            handler () {
                this.getData();
            },
            immediate: true, // 页面渲染立即执行一遍，对应数据改变立即渲染
        }
    }
}
</script>
<style scoped>
.main {
  margin-bottom: 200px;
}
.prev {
  float: left;
}
.next {
  float: right;
}
.prev,
.next {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #3385ff;
  text-decoration: underline;
  cursor: pointer;
}
</style>