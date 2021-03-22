<template>
  <div>
    <v-row class=" justify-center mx-5 mb-3">
      <span >
        {{lbl}}
      </span>
      <v-spacer></v-spacer>
      <currency-input v-if="type=='money'" currency="RUB"  :precision="0" @change="$emit('update:vl', vl)" v-model="vl"/>
      <currency-input v-else :currency="null"  :precision="0" @change="$emit('update:vl', vl)" v-model="vl"/>
    </v-row>
    <v-slider v-model="vl"
    :max="max"
    :min="min"
    @change="$emit('update:vl', vl)"
    :step="step">
    </v-slider>
  </div>
</template>

<script>
  export default {
    props : ["vl", "lbl", "min", "max", "step", "type"]
    
  }
</script>

<style lang="scss" scoped>

</style>