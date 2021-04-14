<template>
  <v-container grid-list-xs>
    <v-row class="mt-5 justify-center">
      <v-flex class="justify-center" xs11 md5>
        <slider 
        v-for="(item, i) in params" :key="i"
        :lbl="labels[i]" 
        :min="item.min"
        :max="item.max"
        :type="item.type"
        :step="item.step"
        :vl.sync="item.val"
        :lazy="false"/>
      </v-flex>
      <v-flex class="chart" xs11 md5>
        <v-card
        class="ma-4"
          max-width="100%"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="title-1 mb-1">
                {{$t("ror")}}
              </v-list-item-title>
            </v-list-item-content>

            <tween
            class="font-weight-black text-xl-h4"
            :duration='1000'
             :value='roi'
             :formatter='val => val.toFixed(2) + " %"'>
              {{roi}}
             </tween>
          </v-list-item>
        </v-card>
        <v-card
        class="ma-4"
          max-width="100%"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="title-1 mb-1">
                {{$t("roi")}}
              </v-list-item-title>
            </v-list-item-content>

            <tween
            class="font-weight-black text-xl-h4"
            :duration='1000'
             :value='return_of_inv'
             :formatter='val => val.toFixed(2) + " " + $t("years") '>
             </tween>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
  import slider from "./lib/slider"
  import tween from 'vue-tween-number'

  const delimiter = (val) => val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  
  export default {
    components : {slider, tween},
    data() {
      return {
        params: {
          house_price:  {id : "house_price", val : 5000000, min: 50000, max: 50000000, step: 10000, type: "money"},
          rental_income:  {id : "rental_income", val : 20000, min: 0, max: 300000, step: 1000, type: "money"},
        },
      
      }
    },
    computed: {
      labels() {
        return {
            house_price : this.$t("house_price"),
            rental_income : this.$t("rental_income"),
        }
      }, 
      roi() {
        let value =  (this.params.rental_income.val * 12 /  this.params.house_price.val * 100).toFixed(2)
        return value
      },
      return_of_inv() {
        let value =  100 / this.roi 
        return value
      }
    },
    methods: {
    },
    mounted() {
      
    }
    
  }
</script>

<style lang="scss">
.chart {
  min-height: 400px;
}



</style>