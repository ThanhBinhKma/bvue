<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler navbar-burger" type="button" aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a v-on:click="logOut" class="hover-button-a nav-link">
              <i class="fas fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    logOut: function(){
        localStorage.removeItem('auth._token.local');
        localStorage.removeItem('auth._token.user');
        localStorage.removeItem('auth.user');
        this.$router.push('/login');
    }
  }
};
</script>
<style>
.hover-button-a:hover {
  cursor: pointer;
}
svg.fa-sign-out-alt{
  font-size: 25px;
}
</style>
