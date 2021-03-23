<template>
  <div>
    <v-row class=" justify-center mx-2 mb-3">
      <span >
        {{lbl}}
      </span>
      <v-spacer></v-spacer>
      <currency-input class="inp currency" @keyup.enter.native="$event.target.blur()" v-if="type=='money'" :currency="null"  :precision="0" @change="$emit('update:vl', vl)" v-model="vl"/>
      <currency-input class="inp percent" @keyup.enter.native="$event.target.blur()" v-else :currency="null"  :precision="0" @change="$emit('update:vl', vl)" v-model="vl"/>
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

.inp {
  border-style: solid;
  border-color: silver;
  border-width: 1px;
  border-radius: 4px;
  padding-right: 4px;
}

 .currency {
   width: 105px;
   text-align: end !important;
 }
 .percent {
   width: 40px;
   text-align: end !important;
 }

</style>