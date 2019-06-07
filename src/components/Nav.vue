<template>
  <div>
    <!-- Image and text -->
    <nav class="navbar navbar-light bg-light" id="nav" >
      <router-link to="/">
        <a class="navbar-brand" href="#">
          <img src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" 
               width="30" 
               height="30" 
               class="d-inline-block align-top" alt=""
          >
        </a>
      </router-link>
      <form class="form-inline">
        <router-link to="/Login" v-show="isSessionActive === false">
          <button class="btn btn-outline-info my-2 my-sm-0" id="btnNavLogin" type="submit">Login</button>
        </router-link>
        <button class="btn btn-outline-success my-2 my-sm-0" 
                v-show="isSessionActive === true"
                id="btnNavWelcome" type="submit">Welcome! {{ $store.getters.sessionUsername  }}</button>
        <button class="btn btn-outline-danger my-2 my-sm-0" 
                v-show="isSessionActive === true"
                id="btnNavLogout" @click="logout" type="submit">Logout</button>
        <router-link to="/Signup" v-show="isSessionActive === false" >
          <button class="btn btn-outline-warning my-2 my-sm-0" id="btnNavSignUp" type="submit">Sign up</button>
        </router-link>

      </form>
    </nav>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Nav',
    mounted() {
      // load initial state asynchronously (from server)
    },
    computed: mapGetters([
      'isSessionActive',
      'sessionUsername'
    ]),

    methods: mapActions([
      'logout'
    ]),
  };
</script>

<style scoped>
  #btnNavSignUp,
  #btnNavLogin,
  #btnNavLogout {
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
  #btnNavWelcome{
    border: 0px;
  }
</style>



