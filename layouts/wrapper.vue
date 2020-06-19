<template>
  <el-container>
    <TheSideBar />
    <el-container
      :style="{ marginLeft:'200px' }"
      class="is-vertical"
      style="transition: all .3s"
    >
      <TheHeader />
      <el-main style="margin-top: 60px">
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheHeader from '~/components/layout-wrapper/TheHeader'
import TheSideBar from '~/components/layout-wrapper/TheSideBar'

export default {
  components: {
    TheHeader,
    TheSideBar
  }
}
</script>
