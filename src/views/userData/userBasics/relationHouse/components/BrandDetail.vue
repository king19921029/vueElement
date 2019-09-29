<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

      <!-- 新增 -->
      <el-form-item label="所属小区：" prop="houseDistrictId" v-if="!houseDistrictBtn">
        <el-select :disabled="isEdit" style="width: 203px" v-model="brand.houseDistrictId" placeholder="请选择小区">
          <el-option v-for="item in regList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="goAddRegionsDistrict()">去添加</el-button>
      </el-form-item>

     <!-- <el-form-item label="暂无小区" v-if="houseDistrictBtn">
        <el-button @click="goAddHouseDistrict()">去添加</el-button>
      </el-form-item> -->

      <el-form-item label="房屋选择：" prop="houseId">
        <el-select :disabled="isEdit" style="width: 203px" v-model="brand.houseId" placeholder="请选择房屋">
          <el-option v-for="item in houseIdArr" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="goAddHouseDistrict()">去添加</el-button>
      </el-form-item>

     <!-- <el-form-item label="暂无房屋" v-if="houseBtn">
        <el-button @click="goAddHouse()">去添加</el-button>
      </el-form-item> -->

      <el-form-item label="入住方式：">
        <el-select style="width: 203px" v-model="brand.type" placeholder="请选择入住方式">
          <el-option v-for="item in userHouseType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="入住时间：">
        <el-date-picker class="input-width" v-model="brand.enterTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择入住时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  // 获取小区列表
  import {
    houseListReg
  } from '@/api/regionMsg'

  // 获取房屋列表
  import {
    houseList
  } from '@/api/house'

  // 关联房屋信息
  import {
    getUserHouseRelationInfoById,
    addUserHouseRelation,
    updateUserHouseRelation
  } from '@/api/relationHouse'

  import SingleUpload from '@/components/Upload/uploadMore'
  const defaultBrand = {
    userId: null,
    houseDistrictId: null,
    houseId: null,
    type: null,
    enterTime: null,
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
        glId: null,
        houseIsShow: false,
        houseDistrictBtn: false,
        houseBtn: false,
        regList: [],
        houseIdArr: [],
        brand: Object.assign({}, defaultBrand),
        userHouseType: [{
          value: 0,
          label: "租房"
        }, {
          value: 1,
          label: "自住"
        }],
        rules: {
          houseDistrictId: [{
            required: true,
            message: '请选择所属小区',
            trigger: 'change'
          }],
          houseId: [{
            required: true,
            message: '请选择房屋',
            trigger: 'change'
          }]
        },
        groupList: [],
        selectProductCateValue: null,
      }
    },
    watch: {
      'brand.houseDistrictId'(val) {
        if (val != null) {
          houseList({
            pageNum: 1,
            size: 100,
            houseDistrictId: this.brand.houseDistrictId
          }).then(res => {
            let list = res.data.houseList;
            if (list.length > 0) {
              let houseIdArr = [];
              list.map(item => {
                let obj = {
                  value: item.house_id,
                  label: item.address
                }
                houseIdArr.push(obj)
              })
              this.houseIdArr = houseIdArr
              this.houseIsShow = true
            } else {
              this.houseBtn = true
            }

          });
        } else {
          this.houseIsShow = false
        }
      }
    },
    created() {

      // 获取小区列表
      this.getHoseListReg();
      this.brand.userId = this.$route.query.userId;
      this.glId = this.$route.query.glId;
      console.log(this.$route.query)
      if (this.isEdit) {
        // 编辑
        getUserHouseRelationInfoById({
          "userHouseRelationId": this.$route.query.glId,
        }).then(res => {
          console.log(res.data)
          let type = res.data.user_house_type == "租房" ? 0 : 1;
          const obj = {
            userId: this.$route.query.userId,
            houseDistrictId: res.data.house_district_id,
            houseId: res.data.house_id,
            type: type,
            enterTime: res.data.enter_time,
          };
          this.brand = obj;
        });

      }

    },

    methods: {
      goAddHouse() {
        this.$router.push({
          path: '/userData/addHouse'
        });
      },
      goAddRegionsDistrict() {
        this.$router.push({
          path: '/userData/addRegions'
        });
      },
      goAddHouseDistrict() {
        this.$router.push({
          path: '/userData/addHouse'
        });
      },
      getHoseListReg() {
        houseListReg({
          pageNum: 1,
          size: 100
        }).then(res => {
          let list = res.data.houseDistrictList;
          if (list.length > 0) {
            let regList = [];
            list.map(item => {
              let obj = {
                value: item.house_district_id,
                label: item.house_district_name
              }
              regList.push(obj)
            })
            this.regList = regList
          } else {
            this.houseDistrictBtn = true
          }

        });
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

              // 修改
              if (this.isEdit) {
                console.log(this.brand);
                let obj = {
                  userHouseRelationId: this.glId,
                  enterTime: this.brand.enterTime,
                  type: this.brand.type
                }
                updateUserHouseRelation(obj).then(response => {
                  console.log(response)
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                // 新增
                addUserHouseRelation(this.brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.brand = Object.assign({}, defaultBrand);
                  this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
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
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({}, defaultBrand);
      },
      //提交表单
      async addAdminUser(userInfo) {
        try {
          let data = await createUser(userInfo)
          console.log(data)
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>
<style>
</style>
