<template>
    <div>
        <b-row>
            <b-col sm="12" lg="12">
                <b-card title header-tag="header" footer-tag="footer">
                    <b-table 
                        id="my-table"
                        :items="items"
                        :current-page="currentPage"
                        :per-page="perPage"
                        small
                    >
                    <template v-slot:cell(id)="data">
                        <a :href="`hjojo1`">{{data.value}}</a>
                    </template>
                    </b-table>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="6">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    >
                </b-pagination>
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
</style>
