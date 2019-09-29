<template>
  <div class="box">
   <!-- <el-button size="mini" @click="backBtn">
      返回
    </el-button> -->
    <div class="com_list  bg_gray">
      <p class="list_title">小区名称：</p>
      <p class="list_font">{{regionsHouseInfo.house_district_name}}</p>
    </div>
    <div class="com_list ">
      <p class="list_title">所在省份：</p>
      <p class="list_font"> {{regionsHouseInfo.province}}{{regionsHouseInfo.city}}{{regionsHouseInfo.county}}</p>
    </div>
    <div class="com_list bg_gray">
      <p class="list_title">所在地址：</p>
      <p class="list_font"> {{regionsHouseInfo.address}}</p>
    </div>
    <div class="com_list  ">
      <p class="list_title">建造时间：</p>
      <p class="list_font">{{regionsHouseInfo.build_time}}</p>
    </div>
    <div class="com_list bg_gray">
      <p class="list_title">是否有门禁：</p>
      <p class="list_font">{{regionsHouseInfo.is_door_guard}}</p>
    </div>
    <div class="com_list  ">
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
  //小区接口
  import {
    houseDetailsReg,
  } from '@/api/regionMsg'
  import {
    CodeToText
  } from 'element-china-area-data'
  export default {
    name: "houseReg",
    data() {
      return {
        regionsHouseInfo: {},
      }
    },
    created() {
      this.getHouseDetailsReg(this.$route.query.id)
    },

    methods: {
      backBtn() {
        this.$router.back();
      },
      show() {
        const viewer = this.$el.querySelector('.img_box').$viewer
        viewer.show()
      },
      async getHouseDetailsReg(id) {
        try {
          let data = await houseDetailsReg({
            houseDistrictId: id
          })
          console.log(data.data);

          data.data.province = CodeToText[data.data.province]
          data.data.city = CodeToText[data.data.city]
          data.data.county = CodeToText[data.data.county]
          this.regionsHouseInfo = data.data;
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style>

</style>
