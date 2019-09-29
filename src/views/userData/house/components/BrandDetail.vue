<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

      <!-- 新增 -->
      <el-form-item label="所属小区：" prop="houseDistrictId">
        <el-select style="width: 203px" v-model="brand.houseDistrictId" placeholder="请选择小区">
          <el-option v-for="item in regList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房屋类型：">
        <!-- <el-select style="width: 203px" v-model="brand.type" placeholder="请选择房屋类型">
          <el-option v-for="item in houseType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->

        <div class="display_flex">
          <div class="types">
            <el-select style="width:80px" v-model="brand.type0" placeholder="几室">
              <el-option v-for="item in type0" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            室
          </div>

          <div class="types">
            <el-select style="width:80px" v-model="brand.type1" placeholder="几厅">
              <el-option v-for="item in type1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            厅
          </div>

          <div class="types">
            <el-select style="width:80px" v-model="brand.type2" placeholder="几厨">
              <el-option v-for="item in type2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            厨
          </div>

          <div class="types">
            <el-select style="width:80px" v-model="brand.type3" placeholder="几卫">
              <el-option v-for="item in type3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            卫
          </div>
        </div>
      </el-form-item>

      <el-form-item label="具体地址：" prop="address">
        <el-input v-model="brand.address"></el-input>
      </el-form-item>

      <el-form-item label="建筑面积：">
        <div class="display_flex area_div">
          <el-input width="80px" type="number" v-model="brand.minArea"></el-input>
          <p>平</p>
          <p class="_margin">~</p>
          <el-input width="80px" type="number" v-model="brand.maxArea"></el-input>
          <p>平</p>
        </div>

      </el-form-item>

      <el-form-item label="所在楼层：">
        <el-input v-model="brand.floor"></el-input>
      </el-form-item>

      <el-form-item label="其他备注：">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="brand.info">
        </el-input>
      </el-form-item>

      <el-form-item label="所在朝向：">
        <el-input v-model="brand.aspect"></el-input>
      </el-form-item>

      <el-form-item label="是否有电梯：">
        <el-select style="width: 203px" v-model="brand.elevator" placeholder="请选择小区">
          <el-option v-for="item in elevatorArr" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="房屋照片">
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
  //获取select小区
  import {
    houseListReg
  } from '@/api/regionMsg'

  import {
    addHouse,
    updateHouse,
    houseDetails
  } from '@/api/house.js'

  import SingleUpload from '@/components/Upload/uploadMore'
  const defaultBrand = {
    houseDistrictId: null,
    address: null,
    area: null,
    info: null,
    type0: 0,
    type1: 0,
    type2: 0,
    type3: 0,
    minArea: null,
    maxArea: null,
    elevator: null,
    floor: null,
    aspect: null,
    picList: [],
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
        regList: [],
        type0: [],
        type1: [],
        type2: [],
        type3: [],
        brand: Object.assign({}, defaultBrand),
        elevatorArr: [{
            value: 1,
            label: "有"
          },
          {
            value: 0,
            label: "没有"
          }
        ],
        rules: {
          houseDistrictId: [{
            required: true,
            message: '请选择所属小区',
            trigger: 'change'
          }],
          address: [{
              required: true,
              message: '请输入门牌号',
              trigger: 'blur'
            },
            {
              min: 2,
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
     
      let types = [];
      for (let i = 0; i < 10; i++) {
        let obj = {
          value: i + 1
        }
        types.push(obj);
      }
      console.log(types)
      this.type0 = types;
      this.type1 = types;
      this.type2 = types;
      this.type3 = types;

      // 获取小区列表
      this.getHoseListReg();
      this.brand.adminUserId = this.$route.query.id ? this.$route.query.id : null
      if (this.isEdit) {
        // 编辑
        houseDetails({
          "houseId": this.$route.query.id
        }).then(res => {
          console.log(res.data)
          const obj = {
            houseDistrictId: res.data.house_district_id,
            address: res.data.address,
            area: Number(res.data.area),
            info: res.data.info,
            floor: res.data.floor,
            aspect: res.data.aspect,
            picList: [],
            type0: res.data.type0 || 0,
            type1: res.data.type1 || 0,
            type2: res.data.type2 || 0,
            type3: res.data.type3 || 0,
            minArea: res.data.min_area,
            maxArea: res.data.max_area,
          };
          // 是否有门禁
          if (res.data.elevator != "未设置") {
            obj.elevator = res.data.elevator == "有" ? 1 : 0
          } else {
            obj.elevator = "未设置"
          }

          if (res.data.picList.length > 0) {
            let picArr = res.data.picList;
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
          this.brand = obj;
          console.log(this.brand)
        });

      } else {
        // 新增
        this.brand = Object.assign({}, defaultBrand);
      }

    },

    methods: {
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

                let updateObj = {};
                updateObj.houseId = this.$route.query.id
                updateObj.houseDistrictId = this.brand.houseDistrictId
                updateObj.address = encodeURI(this.brand.address)
                updateObj.type0 = this.brand.type0;
                updateObj.type1 = this.brand.type1;
                updateObj.type2 = this.brand.type2;
                updateObj.type3 = this.brand.type3;
                updateObj.minArea = this.brand.minArea;
                updateObj.maxArea = this.brand.maxArea;

                if (this.brand.area) {
                  updateObj.area = this.brand.area
                }
                if (this.brand.info != null) {
                  updateObj.info = encodeURI(this.brand.info)
                }

                if (this.brand.elevator == "未设置") {} else {
                  console.log(270, this.brand.elevator)
                  let elevatorArr = this.elevatorArr;
                  let elevators = elevatorArr.filter(item => {
                    return item.value == this.brand.elevator
                  })
                  console.log(elevators)
                  updateObj.elevator = elevators[0].value;
                }

                if (this.brand.floor) {
                  updateObj.floor = this.brand.floor
                }

                if (this.brand.aspect != null) {
                  updateObj.aspect = encodeURI(this.brand.aspect)
                }
                if (this.brand.picList.length > 0) {
                  let picList = [],
                    arr = this.brand.picList;
                  arr.map(item => {
                    picList.push(item.url);
                  })
                  updateObj.picList = picList.toString()
                }

                updateHouse(updateObj).then(response => {
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
                let addObj = Object.assign({}, this.brand);
                addObj.address = encodeURI(addObj.address)
                if (addObj.info != null) {
                  addObj.info = encodeURI(addObj.info)
                }
                if (addObj.aspect != null) {
                  addObj.aspect = encodeURI(addObj.aspect)
                }
                // if(  addObj.floor != null ){
                //   addObj.floor = encodeURI(addObj.floor)
                // }
                console.log(addObj)

                addHouse(addObj).then(response => {
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
  .types {
    margin-right: 15px;
  }

  .area_div {
    height: 40px;
  }

  .area_div .el-input {
    width: 100px;
    margin-right: 10px;
  }

  ._margin {
    margin: 0 10px;
  }
</style>
