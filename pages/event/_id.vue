<template>
  <div>
    <form>
      <div class="row">
        <div class="col-6 col-md-6">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" class="form-control" v-model="title"/>
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
            <span class="demonstration">Start time</span>
            <el-date-picker v-model="startTime" type="date" placeholder="Start time"></el-date-picker>
          </div>
        </div>

        <div class="col-3 col-md-3">
          <div class="block">
            <span class="demonstration">End Time</span>
            <el-date-picker v-model="endTime" type="date" placeholder="End time"> </el-date-picker>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-3 col-md-3">
          <span>Avatar</span>
          <input type="file"  v-on:change="onchangeFile" class="form-control">
        </div>

        <div class="col-3 col-md-3">
          <label class="typo__label">Tagging</label>
          <multiselect
            v-model="value"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a tag"
            label="userName" track-by="userName"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
            v-on:change="onChangeSelect()"
            >
              <template slot="option" slot-scope="props">
                {{props.option.userName}}
              </template>
            </multiselect>
        </div>
      </div>
      
    </form>
    <button class="btn btn-primary" v-on:click="updateEvent()">Update</button>
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
        startTime: '',
        endTime: '',
        title: '',
        fileUpload:null,
        options: [],
        value:[],
        userId:[]
        }
    },
    methods:{
        async detailEvent(){
            const {data} =  await this.$axios.get('cms/get-event/' + this.$route.params.id);
            console.log(data)
            const dataUser = await this.$axios.post('user/list-user');
            dataUser.data.data.content.forEach(element => {
              this.options.push(element)
            });
            
        },
        onContext(ctx) {
            this.context = ctx
        },
        onchangeFile:function (e) {
          this.fileUpload = e.target.files[0]
        },
        updateEvent:function(){
          // console.log(this.title + '>>>>>' + this.endTime + '>>>>' + this.startTime)
          console.log('====================================');
          console.log(this.fileUpload);
        this.value.forEach(element => {
            this.userId.push(""+element.id+"")
        });
        console.log(this.userId)
        },
          addTag (newTag) {
      const tag = {
        id:newTag
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    onChangeSelect:function(){
      console.log(this.tag)
    }
    },
    created(){
        this.detailEvent()
    }
}
</script>