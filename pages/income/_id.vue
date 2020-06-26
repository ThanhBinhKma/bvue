<template>
  <div class="form-content">
    <b-form-group>
      <div class="block">
          <span class="demonstration">Start time</span>
          <el-date-picker v-model="from" type="date" placeholder="Start time" v-on:change="myProvider"></el-date-picker>
        </div>

        <div class="block">
          <span class="demonstration">Start time</span>
          <el-date-picker v-model="to" type="date" placeholder="Start time" v-on:change="myProvider"></el-date-picker>
        </div>
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
        <button class="btn btn-danger" @click.prevent="$router.push('/transaction/' + data.item.id )">
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
            {key:"userName"},
            {key:"type"},
            {key:"amount"},
            {key:"cardNumber"},
            {key:"currency"},
            {key:"eventName"},
            {key:"holderName"},
            {key:"createdAt"}
        ],
        items:[
            
        ],
        totalRows:3,
        currentPage:1,
        perPage:10,
        name:"",
        from:null,
        to:null,
   };
  },
  methods:{
      async myProvider(){
        const {data} = await this.$axios.post('/cms/get-detail-income?',{
            pageIndex:this.currentPage,
            pageSize:10,
            userId:this.$route.params.id,
            from:this.from,
            to:this.to

        })
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
