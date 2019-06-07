<template>
  <div>

  	<div class="container" >
        <div class="alert alert-primary" role="alert" v-show= "$store.state.loading_status === true" >
          <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
          Loading...
        </div>
        <div class="alert alert-primary" role="alert" v-show= "$store.state.message_status === true" >
          {{ $store.state.message }}
        </div>
        <div class="alert alert-danger" role="alert" v-show= "$store.state.error_status === true" > 
          {{ $store.state.error_message }} 
        </div>
    		<div class="card" v-show="isSessionActive === true" >
    		  <div class="card-body" style="padding: 40px;" >
    		    <h5 class="card-title" v-show= "$store.state.edit_mode === false " > Add Post</h5>
            <h5 class="card-title" v-show= "$store.state.edit_mode === true " > Edit Post</h5>

    		    <div class="form-group row" >
    			    <div class="col-sm-12" >
    			      <textarea type="text" 
                          row="8" 
                          v-model="$store.state.post" 
                          style="height: 150px;" 
                          class="form-control" id="post"> </textarea>
    			    </div>
    			  </div>

            <div class="form-group row" >
              <div class="col-sm-12" v-show= "$store.state.edit_mode === false " >
                <div class="button-group" id="post-grp-button">
                  <button type="button" id="del" @click="cancel" class="btn btn-default btn-sm"> Cancel </button>
                  <button id="edit" @click="post" type="button" v-scroll-to="'#nav'" class="btn btn-default btn-sm"> Post </button>
                </div>
              </div>
              <div class="col-sm-12" v-show= "$store.state.edit_mode === true ">
                  <div class="button-group" id="post-grp-button">
                    <button type="button" id="del" @click="cancel" class="btn btn-default btn-sm"> Cancel </button>
                    <button id="edit" @click="confirmEdit" type="button" v-scroll-to="'#nav'" class="btn btn-default btn-sm"> Edit </button>
                  </div>
              </div>
            </div>

    		  </div>
  		</div>

  		<div class="card-body"
           id="card-body-item-content" 
           v-for="(item,index) in $store.state.data_to_display" v-bind:key="index">
  		  <div class="card-body" id="card-body-item">
          <p class="card-text" style="color: #28a745;"> {{ item.username }} </p>
  		    <p class="card-text"> {{ unescapeData(item.post) }} </p>
          <div class="row">
            <div class="col-sm-4">
              <span class="card-text"> {{ formatDate(item.date_posted) }} </span>
            </div>
            <div class="col-sm-8" v-show="item.userId == sessionUserId" >
              <div class="postBtnGrp" > 
                <button type="button" id="del" @click="del(item)" class="btn btn-default btn-sm"> Delete </button>
                <button id="edit" @click="edit(item)" v-scroll-to="'#nav'" type="button" class="btn btn-default btn-sm"> Edit </button>
              </div>
            </div>
          </div>
  		  </div>
  		</div>

      <div class="pages">
        <nav aria-label="..." >
          <ul class="pagination" >
            <li v-bind:class="$store.state.page_selected === 1 ? 'page-item disabled' : 'page-item'" 
                v-show="$store.state.total_pages > 1"
            >
              <a class="page-link" href="#" v-scroll-to="'#nav'" @click="previous" > < </a>
            </li>
            <li v-for="index in $store.state.total_pages" 
                v-bind:class="$store.state.page_selected === index ? 'page-item active' : 'page-item'" >
              <a class="page-link" href="#" v-scroll-to="'#nav'" @click="pageSelected(index)"> {{ index }} </a>
            </li>
            <li v-bind:class="$store.state.page_selected === $store.state.total_pages ? 'page-item disabled' : 'page-item'" 
                v-show="$store.state.total_pages > 1"
            >
              <a class="page-link" href="#" v-scroll-to="'#nav'" @click="next" > > </a>
            </li>
          </ul>
        </nav>
      </div>
  		<div class="card" id="tech_info">
  		  <div class="card-header">
  		    Technologies
  		  </div>
  		  <div class="card-body">
  		    <h5 class="card-title"> Technologies used in this project: </h5>
  		    <p class="card-text"> VueJS Framework </p>
  		    <p class="card-text"> Front End: HTML 5, CSS 3, JavaScript, Bootstrap </p>
  		    <p class="card-text"> Back End: Node.js, ExpressJS and MySql </p>
  		    <a href="#" class="btn btn-primary"> Github Reposotory </a>
  		  </div>
  		</div>
  	</div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  // import axios from 'axios';
  export default {
    name: 'Home',
    mounted() {
      // load initial state asynchronously (from server)
      this.$store.dispatch('getPostData');
    },
    computed: mapGetters([
      'hasInitialized',
      'unescapeData',
      'isSessionActive',
      'sessionUserId',
      'formatDate'
    ]),

    methods: mapActions([
      'add',
      'subtract',
      'post',
      'edit',
      'del',
      'confirmEdit',
      'cancel',
      'previous',
      'next',
      'pageSelected'
    ]),
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #post {
    margin-bottom: 15px;
  }
  #edit {
    border: 1px solid #007bff;
    width: 100px;
  }
  #edit:hover {
    background-color: #007bff;
    color: #ffff
  }
  #del{
    border: 1px solid #dc3545;
    width: 100px;
  }
  #del:hover{
    background-color: #dc3545;
    color: #ffff
  }
  .button-group{
    float: right;
  }
  .card {
    margin-top: 10px;
  }
  #tech_info{
    margin-bottom: 20px;
  }
  .pages {
    display: table;
    margin: 0 auto;
    margin-top: 15px;
  }
  #nav-bar {
   /* border-bottom: 1px solid #007bff;*/
    margin-bottom: 15px;
  }
  #card-body-item-content/*, 
  #card-body-item */ {
    border: 1px solid rgba(0,0,0,.125);
  }
  #card-body-item-content{
    margin-top: 15px;
  }
  #btn {
    margin-left: 10px;
    width: 100px;
  }
    .card {
    margin-top: 10px;
  }
  #btngrp {
     display: flex;
       justify-content: center;
  }
  .jumbotron {
    margin-top: 10px;
  }
  .container {
    margin-top: 10px;
  }
  #post-grp-button {
    float: right;
  }
  .postBtnGrp{
    float: right;
  }
</style>
