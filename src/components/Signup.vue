<template>
  <div>
    <div class="container">

      <div class="alert alert-danger" v-show="$store.state.sign_up.error != '' " role="alert">
        {{ $store.state.sign_up.error }}
      </div>

      <div class="alert alert-primary" role="alert" v-show= "$store.state.loading_status === true" >
        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
        Please wait...
      </div>

      <div class="alert alert-primary" role="alert" id="signUpSuccess" v-show= "$store.state.sign_up.success !== ''" >
        {{ $store.state.sign_up.success }}
      </div>


      <div class="alert alert-primary" role="alert" v-show= "$store.state.sign_up.redirectMessage !== '' " >
        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
        {{ $store.state.sign_up.redirectMessage }}
      </div>
  
      <div class="card">
        <h5 class="card-header"><i class="fas fa-registered"></i> Sign Up</h5>
        <div class="card-body">
         <form>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
              <span class="required">*</span> First Name</label>
              <div class="col-sm-10">
                  <input type="text" 
                         class="form-control" 
                         v-model="$store.state.sign_up.first_name"
                         v-on:keyup="onKeyUp({ id: 'inputFirstName' , data : $store.state.sign_up.first_name })"
                         id="inputFirstName" 
                         placeholder="First Name">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
              <span class="required">*</span> Last Name</label>
              <div class="col-sm-10">
                   <input type="text" 
                          class="form-control" 
                          v-model="$store.state.sign_up.last_name"
                          v-on:keyup="onKeyUp({ id: 'inputLastName' , data : $store.state.sign_up.last_name })"
                          id="inputLastName" 
                          placeholder="Last Name">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
              <span class="required">*</span> Email</label>
              <div class="col-sm-10">
                   <input type="text" 
                          class="form-control" 
                          v-model="$store.state.sign_up.email"
                          v-on:keyup="onKeyUp({ id: 'inputEmail' , data : $store.state.sign_up.email })"
                          id="inputEmail" 
                          placeholder="Email">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
              <span class="required">*</span> Username</label>
              <div class="col-sm-10">
                   <input type="text" 
                          class="form-control" 
                          v-model="$store.state.sign_up.username"
                          v-on:keyup="onKeyUp({ id: 'inputUsername' , data : $store.state.sign_up.username })"
                          id="inputUsername" 
                          placeholder="Username">
              </div>
            </div>
            <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">
            <span class="required">*</span> Password</label>
            <div class="col-sm-10">
                <input type="password" 
                       class="form-control" 
                       v-model="$store.state.sign_up.password"
                       v-on:keyup="onKeyUp({ id: 'inputPassword' , data : $store.state.sign_up.password })"
                       id="inputPassword" 
                       placeholder="Password">
            </div>
            </div>
            <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">
            <span class="required">*</span> Confirm Password</label>
            <div class="col-sm-10">
                <input type="password" 
                       class="form-control" 
                       v-model="$store.state.sign_up.confirm_password"
                       v-on:keyup="onKeyUp({ id: 'inputConfirmPassword' , data : $store.state.sign_up.confirm_password })"
                       id="inputConfirmPassword" 
                       placeholder="Confirm Password">
            </div>
            </div>
            <div class="form-group row" id="btngrp">
              <button class="btn btn-outline-danger my-2 my-sm-0" id="btnCancel" @click="signUpCancel" type="submit"><i class="fa fa-window-close"></i> Cancel</button>
              <button class="btn btn-outline-warning my-2 my-sm-0" id="btnSignUp" @click="signUp" type="submit"><i class="fas fa-registered"></i> Sign up</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  // import axios from 'axios';
  export default {
    name: 'Login',
    mounted() {
      // load initial state asynchronously (from server)
    },
    computed: mapGetters([
      'evenOrOdd'
    ]),

    methods: mapActions([
      'signUp',
      'signUpCancel',
      'onKeyUp'
    ]),
  };
</script>

<style scoped>
  #btnCancel, 
  #btnSignUp {
    margin-left: 10px;
    width: 101px;
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



