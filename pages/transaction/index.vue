<template>
  <div class="form-content">
    <b-table id="my-table" :items="items" :fields="fields">
      <template v-slot:cell(userName)="data">
        <a
          class="hover-authorName"
          v-on:click="$router.push('user/' + data.item.userId)"
        >{{data.item.userName}}</a>
      </template>
      <template v-slot:cell(eventName)="data">
        <a
          class="hover-authorName"
          v-on:click="$router.push('event/' + data.item.eventId)"
        >{{data.item.eventName}}</a>
      </template>

      <template v-slot:cell(amount)="data">
        <p>{{formatNumber(data.item.amount)}}</p>
      </template>
      <template v-slot:cell(action)="data">
        <button
          class="btn btn-danger button-edit"
          @click.prevent="$router.push('/transaction/' + data.item.id )"
        >
          <i class="far fa-edit"></i>
        </button>
      </template>

      <template v-slot:cell(createdAt)="data">
        <p>{{ formatDate(data.item.createdAt)}}</p>
      </template>
    </b-table>

    <div class="overflow-auto pagination-custom">
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
            {key:"amount"},
            {key:"currency"},
            {key:"eventName"},
            {key:"createdAt"},
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
    watch: {
    'currentPage' (val) {
      this.myProvider()
    }  
  },
  methods:{
      async myProvider(){
        const {data} = await this.$axios.get('/cms/get-page-transaction?pageIndex=' + this.currentPage + "&pageSize=" + this.perPage)
        this.items = data.content
        this.totalRows =data.pageable.totalRow
      },
      formatDate(value) {
            if (!value) return
            var date = new Date(value);
            if (!isNaN(date.getTime())) {
                var day = date.getDate().toString();
                var month = (date.getMonth() + 1).toString();
                return date.getFullYear() + ' 年 ' +
                    (month[1] ? month : '0' + month[0]) + ' 月 ' + (day[1] ? day : '0' + day[0]) + ' 日 ';
            }
        },
        formatNumber(value) {
      if (value === undefined) return
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
         },
        created(){
          this.myProvider()
        }
};
</script>
<style scope>
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

.form-content {
  padding-bottom: 50px;
}
.form-content input {
  width: 30%;
  float: left;
  margin-right: 10px;
}

.table > thead > tr > th {
  width: calc(100% / 5);
  background-color: #c3c3bb;
  color: #000000;
  text-transform: uppercase;
  line-height: 1.625;
  font-weight: 500;
  font-size: 15px;
}

</style>
