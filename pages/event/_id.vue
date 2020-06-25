<template>
  <div>
    <div class="row">
      <div class="col-6 col-md-6">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" class="form-control" v-model="title" />
        </div>
      </div>
      <div class="col-3 col-md-3">
        <div class="form-group">
          <label for="participant">Participant:</label>
          <input type="number" id="participant" class="form-control" v-model="participant" />
        </div>
      </div>
      <div class="col-3 col-md-3">
        <div class="form-group">
          <label for="participantMax">Participant Max:</label>
          <input type="number" id="participantMax" class="form-control" v-model="participantMax" />
        </div>
      </div>

      <div class="col-3 col-md-3">
        <div class="form-group">
          <label for="price">Price</label>
          <input type="text" id="price" class="form-control" v-model="price" />
        </div>
      </div>

      <div class="col-3 col-md-3">
        <div class="form-group">
          <b-form-select
            v-model="categorySelect"
            :options="category"
            value-field="id"
            text-field="name"
          ></b-form-select>
        </div>
      </div>

      <div class="col-3 col-md-3">
        <div class="form-group">
          <b-form-select
            v-model="authorSelect"
            :options="options"
            value-field="id"
            text-field="userName"
          ></b-form-select>
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-3 col-md-3">
        <div class="block">
          <span class="demonstration">Start time</span>
          <el-date-picker v-model="startTime" type="date" placeholder="Start time"></el-date-picker>
        </div>
      </div>

      <div class="col-3 col-md-3">
        <div class="block">
          <span class="demonstration">End Time</span>
          <el-date-picker v-model="endTime" type="date" placeholder="End time"></el-date-picker>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-3 col-md-3">
        <b-form-file v-model="fileUpload" plain name="fileName"></b-form-file>

        <img :src="avatarEvent" alt="" class="imgAvatarEvent">
      </div>

      <div class="col-3 col-md-3">
        <label class="typo__label">Assistant</label>
        <multiselect
          v-model="value"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="userName"
          track-by="userName"
          :options="options"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
          v-on:change="onChangeSelect()"
        >
          <template slot="option" slot-scope="assistants">{{assistants.option.userName}}</template>
        </multiselect>
      </div>

      <div class="col-3 col-md-3">
        <label for>Description</label>
        <textarea v-model="description"></textarea>
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
        price:null,
        endTime: '',
        title: '',
        participant:'',
        participantMax:'',
        fileUpload:null,
        category:[],
        options: [],
        value:[],
        fileName:"",
        userId:[],
        dataEvent:null,
        categorySelect:null,
        authorSelect:null,
        description:null,
        avatarEvent:null
        }
    },
    methods:{
        async detailEvent(){
            const {data} =  await this.$axios.get('cms/get-event/' + this.$route.params.id);
            this.title = data.title
            this.participant = data.participant
            this.participantMax= data.participantMax
            this.endTime = data.endDate
            this.startTime = data.startDate
            this.fileName = data.avatar
            this.price = data.price
            let participant = data.participant
            participant  = (participant) ? participant.split(",") : ""
            this.categorySelect = data.category
            this.authorSelect = data.author
            this.description = data.description
            this.avatarEvent = data.avatar

            const dataCategory = await this.$axios.get('event/list-category');
            dataCategory.data.forEach(categoryData => {
              this.category.push(categoryData)
            });
            const dataUser = await this.$axios.post('user/list-user');
            dataUser.data.content.forEach(element => {
              if(participant.indexOf("" + element.id + "") !== -1){
                this.value.push(element)
              }
              this.options.push(element)
            });
            
        },
        onContext(ctx) {
            this.context = ctx
        },
        
       async updateEvent(){
          this.value.forEach(element => {
            this.userId.push(""+element.id+"")
          });
          let bodyformData  = new FormData();
          console.log(this.fileUpload)
          bodyformData.set('avatar',this.fileUpload);
          bodyformData.set('id',this.$route.params.id);
          bodyformData.set('assistant',this.userId.toString());
          bodyformData.set('startDate',this.startTime);
          bodyformData.set('endDate',this.endTime);
          bodyformData.set('endDate',this.endTime);
          bodyformData.set('title',this.title);
          bodyformData.set('participantMax',this.participantMax);
          bodyformData.set('description',this.description);
          bodyformData.set('price',this.price);
          const PromiseValue = await this.$axios.post('/event/update-event',bodyformData)
        
          this.detailEvent()
        },
          addTag (newTag) {
            const tag = {
              id:newTag
          }
        this.options.push(tag)
        this.value.push(tag)
      }
    },
    created(){
        this.detailEvent()
    }
}
</script>

<style>
  .imgAvatarEvent{
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
</style>