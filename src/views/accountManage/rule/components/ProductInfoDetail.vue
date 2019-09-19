<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">

      <el-form-item label="规则组名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>

      <el-form-item label="规则组说明：">
        <el-input :autoSize="true" v-model="value.info" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    getRuleDetails
  } from '@/api/ruleMsg';

  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rules: {
          name: [{
              required: true,
              message: '请输入商品名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 140,
              message: '长度在 2 到 140 个字符',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    created() {
      // this.getProductCateList();
      // this.getBrandList();
      if (this.value.id != "") {
        // getRuleDetails({
        //   adminGroupId: this.value.id
        // }).then(res => {
        //   this.value.name = res.data.admin_group_name
        //   this.value.info = res.data.info
        //   this.value.adminRoleList = res.data.adminRoleList
        //   this.value.notAdminRoleList = res.data.notAdminRoleList
        //   this.value.adminUserList = res.data.adminUserList
        //   this.value.notAdminUserList = res.data.notAdminUserList
        // })
        
      }
    },

    methods: {
      handleNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
</style>
