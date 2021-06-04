<template>
  <div class="numeric-input">
    <label :for="`numeric-input`">{{ label }}</label>

    <v-text-field
      id="numeric-input"
      ref="numericInput"
      @input="inputHandler"
      @change="changeHandler"
      rounded
      solo
      type="number"
      v-model="localValue"
    >
      <template #append>
        <slot></slot>
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: "NumericInput",

  props: {
    value: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10000,
    },
    appendText: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      localValue: this.value,
    }
  },

  watch: {
    value() {
      this.localValue = this.value;
    },
  },
  methods: {
    inputHandler(value: number) {
      if (value < this.min || value > this.max) {
        this.localValue = Math.max(Math.min(value, this.max), this.min);
        // При снятии фокуса значение выставляется в пределах границы
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    },
    changeHandler(value: number) {
      this.$emit('input', Math.max(Math.min(value, this.max), this.min));
    }
  }
})
</script>

<style scoped lang="scss">
.numeric-input {
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
