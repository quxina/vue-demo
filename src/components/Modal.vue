<template>
  <div>
      <el-dialog :title="listTitle" :visible="isShow" width="970px" :before-close="handleClose">
        <el-tabs tab-position="left">
            <el-tab-pane v-for="item in tabPane" :label="item" :key="item">
                <div style="height: 320px">{{item}}</div>
            </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="footer">
            <el-upload action="#">
                <button class="upload-btn">上传</button>
            </el-upload>
            <el-pagination :page-size="20" :total="200"></el-pagination>
            <div class="dialog-footer-btn">
                <el-button size="small">取消</el-button>
                <el-button type="primary" size="small">确认</el-button>
            </div>
        </div>
      </el-dialog>
      <el-button @click="handleClose">show</el-button>
  </div>
</template>

<script>
export default {
    name: 'Modal',
    data () {
        return {
            pagesize: 5,
            isShow: false,
            currentPage: '1',
            lv1Type: 1,
            lv2Type: 2,
            listTitle: '正版图片',
            tabPane: ['图片库', '我的购买', '我的上传', '最近使用']
        }
    },
    methods: {
        showCurrentContent (currentPage) {
            this.currentPage = currentPage
        },
        handleClose () {
            this.isShow = !this.isShow
        }
    }
}
</script>

<style scope>
    .footer {
        display: flex;
        justify-content: space-between
    }
    .upload-btn {
        width: 90px;
        border: none;
        height: 30px;
        background-color: #f2f2f2
    }
</style>
