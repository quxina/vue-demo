<template>
  <div class="wrapper">
    <button>登录</button>
    <my-login></my-login>
  </div>
</template>

<script>
import MyLogin from '@/components/login/MyLogin'
export default {
  name: 'LoginPage',
  components: {
    MyLogin
  }
}
</script>

<style>

</style>
