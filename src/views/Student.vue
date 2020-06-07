<template>
    <div class="student">
        学员展示
        <!-- <div class="box" v-if="show">
            <div class="leave">你是真的要离开吗</div>
            <div>
                <span @click="handleClick(true)">确认</span>    
                <span @click="handleClick(false)">取消</span>    
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    // data () {
    //     return {
    //         show: false,
    //         nextShow: false,
    //     }
    // },
    // methods: {
    //     handleClick (nextShow) {
    //         this.nextShow = nextShow; 
    //     }
    // },
    // beforeRouteLeave (to, from, next) {
    //     // this.show = true;
    //     const res = window.confirm('你一定要走吗？')
    //     if(res){
    //         next();
    //     }else{
    //         next(false);
    //     }
    // },
}
</script>

<style scoped>
    /* .box{
        position: absolute;
        top: 50px;
        left: calc(50% - 150px);
        width: 300px;
        height: 250px;
        background-color: #ddd;
        box-shadow: 1px 1px 5px 0;
        border-radius: 20px;
    }
    .box .leave {
        width: 100%;
        height: 30px;
        text-align: center;
        padding-top: 30px;
        font-weight: bold;
    }
    span{
        width: 40px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: absolute;
        background-color: #ccc;
        bottom: 30px;
        cursor: pointer;
        font-weight: bold;
        border-radius: 5px;
    }
    span:hover{
        color: #fff;
        font-weight: bold;
    }
    span:nth-of-type(1){
        left: 40px;
    }
    span:nth-of-type(2){
        right: 40px;
    } */
</style>