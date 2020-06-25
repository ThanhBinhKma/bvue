<template>
  <div>
    <div class="row">
      <div class="col-3">
        <div class="form-group">
          <label for>User Name</label>
          <input type="text" v-model="userName" class="form-control" />
        </div>
        <h2>hihi</h2>
      </div>

      <div class="col-3 col-md-3">
        <div class="form-group">
          <label for="gender">Gender</label>
          <select name id class="form-control">
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-3 col-md-3">
        <div class="form-group">
          <label for="">Phone</label>
          <input type="text" v-model="phone" class="form-control">
        </div>
      </div>

      <div class="col-3 col-md-3">
        <div class="form-group">
          <label for="">Email</label>
          <input type="text" v-model="email" class="form-control">
        </div>
      </div>
    </div>


    <div class="row"> 
      <div class="col-3 col-md-3">
        <label for="">Avatar</label>
        <b-form-file v-model="fileUpload" plain name="fileName"></b-form-file>

        <img :src="avatar" alt="" class="imgAvatarEvent">
      </div>
    </div>
  <button class="btn btn-primary" v-on:click="updateUser()">Update</button>
  </div>
</template>

<script>
export default {
    layout:'wrapper',
    data(){
      return{
        userName:null,
        phone:null,
        email:null,
        fileUpload:null,
        avatar:null
      }
    },
    methods:{
      async getDetailUser(){
        const {data} = await this.$axios.get('/cms/user/detail-user/' + this.$route.params.id);
        this.userName = data.userName
        this.phone = data.phone
        this.email = data.email
        this.avatar = data.avatar
        console.log(data)
      },
      async updateUser(){
        let bodyFormData = new FormData();
        bodyFormData.set('userName',this.userName)
        bodyFormData.set('phone',this.phone)
        bodyFormData.set('avatar',this.avatar)
        bodyFormData.set('id',this.$route.params.id)
        const promise = await this.$axios.post('user/edit-profile',bodyFormData);
        console.log(promise)
      }
    },
    created(){
      this.getDetailUser()
    }
}
</script>
<style>
.imgAvatarEvent{
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
</style>