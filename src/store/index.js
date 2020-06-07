import Vue from 'vue'
import Vuex from 'vuex'

import count from "./modules/count";
import student from "./modules/student";

import { 
  COUNT_OBJ, 
  UPDATE_MSG 
} from "./mutation-types";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 开发 严格模式 上线取消
  state: { // 管理所有组件的状态 // 共享的数据
    obj: { a: 0 }, 
    msg: ''
  },
  mutations: { // 更改 store 中的状态，数据改变
    [COUNT_OBJ](state) {
      // 改变state里的对象属性，视图不渲染 ，如果已经在组件内引用提交常量也不会出现这样情况
      Vue.set(state.obj, 'newProp', 10); // 方法一 通过set方法添加
      // state.obj = { ...state.obj, newProp: 10 } // 方法二 替换整体
    },
    [UPDATE_MSG](state, { value }) {// v-model
      state.msg = value;
    },
  },
  modules: {
    count,
    student,
  }
})
