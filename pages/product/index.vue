<template>
  <div class="container" :cols="10">
    <p>{{this.select}}</p>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="PersonID" label="รหัสบัตรประชาชน" :rules="IDRules" required></v-text-field>
      <v-text-field v-model="Name" :rules="nameRules" label="ชื่อ - นามสกุล" required></v-text-field>
      <v-menu max-width="290">
    <template v-slot:activator="{ on }">
    <v-text-field :value="due" label="Check in Date" prepend-icon="" :rules="dueRules" v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="due"></v-date-picker>
    </v-menu>

    <v-menu max-width="290">
    <template v-slot:activator="{ on }">
    <v-text-field :value="due2" label="Check Out Date" prepend-icon="" :rules="dueRules" v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="due2"></v-date-picker>
    </v-menu>
      <v-text-field v-model="tell" label="เบอร์โทร" :rules="PayTellIdRules"></v-text-field>
      <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="เลือกประเภทห้อง" required>
      </v-select>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">เพิ่มบริการ</v-btn>
    </v-form>
    <br />
    <div class="containered">
      <v-card class="mx-auto" v-for="prd in allproduct" :key="prd.id">
        <img class="card-img-top" :src="prd.image" alt height="200px" width="400px" />
        <div class="card-body">
          <h4 class="card-title">{{prd.id}} {{prd.name}}</h4>
          <p class="card-text">ราคาห้องต่อคืน:{{prd.price}}</p>
        </div>
        <div class="card-footer text-muted">
          <!-- <a href="/product/1">รายละเอียด</a> -->

          <v-btn :to="{ name: 'product-id', params: { id:prd.id} }"
            color="red" class="ma-2 white--text" @click="loader = 'loading3'">
            Detaill
            <v-icon right dark>mdi-heart</v-icon>
          </v-btn>
           <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">success</v-card-title>

          <v-card-text>
            ทำรายการเรียบ ร้อยท่านสามารถตรวจสอบสถานะได้ที่หน้าเว็ปไซต์  !!
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn color="green darken-1" text @click="dialog = false">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" max-width="290">
        <v-card>
          <v-card-title class="headline">Unsuccess</v-card-title>

          <v-card-text>
            ไม่สามารถทำการอัพโหลดได้เนื่องจากมีข้อมูลสูญหายหรือไม่ครบถ้วน !!
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn color="green darken-1" text @click="dialog2 = false">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

        </div>
      </v-card>
    </div>
    <br />
  </div>
</template>


<script>
  import {
    storageRef
  } from '@/plugins/firebaseConfig.js'
  import {
    db
  } from '@/plugins/firebaseConfig'
  export default {
    data() {
      //   เรียกใช้ store ตาม foder
      return {
        allproduct: this.$store.state.product.allproduct,
        PersonID: '',
        dialog:false,
        dialog2:false,
        due:'',
        price:1000, 
        name:'',
        Name:'',
        due2:'',
        tell: '',
        status:'รอชำระเงิน',
        perCheck:'perCheck',
        address: '',
        valid: true,
        items: [ '01 StanDard Room','02 StanDard Room','03 StanDard Room',
        ], IDRules: [
          v => !!v || 'ใส่หมายเลขบัตรประชาชนเท่านั้น',
          v => (v && v.length == 13) || 'ใส่หมายเลขบัตรประชาชน'
        ],
        nameRules: [
          v => !!v || 'ต้องใส่ ชื่อ นามสกุล',
          v => (v && v.length <= 35) || 'ใส่ไม่เกิน 35 ตัวอักษร'
        ],
        dueRules: [
          v => !!v || 'ต้องเลือกวันที่',
          v => (v && v.length >= 3) || 'ต้องเลือกวันที่'
        ],
        PayIDRules: [
          v => !!v || ' Payment ID is required',
          v => (v && v.length <= 6) || 'ใส่ไม่เกิน 6 ตัว'
        ],
        PayNameRules: [
          v => !!v || ' Payment ID is required',
          v => (v && v.length <= 30) || 'ใส่ไม่เกิน 30 ตัวอักษร'
        ],
        PayLNameRules: [
          v => !!v || ' Payment ID is required',
          v => (v && v.length <= 30) || 'ใส่ไม่เกิน 30 ตัวอักษร'
        ],
        PayTellIdRules: [
          v => !!v || 'Tell is required',
          v => (v && v.length == 10) || 'ต้องใส่หมายเลขเบอร์โทรศัพท์'
        ],
        PayPriceRules: [
          v => !!v || 'Tell is required',
          v => (v && v.length <= 10) || 'ใส่จำนวนเงินไม่เกิน 10 ตัวเลข'
        ],
        select: null,
      }
    },
    methods: {
      reloadPage() {
        window.location.reload()
      },
      addMember() {
        db.collection(this.perCheck).doc(this.PersonID).set({
            PersonID: this.PersonID,
            Name : this.Name,
            Tell: this.tell,
            startDate: this.due,
            endDate: this.due2,
            status:this.status,
            Room:this.select,


          })
          .then((docRef) => {
            this.dialog = true;
            //  console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
            this.dialog2 = false;
            vm.$forceUpdate();

          });

      },

      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.addMember()
          this.reset()

        }
      },
      reset() {
        this.$refs.form.reset()
      },
      upload() {
        // console.log('File: '+this.file.name);

        var uploadTask =
          storageRef.child('payment/' + this.file.name).put(this.file).then((snapshot) => {
            console.log('Uploaded1 a blob or file!');
          }).catch((error) => {
            console.log(error);
            vm.$forceUpdate();
          })
        // imagesRef.put(this.file).then(function (snapshot) {
        //     console.log('Uploaded2 a blob or file!');
        // });
      }
    ,
   

  }
  }
</script>


<style>
  .containered {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    text-align: center;
  }

</style>



<!--<template>
    <div>
        <div class="container">
            <div class="my-5">
                <h2>Track and Trace</h2>
                <b-form inline>
                    <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="searchcode" placeholder="ป้อนหมายเลยพัสดุ"></b-input>
                    <b-button variant="primary" @click="search">Search</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
import {
    db
} from '@/plugins/firebaseConfig.js';
export default {
    data(){
        return{
            searchcode: ''
        }
    },
    methods:{
        search() {
            this.$router.push('Track/' + this.searchcode)
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


<!--<template>
  <div class="container">
    <div class="row">
      <div>
        <v-card class="mx-auto" max-width="400" v-for="(item,index) in DataList" :key="index" >
          <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            <v-card-title class="pic-box" >{{item.NameRoom}}</v-card-title>
          </v-img>

          <v-card-subtitle class="box-vcard">ราคาต่อคืน = {{item.Price}}</v-card-subtitle>

          <v-card-text class="text--primary">
            <p>{{}}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              <nuxt-link :to="{name: 'product-id',params:{ id:item}}">Detail</nuxt-link>
            </v-btn>

            <v-btn color="orange" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    db
  } from '@/plugins/firebaseConfig.js'
  import {
    storageRef
  } from '@/plugins/firebaseConfig.js'
  import colors from 'vuetify/es5/util/colors';

  export default {
    data() {
      return {
        DataList: [],
        loading: false,
        selection: 1,

      }
    },
    methods: {
      get() {
        db.collection('AllRoom')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.DataList.push(doc.data())
            })
          })
      }
    },
    mounted() {
      this.get();

    },
  }

</script>

<style scoped>

</style> -->
-->
