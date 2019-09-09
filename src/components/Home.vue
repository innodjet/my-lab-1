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
    		  <div class="card-body" style="padding: 25px;" >
    		    <h5 class="card-title" v-show= "$store.state.edit_mode === false " ><i class="fas fa-edit"></i> Post</h5>
            <h5 class="card-title" v-show= "$store.state.edit_mode === true " ><i class="fas fa-edit"></i> Edit post</h5>
    		    <div class="form-group row" >
    			    <div class="col-sm-12" >
    			      <textarea type="text" 
                          row="8" 
                          v-model="$store.state.post" 
                          style="height: 90px;"
                          placeholder="add a post..." 
                          class="form-control" id="post"> </textarea>
    			    </div>
    			  </div>
            <div class="form-group row" >
              <div class="col-sm-12" v-show= "$store.state.edit_mode === false " >
                <div class="button-group" id="post-grp-button">
                    <button type="button" id="del" 
                            @click="cancel" class="btn btn-default btn-sm"><i class="fa fa-window-close"></i> Cancel </button>
                    <button id="post-btn" 
                            @click="post" 
                            type="button" 
                            v-scroll-to="'#nav'" 
                            class="btn btn-info btn-sm"><i class="fas fa-paper-plane"></i> Post </button>
                </div>
              </div>
              <div class="col-sm-12" v-show= "$store.state.edit_mode === true ">
                  <div class="button-group" id="post-grp-button">
                    <button type="button" id="del" 
                            @click="cancel" 
                            class="btn btn-default btn-sm"><i class="fa fa-window-close"></i> Cancel </button>
                    <button id="edit" 
                            @click="confirmEdit" 
                            type="button" 
                            v-scroll-to="'#nav'" 
                            class="btn btn-default btn-sm"><i class="fa fa-window-edit"></i> Edit </button>
                  </div>
              </div>
            </div>
    		  </div>
  		</div>
  		<div class="card-body"
           id="card-body-item-content" 
           v-for="(item,index) in $store.state.data_to_display" v-bind:key="index">
  		  <div class="card-body" id="card-body-item">
          <ul class="media-list">
              <li class="media"  style="margin-left: -40px;">
                <a href="#">
                  <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle">
                </a>
                <div class="media-body">
                    <strong class="text-success"> {{ item.username }} </strong>
                    <span class="text-muted pull-right">
                        <small class="text-muted">{{ formatDate(item.date_posted) }}</small>
                    </span>
                    <p>
                      {{ unescapeData(item.post) }}
                    </p>
                </div>
              </li>
          </ul>
          <div class="row">
            <div class="col-sm-12"  >
              <div class="postBtnGrp" > 
                <button id="like" 
                        @click="like(item)" 
                        type="button" 
                        class="btn btn-default btn-sm"><i class="fa fa-thumbs-up"></i> Like ({{ item.total_like }}) </button>
                <!-- <button id="comment" 
                        v-scroll-to="'#nav'" 
                        type="button" 
                        @click="comment(item)" 
                        class="btn btn-default btn-sm"><span class="glyphicon glyphicon glyphicon-comment"></span>  Comment (12) </button> -->
                <button type="button" id="del" 
                        @click="del(item)" 
                        v-show="item.userId == sessionUserId"
                        class="btn btn-default btn-sm"><i class="fas fa-trash-alt"></i> Delete </button>
                <button id="edit" 
                        @click="edit(item)" 
                        v-show="item.userId == sessionUserId"
                        v-scroll-to="'#nav'" type="button" 
                        class="btn btn-default btn-sm"><i class="fas fa-edit"></i> Edit </button>
              </div>
            </div>
          </div>
          <div class="row bootstrap snippets" id="comment-section" v-show="$store.state.show_comment == true" >
            <div class="col-md-12 col-md-offset-2 col-sm-12" style="padding: 0px;">
                <div class="comment-wrapper">
                    <div class="panel panel-info">
                        <div class="panel-heading">  </div>
                        <div class="panel-body">
                            <textarea class="form-control" 
                                      placeholder="write a comment..." 
                                      rows="3"></textarea>
                            <br>
                            <button type="button" 
                                    class="btn btn-info pull-right" 
                                    style="padding: 0px;"
                                    id="post-btn"><i class="fa fa-paper-plane"></i> Post</button>
                            <div class="clearfix"></div>
                            <hr>
                            <ul class="media-list" style="margin-left: 20px;">
                                <li class="media">
                                    <a href="#" class="pull-left">
                                      <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle">
                                    </a>
                                    <div class="media-body">
                                        <span class="text-muted pull-right">
                                            <small class="text-muted">30 min ago</small>
                                        </span>
                                        <strong class="text-success">@MartinoMont</strong>
                                        <strong style="float: right;">
                                          <i class="fas fa-trash-alt"></i>
                                          <i class="fas fa-edit"></i>
                                        </strong>
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                          Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                                        </p>
                                    </div>
                                </li>
                                <li class="media">
                                    <a href="#" class="pull-left">
                                        <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" class="img-circle">
                                    </a>
                                    <div class="media-body">
                                        <span class="text-muted pull-right">
                                            <small class="text-muted">30 min ago</small>
                                        </span>
                                        <strong class="text-success">@LaurenceCorreil</strong>
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                          Lorem ipsum dolor <a href="#">#ipsumdolor </a>adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                                <li class="media">
                                    <a href="#" class="pull-left">
                                        <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" class="img-circle">
                                    </a>
                                    <div class="media-body">
                                        <span class="text-muted pull-right">
                                            <small class="text-muted">30 min ago</small>
                                        </span>
                                        <strong class="text-success">@JohnNida</strong>
                                        <p>
                                          Lorem ipsum dolor <a href="#">#sitamet</a> sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
          </div>
  		  </div>
  		</div>
      <div class="pages">
        <nav aria-label="..." >
          <ul class="pagination" >
            <li v-bind:class="$store.state.page_selected === 1 ? 'page-item disabled' : 'page-item'" 
                v-show="$store.state.total_pages > 1" >
              <a class="page-link" href="#" v-scroll-to="'#nav'" @click="previous" > < </a>
            </li>
            <li v-for="index in $store.state.total_pages" 
                v-bind:key="index"
                v-bind:class="$store.state.page_selected === index ? 'page-item active' : 'page-item'" >
              <a class="page-link" href="#" v-scroll-to="'#nav'" @click="pageSelected(index)"> {{ index }} </a>
            </li>
            <li v-bind:class="$store.state.page_selected === $store.state.total_pages ? 'page-item disabled' : 'page-item'" 
                v-show="$store.state.total_pages > 1">
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
      'pageSelected',
      'comment',
      'like'
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
    width: 80px;
    background-color: #007bff;
    color: #ffff
  }
  #like {
    border: 1px solid #d1ecf1;
  }
  #like:hover {
    background-color: #d1ecf1;
  }
  #comment{
    border: 1px solid #d4edda;
  }
  #comment:hover {
    background-color: #d4edda;
  }
  #del{
    border: 1px solid #dc3545;
    width: 80px;
    background-color: #dc3545;
    color: #ffff
  }
  #post-btn{
    width: 80px;
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
    margin-bottom: 15px;
  }
  #card-body-item-content {
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
  #date_posted {
    font-size: 7px;
  }
  #comment-section {
    margin: 20px 0px;
  }
  .img-circle{
    border-radius: 0%;
    width: 45%;
  }
  .media-body {
    margin-left: -40px;
  }
</style>
