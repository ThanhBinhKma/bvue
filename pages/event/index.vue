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
              <td>{{item.name}}</td>
              <td>{{item.start_time}}</td>
              <td>{{item.end_time}}</td>
              <td>{{item.deadline}}</td>
              <td>{{item.total_unconfirm}}</td>
              <td>{{item.total_user}}</td>
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
            {k:"name"},
            {k:"start_time"},
            {k:"end_time"},
            {k:"deadline"},
            {k:"total_unconfirm"},
            {k:"total_user"},
            {k:"Action"},
        ],
        items:[
             {"id": 9,"name": "Oceane Boyle","start_time": "2020-06-01 20:04:00","end_time": "2020-06-05 20:04:00","deadline": "2020-06-02 23:56:00","total_unconfirm": 4,"total_user": 5},
            {"id": 10,"name": "Christy Rempel","start_time": "2020-05-28 10:04:00","end_time": "2020-05-31 10:04:00","deadline": "2020-05-30 08:09:00","total_unconfirm": 1,"total_user": 2},
            {"id": 11,"name": "Miss Rosemarie Nicolas I","start_time": "2020-06-07 09:20:00","end_time": "2020-06-14 09:20:00","deadline": "2020-06-12 13:26:00","total_unconfirm": 2,"total_user": 4}
        ],
        totalRows:3,
        currentPage:1,
        perPage:3
   };
  },
  methods:{
      myProvider(ctx){
          const promise = axios.get("/api/admin/users" + ctx.currentPage);
          console.log(promise + ">>>>");
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
