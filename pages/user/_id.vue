<template>
  <div>
    <div class="form-group row">
      <label class="col-md-2 col-form-label">User Name</label>
      <div class="col-md-6">
        <input type="text" v-model="userName" class="form-control" />
      </div>
    </div>

    <div class="form-group row">
      <label for="gender" class="col-md-2 col-form-label">Gender</label>
      <div class="col-md-6">
        <select name id class="form-control" v-model="gender">
          <option value="0">0</option>
          <option value="1">1</option>
        </select>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">Phone</label>
      <div class="col-md-6">
        <input type="text" v-model="phone" class="form-control" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">Password</label>
      <div class="col-md-6">
        <input type="password" v-model="password" class="form-control" placeholder="●●●●●●●●●" />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">Birthday</label>
      <div class="col-md-6">
        <b-calendar v-model="birthday" locale="en-US"></b-calendar>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">Email</label>
      <div class="col-md-6">
        <input type="text" v-model="email" class="form-control" disabled />
      </div>
    </div>

    <div class="form-group row">
      <label class="col-md-2 col-form-label">Avatar</label>
      <div class="col-md-6">
        <b-form-file v-model="fileUpload" plain name="fileName"></b-form-file>
      </div>
      <img :src="avatar" alt class="imgAvatarEvent" />
    </div>

    <div class="form-group form-update">
      <button class="btn btn-primary" v-on:click="updateUser()">Update</button>
    </div>
  </div>
</template>

<script>
export default {
    layout:'wrapper',
    data(){
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth() - 2)
      minDate.setDate(15)
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 2)
      maxDate.setDate(15)
      return{
        birthday:'',
        min:minDate,
        max:maxDate,
        userName:null,
        phone:null,
        email:null,
        fileUpload:null,
        avatar:null,
        gender:null,
        password:null
      }
    },
    methods:{
      async getDetailUser(){
        const {data} = await this.$axios.get('/cms/user/detail-user/' + this.$route.params.id);
        this.userName = data.userName
        this.phone = data.phone
        this.gender = data.gender
        this.email = data.email
        this.birthday = data.birthday
        this.avatar = data.avatar
      },
      async updateUser(){
        console.log(this.fileUpload)
        let bodyFormData = new FormData();
        bodyFormData.append('userName',this.userName)
        bodyFormData.append('phone',this.phone)
        bodyFormData.append('avatar',this.fileUpload)
        bodyFormData.append('birthday',this.birthday)
        bodyFormData.append('gender',this.gender)
        if(this.password){
          bodyFormData.append('password',this.password)
        }
        const promise = await this.$axios.post('/cms/user/update-user/' + this.$route.params.id,bodyFormData);
        this.getDetailUser()
      },
      formatDate(value) {
        if (!value) return
        var date = new Date(value);
        if (!isNaN(date.getTime())) {
          var day = date.getDate().toString();
          var month = (date.getMonth() + 1).toString();
          return date.getFullYear() + ' 年 ' + (month[1] ? month : '0' + month[0]) + ' 月 ' + (day[1] ? day : '0' + day[0]) + ' 日 ';
        }
      },
    },
    created(){
      this.getDetailUser()
    }
}
</script>
<style>
.imgAvatarEvent {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>