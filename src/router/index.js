import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Modal from '@/components/Modal'
import MyDialog from '@/components/MyDialog'
import Load from '@/components/Load'
import TestAlert from '@/components/TestAlert'
import LoginPage from '@/components/login/LoginPage'
import MyTimePicker from '@/components/baseComponents/MyTimePicker'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/mydialog',
      name: 'MyDialog',
      component: MyDialog
    },
    {
      path: '/load',
      name: 'Load',
      component: Load
    },
    {
      path: '/testalert',
      name: 'TestAlert',
      component: TestAlert
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/timepicker',
      name: 'MyTimePicker',
      component: MyTimePicker
    }
  ]
})
