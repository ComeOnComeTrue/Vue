<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
    >
      <div class="box" v-if="show">hello world</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      x: 200
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = "translateX(200px)";
    },
    enter(el, done) {
      done.canceled = true;
      const timer = setInterval(() => {
        this.x -= 2;
        el.style.transform = `translateX(${this.x}px)`;
        if (this.x <= 0) {
          clearInterval(timer);
          done();
        }
      }, 10);
    },
    afterEnter() {
      this.x = 200;
    },
    enterCancelled: function() {
      // console.log('cancel');
      // this.isCancel = true;
    }
  }
};
</script>

<style scoped>
button {
  margin: 30px;
}
.box {
  margin-left: 20px;
  width: 100px;
  height: 100px;
  border: 1px solid red;
}

/* .box-leave-to,
.box-enter {
  opacity: 0;
}
.box-leave-active,
.box-enter-active {
  transition: opacity 1s;
}
.box-leave,
.box-enter-to {
  opacity: 1;
} */

/* 动画效果 */
/* .v-enter-active {
  animation: animate 1s;
}
.v-leave-active {
  animation: animate 1s reverse;
}
@keyframes animate {
  0% {
    opacity: 0;
    transform: translateX(400px) scale(1);
  }
  50% {
    opacity: .5;
    transform: translateX(200px) scale(1.5);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
} */
</style>

