<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写基础信息"></el-step>
      <el-step title="配置人员权限"></el-step>
    </el-steps>

    <product-info-detail v-if="showStatus[0]" v-model="productParam" :is-edit="isEdit" @nextStep="nextStep">
    </product-info-detail>

    <product-relation-detail v-else="showStatus[1]" v-model="productParam" :is-edit="isEdit" @nextStep="nextStep"
      @prevStep="prevStep" @finishCommit="finishCommit">
    </product-relation-detail>

  </el-card>
</template>
<script>
  // 规则组详情
  import {
    getRuleDetails
  } from '@/api/ruleMsg'

  import ProductInfoDetail from './ProductInfoDetail'
  import ProductRelationDetail from './ProductRelationDetail'

  const defaultProductParam = {
    name: null,
    info: null,
    adminUserList: null,
    adminRoleList: null,
    id: "",
    adminRoleList: null,
    notAdminRoleList: null,
    adminUserList: null,
    notAdminUserList: null
  };
  export default {
    name: 'ProductDetail',
    components: {
      ProductInfoDetail,
      ProductRelationDetail
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        productParam: Object.assign({}, defaultProductParam),
        showStatus: [true, false, false],
        isLast: true,
      }
    },
    created() {
      if (this.$route.query.id != "") {
        getRuleDetails({
          adminGroupId: this.$route.query.id
        }).then(res => {
          this.productParam.id = this.$route.query.id
          this.productParam.name = res.data.admin_group_name
          this.productParam.info = res.data.info
          this.productParam.adminRoleList = res.data.adminRoleList
          this.productParam.notAdminRoleList = res.data.notAdminRoleList
          this.productParam.adminUserList = res.data.adminUserList
          this.productParam.notAdminUserList = res.data.notAdminUserList
        })
      }
    },
    methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
          console.log(this.active)
        }
      },
      finishCommit(isEdit) {
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (isEdit) {
            updateProduct(this.$route.query.id, this.productParam).then(response => {
              this.$message({
                type: 'success',
                message: '提交成功',
                duration: 1000
              });
              this.$router.back();
            });
          } else {
            createProduct(this.productParam).then(response => {
              this.$message({
                type: 'success',
                message: '提交成功',
                duration: 1000
              });
              location.reload();
            });
          }
        })
      }
    }
  }
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>
