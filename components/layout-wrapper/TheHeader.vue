<template>
  <el-header :style="{ left: isCollapse ? '70px' : '200px' }" class="is-header">
    <el-dropdown @command="handleCommand" trigger="click" class="mx-3">
      <img :src="flagLanguage" alt="" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="en">
          <div class="d-flex justify-content-between align-items-center">
            <div class="mr-4">
              <img :src="require('~/assets/images/flags/en.png')" />
            </div>
            <span>English</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="ja">
          <div class="d-flex justify-content-around align-items-center">
            <div class="mr-4">
              <img :src="require('~/assets/images/flags/ja.png')" />
            </div>
            <span>Japanese</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown @command="handleCommand" trigger="click">
      <el-avatar :src="avatar" size="medium" class="align-middle cursor-poiter"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changePassword">
          ChangePassword
        </el-dropdown-item>
        <el-dropdown-item command="changeAvatar">
          ChangeAvatar
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          Logout
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
export default {
  methods: {
    async handleCommand(command) {
      switch (command) {
        case 'logout':
          await this.$auth.logout()
          // document.location.reload()
          break
        case 'changeAvatar':
          const { upload } = this.$refs
          upload.openDialog()
          break
        case 'changePassword':
          const { changePassword } = this.$refs
          changePassword.openDialog()
          break
        case 'en':
          this.$store.commit('SET_LOCALE', 'en')
          break
        case 'ja':
          this.$store.commit('SET_LOCALE', 'ja')
          break
      }
    }
  }
}
</script>

<style scoped>
.is-header {
  height: 60px;
  text-align: right;
  font-size: 12px;
  position: fixed;
  z-index: 100;
  right: 0;
  transition: all 0.3s;
  background: #fff;
}
</style>
