<template>
  <el-aside :width="isCollapse ? '70px' : '200px'" class="el-side-bar">
    <div class="logo">
      <nuxt-link to="/" tag="div">
        <img
          :src="logo"
          :style="isCollapse ? 'width: 20px' : 'width: 150px'"
          style="height: auto"
          alt="Logo Fitshare"
        />
      </nuxt-link>
    </div>

    <el-menu
      :collapse="isCollapse"
      :router="true"
      default-active="2"
      class="el-menu-vertical"
      background-color="#2b3a4a"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template>
        <template>
          <el-submenu>
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">name</span>
            </template>
            <el-menu-item
            >
              name
            </el-menu-item>
          </el-submenu>
        </template>
        <template>
          <el-menu-item>
            <i :class="item.icon"></i>
            <span slot="title">name</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

    <el-button @click="changeIsCollapse" type="text" class="btn-block bg-white" style="position: absolute; bottom: 0">
      <i v-if="isCollapse" class="el-icon-d-arrow-right"></i>
      <i v-else class="el-icon-d-arrow-left"></i>
    </el-button>
  </el-aside>
</template>

<script>
// import { menus } from '~/config/sideBar'

export default {
  computed: {
    menus() {
      haha,hihi
    },
    userPermission() {
      return this.$store.state.user.user_permission || []
    }
  }
}
</script>

<style lang="css">
.logo {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #f0f4f8;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s;
}

.is-collapse {
  .logo {
    font-size: 12px;
  }
}

.el-menu.el-menu--popup {
  overflow-y: auto;
  max-height: 100vh;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  display: block;
}
::-webkit-scrollbar-thumb {
  background: rgba(144, 147, 153, 0.3);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(144, 147, 153, 0.4);
}
</style>
