<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

      <!-- 新增 -->
      <div v-if="!isEdit">
        <el-form-item label="登录名：" prop="username">
          <el-input v-model="brand.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="brand.password"></el-input>
        </el-form-item>

        <!--  <el-form-item label="确认密码：" prop="iSpassword">
          <el-input type="password" v-model="brand.Ispassword"></el-input>
        </el-form-item> -->
      </div>
      <!-- 编辑 -->
      <div v-else>
        <el-form-item label="登录名：" prop="username">
          <el-input :disabled="true" v-model="brand.username"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input type="password" v-model="brand.password"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="昵称：" prop="nickname">
        <el-input v-model="brand.nickname"></el-input>
      </el-form-item>

      <el-form-item label="手机号：" prop="phone">
        <el-input v-model.number="brand.phone"></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <single-upload v-model="brand"></single-upload>
      </el-form-item>

      <el-form-item label="职务：">
        <el-input v-model="brand.job"></el-input>
      </el-form-item>
      <div v-if="isEdit">
        <el-form-item label="状态：">
          <el-cascader v-model="brand.status" :options="userStatus">
          </el-cascader>
        </el-form-item>
      </div>

      <el-form-item label="所属权限" prop="adminGroupId">
        <el-cascader v-model="brand.adminGroupId" :options="groupList">
        </el-cascader>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {
    getUserDetails,
    getGroupList
  } from '@/api/getUserBasicsList'
  import {
    createUser,
    updateUser,
  } from '@/api/user'

  import {
    mapGetters
  } from 'vuex'

  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultBrand = {
    adminUserId: '',
    username: "",
    nickname: '',
    phone: '',
    headerPicUrl: null,
    job: '',
    adminGroupId: [],
    password: null,
    // iSpassword: null,
    status: [],
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
        brand: Object.assign({}, defaultBrand),
        userStatus: [{
            value: 0,
            label: "正常"
          },
          {
            value: 1,
            label: "冻结"
          }
        ],
        rules: {

          username: [{
              required: true,
              message: '请输入登录名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 140,
              message: '长度在 2 到 140 个字符',
              trigger: 'blur'
            }
          ],
          nickname: [{
              required: true,
              message: '请输入昵称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 140,
              message: '长度在 2 到 140 个字符',
              trigger: 'blur'
            }
          ],
          phone: [{
            required: true,
            message: '请输入正确手机号',
            trigger: 'blur'
          }, {
            type: 'number',
            message: '请输入数字'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          // iSpassword: [{
          //   required: true,
          //   message: '请输入确认密码',
          //   trigger: 'blur'
          // }],
          adminGroupId: [{
            required: true,
            message: '请选择权限',
            trigger: 'change'
          }]
        },
        groupList: [],
        selectProductCateValue: null,
      }
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    created() {
      this.brand.adminUserId = this.$route.query.id ? this.$route.query.id : null
      getGroupList({
        "skip": 0,
        "size": 100
      }).then(res => {
        let list = res.data.adminGroupList;
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
        if (this.isEdit) {

          // 编辑
          getUserDetails({
            "adminUserId": this.$route.query.id
          }).then(res => {
            // 处理权限
            let arr = [];
            this.groupList.map(item => {
              if (item.label == res.data.group_name) {
                arr.push(item.value)
              }
            })

            // 处理状态
            let status = res.data.status === "正常" ? 0 : 1;
            let statusArr = [];
            statusArr.push(status);

            let obj = {
              adminUserId: this.$route.query.id,
              username: res.data.username,
              nickname: res.data.nick_name,
              phone: Number(res.data.phone),
              headerPicUrl: res.data.header_pic_url,
              job: res.data.job,
              adminGroupId: arr,
              password:null,
              group_name:null,
              admin_user_id: res.data.admin_user_id,
              status: statusArr,
              create_time: res.data.create_time
            };
            this.brand = obj;
          });

        } else {
          // 新增
          this.brand = Object.assign({}, defaultBrand);
        }
      })
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
              if (this.isEdit) {
                const updateObj = {
                  adminUserId: this.brand.adminUserId,
                  nickname: encodeURI(this.brand.nickname),
                  phone: this.brand.phone,
                  headerPicUrl: this.brand.headerPicUrl,
                  job: encodeURI(this.brand.job),
                  adminGroupId: this.brand.adminGroupId[0],
                  password: this.brand.password,
                  status: this.brand.status[0]
                }
                console.log(updateObj)
                updateUser(updateObj).then(response => {
                  console.log(response)
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  if( this.brand.adminUserId == this.userId ){
                    console.log("自己的信息")
                  }
                  this.$router.back();
                });
              } else {
                // 新增

                const addObj = {
                  username: this.brand.username,
                  nickname: encodeURI(this.brand.nickname),
                  phone: this.brand.phone,
                  headerPicUrl: this.brand.headerPicUrl,
                  job: encodeURI(this.brand.job),
                  adminGroupId: this.brand.adminGroupId[0],
                  password: this.brand.password,
                };
                createUser(addObj).then(response => {
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
      //获取权限列表
      async getGroupListFun() {
        try {
          let data = await getGroupList({
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
