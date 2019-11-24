<template>
  <div class="home">
    <div class="text-center">
      <div v-if="user" class="text-center">
        Welcome Back
        <span class="font-weight-bold text-info">{{user}}</span>, 
        <a href="#" class="text-secondary" @click="$emit('logout')">log out </a>
      </div>
    </div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-10 col-lg-8 col-xl-7">
          <h4 class="display-4 text-primary mb-2">Meeting Log</h4>
          <p class="lead">This simple app creates meetings, allows people to check in, and picks random users to award giveaways. Built with <a href="https://vuejs.org/">Vue.js</a> and <a href="https://firebase.google.com">Firebase</a>.<font-awesome-icon icon="star" class="text-primary"></font-awesome-icon></p>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
          <router-link class="btn btn-outline-primary mr-3" to="/register" v-if="!user">Register</Router-link>
          <router-link class="btn btn-outline-primary mr-3" to="/login" v-if="!user">Log In</router-link>
          <router-link class="btn btn-primary" to="/meetings" v-if="user">Meetings</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import db from "../db.js"
export default {
  name: "home",
  data: function() {
    return {
      user: null
    }
  }, 
  //DOM Is Ready and Placed Inside the Page
  //It fits the data into the template and creates the renderable element
  //Replaces the DOM element with this new data filled element.
  mounted() {
    db.collection("users")
    .doc("zIseQPqzo0ZIai05DRwF")
    .get()
    .then(snapshot => {
      this.user = snapshot.data().name;
    })
  },
  components: {
    FontAwesomeIcon
  }
};
*/
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "home",
  props: ["user"],
  components: {
    FontAwesomeIcon
  }
};
</script>
