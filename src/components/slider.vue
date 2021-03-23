<template>
  <div>
    <v-row class=" justify-center mx-5 mb-3">
      <span >
        {{lbl}}
      </span>
      <v-spacer></v-spacer>
      <currency-input class="currency" v-if="type=='money'" :currency="null"  :precision="0" @change="$emit('update:vl', vl)" v-model="vl"/>
      <currency-input class="currency" v-else :currency="null"  :precision="0" @change="$emit('update:vl', vl)" v-model="vl"/>
    </v-row>
    <vue-slider 
    class="mb-5"
    v-model="vl" 
    :max="max"
    :lazy="true"
    :min="min"
    @change="$emit('update:vl', vl)"
    :step="step"
    />

  </div>
</template>

<script>

  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'

  export default {
    components: {
      VueSlider
    },
    props : ["vl", "lbl", "min", "max", "step", "type"],
    data() {
      return {
        options() {
          return {
            distractionFree: false,
            valueAsInteger: true,
            autoDecimalMode: true
          };
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
 .currency {
   width: 105px;
   text-align: end !important;
 }

</style>