<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productRelationForm" label-width="120px" style="width: 680px" size="small">

      <el-form-item label="关联权限：" prop="list">
        <el-transfer filterable :titles="subjectTitles" filter-placeholder="请输入规则组" v-model="groupList2" :data="groupList">
        </el-transfer>
      </el-form-item>

      <!-- <el-form-item label="关联人员：" prop="list">
        <el-transfer filterable :titles="subjectTitles" filter-placeholder="请输入用户名"
          v-model="userList2" :data="userList">
        </el-transfer>
      </el-form-item> -->


      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <!-- <el-button v-if="!isLast" type="primary" size="medium" @click="handleNext('productRelationForm')">下一步，选择人员</el-button> -->
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 权限列表
  import {
    queryRoleList
  } from '@/api/rolesMsg'
  // 用户列表
  import {
    getUserList
  } from '@/api/getUserBasicsList'
  // 新增规则组
  import {
    addAdminGroup,
    updateAdminGroup
  } from '@/api/ruleMsg'

  export default {
    name: "ProductRelationDetail",
    props: {
      value: Object,
      isLast: false,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //专题左右标题
        subjectTitles: ['待选择', '已选择'],
        groupList: [],
        groupList2: [],
        userList: [],
        userList2: [],
      };
    },
    created() {

      if (this.value.id != "") {

        let groupListAll = this.value.notAdminRoleList;
        let groupListRight = this.value.adminRoleList;
        // let groupListRight = this.value.notAdminRoleList;
        // let groupListRight = this.value.notAdminRoleList;

        // 左边
        let groupList = [];
        groupListAll.map(item => {
          let obj = {
            key: item.admin_role_id,
            label: item.role_name
          }
          console.log(item.admin_role_id)
          groupList.push(obj)
        })

        // 右边
        let groupList2 = [];
        groupListRight.map(item => {
          let obj = {
            key: item.admin_role_id,
            label: item.role_name
          }
          groupList.push(obj)
          groupList2.push(item.admin_role_id)
        })
        this.groupList = groupList;
        this.groupList2 = groupList2;
      } else {
        // this.getUserListFun();
        this.getGroupListFun()
      }

    },
    methods: {
      // 获取用户列表
      async getUserListFun() {
        try {
          let res = await getUserList({
            "skip": 0,
            "size": 100,
            nullAdminGroupId: "ok"
          });
          let list = res.data.adminUserList;
          let userList = [];
          list.map(item => {
            let obj = {
              key: item.admin_user_id,
              label: item.nick_name
            }
            userList.push(obj)
          })
          this.userList = userList

        } catch (e) {
          console.log(e)
        }
      },
      // 权限
      async getGroupListFun() {
        try {
          let res = await queryRoleList({
            "skip": 0,
            "size": 100
          });
          let list = res.data.adminRoleList;
          let groupList = [];
          list.map(item => {
            let obj = {
              key: item.admin_role_id,
              label: item.admin_role_name
            }
            groupList.push(obj)
          })
          this.groupList = groupList;
        } catch (e) {
          console.log(e)
        }
      },
      // 新增
      async addAdminGroupFun(data) {
        const that = this;
        try {
          let res = await addAdminGroup(data);
          if (res.data.success !="") {
            that.$message({
              message: '添加成功',
              type: 'success',
              duration: 1000
            });
            that.$router.back();
          }
        } catch (e) {
          console.log(e)
        }
      },
      // 修改
      async updateAdminGroupFun(datas) {
        const that = this;
        try {
          let res = await updateAdminGroup(datas);
          if (res.data.success != "") {
            that.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            that.$router.back();
          }
        } catch (e) {
          console.log(e)
        }
      },
      // 下一步
      handlePrev() {
        this.$emit('prevStep')
      },
      // 完成
      handleFinishCommit() {
        if (this.groupList2.length > 0) {
          this.value.adminRoleList = this.groupList2.toString()
          let obj = {
            adminRoleList: this.groupList2.toString(),
            name: encodeURI(this.value.name),
            info: encodeURI(this.value.info)
          }
          if (this.value.id != "") {
            console.log('XIUGAI')
            obj.adminGroupId = this.value.id
            this.updateAdminGroupFun(obj)
          } else {
            console.log('XINZENG')
            this.addAdminGroupFun(obj)
          }

        } else {
          this.$message({
            message: '请把关联信息填写完整',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
