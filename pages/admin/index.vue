<template>
  <section>
    <h1>Admin</h1>
  </section>
</template>

<script>
import { auth } from "@/plugins/firebaseConfig.js";
import Cookie from "js-cookie";
export default {
  layout: 'admin',
  methods: {
    
    async logout() {
      await auth.signOut();
      await Cookie.remove("access_token");
      location.href = "/";
    }
  }
};
</script>
