<template>
  <div>
    <div class="container">
      <div class="alert alert-danger" v-show="$store.state.login.error != '' " role="alert">
        {{ $store.state.login.error }}
      </div>
      <div class="alert alert-primary" role="alert" v-show= "$store.state.loading_status === true" >
        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
        Please wait...
      </div>
      <div class="card">
        <h5 class="card-header"><i class="fas fa-sign-in-alt"></i> Login</h5>
        <div class="card-body">
          <form>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">
                <span class="required">*</span><i class="fas fa-user"></i> Username</label>
                <div class="col-sm-10">
                  <input  type="text" 
                          class="form-control" 
                          v-model="$store.state.login.username"
                          v-on:keyup="onKeyUp({ id: 'inputUsername' , data : $store.state.login.username })"                         
                          id="inputUsername" 
                          placeholder="Username">
                </div>
              </div>
              <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
              <span class="required">*</span><i class="fas fa-key"></i>  Password</label>
              <div class="col-sm-10">
                <input type="password" 
                       class="form-control" 
                       v-model="$store.state.login.password"
                       v-on:keyup="onKeyUp({ id: 'inputPassword' , data : $store.state.login.password })"
                       id="inputPassword" 
                       placeholder="Password">
              </div>
              </div>
              <div class="form-group row" id="btngrp">
                <button class="btn btn-outline-danger my-2 my-sm-0" 
                        id="btnLoginCancel" 
                        @click="cancelLogin" 
                        type="button"><i class="fa fa-window-close"></i> Cancel</button>
                <button class="btn btn-outline-info my-2 my-sm-0" 
                        id="btnLoginLogin" 
                        @click="login" 
                        type="submit"><i class="fas fa-sign-in-alt"></i> Login</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'Login',
    mounted() {
      // load initial state asynchronously (from server)
    },
    computed: mapGetters([
      'evenOrOdd'
    ]),

    methods: mapActions([
      'login',
      'cancelLogin',
      'onKeyUp'
    ]),
  };
</script>

<style scoped>
  #btnLoginCancel,
  #btnLoginLogin {
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
  .required {
    color: #ba2629;
  }
</style>



