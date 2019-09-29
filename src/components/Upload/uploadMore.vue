<template> 
  <div :model="value">
    <!-- :file-list="value.picList" -->
    <el-upload action="" :http-request="Upload" list-type="picture-card" :file-list="value.picList" :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {
    put
  } from '@/utils/updateImg'

  export default {
    name: 'singleUpload',
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      Upload(file) {
        let fileName = 'houseReg' + file.file.uid;
        // 调用 ali-oss 中的方法
        put(fileName, file.file).then(res => {
          console.log(res);
          if (res.url) {
            let obj = {
              name:res.name,
              url:res.url
            }
            this.value.picList.push(obj);
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(fileList);
        this.value.picList = fileList
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(file)
        this.dialogVisible = true;
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
