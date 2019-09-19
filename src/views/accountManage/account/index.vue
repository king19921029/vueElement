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
          <el-form-item label="按姓名搜索：">
            <el-input style="width: 203px" v-model="listQuery.nickname" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="按手机号搜索：">
            <el-input style="width: 203px" v-model="listQuery.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="按权限组搜索：">
            <el-select style="width: 203px" v-model="listQuery.adminGroupId" placeholder="请选择权限" clearable>
              <el-option v-for="item in groupList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="按状态搜索：">
            <el-select style="width: 203px" v-model="listQuery.status" placeholder="请选择状态" clearable>
              <el-option v-for="item in userStatus" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按职务搜索：">
            <el-input style="width: 203px" v-model="listQuery.job" placeholder="职务"></el-input>
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
        <el-table-column label="账户昵称" align="center">
          <template slot-scope="scope">{{scope.row.nick_name}}</template>
        </el-table-column>
        <el-table-column label="手机号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="职务" align="center">
          <template slot-scope="scope">{{scope.row.job}}</template>
        </el-table-column>
        <el-table-column label="状态" width="150" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column label="所属权限" width="150" align="center">
          <template slot-scope="scope">{{scope.row.admin_group_name}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button size="mini" @click="handleUpdateProduct(scope.$index,scope.row)">编辑
              </el-button>
              <el-button size="mini" @click="handleShowLog(scope.$index, scope.row)">日志
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <div v-if="userInfo!= null" class="dialog_div">
        <img v-if="userInfo.header_pic_url" style="width:100px;height: 100px; border-radius: 50%;" :src="userInfo.header_pic_url" alt="">
        <div>账户昵称：{{userInfo.username}}</div>
        <div>手机号：{{userInfo.phone}}</div>
        <div>职务：{{userInfo.job}}</div>
        <div>状态：{{userInfo.status}}</div>
        <div>所属权限：{{userInfo.group_name}}</div>
        <div>创建时间：{{userInfo.create_time}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total,sizes,prev, pager, next,jumper"
        :page-size="listQuery.size" :page-sizes="[5,10,15]" :current-page.sync="listQuery.skip" :total="total">
      </el-pagination>
    </div>

    <div style="height: 80px;width: 100%;"></div>

  </div>
</template>
<script>
  // 用户列表
  import {
    getUserList,
    getUserDetails
  } from '@/api/getUserBasicsList'
  
  // 权限列表
  import {
    getRuleList
  } from '@/api/ruleMsg'
  // 删除数据
  import {
    delUser
  } from '@/api/user'


  const defaultListQuery = {
    nickname: null,
    phone: null,
    job: null,
    status: null,
    adminGroupId: null,
    skip: 1,
    size: 5
  };
  export default {
    name: "productList",
    data() {
      return {
        dialogVisible: false,
        userStatus: [{
            value: 0,
            label: "正常"
          },
          {
            value: 1,
            label: "冻结"
          }
        ],
        // 权限
        groupList: [],
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        userInfo: {},
      }
    },
    created() {
      this.getUserListFun()
      this.getGroupListFun();
    },
    methods: {
      // 获取用户列表
      getUserListFun(params) {
        this.listLoading = true;
        if (params) {
          getUserList(params).then(res => {
            this.listLoading = false;
            this.list = res.data.adminUserList;
            this.total = res.data.total;
          });
        } else {
          getUserList(this.listQuery).then(res => {
            this.listLoading = false;
            this.list = res.data.adminUserList;
            this.total = res.data.total;
          });
        }
      },
      // 搜索
      handleSearchList() {
        this.listQuery.skip = 1;
        let obj = Object.assign({}, this.listQuery);
        obj.nickname = obj.nickname ? encodeURI(obj.nickname) : null
        obj.job = obj.job ? encodeURI(obj.job) : null

        getUserList(obj).then(res => {
          this.listLoading = false;
          this.list = res.data.adminUserList;
          this.total = res.data.total;
        })
      },
      // 查看
      handleShowProduct(index, row) {
        console.log("handleShowProduct", row);
        this.dialogVisible = true;
        getUserDetails({
          "adminUserId": row.admin_user_id
        }).then(res => {
          console.log(res);
          this.userInfo = res.data;
        })
      },
      // 关闭
      handleClose(done) {
        done();
      },
      //获取权限列表
      async getGroupListFun() {
        try {
          let data = await getRuleList({
            "skip": 0,
            "size": 100
          })
          let list = data.data.adminGroupList;

          let groupList = [];
          list.map(item => {
            let obj = {
              value: item.admin_group_id,
              label: item.admin_group_name,
              info: item.admin_group_info
            }
            groupList.push(obj)
          })

          this.groupList = groupList;
        } catch (error) {
          console.log(error);
        }
      },
      //日志
      handleShowLog(idx, obj) {
        this.$router.push({
          path: '/accountManage/userLog',
          query: {
            id: obj.admin_user_id
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
      // 添加
      handleAddProduct() {
        this.$router.push({
          path: '/accountManage/addAccount'
        });
      },
      // 每页多少条
      handleSizeChange(val) {
        this.listQuery.skip = 1;
        this.listQuery.size = val;
        this.getUserListFun();
      },
      // 数字-角标点击
      handleCurrentChange(val) {
        this.listQuery.skip = val;
        this.getUserListFun();
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
            "adminUserId": row.admin_user_id
          }).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getUserListFun();
          });

        });
      },
    }
  }
</script>
<style>
.dialog_div{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dialog_div img{
  margin-bottom: 30px;
}
.dialog_div div{
  width:300px;
  padding: 10px;
}
</style>
