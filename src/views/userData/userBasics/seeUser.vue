<template>
  <div class="box">

    <div class="com_list bg_gray">
      <p class="list_title">用户编号：</p>
      <p class="list_font">{{regionsHouseInfo.user_no}}</p>
    </div>
    <div class="com_list ">
      <p class="list_title">真实姓名：</p>
      <p class="list_font">{{regionsHouseInfo.real_name}}</p>
    </div>
    <div class="com_list bg_gray">
      <p class="list_title">昵称：</p>
      <p class="list_font">{{regionsHouseInfo.real_name}}</p>
    </div>
    <div class="com_list ">
      <p class="list_title">手机号：</p>
      <p class="list_font">{{regionsHouseInfo.phone}}</p>
    </div>
    <div class="com_list bg_gray">
      <p class="list_title">微信号：</p>
      <p class="list_font">{{regionsHouseInfo.weixin}}</p>
    </div>
    <div class="com_list ">
      <p class="list_title">生日：</p>
      <p class="list_font">{{regionsHouseInfo.birthday}}</p>
    </div>

    <div class="com_list bg_gray">
      <p class="list_title">备忘录：</p>
      <div style="white-space: pre-line; padding: 20px 0;" class="list_font">{{regionsHouseInfo.memo}}</div>
    </div>

    <div v-if="regionsHouseInfo.header_pic_url" class="com_list">
      <p class="list_title">头像：</p>
      <div class="img_box " v-viewer="{movable: false}">
        <img :src="regionsHouseInfo.header_pic_url">
      </div>

    </div>

  </div>
</template>

<script>
  //获取用户信息
  import {
    getUserInfoById
  } from '@/api/userBasics'
  export default {
    name: "houseReg",
    data() {
      return {
        regionsHouseInfo: {},
      }
    },
    created() {
      this.getuserDetails(this.$route.query.id)
    },
    methods: {
      show() {
        const viewer = this.$el.querySelector('.img_box').$viewer
        viewer.show()
      },
      async getuserDetails(id) {
        try {
          let data = await getUserInfoById({
            userId: id
          })
          console.log(data.data);
          this.regionsHouseInfo = data.data;
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style>
  .form-container {
    width: 840px
  }

  .com_list,
  .img_box {
    flex-wrap: wrap;
  }

  .img_box img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-right: 10px;
  }
</style>
