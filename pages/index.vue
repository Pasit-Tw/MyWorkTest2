<template>
  <div>
    <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  

    </v-carousel>
    <div class="stripe-default-padding cms-hide-mobile " style="margin-top:2.5rem;
      padding-top: 0px;padding-bottom: 0px; text-align:center;">
      <div class="container">
        <div class="id-f6306c3c28059581f9d4a326c2d2fa6b m-plain-text  cms-custom-color" data-text-alignment="center"
          style="color:#006394;
        
        ">
          <div class="m-plain-text--stripe cms-content">


            <div class="m-plain-text--content cms-item cms-html-var">
              <h2>Where your good days begin&nbsp;<img alt=""
                  src="/uploads/3s/cms_image/001/546/411/1546411177_5c2c5ca98c044-thumb.png"
                  style="width: 21px; height: 20px;"></h2>

              <h3>Hop Inn is committed to sustain quality accommodation through its product and services</h3>
            </div>


          </div>
        </div>
      </div>
    </div>
    <div class="m-icon--row" data-max-item="5" data-equalize-parent="[&quot;.m-icon--item-title&quot;]">

      <div class="m-icon--item">
        <img
          src="https://cdn.galaxy.tf/thumb/sizeW116/sizeH116/zc/uploads/2s/cms_image/001/545/480/1545480670_5c1e29de43262-thumb.jpg"
          alt="car parking icon ">

        <p class="h4 m-icon--item-title" style="height: 49.6px;">Large Parking</p>


      </div>


      <div class="m-icon--item">
        <img
          src="https://cdn.galaxy.tf/thumb/sizeW116/sizeH116/zc/uploads/2s/cms_image/001/546/011/1546011097_5c2641d918c8a-thumb.jpg"
          alt="Bed Icon ">

        <p class="h4 m-icon--item-title" style="height: 49.6px;">Comfortable Bed</p>


      </div>


      <div class="m-icon--item">
        <img
          src="https://cdn.galaxy.tf/thumb/sizeW116/sizeH116/zc/uploads/2s/cms_image/001/545/480/1545480753_5c1e2a31244e4-thumb.jpg"
          alt="Camera Security Icon">

        <p class="h4 m-icon--item-title" style="height: 49.6px;">Security and Safety</p>


      </div>


      <div class="m-icon--item">
        <img
          src="https://cdn.galaxy.tf/thumb/sizeW116/sizeH116/zc/uploads/2s/cms_image/001/545/480/1545480796_5c1e2a5c2e492-thumb.jpg"
          alt="Wifi Icon">

        <p class="h4 m-icon--item-title" style="height: 49.6px;">High Speed Wifi</p>


      </div>


      <div class="m-icon--item">
        <img
          src="https://cdn.galaxy.tf/thumb/sizeW116/sizeH116/zc/uploads/2s/cms_image/001/546/581/1546581988_5c2ef7e45bc41-thumb.jpg"
          alt=" Value Tag Icon">

        <p class="h4 m-icon--item-title" style="height: 49.6px;">Value &amp; Convenience</p>
  

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
    data: () => {
      return {
        DataList: [],
       
       items: [
          {
            src: 'https://cdn.galaxy.tf/thumb/sizeW1920/uploads/2s/cms_image/001/546/573/1546573390_5c2ed64e9fc75-thumb.jpg',
          },
          {
            src: 'https://cdn.galaxy.tf/thumb/sizeW1920/uploads/2s/cms_image/001/546/573/1546573392_5c2ed6503bd8d-thumb.jpg',
          },
          {
            src: 'https://cdn.galaxy.tf/thumb/sizeW1920/uploads/2s/cms_image/001/546/573/1546573395_5c2ed6539f0ba-thumb.jpg',
          },
          {
            src: 'https://cdn.galaxy.tf/thumb/sizeW1920/uploads/2s/cms_image/001/546/573/1546573390_5c2ed64e5d886-thumb.jpg',
          },
        ],
      }
    },
    methods: {
      get() {
        db.collection('All.Room')
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

<style>
  .m-icon--row {
    margin-top: 2.5rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
.box-tab{
    margin: 0.5rem;
    display: inline-block;
    justify-content: center;
    text-align: center;
  }

  /* .grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  background-color: #2196F3;
  padding: 10px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
} */

</style>



