<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

      <!-- 新增 -->
      <el-form-item label="记录时间：" prop="recordTime">
        <el-date-picker style="width: 203px" class="input-width" v-model="brand.recordTime" value-format="yyyy-MM-dd"
          type="date" placeholder="请选择记录时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="记录人：" prop="recordAdminUserId">
        <el-select style="width: 203px" v-model="brand.recordAdminUserId" placeholder="请选择记录人员">
          <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="宠物情况：">
        <el-input style="width: 303px" v-model="brand.petInfo" placeholder="请填写宠物信息"></el-input>
      </el-form-item>

      <el-form-item label="家庭成员情况：">
        <el-input style="width: 303px" v-model="brand.familyInfo" placeholder="请填写家庭成员信息"></el-input>
      </el-form-item>

      <div style="height: 2px;background:#F5F5F5; margin:100px 0 50px 0;"></div>
      <el-button class="btn-add" @click="addDom(listCunt)" size="mini">
        添加一行
      </el-button>

      <el-form :inline="true" style="padding:20px 0;" :model="listData" size="small">
        <div style="display: flex;align-items: center;justify-content:space-between; padding:10px 0;" v-for="(item,idx) in addList"
          :key="idx">
          <el-input style="text-align: rigth;text-align:end; width: 130px" v-model="brand.detailList[idx].pKey"
            placeholder="标签"></el-input>
          <el-input style="width: 380px" v-model="brand.detailList[idx].pValue" placeholder="实际内容"></el-input>
          <!-- <p class="del">删除</p> -->
          <el-button @click="delDom(idx)">删除</el-button>
        </div>
      </el-form>

      <div style="display:flex;justify-content: center;">
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script>
  import {
    getUserList
  } from '@/api/getUserBasicsList'

  import {
    addUserLifeHistory,
    getUserLifeHistoryInfoById,
    updateUserLifeHistory
  } from '@/api/relationLife'

  import {
    getToken
  } from '@/utils/auth'

  import {
    copyArr
  } from '@/utils/copyArr'


  import axios from 'axios'

  import SingleUpload from '@/components/Upload/uploadMore'
  const defaultBrand = {
    userLifeHistoryId: null,
    userId: null,
    recordAdminUserId: null,
    recordTime: null,
    familyInfo: null,
    petInfo: null,
    detailList: [{
      pKey: null,
      pValue: null
    }],
  };

  export default {
    name: 'BrandDetail',
    components: {
      SingleUpload
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        userList: [],
        listData: {
          cur: [{
            key: null,
            value: null
          }],
        },
        addList: ["0"],
        listCunt: 1,
        regList: [],
        brand: Object.assign({}, defaultBrand),
        rules: {
          recordTime: [{
            required: true,
            message: '请选择记录时间',
            trigger: 'change'
          }],
          recordAdminUserId: [{
            required: true,
            message: '请选择记录人员',
            trigger: 'change'
          }]
        },
        selectProductCateValue: null,
      }
    },
    created() {
     
      this.brand.userId = this.$route.query.userId;
      this.brand.userLifeHistoryId = this.$route.query.id;
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
        if (this.isEdit) {
          // 编辑
          getUserLifeHistoryInfoById({
            userLifeHistoryId: this.$route.query.id
          }).then(res => {
            let obj = {
              userLifeHistoryId: this.$route.query.id,
              userId: this.$route.query.userId,
              recordTime: res.data.record_time,
              familyInfo: res.data.family_info,
              petInfo: res.data.pet_info,
            }


            let userList = this.userList;
            console.log(userList)
            let recordAdminUserId = userList.filter(item => {
              return item.label == res.data.nick_name;
            })
            console.log(recordAdminUserId)
            obj.recordAdminUserId = recordAdminUserId[0].value;
            // addObj.recordAdminUserId = recordAdminUserId[0].value;

            let detailList = [];
            let addList = [];
            let list = res.data.detailList;
            list.map((item, index) => {
              let obj = {
                pKey: item.life_property_key,
                pValue: item.life_property_value
              }
              detailList.push(obj);
              addList.push(index)
            })

            this.listCunt = detailList.length;
            this.addList = addList
            obj.detailList = detailList;
            this.brand = obj;
            console.log(res.data)
          });
        } else {
          this.brand.detailList = [{
            pKey: null,
            pValue: null
          }]
        }
      })

    },

    methods: {
      seeDom() {
        // this.postData(this.brand)
      },
      delDom(idx) {
        let detailList = this.brand.detailList;
        detailList.splice(idx, 1)
        let addList = this.addList;
        addList.splice(idx, 1)
        this.brand.detailList = detailList;
        this.addList = addList
        this.listCunt = this.listCunt - 1;

        console.log(this.addList)
        console.log(this.listCunt)
      },
      addDom(listCunt) {
        let list = [];
        // cur
        let listDataList = this.brand.detailList;
        listDataList[listCunt] = {
          pKey: null,
          pValue: null
        };
        this.listDataList = listDataList

        list[listCunt] = listCunt + "";
        listCunt++;
        this.addList = list;
        this.listCunt = listCunt
        console.log(this.addList)
      },

      // 提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // picList: [],
              // 修改
              if (this.isEdit) {

                let addObj = Object.assign({}, this.brand);
                if (addObj.familyInfo != null) {
                  addObj.familyInfo = encodeURI(addObj.familyInfo)
                }
                if (addObj.petInfo != null) {
                  addObj.petInfo = encodeURI(addObj.petInfo)
                }
                addObj.detailList = copyArr(this.brand.detailList);
                let list = addObj.detailList;
                let idArr = [];
                if (list.length > 0) {
                  list.map((item, index) => {
                    if (item.pKey == null || item.pValue == null) {
                      let cun = index + 1;
                      idArr.push(cun);
                    } else {
                      item.pKey = encodeURI(item.pKey)
                      item.pValue = encodeURI(item.pValue)
                    }
                  })
                }

                if (idArr.length > 0) {
                  let str = idArr.toString();
                  this.$message({
                    message: "请把第" + str + "条信息填写完整,如不需要请删除",
                    type: 'error',
                    duration: 2000
                  });
                } else {
                  if (list.length > 0) {
                    this.UptadePostData(formName, addObj)
                  } else {
                    let obj = {
                      recordTime: addObj.recordTime,
                      recordAdminUserId: addObj.recordAdminUserId,
                      familyInfo: addObj.familyInfo,
                      petInfo: addObj.petInfo,
                      userLifeHistoryId: addObj.userLifeHistoryId,
                    }
                    this.UptadePostData(formName, obj)
                  }
                }
              } else {
                // 新增
                let addObj = Object.assign({}, this.brand);
                if (addObj.familyInfo != null) {
                  addObj.familyInfo = encodeURI(addObj.familyInfo)
                }
                if (addObj.petInfo != null) {
                  addObj.petInfo = encodeURI(addObj.petInfo)
                }
                addObj.detailList = copyArr(this.brand.detailList);
                let list = addObj.detailList
                let idArr = [];
                if (list.length > 0) {
                  list.map((item, index) => {
                    if (item.pKey == null || item.pValue == null) {
                      let cun = index + 1;
                      idArr.push(cun);
                    } else {
                      item.pKey = encodeURI(item.pKey)
                      item.pValue = encodeURI(item.pValue)
                    }
                  })
                }

                if (idArr.length > 0) {
                  let str = idArr.toString();
                  this.$message({
                    message: "请把第" + str + "条信息填写完整,如不需要请删除",
                    type: 'error',
                    duration: 2000
                  });
                } else {
                  if (list.length > 0) {
                    this.postData(formName, addObj)
                  } else {
                    let obj = {
                      recordTime: addObj.recordTime,
                      recordAdminUserId: addObj.recordAdminUserId,
                      familyInfo: addObj.familyInfo,
                      petInfo: addObj.petInfo,
                      userId: addObj.userId,
                    }
                    this.postData(formName, obj)
                  }
                }

              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      // updateUserLifeHistory
      UptadePostData(formName, params) {
        const that = this;
        axios.post(this.$url + "/user/v1/updateUserLifeHistory", params, {
            headers: {
              'x-authorization': getToken()
            }
          })
          .then(function(res) {
            if (res.data.data.success != 0) {
              // that.$refs[formName].resetFields();
              // that.brand = Object.assign({}, defaultBrand);
              that.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
              });
              that.$router.back();
            } else {
              that.$message({
                message: '修改失败',
                type: 'error',
                duration: 1000
              });
            }

          })
      },
      postData(formName, params) {
        const that = this;
        axios.post(this.$url + "/user/v1/addUserLifeHistory", params, {
            headers: {
              'x-authorization': getToken()
            }
          })
          .then(function(res) {
            if (res.data.data.success != 0) {
              // that.$refs[formName].resetFields();
              // that.brand = Object.assign({}, defaultBrand);
              that.$message({
                message: '添加成功',
                type: 'success',
                duration: 1000
              });
              that.$router.back();
            } else {
              that.$message({
                message: '添加失败',
                type: 'error',
                duration: 1000
              });
            }

          })
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({}, defaultBrand);
      },
    }
  }
</script>
<style>
  .el-form-item__label {
    text-align: left;
  }

  .del {
    font-size: 14px;
    color: red;
  }
</style>
