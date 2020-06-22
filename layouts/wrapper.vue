<template>
  <div class="wrapper">
    <side-bar />
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
import TopNavbar from "./TopNavbar.vue";
import SideBar from "../components/SidebarPlugin/SideBar.vue"
import ContentFooter from "./ContentFooter.vue";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
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
<style>
footer.footer{
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
