<template>
  <div>
    <div class="row">
      <div class="col-3 col-md-3">
        <label for>User</label>
        <input type="text" v-model="userId">
      </div>

      <div class="col-3 col-md-3">
          <label for="">Amount</label>
          <input type="text" v-model="amount">
      </div>

      <div class="col-3 col-md-3">
          <input type="text" v-model="currency">
      </div>

      <div class="col-3 col-md-3">
          <input type="text" v-model="eventId">
      </div>

      <input type="text" v-model="createdAt">
    </div>
  </div>
</template>

<script>
export default {
    layout:"wrapper",
    data(){
        return{
            options:[],
            value:null,
            eventId:null,
            currency:null,
            amount:null,
            userId:null,
            createdAt:null
        }
    },
    methods:{
        async getDetailTransaction(){
            const {data}= await this.$axios.get('/cms/get-transaction/'+ this.$route.params.id);
            const promise =await this.$axios.post('/user/list-user')
           console.log(promise.data)
           promise.data.content.forEach(element => {
               this.options.push(element)
           });
           this.eventId = data.eventId
           this.currency =data.currency
           this.amount = data.amount
           this.userId = data.userId
           this.createdAt = data.createdAt
        },
         addTag (newTag) {
            this.value = newTag.id
        },
        updateTransaction:function(){
            
        }
    },
    created(){
        this.getDetailTransaction()
    }
}
</script>