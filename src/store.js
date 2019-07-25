import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  obj1: {
    count: 0,
  },
  initialized: false,
  edit_mode: false,
  loading_status: false,
  error_status: false,
  message_status: false,
  post: '',
  post_data: [],
  total_pages: 0,
  page_selected: 1,
  mesage: '',
  error_message: '',
  data_to_update: '',
  data_to_display:[],
  uri: 'https://still-reaches-65516.herokuapp.com/', // API ACCESS URI
  home_uri: 'https://young-caverns-39863.herokuapp.com/',
  loginUri: 'https://young-caverns-39863.herokuapp.com/Login',
  app_users: '',
  login: {
    username: '',
    password: '',
    error: ''
  },
  sign_up: {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    error: '',
    success: '',
    redirectMessage: ''
  }
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.

/* eslint-disable no-param-reassign */
// function updateResourceInState(resourceState, resourceData) {
//   resourceState.count = resourceData.count;
// }

const getClockTime = (ol) => {
  var now    = _d(ol);
  var hour   = now.getHours();
  var minute = now.getMinutes();
  var ap = "AM";
  if (hour   > 11) { ap = "PM";             }
  if (hour   > 12) { hour = hour - 12;      }
  if (hour   == 0) { hour = 12;             }
  if (hour   < 10) { hour   = "0" + hour;   }
  if (minute < 10) { minute = "0" + minute; }
  var timeString = hour + ':' + minute + " " + ap;
  return timeString;
}

const monthNames = (ol) => {
  const monthNames = ['January', 'February', 'March', 
                      'April', 'May', 'June','July', 
                      'August', 'September', 'October', 
                      'November', 'December'];
  return monthNames[ol];
}

const weekDay = (ol) => {
  var weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  return  weekday[ol];
}

const _d = (ol) => {
  return new Date(ol);
}

const timedText = () => {
  setTimeout( () => { 
    state.sign_up.success = '';
    state.sign_up.redirectMessage = '';
    window.location.href  = state.loginUri;
  }, 5000);
}

const isEmailValid = (x) => {
  var regExp = /^([a-zA-Z0-9]+([\._-][a-zA-Z0-9]+)*)\@(\[?)([a-zA-Z0-9]+([\._-][a-zA-Z0-9]+)+)(\]?)+$/;
  return  regExp.test(x);
}

