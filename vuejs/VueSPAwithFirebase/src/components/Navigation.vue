<template>
  <div id="nav">
      <nav class="navbar navbar-expand-lg bg-light navbar-light">
          <div class="container-fluid">
                <img src="@/assets/bow.png" style="width:45px; margin-right: 2rem;"/>
                <router-link class="navbar-brand" to="/">Meeting Log</router-link>
                <div class="navbar-nav ml-auto">
                    <router-link class="nav-item nav-link" to="/login">Login</router-link>
                    <router-link class="nav-item nav-link" to="/meetings">Meetings</router-link>
                    <router-link class="nav-item nav-link" to="/register">Register</router-link> 
                </div>
        </div>
      </nav>
    </div>
</template>