import { 
    COUNT_INCREMENT,
} from "../mutation-types";

export default {
    namespaced: true, // 命名空间 开启之后，组件内使用state、mutation、action、getter第一个参数都要是名字
    state: { // 管理所有组件的状态
      count: 0,  // 共享的数据
    },
    getters: { // state的计算属性
      countDouble: (state, getters, rootState) => {
        console.log(getters);
        console.log(rootState);
        return state.count * 2
        },
      // addCount: function (state) {
      //   return function (num) {
      //     return state.count + num;
      //   }
      // }
      countAdd: state => num => state.count + num,
    },
    mutations: { // 更改 store 中的状态，数据改变
      [COUNT_INCREMENT](state, payload) { //state里的状态 payload接收传过来的参数
        state.count += payload.amount;
      },
    },
    actions: { // 异步更改操作 
      countIncrement(context, payload) { //state里的状态 payload接收传过来的参数
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            context.commit(COUNT_INCREMENT, payload);
            resolve();
          }, 1000);
        });
      },
    },
}