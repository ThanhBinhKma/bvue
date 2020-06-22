<template>
<div>
    <b-form-group>
        <b-form-input v-model="name"></b-form-input>
        <b-button-group>Search</b-button-group>
    </b-form-group>
    <b-table
    id="my-table"
    :items="myProvider"
    :per-page="perPage"
    :current-page="currentPage"
    :fields="fields"
    >
    <template v-slot:cell(avatar)="data">
        <img :src="data.item.avatar" alt="" class="avatar-event">
    </template>
        <template v-slot:cell(action)="data">
            <button v-on:click="deleteEvent(data.item.id)" class="btn btn-primary" v-if="data.item.flaq === true">
                <i class="far fa-trash-alt"></i>   
            </button>
            <button v-on:click="deleteEvent(data.item.id)" class="btn btn-info" v-else>
                <i class="fas fa-trash-restore"></i>
            </button>
            <button class="btn btn-danger" @click.prevent="$router.push('/event/' + data.item.id )">
                <i class="far fa-edit"></i>
            </button>
        </template>
    </b-table>

  <div class="overflow-auto">
    <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
    >
    
    </b-pagination>
  </div>
</div>
</template>
<script>
import axios from '../../plugins/axios';
export default {
    layout: 'wrapper',
  data() {
    return {
        fields:[
            {key:"id"},
            {key:"title"},
            {key:"author"},
            {key:"avatar"},
            {key:"category"},
            {key:"endDate"},
            {key:"action"},
        ],
        items:[
            
        ],
        totalRows:3,
        currentPage:1,
        perPage:3
   };
  },
  methods:{
      async myProvider(ctx){
        const {data} = await this.$axios.get('cms/get-page-event?pageIndex=' +  ctx.currentPage )
        this.items = data.data.content
        let items  = data.data.content
        this.totalRows = data.data.pageable.totalRow
        this.perPage = data.data.pageable.pageSize
        return items;
        // t
        // this.currentPage = data.data.pageable.pageIndex
      },
      async deleteEvent(e){
          const {dataDelete} = await this.axios.post('cms/delete-event/' ,{
              params : {
                  eventId  : e
              }
          } )
          console.log(dataDelete)
      }
  }
};
</script>
<style>
.paginate-event {
  justify-content: center;
}
.page-item.active .page-link{
  background-color: #66615B;
  border-color:#66615B;
}
.avatar-event{
    width: 50px;
    height: 50px;
    object-fit: cover;
}
</style>
