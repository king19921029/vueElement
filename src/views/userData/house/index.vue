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
          <el-form-item label="所属小区：">
            <el-select style="width: 203px" v-model="listQuery.houseDistrictId" placeholder="请选择小区">
              <el-option v-for="item in regList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="门牌号地址：">
            <el-input style="width: 203px" v-model="listQuery.address" placeholder="门牌号地址"></el-input>
          </el-form-item>

          <el-form-item label="房屋类型：">
            <el-select style="width: 203px" v-model="listQuery.type" placeholder="请选择房屋类型">
              <el-option v-for="item in houseType" :key="item.value" :label="item.label" :value="item.value">
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
        <el-table-column label="所属小区" width="200" align="center">
          <template slot-scope="scope">{{scope.row.house_district_name}}</template>
        </el-table-column>
        <el-table-column label="门牌地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="房屋类型" width="200" align="center">
          <template slot-scope="scope">{{scope.row.type}}</template>
        </el-table-column>
        <el-table-column label="面积" width="100" align="center">
          <template slot-scope="scope">{{scope.row.area}} <text v-if="scope.row.area">平</text></template>
        </el-table-column>
        <el-table-column label="朝向" width="100" align="center">
          <template slot-scope="scope">{{scope.row.aspect}}</template>
        </el-table-column>
        <el-table-column label="是否有电梯" width="100" align="center">
          <template slot-scope="scope">{{scope.row.elevator}}</template>
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
  //获取select小区
  import {
    houseListReg
  } from '@/api/regionMsg'

  // 房屋信息
  import {
    houseList,
    delHouse
  } from '@/api/house'

  const defaultListQuery = {
    houseDistrictId: null,
    address: null,
    type: null,
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
        regList: [],
        houseType: [{
            value: 0,
            label: "开间"
          },
          {
            value: 1,
            label: "一室一厅一卫"
          },
          {
            value: 2,
            label: "两室一厅一卫"
          },
          {
            value: 3,
            label: "三室一厅一卫"
          },
          {
            value: 4,
            label: "两室一厅两卫"
          },
          {
            value: 5,
            label: "三室一厅两卫"
          },
          {
            value: 6,
            label: "四室"
          },
          {
            value: 7,
            label: "五室"
          },
          {
            value: 8,
            label: "别墅"
          },
        ],
      }
    },
    created() {
      this.getHoseListReg();
      this.getHoseList(this.listQuery)
    },
    methods: {
      // 获取小区列表
      getHoseListReg() {
        houseListReg({
          pageNum: 1,
          size: 100
        }).then(res => {
          let list = res.data.houseDistrictList;
          let regList = [];
          list.map(item => {
            let obj = {
              value: item.house_district_id,
              label: item.house_district_name
            }
            regList.push(obj)
          })
          this.regList = regList
        });
      },
      // 获取房屋列表
      getHoseList(params) {
        this.listLoading = true;
        let postData = {};
        if (params) {
          postData = params;
        } else {
          postData = this.listQuery;
        }
        houseList(params).then(res => {
          this.listLoading = false;
          this.total = res.data.total;
          this.list = res.data.houseList;
          console.log(res)
        });
      },
      // 搜索
      handleSearchList() {
        this.listQuery.pageNum = 1;
        let obj = Object.assign({}, this.listQuery);
        obj.address = obj.address ? encodeURI(obj.address) : null
        this.getHoseList(obj);
      },
      // 查看
      handleShowProduct(index, row) {
        console.log("查看")
        this.$router.push({
          path: '/userData/seeHouse',
          query: {
            id: row.house_id
          }
        });
      },
      //编辑
      handleUpdateProduct(idx, obj) {
        this.$router.push({
          path: '/userData/updateHouse',
          query: {
            id: obj.house_id
          }
        });
      },
      // 添加
      handleAddProduct() {
        this.$router.push({
          path: '/userData/addHouse'
        });
      },
      // 每页多少条
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.size = val;
        this.getHoseList();
      },
      // 数字-角标点击
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getHoseList();
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
          delHouse({
            "houseId": row.house_id
          }).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getHoseList();
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
