
<script>
// <template>
//     <transition name="single">
//         <slot></slot>
//     </transition>
// </template>
export default {
  functional: true,
  render(h, context) {
    const { slots } = context;
    return (
      <transition name="single"  mode="out-in">
        {slots().default} // 拿到默认插槽的dom元素
      </transition>
    );
  }
};
</script>
<style>
.single-enter,
.single-leave-to {
  opacity: 0;
}
.single-enter-active,
.single-leave-active {
  transition: all 0.3s;
}
.single-enter-to,
.single-leave {
  opacity: 1;
}
</style>