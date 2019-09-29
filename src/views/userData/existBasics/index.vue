<template> 
  <div class="app-container">
    <!-- 搜索 -->
    <el-card class="filter-container" shadow="never">
      <div class="search_titles">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div>
          <el-button style="float: right" @click="handleSearchList()" type="primary" size="small">
            查询结果
          </el-button>
          <el-button style="float: right;margin-right: 15px" @click="handleResetSearch()" size="small">
            重置
          </el-button>
        </div>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="按名称搜索：">
            <el-input style="width: 203px" v-model="listQuery.adminRoleName" placeholder="名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 数据列表 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="addDom(listCunt)" size="mini">
        添加一行
      </el-button>
      <el-button class="btn-add" @click="seeDom()" size="mini">
        查看
      </el-button>
    </el-card>
    <!-- table -->
    <div class="table-container">
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listData" size="small">
          <div style="padding:10px 0;" v-for="(item,idx) in addList" :key="idx">
            <el-input style="width: 100px" v-model="listData.cur[idx].key" placeholder="key"></el-input>
            <el-input style="width: 203px" v-model="listData.cur[idx].value" placeholder="value"></el-input>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  //权限
  import {
    queryRoleList,
    getRoleInfo,
    delRole
  } from '@/api/rolesMsg'
  const defaultListQuery = {
    adminRoleName: null,
    skip: 1,
    size: 5
  };
  export default {
    name: "productList",
    data() {
      return {
        listData: {
          cur: [
            {key:null,value:null},
            // {key:null,value:null},
            // {key:null,value:null},
            // {key:null,value:null},
          ],
        },
        addList: [],
        listCunt: 0,
        // 权限
        groupList: [],
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],
        dialogVisible: false,
        rolesDetails: {},
      }
    },
    created() {
      this.queryRoleListFun();
    },
    methods: {
      seeDom(){
        console.log(this.listData)
      },
      addDom(listCunt) {
        let list = [];
        // cur
        let listDataList = this.listData;
        listDataList.cur[listCunt] = {key:null,value:null};
        this.listDataList = listDataList

        list[listCunt] = listCunt + "";
        listCunt++;
        this.addList = list;
        this.listCunt = listCunt
        console.log(this.addList)
      },
      // 列表
      queryRoleListFun() {
        this.listLoading = true;
        queryRoleList(this.listQuery).then(res => {
          this.listLoading = false;
          this.list = res.data.adminRoleList;
          this.total = res.data.total;
        });
      },
      // 查看
      handleShowProduct(index, row) {
        console.log("handleShowProduct", row);
        this.dialogVisible = true;
        getRoleInfo({
          adminRoleId: row.admin_role_id
        }).then(res => {
          this.rolesDetails = res.data
        })
      },
      // 关闭
      handleClose(done) {
        done();
      },
      // 搜索
      handleSearchList() {
        this.listQuery.skip = 1;
        this.listQuery.adminRoleName = this.listQuery.adminRoleName ? encodeURI(this.listQuery.adminRoleName) : null
        this.queryRoleListFun(this.listQuery);
      },
      // 重置搜所
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      // 添加
      handleAddProduct(idx, row) {
        let id = row ? row.admin_role_id : "";
        this.$router.push({
          path: '/accountManage/addRoles',
          query: {
            id: id
          }
        });
      },
      //编辑
      handleUpdateProduct(idx, obj) {
        this.$router.push({
          path: '/accountManage/updateAccount',
          query: {
            id: obj.admin_user_id
          }
        });
      },
      //删除
      handleDelete(row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row)
          delRole({
            "adminRoleId": row.admin_role_id
          }).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.listQuery.skip = 1;
            this.queryRoleListFun();
          });
        });
      },
      // 分页数字
      handleSizeChange(val) {
        this.listQuery.skip = 1;
        this.listQuery.size = val;
        this.queryRoleListFun();
      },
      // 分页角标
      handleCurrentChange(val) {
        this.listQuery.skip = val;
        this.queryRoleListFun();
      },
      // 分页-------
      getProductSkuSp(row, index) {
        if (index === 0) {
          return row.sp1;
        } else if (index === 1) {
          return row.sp2;
        } else {
          return row.sp3;
        }
      },

      // 表单
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }

    }
  }
</script>
<style>
</style>
