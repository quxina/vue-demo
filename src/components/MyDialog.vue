<template>
  <div class="dialog-wrapper">
      <div class="dialog">
          <div class="dialog-header">
              <span class="header-title">{{title}}</span>
              <span class="close-btn">×</span>
          </div>
          <slot></slot>
          <slot name="footer"></slot>
      </div>
      <div class="test" v-for="(item, index, key) in demoObj" :key="index">
          {{item}}:{{index}}:{{key}}
      </div>
  </div>
</template>

<script>
import {testFn} from '@/config/tools'
export default {
    name: 'MyDialog',
    data () {
        return {
            demoObj: {
                b: {},
                c: {},
                a: {},
                d: {},
                e: {}
            }
        }
    },
    props: {
        title: {
            type: String,
            default: '模态框'
        },
        visible: {
            type: Boolean,
            default: true
        },
        message: {
            type: String,
            default: ''
        },
        showClose: {
            type: Boolean,
            default: true
        },
        showBtn: {
            type: Boolean
        }
    },
    mounted () {

        // setTimeout(() => {
        //     this.$router.push('/mydialog?query=123')
        // }, 3000);
    },
    methods: {
        cbfn () {
            this.$router.replace('/mydialog')
        },
        // testFn () {
        //     console.log('from mydialog')
        // }
    }
}

</script>

<style scoped>
    .dialog-wrapper {
        width: 30%;
        margin: 20vh auto 0;
        min-width: 970px;
        box-sizing: border-box;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
        color: #76838f;
        overflow: hidden;
        background-color: #f7f7f7
    }
    .dialog-header {
        padding: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        overflow: hidden;
    }
    .header-title {
        float: left;
        font-size: 18px;
        font-weight: 500;
    }
    .close-btn {
        color: #a3afb7;
        float: right;
        cursor: pointer;
        font-size: 20px;
        line-height: 24px;
    }
    .close-btn:hover {
        color: #76838f;
    }
    @font-face {
        font-family: 'FZLTXHJW';
        src: url('../../static/FZLTXHJW.ttf');
    }
    .test {
        font-family:  'FZLTXHJW'
    }
</style>
