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
          <el-form-item label="开始时间：">
            <el-date-picker class="input-width" v-model="listQuery.beginTime" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker class="input-width" v-model="listQuery.endTime" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="记录人：">
            <el-select style="width: 203px" v-model="listQuery.recordAdminUserId" placeholder="请选择记录人员">
              <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
        <el-table-column label="记录日期" align="center">
          <template slot-scope="scope">{{scope.row.record_time}}</template>
        </el-table-column>
        <el-table-column label="记录人" width="300" align="center">
          <template slot-scope="scope">{{scope.row.nick_name}}</template>
        </el-table-column>

        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button size="mini" @click="handleUpdateProduct(scope.$index,scope.row)">编辑
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

  </div>
</template>
<script>
  // 用户列表
  import {
    getUserList
  } from '@/api/getUserBasicsList'

  import {
    queryUserHouseHistoryList,
    delUserHouseHistory
  } from '@/api/relationHouse'

  const defaultListQuery = {
    userId: null,
    beginTime: null,
    endTime: null,
    recordAdminUserId: null,
    houseId: null,
    pageNum: 1,
    size: 5
  };
  export default {
    name: "houseRecordIndex",
    data() {
      return {
        userList: [],
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        regList: [],
        userId: null,
        houseId:null,
      }
    },
    created() {
      let arr = [0,1,2];
      console.log(typeof(arr))
      this.userId = this.$route.query.userId
      this.listQuery.userId = this.$route.query.userId
      this.houseId = this.$route.query.houseId
      this.listQuery.houseId = this.$route.query.houseId
      getUserList({
        pageNum: 1,
        size: 100
      }).then(res => {
        let list = res.data.adminUserList;
        let userList = [];
        list.map(item => {
          let obj = {
            value: item.admin_user_id,
            label: item.nick_name
          }
          userList.push(obj)
        })
        this.userList = userList
      })
      this.getUserHouseHistoryList()
    },
    methods: {
      getUserHouseHistoryList(params) {
        this.listLoading = true;
        let postData = {};
        if (params) {
          postData = params;
        } else {
          postData = this.listQuery;

        }
        queryUserHouseHistoryList(postData).then(res => {
          this.listLoading = false;
          this.total = res.data.total;
          this.list = res.data.userHouseHistoryList;
        });
      },
      // 搜索
      handleSearchList() {
        this.listQuery.pageNum = 1;
        let obj = Object.assign({}, this.listQuery);
        obj.address = obj.address ? encodeURI(obj.address) : null
        this.getUserHouseHistoryList();
      },
      // 查看
      handleShowProduct(index, row) {
        this.$router.push({
          path: '/userData/seehouseRelation',
          query: {
            id:row.user_house_history_id,
          }
        });
      },
      //编辑
      handleUpdateProduct(idx, row) {
        console.log(row)
        this.$router.push({
          path: '/userData/updatehouseRecord',
          query: {
            userId: this.$route.query.userId,
            houseId:this.$route.query.houseId,
            user_house_history_id:row.user_house_history_id,
          }
        });
      },
      // 添加
      handleAddProduct(row) {
        this.$router.push({
          path: '/userData/addhouseRecord',
          query: {
            userId: this.$route.query.userId,
            houseId:this.$route.query.houseId
          }
        });
      },
      // 每页多少条
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.size = val;
        this.getUserHouseHistoryList();
      },
      // 数字-角标点击
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getUserHouseHistoryList();
      },
      // form
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 重置
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      // 删除
      handleDelete(row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row)
          delUserHouseHistory({
            "userHouseHistoryId": row.user_house_history_id
          }).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getUserHouseHistoryList();
          });

        });
      },
    }
  }
</script>
<style>
  .dialog_div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dialog_div img {
    margin-bottom: 30px;
  }

  .dialog_div div {
    width: 300px;
    padding: 10px;
  }
</style>
