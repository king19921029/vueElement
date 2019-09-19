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
            <el-input style="width: 203px" v-model="listQuery.name" placeholder="规则组名称"></el-input>
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
      <el-table ref="productTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange" border>
        <!-- v-loading="listLoading" -->
        <el-table-column label="规则组名称" width="120" align="center">
          <template slot-scope="scope">{{scope.row.admin_group_name}}</template>
        </el-table-column>
        <el-table-column label="规则组说明" align="center">
          <template slot-scope="scope">{{scope.row.admin_group_info}}</template>
        </el-table-column>

        <el-table-column label="包含人员数量" width="160" align="center">
          <template slot-scope="scope">{{scope.row.admin_group_user_count}}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button size="mini" @click="handleAddProduct(scope.row.admin_group_id)">编辑
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
        :page-size="listQuery.size" :page-sizes="[5,10,15]" :current-page.sync="listQuery.skip" :total="total">
      </el-pagination>
    </div>
    <div style="height: 80px;width: 100%;"></div>
    <!-- 弹框 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <div v-if="ruleDetails!= null" class="dialog_div">
        <div>规则组名称：{{ruleDetails.admin_group_name}}</div>
        <div>规则组说明：{{ruleDetails.info}}</div>
        <div>创建时间：{{ruleDetails.create_time}}</div>
        <div>包含人员数量：{{ruleDetails.admin_group_user_count}}</div>
        <div class="user_list table_list" v-for="(item,idx) in ruleDetails.adminUserList" :key="idx">
          <p style="margin-right:10px; padding:0 10px;">{{item.nick_name}}</p>
        </div>
        <div>可以执行的权限：</div>
        <div class="user_list table_list">
          <p style="margin-right:10px; padding:0 10px;" v-for="(item,idx) in ruleDetails.adminRoleList" :key="idx">{{item.role_name}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // 规则组
  import {
    getRuleDetails,
    getRuleList,
    delAdminGroup
  } from '@/api/ruleMsg'


  const defaultListQuery = {
    name: null,
    skip: 1,
    size: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null
  };
  export default {
    name: "productList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        dialogVisible: false,
        ruleDetails: null,
      }
    },
    created() {
      this.getUserListFun();
    },
    methods: {
      // 权限列表
      async getUserListFun(params) {
        try {
          let data = {};
          if (params) {
            data = await getRuleList(params)
          } else {
            data = await getRuleList(this.listQuery)
          }
          this.listLoading = false;
          this.list = data.data.adminGroupList;
          this.total = data.data.total;
        } catch (e) {
          console.log(e)
        }
      },
      async getRuleInfoFun(params) {
        try {
          let data = await getRuleDetails(params)
          this.ruleDetails = data.data;
          console.log(this.ruleDetails)
        } catch (e) {
          console.log(e)
        }
      },

      // 查看
      handleShowProduct(index, row) {
        // console.log("handleShowProduct", row);
        this.dialogVisible = true;
        this.getRuleInfoFun({
          adminGroupId: row.admin_group_id
        })
      },
      // 关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 搜索
      handleSearchList() {
        this.listQuery.skip = 1;
        let obj = Object.assign({}, this.listQuery);
        obj.groupName = obj.groupName ? encodeURI(obj.groupName) : null
        this.getUserListFun(obj)
      },
      // 添加
      handleAddProduct(row) {

        this.$router.push({
          path: '/accountManage/addRule',
          query: {
            id: row || ""
          }
        });
      },
      // 删除
      handleDelete(row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAdminGroup({
            adminGroupId: row.admin_group_id
          }).then(res => {
            this.getUserListFun()
          })
        });
      },
      getProductSkuSp(row, index) {
        if (index === 0) {
          return row.sp1;
        } else if (index === 1) {
          return row.sp2;
        } else {
          return row.sp3;
        }
      },
      // 分页数字
      handleSizeChange(val) {
        this.listQuery.skip = 1;
        this.listQuery.size = val;
        this.getUserListFun();
      },
      // 分页角标
      handleCurrentChange(val) {
        this.listQuery.skip = val;
        this.getUserListFun();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handlePublishStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updatePublishStatus(row.publishStatus, ids);
      },
      handleNewStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updateNewStatus(row.newStatus, ids);
      },
      handleRecommendStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updateRecommendStatus(row.recommandStatus, ids);
      },
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },

      handleUpdateProduct(index, row) {
        this.$router.push({
          path: '/pms/updateProduct',
          query: {
            id: row.id
          }
        });
      },

      handleShowVerifyDetail(index, row) {
        console.log("handleShowVerifyDetail", row);
      },
      handleShowLog(index, row) {
        console.log("handleShowLog", row);
      }
    }
  }
</script>
<style>
  .dialog_div>div {
    line-height: 32px;
  }

  .user_list {
    display: flex;
    flex-wrap: wrap;
  }

  .table_list p {
    padding: 5 10upx !important;
    background: #f5f5f5;

  }

  .table_list {
    /* border:1px solid #AAAAAA; */
  }
</style>
