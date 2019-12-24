<template>
  <div class="container">
    <h1>การบริการ</h1>
    <div class="container-page">
    <img :src="product.image" alt width="600px" height="400px" />
    </div>
      <center>
      <h2>{{product.name}}</h2>
      <h4>รหัสสินค้า : {{product.id}}</h4>
      <h4>ราคา : {{product.price}}</h4>
      <h4>รายละเอียด : {{product.detail}}</h4>
      </center>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    product() {
      return this.$store.state.product.allproduct.find(
        product => product.id === this.id
      );
    }
  }
};
</script>

<style>
.container-page{
  text-align: center;
}
</style>
