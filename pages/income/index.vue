<template>
  <div class="form-content">
    <b-table id="my-table" :items="items" :fields="fields">
      <template v-slot:cell(userName) = "data">
        <a v-on:click="$router.push('user/' + data.item.id)" class="hover-authorName">{{data.item.userName}}</a>
      </template>
      <template v-slot:cell(action)="data">
        <button
          class="btn btn-danger"
          @click.prevent="$router.push('/income/' + data.item.userId )"
        >
          <i class="far fa-edit"></i>
        </button>
      </template>
    </b-table>

    <div class="overflow-auto pagination-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
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
        {key:"userName"},
        {key:"email"},
        {key:"income"},
        {key:"action"}
      ],
      items:[],
      totalRows:3,
      currentPage:1,
      perPage:10,
      name:""
   };
  },
  watch: {
    'currentPage' (val) {
      this.myProvider()
    }  
  },
  methods:{
    async myProvider(){
      const {data} = await this.$axios.get('/cms/get-page-income?pageIndex=' + this.currentPage + "&pageSize=" + this.perPage)
      this.items = data.content
      this.totalRows =data.pageable.totalRow
    },
  },
  created(){
    this.myProvider()
  }
};
</script>
<style>
.paginate-event {
  justify-content: center;
}
.page-item.active .page-link {
  background-color: #66615b;
  border-color: #66615b;
}
.avatar-event {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.pagination-center {
  display: flex;
  justify-content: center;
}
.page-link {
  color: #66615b;
}
.form-content {
  padding-bottom: 50px;
}
.form-content input {
  width: 30%;
  float: left;
  margin-right: 10px;
}
</style>
