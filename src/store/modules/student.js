export default {
    namespaced: true, // 开启命名空间
    state: { // 管理所有组件的状态
        studentList: [],
      },
      getters: { // state的计算属性
        studentLength: state => state.studentList.length,
        studentJuveniles: state => state.studentList.filter(student => student.age < 18),
      },
      mutations: {
        setState(state, newState = {}) {  // （state的状态，传过来的参数：默认值是对象）
          state.studentList.push(newState)
        }
      }
}