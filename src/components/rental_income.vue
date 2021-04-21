<template>
  <v-container grid-list-xs>
    <v-row class="mt-5 justify-center">
      <v-flex class="justify-center" xs11 md4>
        <slider 
        v-for="(item, i) in params" :key="i"
        :lbl="labels[i]" 
        :min="item.min"
        :max="item.max"
        :type="item.type"
        :step="item.step"
        :vl.sync="item.val"
        :lazy="false"/>

        <card 
        :v="roi"
        text="ror"
        delim=" "
        color="warning"
        :dark="true"
        appendVal=" %"
        />
        <card 
        :v="return_of_inv"
        text="roi"
        delim=" "
        :appendVal='" " + $t("years")'
        />

      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
  import slider from "./lib/slider"
  import card from "./lib/numberCard"

  const delimiter = (val) => val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  
  export default {
    components : {slider, card},
    data() {
      return {
        params: {
          house_price:  {id : "house_price", val : 5000000, min: 50000, max: 50000000, step: 10000, type: "money"},
          rental_income:  {id : "rental_income", val : 20000, min: 500, max: 300000, step: 500, type: "money"},
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