<template>
  <div id="app">

    <base-level :level="2" @click="handleClick">

      <!-- <template #default>
        标题 
      </template>
      <template #header>
        标题 
      </template>
      <div>div</div>
      <p>p</p> -->

      <template v-slot:header>
        <a>first</a>
      </template>
      <div>div</div>
      

    </base-level>

  </div>
</template>

<script>
import baseLevel from './components/baseLevel';
export default {
  name: 'app',
  provide () {
    return {
      name: 'shanshan',
    }
  },
  components: {
    baseLevel,
  },
  methods: {
    handleClick () {
      console.log('xxxx');
    }
  },
}
</script>