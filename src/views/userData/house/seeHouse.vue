<template>
  <div class="box">
    <div class="com_list bg_gray">
      <p class="list_title">所属小区：</p>
      <p class="list_font">{{regionsHouseInfo.house_district_name}}</p>
    </div>
    <div class="com_list ">
      <p class="list_title">所在地址：</p>
      <p class="list_font">{{regionsHouseInfo.address}}</p>
    </div>
    <div class="com_list bg_gray">
      <p class="list_title">房屋类型：</p>
      <div class="list_font display_flex">
        <p>{{regionsHouseInfo.type0 ? regionsHouseInfo.type0 : 0}}室</p>
        <p>{{regionsHouseInfo.type1 ? regionsHouseInfo.type0 : 0}}厅</p>
        <p>{{regionsHouseInfo.type2 ? regionsHouseInfo.type0 : 0}}厨</p>
        <p>{{regionsHouseInfo.type3 ? regionsHouseInfo.type0 : 0}}卫</p>
      </div>
    </div>
    <div class="com_list ">
      <p class="list_title">面积：</p>
      <div class="list_font display_flex">
        {{regionsHouseInfo.min_area}}
        <p v-if="regionsHouseInfo.min_area">平~</p>
        {{regionsHouseInfo.max_area}}
        <p v-if="regionsHouseInfo.max_area">平</p>
      </div>
    </div>
    <div class="com_list bg_gray">
      <p class="list_title">所在楼层：</p>
      <div class="list_font">{{regionsHouseInfo.floor}}</div>
    </div>
    <div class="com_list ">
      <p class="list_title">朝向：</p>
      <p class="list_font">{{regionsHouseInfo.aspect}}</p>
    </div>
    <div class="com_list bg_gray">
      <p class="list_title">是否有电梯：</p>
      <p class="list_font">{{regionsHouseInfo.elevator}}</p>
    </div>
    <div class="com_list">
      <p class="list_title">备注：</p>
      <p class="list_font">{{regionsHouseInfo.info}}</p>
    </div>
    <div class="com_list bg_gray">
      <p class="list_title">房屋图片：</p>
      <!-- <div class="img_box ">
          <img v-image-preview v-for="(item,idx) in regionsHouseInfo.picList" :src="item.pic_url" :key="idx" alt="">
        </div> -->
      <div class="img_box " v-viewer="{movable: false}">
        <img v-for="(item,idx) in regionsHouseInfo.picList" :src="item.pic_url" :key="item.pic_url">
      </div>
      <!-- <button type="button" @click="show">Show</button> -->
    </div>
  </div>
</template>

<script>
  //房屋接口
  import {
    houseDetails
  } from '@/api/house.js'
  export default {
    name: "houseReg",
    data() {
      return {
        regionsHouseInfo: {},
      }
    },
    created() {
      this.getHouseDetails(this.$route.query.id)
    },
    methods: {
      show() {
        const viewer = this.$el.querySelector('.img_box').$viewer
        viewer.show()
      },
      async getHouseDetails(id) {
        try {
          let data = await houseDetails({
            houseId: id
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
