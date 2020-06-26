<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for>To User</label>
          <multiselect
            v-model="value1"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a tag"
            label="userName"
            track-by="userName"
            :options="options"
            :taggable="true"
            @tag="addTag1"
            v-on:change="onChangeSelect()"
          ></multiselect>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for>From User</label>
          <input type="text" class="form-control" v-model="fromUser" disabled />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for>Amount Take</label>
          <input type="text" class="form-control" v-model="amountTake" v-on:change="changeAmount()" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for>Amount Sent</label>
          <input type="text" class="form-control" v-model="amountSent" v-on:change="changeAmount()" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for>Total Amount</label>
          <input type="text" class="form-control" v-model="totalAmount" disabled />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customSwitch1"
            v-if="status === true"
            v-model="status"
            checked
          />
          <input
            type="checkbox"
            class="custom-control-input"
            id="customSwitch1"
            v-if="status === false"
            v-model="status"
          />
          <label class="custom-control-label" for="customSwitch1">Status</label>
        </div>
      </div>
    </div>

    <div class="row">
      <button
        class="btn btn-primary"
        v-on:click="updateBill()"
        v-if="this.$route.params.id === 'create' "
      >Create</button>
      <button class="btn btn-primary" v-on:click="updateBill()" v-else>Update</button>
    </div>
  </div>
</template>

<script>
export default {
    layout:'wrapper',
    data(){
        return{
          options:[],
          value1:[],
          fromUser:localStorage.getItem('auth.userName'),
          amountSent:null,
          amountTake:null,
          totalAmount:null,
          totalRemain:null,
          status:null,
          id:null
        }
    },
    methods:{
        async getDetailBill(){
          if(this.$route.params.id === 'create'){
            const dataUser = await this.$store.dispatch('user/getList');
            dataUser.content.forEach(element => {
            this.options.push(element)
          });
          }else{
          const {data} = await this.$axios.get('/cms/get-billing/' + this.$route.params.id)
          this.id = this.$route.params.id
          this.amountTake = data.amountTake
          this.totalAmount = data.totalAmount
          this.totalRemain = data.totalRemain
          this.amountSent = data.amountSent
          this.status = data.status
          
          const dataUser = await this.$store.dispatch('user/getList');
          dataUser.content.forEach(element => {
            // console.log(element)
            if(data.toUser === element.id){
              this.value1.push(element)
            }
            if(data.fromUser === element.id){
              this.fromUser = element.userName
            }
            console.log(123)
              this.options.push(element)
          });
          }
      },
      addTag1 (newTag) {
          const tag = {
            id:newTag
        }
      this.options.push(tag)
      this.value1.push(tag)
      },
      changeAmount:function(){
        this.totalAmount = parseInt(this.amountSent) + parseInt(this.amountTake)
      },
      async updateBill(){
        if(this.id){
          const update = await this.$axios.post('/cms/save-billing',{
            id:this.id,
            toUser:this.value1[0].id,
            amountSent:this.amountSent,
            amountTake:this.amountTake,
            totalAmount:this.totalAmount,
            status:this.status
          })
        }else{
          console.log(this.value1.id)
          const update = await this.$axios.post('/cms/save-billing',{
            toUser:this.value1.id,
            amountSent:this.amountSent,
            amountTake:this.amountTake,
            totalAmount:this.totalAmount,
            status:this.status
          })
        }
      }

    },
    created(){
        this.getDetailBill();
    }
}
</script>