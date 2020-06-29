<template>
  <div class="infoUser row">
    <div class="avatar-box col-4 text-center">
      <div class="form-group">
        <img :src="avatar" alt class="imgAvatarEvent" />
        <b-form-file v-model="fileUpload" plain name="fileName"></b-form-file>
      </div>
      <div class="form-group form-update text-center">
        <button class="btn btn-update" v-on:click="updateUser()">Update</button>
      </div>
    </div>
    <div class="info-box col-8">
      <b-form-group
        id="fieldset-1"
        label="User Name"
        label-for="input-1"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
      >
        <b-form-input id="input-1" v-model="userName" :state="state" trim></b-form-input>
      </b-form-group>
      <div class="form-group">
        <label>Email</label>
        <input type="text" v-model="email" class="form-control" disabled />
      </div>
      <b-form-group
        id="fieldset-1"
        label="Phone"
        label-for="input-1"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
      >
        <b-form-input id="input-1" v-model="phone" :state="state" trim></b-form-input>
      </b-form-group>
      <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <label>Birthday</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="birthday"
              v-on:change="myProvider"
            ></b-form-datepicker>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for>Gender</label>
            <b-form-select v-model="gender" :options="options" label="Gender"></b-form-select>
          </div>
        </div>
      </div>
      <b-form-group id="fieldset-1" label="Password" label-for="input-3">
        <b-form-input id="input-3" v-model="password" trim placeholder="●●●●●●●●●"></b-form-input>
      </b-form-group>
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
        options:[
          0,
          1
        ],
        max:maxDate,
        userName:'',
        phone:'',
        email:null,
        fileUpload:null,
        avatar:null,
        gender:null,
        password:null
      }
    },
    computed:{
      state() {
        return this.userName.length >= 4 ? true : false
      },
      invalidFeedback() {
        if (this.userName.length > 4) {
          return ''
        } else if (this.userName.length > 0 || this.phone.length > 0) {
          return 'Enter at least 4 characters'
        } else {
          return 'Please enter something'
        }
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