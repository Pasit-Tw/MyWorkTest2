<template>
<div id="app">
  <table id="firstTable">
  <thead>
    <tr>
      <th>รหัสบัตรประชาชน</th>
      <th>ชื่อ-นามสกุล</th>
      <th>เบอร์โทร</th>
      <th>ยอดเงินที่ชำระ</th>
      <th>วันที่ชำระเงิน</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in DataList" :key="index">
      <td>{{item.PayID}}</td>
      <td>{{item.PayName}}</td>
      <td>{{item.PayTell}}</td>
      <td>{{item.PayPrice}}</td>
        <td>{{item.startDate}}</td>
    </tr>
  </tbody>
</table>
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
     layout: 'admin',
    data: () => {
      return {
        DataList: [{
        }],
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'this.item.PayName,',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
      }
    },
    methods: {
      get() {
        db.collection('payment')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // doc.data() is never undefined for query doc snapshots
              //  console.log(doc.id, " => ", doc.data());
              console.log(doc.id, " => ", doc.data())
              this.DataList.push(doc.data())
              console.log('DataList')
            })
          })
      }
    },
    mounted() {
      this.get()
    },
  }
</script>

<style >
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
</style>