<template>
  <div>
    <v-row class=" justify-center mx-5 mb-3">
      <span >
        {{lbl}}
      </span>
      <v-spacer></v-spacer>
      <currency-input class="currency" v-if="type=='money'" currency="RUB"  :precision="0" @change="$emit('update:vl', vl)" v-model="vl"/>
      <currency-input class="percent" v-else :currency="null"  :precision="0" @change="$emit('update:vl', vl)" v-model="vl"/>
    </v-row>
    <vue-slider 
    class="mb-5"
    v-model="vl" 
    :max="max"
    :min="min"
    @change="$emit('update:vl', vl)"
    :step="step"
    />

  </div>
</template>

<script>

  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/material.css'

  export default {
    components: {
      VueSlider
    },
    props : ["vl", "lbl", "min", "max", "step", "type"]
    
  }
</script>

<style lang="scss" scoped>
 .currency {
   width: 105px;
 }
 .percent {
   width: 20px;
 }

.vue-slider-dot {
    z-index: 0 !important;
}

</style>