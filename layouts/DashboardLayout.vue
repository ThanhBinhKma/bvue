<template>
  <div class="wrapper">
    <side-bar>
    </side-bar>
    <div class="main-panel">
     <top-navbar />

      <dashboard-content>

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import SideBar from "../components/SidebarPlugin/SideBar.vue"
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
export default {
  components: {
    TopNavbar,
    SideBar,
    ContentFooter,
    DashboardContent,
  }
};
</script>
