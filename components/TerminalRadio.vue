<template>
  <v-radio-group
    v-model="useTerminal"
    @change="$emit('input', $event)"
    row
    class="terminal-radio"
  >
    <v-radio
      :label="`${pretext} адреса`"
      :value="false"
    ></v-radio>
    <v-radio
      :label="`${pretext} терминала`"
      :value="true"
    ></v-radio>
  </v-radio-group>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "TerminalRadio",

  props: {
    value: {
      type: Boolean,
      default: true,
    },
    destination: {
      type: Boolean,
      default: false,
    }
  },

  data(): any {
    return {
      useTerminal: true,
    }
  },

  watch: {
    value() {
      this.useTerminal = this.value;
    }
  },

  computed: {
    pretext() {
      return this.destination ? 'До' : 'От';
    }
  },
})
</script>

<style scoped>
.terminal-radio {
  padding: 0 8px;
}
</style>
