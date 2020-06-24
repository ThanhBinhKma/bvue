<template>
  <div>
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
            <input type="number" id="participant" class="form-control" v-model="participant" />
          </div>
        </div>
        <div class="col-3 col-md-3">
          <div class="form-group">
            <label for="price">Price:</label>
            <input type="number" id="price" class="form-control" v-model="participantMax" />
          </div>
        </div>

        <div class="col-3 col-md-3">
          <div class="form-group">
           <b-form-select v-model="categorySelect" :options="category" value-field="id"  text-field="name"></b-form-select>
          </div>
        </div>

        <div class="col-3 col-md-3">
          <div class="form-group">
            <b-form-select
              v-model="authorSelect"
              :options="options"
              value-field="id"
              text-field="userName"
            >

            </b-form-select>
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
          <b-form-file v-model="fileUpload" plain="" name="fileName"></b-form-file>
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
        participant:'',
        participantMax:'',
        fileUpload:null,
        category:[
          
        ],

        options: [],
        value:[],
        fileName:"",
        userId:[],
        dataEvent:null,
        categorySelect:null,
        authorSelect:null
        }
    },
    methods:{
        async detailEvent(){
            const {data} =  await this.$axios.get('cms/get-event/' + this.$route.params.id);
            this.title = data.data.title
            this.participant = data.data.participant
            this.participantMax= data.data.participantMax
            this.endTime = data.data.endDate
            this.startTime = data.data.startDate
            this.fileName = data.data.avatar
            console.log(data)

            const dataCategory = await this.$axios.get('event/list-category');
              console.log(dataCategory)
            dataCategory.data.data.forEach(categoryData => {
              this.category.push(categoryData)
            });
            
            const dataUser = await this.$axios.post('user/list-user');
            console.log(dataUser)
            dataUser.data.data.content.forEach(element => {
              this.options.push(element)
            });
            
        },
        onContext(ctx) {
            this.context = ctx
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