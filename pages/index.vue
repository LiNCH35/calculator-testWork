<template>
  <div class="index-page">
    <div>
      <h1>Рассчитать</h1>
      <div>
        <div class="calculator-layout-city d-flex">
          <div>
            <CalculatorCity
              v-model="cityFrom"
            ></CalculatorCity>
            <TerminalRadio v-model="dispatchTerminal"></TerminalRadio>
          </div>
          <div class="icon-swap" @click="swap">
            <img src="swap_horiz.svg" width="24" height="24">
          </div>
          <div>
            <CalculatorCity
              v-model="cityTo"
            ></CalculatorCity>
            <TerminalRadio v-model="destinationTerminal" destination></TerminalRadio>
          </div>
        </div>
        <div class="calculator-params d-flex">
          <NumericInput
            v-model="weight"
            :min="0.1"
            :max="19999"
            label="Вес"
          >
            <span>кг</span>
          </NumericInput>
          <NumericInput
            v-model="volume"
            :min="0.01"
            :max="74"
            label="Объём"
          >
            <span>м<sup>3</sup></span>
          </NumericInput>
        </div>
      </div>
      <PriceView
        class="calculator-price"
        :price="price"
      ></PriceView>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions} from 'vuex';
import CalculatorCity from "~/components/CalculatorCity.vue";
import NumericInput from "~/components/NumericInput.vue";
import TerminalRadio from "~/components/TerminalRadio.vue";
import {getPrice} from "~/utils/api";
import PriceView from "~/components/PriceView.vue";

export default Vue.extend({
  components: {PriceView, TerminalRadio, NumericInput, CalculatorCity},

  data() {
    return {
      cityFrom: 'Москва',
      cityTo: 'Санкт-Петербург',
      weight: 0.9,
      volume: 0.1,
      dispatchTerminal: true,
      destinationTerminal: true,
      price: {},
    }
  },
  computed: {
    oneCityOrder() {
      return this.cityFrom === this.cityTo;
    }
  },
  watch: {
    cityFrom() {
      if (this.oneCityOrder && this.destinationTerminal) {
        this.dispatchTerminal = false;
      }
      setTimeout(this.calculate, 0);
    },
    cityTo() {
      if (this.oneCityOrder && this.dispatchTerminal) {
        this.destinationTerminal = false;
      }
      setTimeout(this.calculate, 0);
    },
    weight() {
      setTimeout(this.calculate, 0);
    },
    volume() {
      setTimeout(this.calculate, 0);
    },

    dispatchTerminal(value) {
      if (this.oneCityOrder && value) {
        this.destinationTerminal = false;
      }
    },
    destinationTerminal(value) {
      if (this.oneCityOrder && value) {
        this.dispatchTerminal = false;
      }
    },
  },
  methods: {
    ...mapActions('cities', ['fetchCities']),
    swap() {
      let tmp = this.cityFrom;
      this.cityFrom = this.cityTo;
      this.cityTo = tmp;
    },
    calculate() {
      this.price = getPrice({
        cargo: {
          dimension: {
            quantity: 1,
            weight:this.weight,
            volume: this.volume,
          },
        },
        gateway: {
          dispatch: {
            point: {
              location: this.cityFrom,
              terminal: 'default',
            }
          },
          destination: {
            point: {
              location: this.cityTo,
              terminal: 'default',
            }
          }
        }
      });
    },
  },
  async mounted() {
    await this.fetchCities();
    this.calculate();
  }
})
</script>

<style scoped lang="scss">
.index-page {
  height: 100vh;
  display: flex;
  > div {
    margin: auto;
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
  }

  .calculator-layout-city {
    .icon-swap {
      margin: 12px;
      cursor: pointer;
    }
  }

  .calculator-params {
    padding: 0 8px;
    > div:first-child {
      margin-right: auto;
    }

    ::v-deep input::-webkit-outer-spin-button,
    ::v-deep input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .calculator-price {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

<style lang="scss">
.d-flex {
  display: flex;
}
</style>
