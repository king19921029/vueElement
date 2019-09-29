<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
      <el-form-item label="权限名称：" prop="adminRoleName">
        <el-input v-model="brand.adminRoleName"></el-input>
      </el-form-item>
      <el-form-item label="权限说明：" prop="info">
        <el-input v-model="brand.info"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="num">
        <el-input v-model="brand.num"></el-input>
      </el-form-item>

      <el-form-item label="级别" prop="level">
        <el-cascader clearable v-model="brand.level" :options="userLevel">
        </el-cascader>
      </el-form-item>

      <el-form-item v-if="parentNode" label="父节点" prop="pid">
        <el-cascader clearable v-model="brand.pid" :options="parentData">
        </el-cascader>
      </el-form-item>

      <el-form-item label="path：" prop="path">
        <el-input v-model="brand.path"></el-input>
      </el-form-item>
      <el-form-item label="redirect：" prop="redirect">
        <el-input v-model="brand.redirect"></el-input>
      </el-form-item>
      <el-form-item label="component：" prop="component">
        <el-input v-model="brand.component"></el-input>
      </el-form-item>
      <el-form-item label="name：" prop="adminRoleObjectName">
        <el-input v-model="brand.adminRoleObjectName"></el-input>
      </el-form-item>
      <el-form-item label="title：" prop="title">
        <el-input v-model="brand.title"></el-input>
      </el-form-item>
      <el-form-item label="icon：" prop="icon">
        <el-input v-model="brand.icon"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  //权限
  import {
    queryRoleList,
    getRoleInfo,
    addRole,
    updateRole,
  } from '@/api/rolesMsg'

  const defaultBrand = {
    adminRoleName: null,
    info: null,
    level: [],
    num: null,
    pid: [],
    path: null,
    redirect: null,
    adminRoleObjectName: null,
    component: null,
    title: null,
    icon: null,
  };
  export default {
    name: 'BrandDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rules: {
          adminRoleName: [{
            required: true,
            message: '权限名称',
            trigger: 'blur'
          }],
          info: [{
            required: true,
            message: '请输入权限说明',
            trigger: 'blur'
          }],
          num: [{
            required: true,
            message: '请输入等级',
            trigger: 'blur'
          }],
          level: [{
            required: true,
            message: '请选择级别',
            trigger: 'change'
          }],
          pid: [{
            required: true,
            message: '请选择父节点',
            trigger: 'change'
          }],

          path: [{
            required: true,
            message: '请输入path',
            trigger: 'blur'
          }],
          redirect: [{
            required: true,
            message: '请输入redirect',
            trigger: 'blur'
          }],
          adminRoleObjectName: [{
            required: true,
            message: '请输入name',
            trigger: 'blur'
          }],
          component: [{
            required: true,
            message: '请输入component',
            trigger: 'blur'
          }],
          title: [{
            required: true,
            message: '请输入title',
            trigger: 'blur'
          }],
          num: [{
            required: true,
            message: '请输入等级',
            trigger: 'blur'
          }],
          icon: [{
            required: true,
            message: '请输入icon',
            trigger: 'blur'
          }],

        },
        brand: Object.assign({}, defaultBrand),
        parentNode: false,
        parentData: [],
        userLevel: [{
            value: 0,
            label: "根目录"
          },
          {
            value: 1,
            label: "子目录"
          }
        ],

      }
    },
    watch: {
      'brand.level'(val) {
        if (val == 1) {
          this.parentNode = true
          queryRoleList({
            skip: 0,
            size: 100,
            level: 0
          }).then(res => {

            let list = res.data.adminRoleList;
            let parentData = [];
            list.map(item => {
              let obj = {
                value: item.admin_role_id,
                label: item.admin_role_name,
              }
              parentData.push(obj)
            })

            this.parentData = parentData
          })
        } else {
          this.parentNode = false
          this.brand.pid = []
        }
      }
    },
    created() {
      console.log(this.isEdit)
      if (this.$route.query.id != "") {
        console.log('修改')
        getRoleInfo({
         adminRoleId:this.$route.query.id
        }).then(res => {
          console.log(res.data)
          let obj = res.data;
          this.brand = obj;
          let pidOp = [];
          let levelOp = [];
          if( obj.pid ){
            pidOp.push(obj.pid)
            obj.pid = pidOp
          }
          levelOp.push(obj.level)

          let allDatas = {
            adminRoleName: obj.admin_role_name,
            info: obj.admin_role_info,
            level: levelOp,
            num: obj.num,
            pid: pidOp,
            path: obj.path,
            redirect: obj.redirect,
            adminRoleObjectName: obj.admin_role_object_name,
            component: obj.component,
            title: obj.title,
            icon: obj.icon,
          }
           this.brand = allDatas;
          // let list = res.data.adminRoleList;
          // let parentData = [];
          // list.map(item => {
          //   let obj = {
          //     value: item.admin_role_id,
          //     label: item.admin_role_name,
          //   }
          //   parentData.push(obj)
          // })

          // this.parentData = parentData
          console.log(allDatas)
        })
      } else {
        console.log('添加')
      }
      // if (this.isEdit) {
      //   getBrand(this.$route.query.id).then(response => {
      //     this.brand = response.data;
      //   });
      // } else {
      //   this.brand = Object.assign({}, defaultBrand);
      // }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              let ajaxData =  Object.assign({}, this.brand);
              ajaxData.adminRoleName = encodeURI(this.brand.adminRoleName);
              ajaxData.info = encodeURI(this.brand.info)
              ajaxData.pid = ajaxData.pid ? ajaxData.pid[0] : []
              ajaxData.level = ajaxData.level ? ajaxData.level[0] : ""

              if (this.$route.query.id != "") {
                console.log('修改')
                ajaxData.adminRoleId = this.$route.query.id
                updateRole(ajaxData).then(res=>{

                   if(res.data.success !=""){
                    this.$refs[formName].resetFields();
                    this.brand = Object.assign({}, defaultBrand);
                    this.$message({
                      message: '修改成功',
                      type: 'success',
                      duration: 1000
                    });
                    this.$router.back();
                   }
                })
              } else {
                console.log('添加')
                addRole(ajaxData).then(res=>{
                   console.log(res)
                   if(res.data.success !=""){
                    this.$refs[formName].resetFields();
                    this.brand = Object.assign({}, defaultBrand);
                    this.$message({
                      message: '添加成功',
                      type: 'success',
                      duration: 1000
                    });
                    this.$router.back();
                   }
                })
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({}, defaultBrand);

      }
    }
  }
</script>
<style>
</style>
