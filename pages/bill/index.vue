<template>
  <div class="form-content">
    <b-form-group>
      <b-form-input v-model="name"></b-form-input>
      <!-- <b-button v-on:click="searchEvent">Search</b-button> -->
    </b-form-group>
    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
    >
      <template v-slot:cell(STT)="data">
        <p>{{data.index}}</p>
      </template>
      <template v-slot:cell(avatar)="data">
        <img :src="data.item.avatar" alt class="avatar-event" />
      </template>
      <template v-slot:cell(action)="data">
        <button class="btn btn-danger" @click.prevent="$router.push('/bill/' + data.item.id )">
          <i class="far fa-edit"></i>
        </button>
      </template>

      <template v-slot:cell(startdate)="data">
        <p>{{ formatDate(data.item.startDate)}}</p>
      </template>

      <template v-slot:cell(enddate)="data">
        <p>{{ formatDate(data.item.endDate)}}</p>
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
            {key:"id"},
            {key:"toUser"},
            {key:"fromUser"},
            {key:"amountSent"},
            {key:"amountTake"},
            {key:"totalAmount"},
            {key:"totalRemain"},
            {key:"status"},
            {key:"action"}
        ],
        items:[
            
        ],
        totalRows:3,
        currentPage:1,
        perPage:10,
        name:""
   };
  },
  methods:{
      async myProvider(){
        const {data} = await this.$axios.get('/cms/get-page-billing?' + this.currentPage + "&pageSize=" + this.perPage)
        this.items = data.content
        this.totalRows =data.pageable.totalRow
          console.log(data)
      },
        // this.currentPage = data.data.pageable.pageIndex
     
      async searchEvent(){
      },
      formatDate(value) {
            if (!value) return
            var date = new Date(value);
            if (!isNaN(date.getTime())) {
                var day = date.getDate().toString();
                var month = (date.getMonth() + 1).toString();
                return 'nam: ' + date.getFullYear() + ' thang: ' +
                    (month[1] ? month : '0' + month[0]) + ' ngay: ' + (day[1] ? day : '0' + day[0]);
            }
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
