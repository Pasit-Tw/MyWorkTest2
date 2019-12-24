<template>
    
<table id="firstTable">
  <thead>
    <tr>
      <th>ชื่อ-นามสกุล</th>
      <th>เบอร์โทร</th>
      <th>วันที่จะเข้าพัก</th>
      <th>ห้องพักที่เลือก</th>
      <th>ราคา</th>
      <th>Status</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in DataList" :key="index">
      <td>{{item.Name}}</td>
      <td>{{item.Tell}}</td>
      <td>{{item.startDate}}</td>
      <td>{{item.Room}}</td>
      <td>{{item.Price}}</td>
      <td>{{item.status}}</td>

      
    </tr>
  </tbody>
</table>
</template>

<script>
import {
    db
} from '@/plugins/firebaseConfig.js';
export default {
    data() {
        const docRef = db.collection("perCheck").doc(this.$route.params.generator);

        docRef.get().then((doc) => {
            if (doc.exists) {
                this.DataList.push(doc.data());
                console.log(this.DataList);
            } else {
                // doc.data() will be undefined in this case
                //console.log("No such document!");
            }
        }).catch((error) => {
            //console.log("Error getting document:", error);
        });

        return {
            DataList:[],
            searchcode: this.$route.params.generator,

        }
    }

}
</script>

<style>
table {
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
</style>
