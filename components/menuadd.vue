<template>
  <v-toolbar dense fixed class="main-header" color="rgb(0, 202, 202)" style="height:5rem;">
    <v-toolbar-items class="main-nav">
      <v-toolbar-title class="nav-links">
        <nuxt-link to="/" tag="li" class="nav-link"><a>Home</a></nuxt-link>
        <nuxt-link to="/admin/ShowPay" tag="li" class="nav-link"><a>Check Payment</a></nuxt-link>
        <nuxt-link to="/admin/update" tag="li" class="nav-link"><a>Check Status</a></nuxt-link>


      </v-toolbar-title>

    </v-toolbar-items>

    <v-toolbar-items class="sec-nav">
      <v-toolbar-title class="sign-link">
       <v-btn @click="logout">Log Out</v-btn>
      </v-toolbar-title>
    </v-toolbar-items>


  </v-toolbar>

</template>

<style scopped>
  .nav-link-custom {
    color: rgb(255, 255, 255)
  }

  .main-header {
    top: 0;
    left: 0;
    width: 100%;
    background: rgb(0, 202, 202);
    height: 2.5rem;
  }

  .main-nav {
    height: 100%;
  }

  .nav-links {
    list-style: none;
    margin-top:1rem;
    margin-left: 28.5rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .nav-link {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1rem;
    padding: 0.3rem;
  }


  .sec-nav {
    height: 100;
  }

  .sign-link {
    list-style: none;
    margin-left: 15rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .ml-5 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.1 rem;
    padding: 0.3rem;
  }



  .nav-link.nuxt-link-exact-active {
    border-bottom: 3px solid rgb(255, 177, 10);
  }


  .nav-link a {
    display: block;
    text-decoration: none;
    color: white;

  }

  .nav-link a:hover,
  .nav-link a:active,
  .nav-link.nuxt-link-exact-active a {
    color: goldenrod;
  }

  .dropdown-item a:hover,
  .dropdown-item a:active,
  .dropdown-item a {
    color: black;
  }

  .btn-outline-success {
    color: #07160a;
    border-color: #0e110f;
    border-top-color: rgb(4, 5, 5);
    border-right-color: rgb(3, 3, 3);
    border-bottom-color: rgb(5, 5, 5);
    border-left-color: rgb(3, 3, 3);
  }

</style>
<script>
  import {
    auth
  } from "@/plugins/firebaseConfig.js";
  import Cookie from "js-cookie";
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import {
    db
  } from '@/plugins/firebaseConfig.js'
  export default {
    data() {
      return {
        userList: [],
        loginUser: null,
        tokenG: '',
        disableSigin: false,
        userName: '',


      }

    },

      methods: {
    
    async logout() {
      await auth.signOut();
      await Cookie.remove("access_token");
      location.href = "/";
    }
  }
  }

</script>
