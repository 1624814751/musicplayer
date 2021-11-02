<template>
  <div id="app">
        <Top></Top>
        <Index></Index>
  </div>
</template>

<script>

import Top from 'components/01.top.vue'
import Index from 'components/02.index.vue'
export default {
  name: 'app',
   components:{
    Top,
    Index
  },
};
</script>

<style >

</style>
