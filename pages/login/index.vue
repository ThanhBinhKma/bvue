<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper auth-page">
      <div
        class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one"
      >
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <div class="auto-form-wrapper">
              <div>
                <div class="form-group">
                  <label class="label">Username</label>
                  <div class="input-group">
                    <input
                      v-model="formLogin.email"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="label">Password</label>
                  <div class="input-group">
                    <input
                      v-model="formLogin.password"
                      type="password"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-group"></div>
                <div class="form-group">
                  <button
                    class="btn btn-primary submit-btn btn-block"
                    @click="onLogin"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    mapActions
} from 'vuex'

export default {
  layout:'default',
  name:'login',
  data() {
    return {
      formLogin: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    year() {
      const d = new Date()
      return d.getFullYear()
    },
  },
  methods: {
    ...mapActions({
            login: 'auth/loginPing'
        }),

    // eslint-disable-next-line require-await
    async onLogin() {
        this.login(this.formLogin)
    },
  },
  created() {
  }
}
</script>