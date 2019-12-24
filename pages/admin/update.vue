<template >

  <div class="container" :cols="10">
      
    <h1>Check Status</h1>
    <v-form class="row" ref="form" v-model="valid" lazy-validation>
      
      <v-dialog v-model="dialogcom" width="600px">
                  <div>
                    <v-card v-for="gets in UserList" :key="gets">
                      <v-container>
                        <v-row>
                          <v-col>
                            <v-card>
                              <v-card-title class="fill-height align-end">{{gets.PersonID}}</v-card-title>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-card-text>{{gets.Text}}</v-card-text>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </div>
                </v-dialog>
                <!-- add ข้อมูล -->
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                      <v-btn v-on="on"
        :disabled="!valid" color="success" class="mr-4" >Update Status!!</v-btn>
                  </template>
                  
                  <v-card>
                    <v-card-title>
                      <span class="headline">Update Item</span>
                    </v-card-title>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="PersonIDadd" label="PersonID"  :rules="IDRules" required ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                          <v-select v-model="select" :items="status" :rules="[v => !!v || 'โปรดระบุให้ถูกต้อง']" label="ประเภทห้อง" required>
    </v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-card-actions>
                        <v-btn
                          color="success"
                          class="mr-4"
                          @click="validate()"
                        >Save</v-btn>
                        <v-btn color="blue" class="mr-4" @click="dialog = false">Close</v-btn>
                      </v-card-actions>
                      

                    </v-form>
                  </v-card>
                </v-dialog>
                <!-- add ข้อมูล -->
                
    </v-form>
    
    <div class="text-center" style="margin-top:2rem;"> 
           <v-simple-table >
    <template v-slot:default >
      <thead>
        <tr>
          <th class="text-center">Person ID</th>
          <th class="text-center">Name</th>
          <th class="text-center">วันที่จะเข้าพัก</th>
           <th class="text-center">วันที่จะออก</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody v-for="get in UserList" :key="get">
        <tr>
          <td class="A">{{get.PersonID}}</td>
          <td class="A">{{get.Name}}</td>
          <td class="A">{{get.startDate}}</td>
          <td class="A">{{get.endDate}}</td>
          <td class="A">{{get.status}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>  
<v-row justify="center">
      <v-dialog v-model="log" max-width="290">
        <v-card>
          <v-card-title class="headline">success</v-card-title>

          <v-card-text>
            ได้ทำการอัพโหลดเรียบร้อยแล้วครับ !!
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn color="green darken-1" text @click="reset()">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="log2" max-width="290">
        <v-card>
          <v-card-title class="headline">Unsuccess</v-card-title>

          <v-card-text>
            ไม่สามารถทำการอัพโหลดได้เนื่องจากมีข้อมูลสูญหายหรือไม่ครบถ้วน !!
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn color="green darken-1" text @click="reset()  ">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </div>
  
</template>

<!--<template >
    
<table id="firstTable">
  <thead>
    <tr>
      <th>รหัสบัตรประชาชน</th>
      <th>ชื่อ-นามสกุล</th>
      <th>เบอร์โทร</th>
      <th>วันที่จะเข้าพัก</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in UserList" :key="index">
      <td>{{item.PersonID}}</td>
      <td>{{item.Name}}</td>
      <td>{{item.Tell}}</td>
      <td>{{item.startDate}}</td>
      <td>{{item.startDate}}</td>
    </tr>
  </tbody>
</table>
</template>-->

<script>
import { db } from '@/plugins/firebaseConfig'
export default {
  layout: 'admin',
  data() {
    return {
        dialog: false,
        disableGet:false,
        dialog1: false,
        select:null,
        log:false,
        log2:false,
        dialogcom: false,
      UserList: [],
      PersonIDadd:'',
      IDRules: [
          v => !!v || 'ใส่หมายเลขบัตรประชาชนเท่านั้น',
          v => (v && v.length == 13) || 'ใส่หมายเลขบัตรประชาชน'
        ],
      valid: false,
      price: '',
      amount: '',
      itemid: '',
      nameitem: '',
      perCheck:'perCheck',
      valid: true,
      status: ['รอการชำระเงิน',
              'รอการ Check In',
              'Check In',
              'Check Out'],
    }
  },
  mounted() {
    this.get()
  },
 methods: {
    reloadPage() {
      window.location.reload()
    },
    get() {
        db.collection('perCheck')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // doc.data() is never undefined for query doc snapshots
              //  console.log(doc.id, " => ", doc.data());
              // console.log(doc.id, " => ", doc.data())
              this.UserList.push(doc.data())
              console.log('UserList')
              this.disableGet=true
            })
          })
      },
        updateitem() {
      db.collection("perCheck").doc(this.PersonIDadd).update({
        PersonID: this.PersonIDadd,
        status: this.select,
        })
        .then((docRef) => {
          this.log = true
            //  console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
              console.error("Error adding document: ", error);
              this.log2 = true
              
        });
        
 },validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.updateitem()

        }
      },
      reset() {
        window.location.reload()
        this.log2 = false
        this.log = false
      },
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
able {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}
.A{
  text-align: center;
}
</style>