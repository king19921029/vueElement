<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

      <el-form-item label="真实姓名：">
        <el-input v-model="brand.userRealName"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <template>
          <el-radio v-model="brand.sex" label="0">男</el-radio>
          <el-radio v-model="brand.sex" label="1">女</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="昵称：">
        <el-input v-model="brand.nickname"></el-input>
      </el-form-item>

      <el-form-item label="手机号：">
        <el-input v-model="brand.phone"></el-input>
      </el-form-item>

      <el-form-item label="微信号：">
        <el-input v-model="brand.weixin"></el-input>
      </el-form-item>

      <el-form-item label="生日：">
        <el-date-picker value-format="yyyy-MM-dd" v-model="brand.birthday" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="头像">
        <single-upload v-model="brand"></single-upload>
      </el-form-item>

      <el-form-item label="备忘录">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 20}"
          placeholder="请输入备忘录"
          v-model="brand.memo">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  //获取用户信息
  import {
    getUserInfoById,
    addUser,
    updateUser
  } from '@/api/userBasics'

  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultBrand = {
    userRealName: null,
    sex: null,
    nickname: null,
    birthday: null,
    phone: null,
    headerPicUrl: null,
    weixin: null,
    userId:null,
    memo:null
  };

  export default {
    name: 'BrandDetail',
    components: {
      SingleUpload
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        brand: Object.assign({}, defaultBrand),
        birthday:"",
        rules: {
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }]
        },
        groupList: [],
        selectProductCateValue: null,
      }
    },
    created() {

      this.brand.userId = this.$route.query.id ? this.$route.query.id : null
      console.log(this.brand.userId)
      if (this.$route.query.id) {
        getUserInfoById({userId:this.$route.query.id}).then(res=>{
          console.log(res.data)
          let sex = res.data.sex == "男" ? "0" : "1";
          console.log(sex)
          let obj = {
            userRealName: res.data.real_name|| null,
            sex: sex,
            nickname: res.data.nickname,
            birthday: res.data.birthday|| null,
            phone: res.data.phone,
            headerPicUrl: res.data.header_pic_url || null,
            weixin: res.data.weixin,
            userId: this.$route.query.id,
            memo:res.data.memo
          }
          this.brand = obj
        })
      } else {
        // 新增
        this.brand = Object.assign({}, defaultBrand);
      }

    },

    methods: {

      // 提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // picList: [],
              // 修改
              if (this.isEdit) {
                let updateObj = Object.assign({}, this.brand);
                if (updateObj.userRealName != null) {
                  updateObj.userRealName = encodeURI(updateObj.userRealName)
                }
                if (updateObj.nickname != null) {
                  updateObj.nickname = encodeURI(updateObj.nickname)
                }
                if (updateObj.memo != null) {
                  updateObj.memo = encodeURI(updateObj.memo)
                }
                console.log(this.brand);

                updateUser(updateObj).then(response => {
                  console.log(response)
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {

                // 新增
                let addObj = Object.assign({}, this.brand);
                if (addObj.userRealName != null) {
                  addObj.userRealName = encodeURI(addObj.userRealName)
                }
                if (addObj.nickname != null) {
                  addObj.nickname = encodeURI(addObj.nickname)
                }
                if (addObj.memo != null) {
                  addObj.memo = encodeURI(addObj.memo)
                }
                console.log(this.brand);
                addUser(addObj).then(response => {
                  this.$refs[formName].resetFields();
                  this.brand = Object.assign({}, defaultBrand);
                  this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({}, defaultBrand);
      },

    }
  }
</script>
<style>
</style>
