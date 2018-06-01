<template>
  <div class="alert-wrapper" v-show="visible" :class="{'alert-wrapper-hide': !closed}" @click="wrapperClose">
    <div class="alert-content" :class="{'alert-content-hide': closed}">
      <div class="alert-header">
        <div class="alert-title">{{title}}</div>
        <div class="alert-close" @click="close">×</div>
      </div>
      <div class="alert-body">{{message}}</div>
      <div class="alert-footer">
        <span class="comfirm-btn btn" @click="comfirmCb">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAlert',
  data () {
    return {
      closed: true
    }
  },
  props: {
    message: {
      type: String,
      default: '这是一段测试文本'
    },
    visible: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function
    },
    title: {
      type: String,
      default: '提示框'
    },
    wrapClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      this.closed = true
      this.$el.addEventListener('transitionend', this.transitionCb)
    },
    comfirmCb() {
      this.close()
      if(typeof this.callback == 'function') {
        this.callback()
      }
    },
    transitionCb() {
      this.$el.removeEventListener('transitionend', this.transitionCb)
      this.$emit('close')
    },
    wrapperClose() {
      if(!this.wrapClose) {
        return;
      }
      this.close()
    }
  },
  watch: {
    visible: function(val) {
      console.log(`closed change ${val}`)
      if(val) {
        this.closed = false;
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.alert-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  z-index: 2000;
  overflow: hidden;
  transition: all .3s ease;
  transform: rotate3d(0);
}
.alert-wrapper-hide {
  background-color: rgba(0, 0, 0, .5);
}
.alert-wrapper::after {
  height: 100%;
  width: 0;
  content: '';
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}
.alert-content {
  z-index: 2001;
  background-color: #fff;
  width: 33vw;
  min-width: 370px;
  border-radius: 3px;
  border: 1px solid lightgray;
  display: inline-block;
  vertical-align: middle;
  padding: 15px 15px 10px;
  transition: all .3s ease;
  transform: translateY(0) translateZ(0);
  -webkit-transform: translateY(0) translateZ(0);
}
.alert-content.alert-content-hide {
  opacity: .4;
  transform: translateY(-40px) translateZ(0);
}
.alert-header {
  padding-bottom: 10px;
  overflow: hidden;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.alert-title {
  font-size: 18px;
  font-weight: 500;
}
.alert-body {
  font-size: 14px;
  text-align: left;
  color: #6e6e6e;
  padding: 10px 0;
}
.alert-close {
  cursor: pointer;
  width: 15px;
  height: 15px;
  font-size: 16px;
}
.alert-close:hover {
  color: #65acf3;
}
.alert-footer {
  padding-top: 5px;
  text-align: right;
}
.btn {
  color: #eee;
  font-size: 12px;
  display: inline-block;
  padding: 8px 15px;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
}
.comfirm-btn {
  background-color: #409eff;
  border-color: #409eff;
}
.comfirm-btn:hover {
  background-color: #65acf3;
}
.cancel-btn {
  color: #424242;
}
.cancel-btn:hover {
  color: #65acf3;
  background-color: #d4e3f3;
}
</style>
