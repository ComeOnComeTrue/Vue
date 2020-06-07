<template>
  <div class="home">
    <button @click="handleClick">点击</button>
    {{ $store.state.count.count}}
    {{ storeCount }}
    <!-- 通过属性访问 -->
    <!-- {{ $store.getters.countDouble }} -->
    {{ countDouble }} {{ $store.getters['count/countDouble'] }}
    <!-- 通过方法访问 -->
    <!-- {{ $store.getters.countAdd(3) }} -->
    {{ countAdd(3) }}
    <!-- {{ $store.state.obj }} -->
    {{ obj }}
    <!-- <input :value="msg" @input="handleInput" /> {{ msg }} -->
    <input v-model="msg" />
    {{ msg }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  COUNT_INCREMENT,
  COUNT_OBJ,
  UPDATE_MSG
} from "../store/mutation-types";

export default {
  data() {
    return {
      count: 100
    };
  },
  computed: {
    ...mapState("count", {
      // 辅助函数获取数据
      storeCount: "count" // state => state.count + 10
    }),
    ...mapState(["obj"]),
    ...mapGetters("count", [
      // 获取到state的计算属性
      "countDouble",
      "countAdd"
    ]),
    msg: { // 仓库管理的数据，设置有双向数据绑定v-model，所以要设置成对象形式，因为在页面初始化时会渲染一次
      get() { // 页面初始化时渲染一次，后续数据响应渲染触发
        console.log(1);
        return this.$store.state.msg;
      },
      set(value) {
        console.log(2);
        this.$store.commit(UPDATE_MSG, { value });
      }
    }
  },
  methods: {
    ...mapMutations([
      "COUNT_INCREMENT" // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    handleClick() {
      // this.$store.commit("countIncrement", { amount: 10 }); // 提交状态一
      // this.countIncrement(); // 提交状态二
      // this.$store.commit("COUNT_INCREMENT", { amount: 10 });
      // this.$store.commit(COUNT_INCREMENT, { amount: 10 });
      this.$store.commit(COUNT_OBJ);
      this.$store.dispatch("count/countIncrement", { amount: 10 }).then(res => {
        alert("count值改变了");
      });
    }
  }
};
</script>