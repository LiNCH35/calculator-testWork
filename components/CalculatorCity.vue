<template>
  <div data-app>
    <v-autocomplete
      class="calculator-city"
      rounded
      solo
      v-model="localValue"
      @change="$emit('input', $event)"
      :items="cities"
      item-text="name"
      item-value="name"
      :placeholder="placeholder"
    ></v-autocomplete>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from 'vuex';

export default Vue.extend({
  name: "CalculatorCity",

  props: {
    value: {
      type: String,
      default: null,
    },
  },

  data(): any {
    return {
      localValue: 0,
      placeholder: this.value,
    }
  },

  watch: {
    value() {
      this.localValue = this.value;
    },
    cities() {
      if (!this.placeholder) {
        return;
      }
      this.localValue = this.cities.find(city => city.name === this.placeholder);
      this.placeholder = null;
    }
  },

  computed: {
    ...mapState('cities', ['cities']),
  },
})
</script>

<style scoped>

</style>
