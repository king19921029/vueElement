<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .search_titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .display_flex {
    display: flex;
    align-items: center;
  }

  .box {
    width: 94%;
    margin: 3% auto;
    background: #fff;
    border: solid 1px #e6e6e6;
    font-size: 14px;
    color: #606266;
  }

  .img_box {
    flex-wrap: wrap;
  }

  .com_list {
    display: flex;
  }

  .img_box img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-right: 10px;
  }

  .list_title {
    width: 10%;
    text-align: end;
    line-height: 25px;
  }

  .list_font {
    width: 86%;
    margin-left: 2%;
    display: flex;
    flex-wrap: wrap;
    line-height: 25px;
  }

  .bg_gray {
    background-color: rgb(242, 245, 249, 0.75);
  }

  .img_box {
    margin-left: 2%;
    padding: 30px 0;
  }
</style>
