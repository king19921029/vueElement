<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .search_titles{
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .display_flex{
    display: flex;
    align-items: center;
  }
</style>
