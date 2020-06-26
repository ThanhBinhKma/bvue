<template>
  <div>
    <div class="row">
      <div class="col-3 col-md-3">
        <p>User: {{userName}}</p>
      </div>

      <div class="col-3 col-md-3">
          <p>Amount: {{amount}}</p>
      </div>

      <div class="col-3 col-md-3">
          <p>Currency: {{currency}}</p>
      </div>

      <div class="col-3 col-md-3">
          <p>Event: {{eventName}}</p>
      </div>

      <p>Created: {{createdAt}}</p>
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
            eventName:null,
            currency:null,
            amount:null,
            userName:null,
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
           this.eventName = data.eventName
           this.currency =data.currency
           this.amount = data.amount
           this.userName = data.userName
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