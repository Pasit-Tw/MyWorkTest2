<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="PayID" :counter="6" :rules="IDRules" label="กรอกหมายเลขบัตรประชาชน" required></v-text-field>

    <v-container>
      <v-row>
        
         <v-text-field v-model="PayName" label="ชื่อ" :rules="PayNameRules" required></v-text-field>
         <v-text-field v-model="PayLName" label="นามสกุล" :rules="PayLNameRules" required></v-text-field>
      </v-row>
    </v-container>

    <v-text-field v-model="PayPrice" label="ยอดเงิน" required :rules="PayPriceRules"></v-text-field>

    <v-text-field v-model="PayTell" label="เบอร์โทรศัพท์" :rules="PayTellIdRules" required></v-text-field>
    <v-menu max-width="290">
    <template v-slot:activator="{ on }">
    <v-text-field :value="due" label="วันที่ชำระเงิน" prepend-icon="" :rules="dueRules" v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="due"></v-date-picker>
    </v-menu>


    <!-- <v-text-field v-model="address"  label="บ้านเลขที่" required></v-text-field> -->

    <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="ประเภทห้อง" required>
    </v-select>

    <!-- <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="เห็นด้วยมั้ย?" required></v-checkbox> -->
    <v-file-input v-model="file" accept="payment/*" label="File input" :rules="PicRules" show-size></v-file-input>
    
  

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">
      Summit
    </v-btn>
    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">success</v-card-title>

          <v-card-text>
            ได้ทำการอัพโหลดเรียบร้อยแล้วครับ !!
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

  </v-form>

</template>

<script>
import format from 'date-fns/format'
  import {
    db
  } from '@/plugins/firebaseConfig'
  import {
    storageRef
  } from '~/plugins/firebaseConfig.js'

  export default {
    data: () => ({  
      startDate:'',
      endDate:'',
      PayID: '',
       IDRules: [
          v => !!v || 'ใส่หมายเลขบัตรประชาชนเท่านั้น',
          v => (v && v.length == 13) || 'ใส่หมายเลขบัตรประชาชน'
        ],
      payment: 'payment',
      file: null,
      imageUrl: null,
      allFile: [],
      dialog: false,
      dialog2: false,
      due: null,
      due2:null,
      PayTell: '',
      picker: new Date().toISOString().substr(0, 10),
      pickers:null,
      // address: '',
      valid: true,
      PayName: '',
      PayLName: '',
      TimeRules: [
        v => !!v || 'ต้องใส่ ชื่อ นามสกุล',
        v => (v && v.length <= 35) || 'ใส่ไม่เกิน 35 ตัวอักษร'
      ],
       dueRules: [
        v => !!v || 'ต้องเลือกวันที่',
        v => (v && v.length >= 3) || 'ต้องเลือกวันที่']
        ,PicRules: [
      ],
      PayIDRules: [
        v => !!v || ' Payment ID is required',
        v => (v && v.length <= 6) || 'ใส่ไม่เกิน 6 ตัว'
      ],PayNameRules: [
        v => !!v || ' Payment ID is required',
        v => (v && v.length <= 30) || 'ใส่ไม่เกิน 30 ตัวอักษร'
      ],PayLNameRules: [
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
      PayPrice: '',
      // emailRules: [
      //     v => !!v || 'E-mail is required',
      //     v => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมล',
      // ],
      // name: '',
      // nameRules: [
      //     v => !!v || 'เบอร์โทร',
      //     v => (v && v.length <= 10) || 'กรุณาใส่หมสยเลขโทรศัพท์',
      // ],
      select: null,
      items: [
        'StandRoom',
        'DeluxRoom',
        'SweetRoom',
      ],
      checkbox: false,
    }),

    methods: {

      addMember() {
        // console.log(this.memberid)
        // console.log(this.membername)
        // console.log(this.tell)
        // console.log(this.mail)
        // console.log(this.address)
        // console.log(this.select)
        // db.collection("newmem").add({
        db.collection(this.payment).doc(this.PayID).set({
            PayID: this.PayID,
            PayTell: this.PayTell,
            //  address: this.address,
            PayName: this.PayName,
            PayPrice: this.PayPrice,
            PayRoom: this.select,
            startDate:this.due,
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
          this.upload()
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
    },
    computed: {
      isComplete() {
        return this.username && this.password && this.email;
      },
    }
  }

</script>