const setCookie = (cname,cvalue,exdays) =>  {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

////// Home ///////
const _ = (ol) => {
  return document.getElementById(ol);
}

const clear = () => {
  state.error_status = false;
  state.message_status = false;
  state.edit_mode = false;
  state.loading_status = false;
  state.error_message = '';
  _('post').style.border = '';
}

const clearAllStateErrors = () => {
  state.login.error = '';
  state.sign_up.error = '';
}

const dataToDisplay = (page_selected) => { 
  const start = ( page_selected * 5 ) - 5;
  const end   = ( page_selected * 5 ) > state.post_data.length? state.post_data.length : (page_selected * 5) ;
  state.data_to_display = [];
  state.post_data.forEach((item,index) => {
     if ( index >= start && index < end ) {
         state.data_to_display.push(item);
     }
  });
}

const mutations = {
  initialize(currentState, responseData) {
    updateResourceInState(state.obj1, responseData.data.obj1);
    state.initialized = true;
  },
  updateResource(currentState, responseData) {
    updateResourceInState(state.obj1, responseData.data.obj1);
  },
};

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {

  async getAppUsersData(context) {
    const res = await Vue.axios.get(state.uri+'getAppUsersData');
    state.app_users = await res.data;
    return Promise.resolve();
  },

  post(context) {
    clear();
    if (state.post != '') {
      state.loading_status = true;
      context.dispatch('createPostData' , { post: escape( state.post ) , poster: getCookie("userId") }).then( () => {
        state.post = '';
        context.dispatch('getPostData');
        state.loading_status = false;
        state.message = 'Your post have been successfully created';
        state.message_status = true;
      });
    } else {
      state.error_status = true;
      state.error_message    = 'A data is required to create a new post.';
      _('post').style.border = '1px solid #ba2629'; 
    }
  },
  
  edit(context,data) {
    clear();
    state.edit_mode = true;
    state.post = unescape(data.post);
    state.data_to_update = data;
  },

  confirmEdit(context) {
    clear();
    if (state.post != '') {
      state.loading_status = true;
      context.dispatch('updatePostData' , { data: escape(state.post) , id: state.data_to_update.id } ).then( () => {
        state.post = '';
        context.dispatch('getPostData');
        state.loading_status = false;
        state.message = 'Your post have been successfully updated';
        state.message_status = true;
        state.data_to_update = '';
      });
    } else {
      state.error_status = true;
      state.error_message = 'A data is required to create a new post.';
      _('post').style.border = '1px solid #ba2629'; 
    }
  },

  cancel(context) { 
    clear();
    state.edit_mode = false;
    state.post = '';
    state.data_to_update = '';
  },

  next(context) { 
   clear();
   event.preventDefault();
   if ( state.page_selected < state.total_pages) {
    state.page_selected++;
    dataToDisplay(state.page_selected);
   }
  },

  pageSelected(context , num) {
    clear();
    event.preventDefault();
    state.page_selected = num;
    dataToDisplay(state.page_selected);
  },

  previous(context) { 
    clear();
    event.preventDefault();
    if ( state.page_selected > 1) {
      state.page_selected--;
      dataToDisplay(state.page_selected);
    }
  },

  del(context,data) {
    clear();
    Vue.dialog
    .confirm('Please confirm to delete the data')
    .then( (dialog) => {
      state.loading_status = true;
      context.dispatch('deletePostData' , data.id ).then( () => {
        state.post = '';
        state.message = 'Your post have been successfully deleted';
        state.message_status = true;
        context.dispatch('getPostData');
        state.loading_status = false;
      });
    })
    .catch( () => {
      clear();
      state.loading_status = false;
    });
  },

  async getPostData(context) {
    state.loading_status = true;
    const res = await Vue.axios.get(state.uri+'getPost');
    const result = res.data;
    state.post_data = result;
    // Total number of pages
    state.total_pages = ((state.post_data.length % 5) == 0) ? 
                        (state.post_data.length / 5) : 
                        (parseInt(state.post_data.length / 5)) + 1;
    dataToDisplay(state.page_selected);
    state.loading_status = false;
    return Promise.resolve();
  },

  async createPostData (context , data) {
    const res = await Vue.axios.post(state.uri+'createPost', {title: 'test',data : data});
    const result = await res.data;
    if ( result == 'Success') 
      return Promise.resolve()  
    else 
      return Promise.reject();
  },

  async updatePostData(context , data) {
    const res =  await Vue.axios.put(state.uri+'updatePost', { data : data.data, id: data.id });
    const result = await res.data;
    if ( result == 'Success') 
      return Promise.resolve()  
    else 
      return Promise.reject();
  },

  async deletePostData(context , item_id) {
    const res = await Vue.axios.delete( state.uri+'deletePost', { data: { id: item_id } } );
    const result = res.data;
    if ( result == 'Success') 
      return Promise.resolve()  
    else 
      return Promise.reject();
  },

  ///////// Login //////////
  async login(context) {
    event.preventDefault();
    if ( state.login.username != ''  && 
         state.login.password != '' ) {
      state.login.error = '';
      // Check if credentials match what we have in the DB
      state.loading_status = true
      // Display error message in case username or password is not Valid
      const res = await Vue.axios.post(state.uri+'login', { data : state.login })
      const result = await res.data;
      if ( result.length > 0  ) {
        if ( res.data.length == 1 ) {
          setCookie("userId", res.data[0].user_id  , 1);
          setCookie("username", state.login.username , 1);
          window.location.href  = state.home_uri;
        } 
      } else {
        state.loading_status = false;
        state.login.error = 'The username or password is incorrect';
      }
    } else {
      state.loading_status = false;
      state.login.error = 'Please enter a username and password to Login';
      _('inputUsername').style.border = '1px solid #ba2629'; 
      _('inputPassword').style.border = '1px solid #ba2629'; 
    }
    return Promise.resolve();
  },

  cancelLogin(context) {
    event.preventDefault();
    state.loading_status = false;
    state.login.username = '';
    state.login.password = '' ;
    state.login.error = '';
    _('inputUsername').style.border = ''; 
    _('inputPassword').style.border = ''; 
  },

  ///////// Sign Up /////////
  onKeyUp (context , data) {
    if ( data.data == '' ) { 
      _(data.id).style.border = '1px solid #ba2629';  
    } else {
      clearAllStateErrors();
      _(data.id).style.border = '';
    }
  },

  async signUp(context) { 
    event.preventDefault();
    let rep = 0;
    state.loading_status = false;
    _('inputFirstName').style.border = ''; 
    _('inputLastName').style.border = ''; 
    _('inputEmail').style.border = '';
    _('inputUsername').style.border = '';
    _('inputPassword').style.border = '';
    _('inputConfirmPassword').style.border = '';
    if ( state.sign_up.first_name       == '' || 
         state.sign_up.last_name        == '' ||
         state.sign_up.email            == '' ||
         state.sign_up.username         == '' ||
         state.sign_up.password         == '' ||
         state.sign_up.confirm_password == '' ) {
      if ( state.sign_up.first_name == '' ) { _('inputFirstName').style.border = '1px solid #ba2629';  }
      if ( state.sign_up.last_name == '' ) { _('inputLastName').style.border = '1px solid #ba2629';  }
      if ( state.sign_up.email == '' ) { _('inputEmail').style.border = '1px solid #ba2629';  }
      if ( state.sign_up.username == '' ) { _('inputUsername').style.border = '1px solid #ba2629';  }
      if ( state.sign_up.password == '' ) { _('inputPassword').style.border = '1px solid #ba2629';  }
      if ( state.sign_up.confirm_password == '' ) { _('inputConfirmPassword').style.border = '1px solid #ba2629';  }
      state.sign_up.error = 'All the fields are required to sign up';
    } else { rep ++; }

    // Is email valid
    if ( isEmailValid(state.sign_up.email) == false  && rep == 1 ) {
      _('inputEmail').style.border = '1px solid #ba2629'; 
      state.sign_up.error = 'Invalid email address';
    } else { rep ++; }

    // Check password and confirm password match
    if ( (state.sign_up.password != state.sign_up.confirm_password) && rep == 2 ) {
      _('inputPassword').style.border = '1px solid #ba2629';
      _('inputConfirmPassword').style.border = '1px solid #ba2629';
      state.sign_up.error = 'The passwords do not match';
    } else { rep++; }

    // Next start sign Up step
    if ( rep == 3 ) {
      state.loading_status = true;
      context.dispatch('getAppUsersData').then( async () => {
        let emailExist = 0;
        // Verify if no one register with the email provided 
        for ( let i = 0; i < state.app_users.length; i++ ) {
          if ( state.app_users[i].email == state.sign_up.email ) {
            emailExist ++;
          }
        }

        if (emailExist > 0) {
          state.loading_status = false;
          _('inputEmail').style.border = '1px solid #ba2629'; 
          state.sign_up.error = 'The email address provided is already in use';
        } else { rep++; }

        let usernameExist = 0;
        // Verify if the username is not already in use
        if ( rep == 4 ) {
          for ( let j = 0; j < state.app_users.length; j++ ) {
            if ( state.app_users[j].username == state.sign_up.username ) {
              usernameExist  ++;
            }
          }

          if ( usernameExist  > 0) {
            state.loading_status = false;
            _('inputUsername').style.border = '1px solid #ba2629'; 
            state.sign_up.error = 'The username provided is already in use';
          } else { rep++; }
        }
        // Finally all checks are done we can safely save the data
        if ( rep == 5 ) {
          const res = await Vue.axios.post(state.uri+'signUp', { data : state.sign_up });
          const result = await res.data;
          if ( result == 'Success') {
            state.loading_status  = false;
            state.sign_up.success = 'You successfully sign up to the application.';
            state.sign_up.redirectMessage = 'Please wait while we are redirecting you to the login page...';
            timedText();
          } 
          return Promise.resolve();
        }
      });
    }
  },

  signUpCancel(context) {
    event.preventDefault();
    state.loading_status = false;
    _('inputFirstName').style.border = ''; 
    _('inputLastName').style.border = ''; 
    _('inputEmail').style.border = '';
    _('inputUsername').style.border = '';
    _('inputPassword').style.border = '';
    _('inputConfirmPassword').style.border = '';
    state.sign_up.first_name = '';
    state.sign_up.last_name = '';
    state.sign_up.email = '';
    state.sign_up.username = '';
    state.sign_up.password = '';
    state.sign_up.confirm_password = '';
    state.sign_up.error = '';
  },

  logout(context) {
    event.preventDefault();
    setCookie("userId", "" , 0);
    setCookie("username", "" , 0);
    window.location.href  = state.home_uri;
  } 
  
}; 

// getters are functions
const getters = {
  hasInitialized() {
    return state.initialized;
  },
  unescapeData: () =>( x ) =>  {
    return unescape(x);
  },
  isSessionActive: () => {
    if (  getCookie("username") != '' && 
          getCookie("userId") != '') { return true } else { return false }
  },
  sessionUsername: () => {
    return getCookie("username");
  },
  sessionUserId: () => {
    return getCookie("userId");
  },
  formatDate: () => ( x ) => {
    return 'Posted On: ' + ((x).substr(0,11)).replace(/-/g,'/') + 'At: ' + getClockTime(x);
  }
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
