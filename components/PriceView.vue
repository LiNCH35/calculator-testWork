<template>
  <div v-if="price.price">
    <h3 style="color: darkgrey; text-decoration: line-through">{{ price.basePrice }}₽</h3>
    <h2 style="color: red">{{ price.price }}₽</h2>
    <h4>Доставка: {{delivery}}</h4>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "PriceView",

  props: {
    price: {
      type: Object,
      default: () => {
        return {
          basePrice: 0,
          price: 0,
          deliveryTime: {
            from: 0,
            to: 0,
          },
          service: []
        }
      },
    },
  },

  computed: {
    delivery() {
      let {from, to} = this.price.deliveryTime;
      return (from === to ? from : `От ${from} до ${to}`) + ' дн.';
    }
  },
})
</script>

<style scoped>

</style>
