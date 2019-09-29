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
      <el-button class="btn-add" @click="handleAddProduct()" size="mini">
        添加
      </el-button>
    </el-card>
    <!-- table -->
    <div class="table-container">
      <el-table ref="productTable" v-loading="listLoading" :data="list" style="width: 100%" @selection-change="handleSelectionChange"
        border>
        <el-table-column label="名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.admin_role_name}}</template>
        </el-table-column>
        <el-table-column label="说明" align="center">
          <template slot-scope="scope">{{scope.row.admin_role_info}}</template>
        </el-table-column>
        <el-table-column label="排序" width="200" align="center">
          <template slot-scope="scope">{{scope.row.num}}</template>
        </el-table-column>
        <el-table-column label="所属级别" width="200" align="center">
          <template slot-scope="scope">{{scope.row.level == 0? '根目录' : '子目录'}}</template>
        </el-table-column>

        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button size="mini" @click="handleAddProduct(scope.$index,scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total,sizes,prev, pager, next,jumper"
        :page-size="listQuery.size" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
      </el-pagination>
    </div>
    <div style="height: 80px;width: 100%;"></div>
    <!-- 弹框 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <div v-if="rolesDetails!= null" class="dialog_div">
        <div>名称：{{rolesDetails.admin_role_name}}</div>
        <div>说明：{{rolesDetails.admin_role_info}}</div>
        <div>排序：{{rolesDetails.num}}</div>
        <div>所属级别：{{rolesDetails.level == 0 ? '根目录' : '子目录'}}</div>
        <div>component：{{rolesDetails.component}}</div>
        <div>icon：{{rolesDetails.icon}}</div>
        <div>name：{{rolesDetails.name}}</div>
        <div>path：{{rolesDetails.path}}</div>
        <div>pid：{{rolesDetails.pid}}</div>
        <div>redirect：{{rolesDetails.redirect}}</div>
        <div>title：{{rolesDetails.title}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

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
    pageNum: 1,
    size: 5
  };
  export default {
    name: "productList",
    data() {
      return {
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
    computed: {
      // 计算属性的 getter
      // gradeStr(id) {
      //   return id == "0" ? "根目录" : "子目录"
      //   // return 11111;
      // }
    },
    methods: {
      gradeStr(id) {
        return id == "0" ? "根目录" : "子目录"
        // return 11111;
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
        this.listQuery.pageNum = 1;

        let obj = Object.assign({}, this.listQuery);
        obj.adminRoleName = obj.adminRoleName ? encodeURI(obj.adminRoleName) : null

        queryRoleList(obj).then(res => {
          this.listLoading = false;
          this.list = res.data.adminRoleList;
          this.total = res.data.total;
        })
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
            this.listQuery.pageNum = 1;
            this.queryRoleListFun();
          });
        });
      },
      // 分页数字
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.size = val;
        this.queryRoleListFun();
      },
      // 分页角标
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
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
<style></style>
