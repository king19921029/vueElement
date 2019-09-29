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

          <el-form-item label="按参数搜索：">
            <el-input style="width: 203px" v-model="listQuery.paramsStr" placeholder="参数名称"></el-input>
          </el-form-item>

          <el-form-item label="按操作搜索：">
            <el-input style="width: 203px" v-model="listQuery.action" placeholder="操作名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- table -->
    <div class="table-container">
      <el-table ref="productTable" v-loading="listLoading" :data="list" style="width: 100%" @selection-change="handleSelectionChange"
        border>
        <el-table-column label="操作时间" width="300" align="center">
          <template slot-scope="scope">{{scope.row.create_time}}</template>
        </el-table-column>

        <el-table-column label="操作名称" align="center">
          <template slot-scope="scope">{{scope.row.action}}</template>
        </el-table-column>

        <el-table-column label="操作(按钮)" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" @click="handleShowProduct(scope.$index, scope.row)">查看
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
    <!-- 弹框 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <div style="padding:10px 0;">日志标题: {{dialogMsg.action}}</div>
      <div style="padding:10px 0;">创建时间: {{dialogMsg.create_time}}</div>
      <div style="padding:10px 0;">内容: {{dialogMsg.params}}</div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // 日志列表
  import {
    getUserLogList,
    getUserLogById
  } from '@/api/getUserBasicsList'

  const defaultListQuery = {
    pageNum: 1,
    size: 5,
    adminUserId: null,
    beginTime: null,
    endTime: null,
    action: null,
    paramsStr: null,
  };
  export default {
    name: "userLog",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],
        dialogVisible: false,
        dialogMsg: {},
      }
    },
    created() {
      this.getUserListFun()
    },

    methods: {
      // 日志列表
      async getUserListFun(params) {
        this.listLoading = true;
        try {
          let obj = {
            "pageNum": this.listQuery.pageNum,
            "size": this.listQuery.size,
            'adminUserId': this.$route.query.id,
          }
          let data = {};
          if( params ){
            data = await getUserLogList(params)
          }else{
            data = await getUserLogList(obj)
          }
          this.listLoading = false;
          this.list = data.data.adminUserLogList;
          this.total = data.data.total;
        } catch (e) {
          console.log(e)
        }
      },
      // 搜索
      handleSearchList() {

        let obj = Object.assign({}, this.listQuery);
        obj.paramsStr = obj.paramsStr ? encodeURI(obj.paramsStr) : null
        obj.action = obj.action ? encodeURI(obj.action) : null
        this.getUserListFun(obj)
        console.log(obj)
      },
      // 查看
      handleShowProduct(index, row) {
        console.log("handleShowProduct", row);
        getUserLogById({
          adminUserLogId: row.id
        }).then(res => {
          console.log(res)
          this.dialogMsg = res.data;
          this.dialogVisible = true
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
      // 每页多少条
      handleSizeChange(val) {
        // console.log("数字")
        this.listQuery.pageNum = 1;
        this.listQuery.size = val;
        this.getUserListFun(this.listQuery);
      },
      // 数字-角标点击
      handleCurrentChange(val) {
        console.log("数字")
        this.listQuery.pageNum = val
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
      },

    }
  }
</script>
<style></style>
