<template>
  <div class="wrapper">
    <button @click="open">弹框</button>
    <my-alert :visible="visible" @close="close" :callback="comfirm" title="测试"></my-alert>
  </div>
</template>

<script>
import MyAlert from '@/components/MyAlert'
export default {
  name: 'TestAlert',
  data() {
    return {
      visible: false
    }
  },
  components: {
    MyAlert
  },
  methods: {
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
    comfirm() {
      console.log('comfirm')
    }
  }
}
</script>

<style>

</style>
