<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item class="display_flex" style="display: flex;align-items: center;" :index="item.path+'/'+item.children[0].path"
          :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <!-- <div class="display_flex"> -->
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span style="display:inline-block;margin-top: -5px;" v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          <!-- </div> -->
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]"
            :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <!-- <div class="display_flex"> -->
                <svg-icon style="display:inline-block;" v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                <span style="display:inline-block;margin-top: -5px;" v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
              <!-- </div> -->
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // console.log(this.routes)
    },
    methods: {
      hasOneShowingChildren(children) {
        const showingChildren = children.filter(item => {
          return !item.hidden
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      }
    }
  }
</script>
<style>

.display_flex .svg-icon[data-v-c8a70580] {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.18em;
    fill: currentColor;
    overflow: hidden;
}
</style>
