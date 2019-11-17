<template>
  <div id="app">
    <Navigation />
    <router-view class="container" />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  name: "app",
  components: {
    Navigation
  }
};
</script>

<style lang="scss">

$primary: #594b95;
$danger: #DC1559;
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
