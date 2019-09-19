<template> 
  <div>
    <div :model="value">
      <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" :http-request="Upload">
        <img v-if="value.headerPicUrl" :src="value.headerPicUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

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
        imageUrl: null
      };
    },

    created(){

    },
    methods: {
      Upload(file) {
        let fileName = 'photo' + file.file.uid;
        // 调用 ali-oss 中的方法
        put(fileName, file.file).then(res => {
          if (res.url) {
            this.value.headerPicUrl = res.url;
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(111)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
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
