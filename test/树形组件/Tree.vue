<template>
  <ul class="tree">
    <li 
      v-for="(node, index) in data"
      :key="node[defaultProps.label]"
      class="tree-node"
    >
    <!-- <div @click="handleClick(index)"> -->
      <!-- node[defaultProps.children] 为真值时才渲染 -->
        <i 
          v-if="node[defaultProps.children]"
          class="iconfont"
          :class="{
            'icon-down': !showChildren[index],
            'icon-right': showChildren[index],
          }"
        />
        <span 
          class="node-label"
          @click="handleClick(index)"
        >{{ node[defaultProps.label] }}</span>
      <!-- </div> -->
        <keep-alive> <!-- 缓存上一次操作的组件状态 -->
            <!-- 递归循环组件 showChildren[index] 和 node[defaultProps.children] 有值才去渲染-->
          <base-tree 
            v-if="showChildren[index] && node[defaultProps.children]"
            :data="node[defaultProps.children]"
          />
        </keep-alive>

    </li>
  </ul>
</template>

<script>
export default {
  name: 'base-tree',// 组件名 可用于循环组件
  props: { // 特性 验证
    data: { // 名
      type: Array,
      required: true,
    },
    defaultProps: { // 验证 传过来的特性 有用你的 没有用我的
    // <base-tree :data="data" default-props="{label: 'name', children: 'son'}"/>
      type: Object,
      default: () => ({ // 默认值
        label: 'label',
        children: 'children',
      })
    },
  },
  data () {
    return {
      showChildren: [], 
    }
  },
  methods: {
    handleClick (index) {
      const flag = !this.showChildren[index]; // 点击之后取反
    // 通过索引改变，渲染不了视图，通过数组变异方法，从哪开始点都是第一个索引，所以使用$set
      this.$set(this.showChildren, index, flag); // 点击的那个为true 不是true的就为empty空的 undefined
    },
  },
}
</script>

<style scoped>
@import "./assets/font.css";
li {
  list-style: none;
  
}
.tree-node {
  cursor: pointer;
}
.tree-node .iconfont {
  color: #c0c4cc;
  font-size: 12px;
  margin-right: 5px;
  vertical-align: middle;
}
.tree-node .node-label {
  font-size: 14px;
  color: #606266;
  vertical-align: middle;
}
</style>