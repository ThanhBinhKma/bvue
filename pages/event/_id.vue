<template>
  <div>
    <form>
      <div class="row">
        <div class="col-6 col-md-6">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" class="form-control" />
          </div>
        </div>
        <div class="col-3 col-md-3">
          <div class="form-group">
            <label for="participant">Participant Max:</label>
            <input type="number" id="participant" class="form-control" />
          </div>
        </div>
        <div class="col-3 col-md-3">
          <div class="form-group">
            <label for="price">Price:</label>
            <input type="number" id="price" class="form-control" />
          </div>
        </div>

        <div class="col-3 col-md-3">
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" class="form-control">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
            </select>
          </div>
        </div>

        <div class="col-3 col-md-3">
          <div class="form-group">
            <label for="author">Author</label>
            <select id="author" class="form-control">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-3 col-md-3">
          <div class="block">
            <span class="demonstration">Default</span>
            <el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
    layout:'wrapper',
    data(){
        return {
             pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        }
    },
    methods:{
        async detailEvent(){
            const {data} =  await this.$axios.get('cms/get-event/' + this.$route.params.id);
            console.log(data)
        },
        onContext(ctx) {
            this.context = ctx
        }
    },
    created(){
        this.detailEvent()
    }
}
</script>