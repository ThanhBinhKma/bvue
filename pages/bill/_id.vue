<template>
  <div>
    <div class="row">
      <div class="form-group">
        <label for>To User</label>
        <multiselect
          v-model="value"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="userName"
          track-by="userName"
          :options="options"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
          v-on:change="onChangeSelect()"
        ></multiselect>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    layout:'wrapper',
    data(){
        return{
            options:[],
            value1:[]
        }
    },
    methods:{
        async getDetailBill(){
            const {data} = await this.$axios.get('/cms/get-billing/' + this.$route.params.id)
            const dataUser = await this.$store.dispatch('user/getList');
            dataUser.data.content.forEach(element => {
                this.options.push(element)
            });
            console.log(dataUser.data)
        },
        addTag (newTag) {
            const tag = {
              id:newTag
          }
        this.options.push(tag)
        this.value.push(tag)
        }
    },
    created(){
        this.getDetailBill();
    }
}
</script>