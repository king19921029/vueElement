<template>
  <div class="box">
      <div class="com_list bg_gray">
        <p class="list_title">所属小区：</p>
        <p class="list_font">{{regionsHouseInfo.house_district_name}}</p>
      </div>

       <!-- 关联信息 -->
      <div class="com_list ">
        <p class="list_title">入住时间：</p>
        <p class="list_font">{{relationInfo.enter_time}}</p>
      </div>

      <div class="com_list bg_gray">
        <p class="list_title">住房类型：</p>
        <p class="list_font">{{relationInfo.user_house_type}}</p>
      </div>

      <div class="com_list ">
        <p class="list_title">所在地址：</p>
        <p class="list_font">{{regionsHouseInfo.address}}</p>
      </div>
      <div class="com_list bg_gray">
        <p class="list_title">房屋类型：</p>
        <p class="list_font">{{regionsHouseInfo.type}}</p>
      </div>
      <div class="com_list ">
        <p class="list_title">面积：</p>
        <p class="list_font">{{regionsHouseInfo.area}}平</p>
      </div>
      <div class="com_list bg_gray">
        <p class="list_title">所在楼层：</p>
        <p class="list_font">{{regionsHouseInfo.floor}}</p>
      </div>
      <div class="com_list ">
        <p class="list_title">朝向：</p>
        <p class="list_font">{{regionsHouseInfo.aspect}}</p>
      </div>
      <div class="com_list bg_gray">
        <p class="list_title">是否有电梯：</p>
        <p class="list_font">{{regionsHouseInfo.elevator}}</p>
      </div>
      <div class="com_list ">
        <p class="list_title">备注：</p>
        <p class="list_font">{{regionsHouseInfo.info}}</p>
      </div>
      <div class="com_list bg_gray">
        <p class="list_title">小区图片：</p>
        <div class="img_box " v-viewer="{movable: false}">
          <img v-for="(item,idx) in regionsHouseInfo.picList" :src="item.pic_url" :key="item.pic_url">
        </div>
      </div>
  </div>
</template>

<script>
  //房屋接口
  import {
    houseDetails
  } from '@/api/house';

  import {
    getUserHouseRelationInfoById
  } from '@/api/relationHouse';

  export default {
    name: "houseReg",
    data() {
      return {
        relationInfo:{},
        regionsHouseInfo: {},
      }
    },
    created() {
      this.getUserHouseRelationInfo(this.$route.query.id)
    },
    methods: {
      show() {
        const viewer = this.$el.querySelector('.img_box').$viewer
        viewer.show()
      },
      async getUserHouseRelationInfo(id) {
        try {
          let data = await getUserHouseRelationInfoById({
            userHouseRelationId: id
          })

          this.getHouseDetails(data.data.house_id)
          console.log(data.data)
          this.relationInfo = data.data;
        } catch (e) {
          console.log(e)
        }
      },
      async getHouseDetails(id) {
        try {
          let data = await houseDetails({
            houseId: id
          })
          // console.log(data.data);
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
