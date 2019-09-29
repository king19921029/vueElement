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

          <el-form-item label="真实姓名：">
            <el-input style="width: 203px" v-model="listQuery.userRealName" placeholder="真实姓名"></el-input>
          </el-form-item>

          <el-form-item label="性别：">
            <el-input style="width: 203px" v-model="listQuery.sex" placeholder="性别"></el-input>
          </el-form-item>

          <el-form-item label="昵称：">
            <el-input style="width: 203px" v-model="listQuery.nickname" placeholder="昵称"></el-input>
          </el-form-item>

          <el-form-item label="手机号：">
            <el-input style="width: 203px" v-model="listQuery.phone" placeholder="手机号"></el-input>
          </el-form-item>

          <el-form-item label="微信号：">
            <el-input style="width: 203px" v-model="listQuery.weixin" placeholder="微信号"></el-input>
          </el-form-item>

          <el-form-item label="客户编号：">
            <el-input style="width: 203px" v-model="listQuery.user_no" placeholder="客户编号"></el-input>
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
        <el-table-column label="用户编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.user_no}}</template>
        </el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="真实姓名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.real_name}}</template>
        </el-table-column>

        <el-table-column label="性别" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sex}}</template>
        </el-table-column>
        <!-- <el-table-column label="手机号" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column> -->
        <el-table-column label="房屋状况" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleGoHouse(scope.$index, scope.row)">
              管理房屋信息
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="生活房屋" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleGoLife(scope.$index, scope.row)">
              管理生活信息
            </el-button>
          </template>
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
  // 个人信息
  import {
    queryUserList,
    delUser
  } from '@/api/userBasics'

  const defaultListQuery = {
    pageNum: 1,
    size: 5,
    nickname: null,
    userRealName: null,
    phone: null,
    sex: null,
    weixin: null,
    userNo: null
  };
  export default {
    name: "houseReg",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
      }
    },
    created() {
      this.getUserList(this.listQuery)
    },
    methods: {

      // 获取个人列表
      getUserList(params) {
        this.listLoading = true;
        let postData = {};
        if (params) {
          postData = params;
        } else {
          postData = this.listQuery;
        }
        queryUserList(params).then(res => {
          this.listLoading = false;
          this.total = res.data.total;
          this.list = res.data.userList;
          console.log(res)
        });
      },
      // 搜索
      handleSearchList() {
        this.listQuery.pageNum = 1;
        let obj = Object.assign({}, this.listQuery);
        obj.userRealName = obj.userRealName ? encodeURI(obj.userRealName) : null
        obj.nickname = obj.nickname ? encodeURI(obj.nickname) : null
        if (obj.sex != null) {
          obj.sex = obj.sex == "男" ? 0 : 1
        }
        this.getUserList(obj);
      },
      // 查看
      handleShowProduct(index, row) {
        console.log("查看")
        this.$router.push({
          path: '/userData/seeUser',
          query: {
            id: row.user_id
          }
        });
      },
      //编辑
      handleUpdateProduct(idx, obj) {
        this.$router.push({
          path: '/userData/updateUser',
          query: {
            id: obj.user_id
          }
        });
      },
      // 添加
      handleAddProduct() {
        this.$router.push({
          path: '/userData/addUser'
        });
      },
      handleGoHouse(idx, obj) {
        this.$router.push({
          path: '/userData/relationHouseIndex',
          query: {
            id: obj.user_id
          }
        });
      },
      handleGoLife(idx, obj) {
        this.$router.push({
          path: '/userData/relationLifeIndex',
          query: {
            id: obj.user_id
          }
        });
      },
      // 每页多少条
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.size = val;
        this.getUserList();
      },
      // 数字-角标点击
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getUserList();
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
          delUser({
            "userId": row.user_id
          }).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getUserList();
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
