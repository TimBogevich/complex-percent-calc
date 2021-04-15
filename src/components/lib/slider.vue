<template>
  <div>
    <v-row class=" justify-center mx-2 mb-3">
      <span >
        {{lbl}}
      </span>
      <v-slot>
        
      </v-slot>
      <v-spacer></v-spacer>
      <currency-input
          :class="type=='money' ? 'inp currency' : 'inp percent'" 
          @keyup.enter.native="$event.target.blur()" 
          :currency="null"
          locale="de"
          :precision="precision" 
          @change="$emit('update:vl', vl)" 
          v-model="vl"/>
    </v-row>
    <vue-slider 
    class="mb-5"
    v-model="vl" 
    :max="max"
    :lazy="lazy"
    dotSize="20"
    :dragOnClick="true"
    :min="min"
    @change="$emit('update:vl', vl)"
    :interval="step"
    :tooltip-formatter="delimiter"
    >
    </vue-slider >
  </div>
</template>

<script>
  
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'


  export default {
    components: {
      VueSlider
    },
    props : {
      vl: {},
      lbl: {},
      min: {},
      max: {},
      step: {},
      type: {},
      precision: {
        type: Number,
        default: 0
      },
      lazy: {
        type: Boolean,
        default: true
      }

    },
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
    methods: {
      delimiter : (val) => val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
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
   width: 50px;
   text-align: end !important;
 }

</style>