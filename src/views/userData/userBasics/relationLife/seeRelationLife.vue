<template>
  <div class="box">

      <div class="com_list bg_gray">
        <p class="list_title">记录时间：</p>
        <p class="list_font">{{regionsHouseInfo.record_time}}</p>
      </div>
      <div class="com_list ">
        <p class="list_title">记录人：</p>
        <p class="list_font">{{regionsHouseInfo.nick_name}}</p>
      </div>
      <div class="com_list bg_gray ">
        <p class="list_title">宠物状况：</p>
        <p class="list_font">{{regionsHouseInfo.pet_info}}</p>
      </div>
      <div class="com_list ">
        <p class="list_title">家庭成员状况：</p>
        <p class="list_font">{{regionsHouseInfo.family_info}}</p>
      </div>

      <div :class="idx%2 == 0 ? 'bg_gray' : ''" v-for="(item,idx) in regionsHouseInfo.detailList" class="com_list ">
        <p class="list_title">{{item.life_property_key}}：</p>
        <p class="list_font">{{item.life_property_value}}</p>
      </div>

  </div>
</template>

<script>
  import {
    getUserLifeHistoryInfoById,
  } from '@/api/relationLife'

  export default {
    name: "relationLife",
    data() {
      return {
        regionsHouseInfo: {},
      }
    },
    created() {
      this.getUserLifeHistoryInfo(this.$route.query.id)
    },
    methods: {
      show() {
        const viewer = this.$el.querySelector('.img_box').$viewer
        viewer.show()
      },
      async getUserLifeHistoryInfo(id) {
        try {
          let data = await getUserLifeHistoryInfoById({
            userLifeHistoryId: id
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
