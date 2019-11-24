<template>
  <div id="app">
    <Navigation />
    <router-view 
    class="container" 
    :user="user" 
    @logout="logout"
    />
  </div>
</template>

<script>

import Firebase from "firebase";
import Navigation from "@/components/Navigation.vue";
import db from "./db.js";

export default {
  name: "app",
  data: function() {
    return {
      user: null
    };
  },
  methods: {
    logout: function() {
      Firebase.auth()
      .signOut()
      .then( () => {
        this.user = null;
        this.$router.push("login");
      })
    }
  },
  //DOM Is Ready and Placed Inside the Page
  //It fits the data into the template and creates the renderable element
  //Replaces the DOM element with this new data filled element
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
      }
    });
    db.collection("users")
      .doc("zIseQPqzo0ZIai05DRwF")
      .get()
      .then(snapshot => {
        this.user = snapshot.data().name;
      });
  },
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
$primary: #594b95;
$secondary:  #aa4b4c;
$danger: #dc1559;
$info: #3353a5;
$link-color: #594b95;
$link-hover-color: #aa4b4c;
$body-color: #2f205a;

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2f205a;
  a {
    &:hover {
      text-decoration: none;
    }
  }
}

#nav {
  padding: 30px;
  line-height: 1.5rem;

  a {
    font-weight: bold;
    color: #594b95;
    text-decoration: none;
    font-size: 1.5rem;

    &:hover {
      color: #aa4b4c;
      font-size: 1.25rem;
    }

    &.router-link-exact-active {
      color: #a6699e;
    }
  }
}
@import "node_modules/bootstrap/scss/bootstrap";
</style>
