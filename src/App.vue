<template>
  <div id="app">
    <BlocksInfo />
  </div>
</template>

<script>
import BlocksInfo from './components/BlocksInfo.vue';
export default {
  name: 'App',
  components: {
    BlocksInfo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
