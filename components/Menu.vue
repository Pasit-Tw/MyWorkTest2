<template>
  
<v-toolbar dense fixed class="main-header"
  color="rgb(0, 202, 202)"
  style="height:5rem;"
  >
    <v-toolbar-items class="main-nav">
      <v-toolbar-title class="nav-links" >
        <nuxt-link to="/" tag="li" class="nav-link"><a>Home</a></nuxt-link>
         <nuxt-link to="/product" tag="li" class="nav-link"><a>Booking</a></nuxt-link>
        <nuxt-link to="/Search" tag="li" class="nav-link"><a>Check Status</a></nuxt-link>
        <nuxt-link to="/Payment" tag="li" class="nav-link"><a>Payment</a></nuxt-link>
         <nuxt-link to="/contact" tag="li" class="nav-link"><a>Contact</a></nuxt-link>
        
       
      </v-toolbar-title>       
      
    </v-toolbar-items>

    <v-toolbar-items class="sec-nav">
      <v-toolbar-title class="sign-link">
        <p>StrongHotel</p>
      </v-toolbar-title>
    </v-toolbar-items>
    
    
  </v-toolbar>

</template>

<style scopped>
.nav-link-custom
{
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
    margin-top:1rem;
    list-style: none;
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


  .sec-nav{
    height: 100;
  }

  .sign-link{
    list-style: none;
    margin-top:1rem;
    margin-left: 15rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
    
  .ml-5{
     height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.1 rem;
    padding: 0.3rem;
  }
  


  .nav-link.nuxt-link-exact-active {
    border-bottom: 3px solid rgba(7, 160, 14, 0.884);
  }


  .nav-link a {
    display: block;
    text-decoration: none;
    color: white;

  }
  .nav-link a:hover,
  .nav-link a:active,
  .nav-link.nuxt-link-exact-active a {
    color:  rgba(7, 160, 14, 0.884);
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
import firebase from 'firebase/app'
import 'firebase/auth'
import {db} from '@/plugins/firebaseConfig.js'
export default {
   data(){
        return{
            userList:[],
            loginUser:null,
            tokenG: '',
            disableSigin:false,
            userName:'',


        }
        
    }, 
    methods: {
       
       }}
 

</script>


<!--
<template>
   <nav class="navbar navbar-expand-sm navbar-light bg-light">
       <a class="navbar-brand" href="#">CS MJU</a>
       <button 
       class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" 
        aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
       </button>
       
       <div class="collapse navbar-collapse" id="collapsibleNavId">
           <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
               <li class="nav-item active">
                   <nuxt-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></nuxt-link>
               </li>
               
               <li class="nav-item">
                   <nuxt-link to="/about" class="nav-link">About Us</nuxt-link>
               </li>
               <li class="nav-item">
                   <nuxt-link to="/room&service" class="nav-link">Room&service</nuxt-link>
               </li>
               <li class="nav-item">
                   <nuxt-link to="/booking" class="nav-link">Booking</nuxt-link>
               </li>
               <li class="nav-item">
                   <nuxt-link to="/Map&Direction" class="nav-link">Map & Direction</nuxt-link>
               </li>
               <li class="nav-item">
                   <nuxt-link to="/ContactUs" class="nav-link">Contact Us</nuxt-link>
               </li>
           </ul>
           
       </div>
   </nav>
</template>
-->