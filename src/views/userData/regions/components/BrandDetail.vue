<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

      <!-- 新增 -->
      <el-form-item label="小区名称：" prop="houseDistrictName">
        <el-input v-model="brand.houseDistrictName"></el-input>
      </el-form-item>
      <el-form-item label="所在省份：" prop="selectCity">
        <el-cascader style="width: 467px;" size="large" :options="options" v-model="brand.selectCity" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="所在地址：" prop="address">
        <el-input v-model="brand.address"></el-input>
      </el-form-item>

      <el-form-item label="建造时间：">
        <el-input v-model="brand.buildTime"></el-input>
      </el-form-item>

      <el-form-item label="是否有门禁：">
        <el-cascader v-model="brand.isDoorGuard" :options="DoorGuard">
        </el-cascader>
      </el-form-item>

      <el-form-item label="其他备注：">
        <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="brand.info">
        </el-input>
      </el-form-item>

      <el-form-item label="小区照片">
        <single-upload v-model="brand"></single-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  //小区接口
  import {
    houseDetailsReg,
    addHouseReg,
    updateHouseReg
  } from '@/api/regionMsg'

  import SingleUpload from '@/components/Upload/uploadMore'

  import {
    regionData,
    CodeToText
  } from 'element-china-area-data'
  import axios from 'axios'
  const defaultBrand = {
    houseDistrictId: null,
    houseDistrictName: null,
    province: null,
    city: null,
    county: null,
    address: null,
    buildTime: null,
    info: null,
    isDoorGuard: [],
    picList: [],
    selectCity: [],
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
        options: regionData,
        selectCity: [],
        selectedOptions: [],
        brand: Object.assign({}, defaultBrand),
        DoorGuard: [{
            value: 1,
            label: "有门禁"
          },
          {
            value: 0,
            label: "无门禁"
          }
        ],
        rules: {
          houseDistrictName: [{
            required: true,
            message: '请输入小区名称',
            trigger: 'blur'
          }],
          selectCity: [{
            required: true,
            message: '请选择省份',
            trigger: 'change'
          }],
          address: [{
              required: true,
              message: '请输入小区地址',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 140,
              message: '长度在 2 到 140 个字符',
              trigger: 'blur'
            }
          ]
        },
        groupList: [],
        selectProductCateValue: null,
      }
    },

    created() {

      this.brand.houseDistrictId = this.$route.query.id ? this.$route.query.id : null
      // isEdit true查看  false新增、编辑

      if (this.isEdit) {
        // 查看
        this.getHouseDetailsReg(this.brand.houseDistrictId)
      } else {
        if (this.brand.houseDistrictId != null) {
          // 编辑
          this.getHouseDetailsReg(this.brand.houseDistrictId)
        } else {
          // 新增
          this.brand = Object.assign({}, defaultBrand);
        }
      }
    },
    methods: {
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
              console.log(this.brand)
              if (this.brand.houseDistrictId != null) {
                let updateObj = {};
                updateObj.houseDistrictName = encodeURI(this.brand.houseDistrictName)
                updateObj.houseDistrictId = this.brand.houseDistrictId
                updateObj.address = encodeURI(this.brand.address)
                updateObj.province = this.selectCity[0]
                updateObj.city = this.selectCity[1]
                updateObj.county = this.selectCity[2]
                if (this.brand.buildTime != null) {
                  updateObj.buildTime = this.brand.buildTime
                }
                if (this.brand.info != null) {
                  updateObj.info = encodeURI(this.brand.info)
                }
                if (this.brand.isDoorGuard.length > 0) {
                  updateObj.isDoorGuard = this.brand.isDoorGuard[0]
                }
                if (this.brand.picList.length > 0) {
                  let picList = [],
                    arr = this.brand.picList;
                  arr.map(item => {
                    picList.push(item.url);
                  })
                  updateObj.picList = picList.toString()
                }
                console.log(updateObj)
                updateHouseReg(updateObj).then(response => {
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
                // const addObj = {
                //   houseDistrictName: null,
                //   address: null,
                //   buildTime: null,
                //   info: null,
                //   isDoorGuard: [],
                //   picList: [],
                // };
                let addObj = {};
                addObj.houseDistrictName = encodeURI(this.brand.houseDistrictName)
                addObj.address = encodeURI(this.brand.address)

                addObj.province = this.selectCity[0]
                addObj.city = this.selectCity[1]
                addObj.county = this.selectCity[2]

                if (this.brand.buildTime != null) {
                  addObj.buildTime = this.brand.buildTime
                }
                if (this.brand.info != null) {
                  addObj.info = encodeURI(this.brand.info)
                }
                if (this.brand.isDoorGuard.length > 0) {
                  addObj.isDoorGuard = this.brand.isDoorGuard[0]
                }

                if (this.brand.picList.length > 0) {
                  let picList = [],
                    arr = this.brand.picList;
                  arr.map(item => {
                    picList.push(item.url);
                  })
                  addObj.picList = picList.toString()
                }
                console.log(addObj)
                addHouseReg(addObj).then(response => {
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
      handleChange(value) {
        console.log(value)
        // value.map(item => {
        //   console.log(CodeToText[item])
        // })
        this.selectCity = value;
      },
      async getHouseDetailsReg(id) {
        try {
          let data = await houseDetailsReg({
            houseDistrictId: id
          })
          console.log(data.data);
          let arr = [];
          let selectCity = [];
          let doorGuard;
          let obj = Object.assign({}, defaultBrand);
          obj = data.data;
          obj.houseDistrictName = data.data.house_district_name;
          obj.buildTime = data.data.build_time;
          selectCity.push(data.data.province)
          selectCity.push(data.data.city)
          selectCity.push(data.data.county)
          obj.selectCity = selectCity

          if (data.data.is_door_guard) {
            doorGuard = data.data.is_door_guard === "无门禁" ? 0 : 1
            arr.push(doorGuard)
            obj.isDoorGuard = arr
          }
          obj.houseDistrictId = data.data.house_district_id
          if (data.data.picList.length > 0) {
            let picArr = data.data.picList;
            let picList = [];
            picArr.map(item => {
              console.log(item)
              let obj = {
                name: item.id,
                url: item.pic_url
              }
              picList.push(obj)
            })

            obj.picList = picList
          }
          this.brand = obj

        } catch (e) {

        }
      }
    }
  }
</script>
<style>
</style>
