<template>
    <div>
        <div class="container">
            <div class="my-5">
                <h2>Check Status</h2>
                <v-form inline>
                    <v-text-field id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="searchcode" placeholder="กรอกหมายเลขบัตรประชาชน" ></v-text-field>
                    <v-btn variant="primary" @click="search">Search</v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
  import {
    storageRef
  } from '@/plugins/firebaseConfig.js'
import {db
} from '@/plugins/firebaseConfig.js';
export default {
    data(){
        return{
            searchcode: ''
        }
    },
    methods:{
        search() {
            this.$router.push('Search/' + this.searchcode)
            /*var docRef = db.collection("SendPackage").doc(this.searchcode);

            docRef.get().then((doc) => {
                if (doc.exists) {
                console.log("Document data:", doc.data());
                } else {
                // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });*/

        }
    }

}
</script>

<style>

</style>
