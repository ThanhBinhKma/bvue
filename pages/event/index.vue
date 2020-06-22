<template>
  <div>
    <div class="row">
    <form class="w-100">
      <div class="form-group col-3 float-left">
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <b-button class="ml-1">
        <i class="fas fa-search"></i>
      </b-button>
    </form>
  </div>
    <b-row>
      <b-col sm="12" lg="12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" v-for="field in fields" :key="field.key">{{ field.k }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.title}}</td>
              <td>{{item.assistant}}</td>
              <td>{{item.author}}</td>
              <td>
               {{item.avatar}}
                </td>
              <td>{{item.category}}</td>
              <td>
                <a href class="btn btn-primary">
<i class="far fa-trash-alt"></i>
                  
                </a>
                <button class="btn btn-danger" @click.prevent="$router.push('/event/' + item.id)">
                  <i class="far fa-edit"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12">
        <b-pagination
          class="paginate-event"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
  <!-- Main table element -->
</template>
<script>
import axios from '../../plugins/axios';
export default {
    layout: 'wrapper',
  data() {
    return {
        fields:[
            {k:"id"},
            {k:"title"},
            {k:"assistant"},
            {k:"author"},
            {k:"avatar"},
            {k:"category"},
            {k:"Action"},
        ],
        items:[
            
        ],
        totalRows:3,
        currentPage:1,
        perPage:3
   };
  },
  mounted() {
    this.myProvider()
  },
  methods:{
      async myProvider(){
        const {data} = await this.$axios.get('cms/get-page-event')
        this.items = data.data.content
        this.totalRows = data.data.pageable.totalRow
        console.log(data);
        
        // this.perPage = data.data.pageable.pageSize
        this.currentPage = data.data.pageable.pageIndex
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
</style>
