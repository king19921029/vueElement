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
          <el-form-item label="按小区名称：">
            <el-input style="width: 203px" v-model="listQuery.houseDistrictName" placeholder="小区名称"></el-input>
          </el-form-item>

          <el-form-item label="按小区地址：">
            <el-input style="width: 203px" v-model="listQuery.address" placeholder="小区地址"></el-input>
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
        <el-table-column label="小区名称" width="150" align="center">
          <template slot-scope="scope">{{scope.row.house_district_name}}</template>
        </el-table-column>
        <el-table-column label="小区地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="是否有门禁" width="150" align="center">
          <template slot-scope="scope">{{scope.row.is_door_guard}}</template>
        </el-table-column>
        <el-table-column label="建造时间" width="150" align="center">
          <template slot-scope="scope">{{scope.row.build_time}}</template>
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
    houseListReg,
    delHouseReg
  } from '@/api/regionMsg'

  const defaultListQuery = {
    houseDistrictName: null,
    address: null,
    pageNum: 1,
    size: 5
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
        userInfo: {},
      }
    },
    created() {
      this.getHoseListReg()
      console.log("created");
    },
    mounted(){
      console.log(1111);
    },
    methods: {
      // 获取小区列表
      getHoseListReg(params) {
        this.listLoading = true;
        if (params) {
          houseListReg(params).then(res => {
            this.listLoading = false;
            this.list = res.data.houseDistrictList;
            this.total = res.data.total;
          });
        } else {
          houseListReg(this.listQuery).then(res => {
            this.listLoading = false;
            this.list = res.data.houseDistrictList;
            this.total = res.data.total;
          });
        }
      },
      // 搜索
      handleSearchList() {
        this.listQuery.pageNum = 1;
        let obj = {};
        obj.pageNum = 1;
        obj.size = this.listQuery.size;
        if (this.listQuery.houseDistrictName != null) {
          obj.houseDistrictName = encodeURI(this.listQuery.houseDistrictName)
        }
        if (this.listQuery.address != null) {
          obj.address = encodeURI(this.listQuery.address)
        }
        houseListReg(obj).then(res => {
          this.listLoading = false;
          this.list = res.data.houseDistrictList;
          this.total = res.data.total;
        })
      },
      // 查看
      handleShowProduct(index, row) {
        console.log("查看")
        this.$router.push({
          path: '/userData/seeRegions',
          query: {
            id: row.house_district_id
          }
        });
      },
      // 关闭
      handleClose(done) {
        done();
      },
      //编辑
      handleUpdateProduct(idx, obj) {
        this.$router.push({
          path: '/userData/updateRegions',
          query: {
            id: obj.house_district_id
          }
        });
      },
      // 添加
      handleAddProduct() {
        this.$router.push({
          path: '/userData/addRegions'
        });
      },
      // 每页多少条
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.size = val;
        this.getHoseListReg();
      },
      // 数字-角标点击
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getHoseListReg();
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
          delHouseReg({
            "houseDistrictId": row.house_district_id
          }).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getHoseListReg();
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
