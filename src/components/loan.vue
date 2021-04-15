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
        :precision="item.precision"
        :lazy="false"/>

        <card 
        :v="payment"
        text="mounthly_pay"
        delim=" "
        color="warning"
        :dark="true"
        />
        
        <card 
        :v="total_payment"
        text="total_pay"
        delim=" "
        />
        <card 
        :v="overpay"
        text="total_overpay"
        delim=" "
        />
      </v-flex>
    </v-row>
    
  </v-container>
</template>

<script>
  import slider from "./lib/slider"
  import tween from 'vue-tween-number'
  import utils from "./lib/utils"
  import card from "./lib/numberCard"
  
  export default {
    components : {slider, tween, card},
    mixins: [utils],
    data() {
      return {
        params: {
          amount:  { val : 5000000, min: 50000, max: 50000000, step: 10000, type: "money", precision: 0},
          rate:  {val : 0.2, min: 0.1, max: 100, step: 0.05, type: "percentage", precision: 2},
          long:  {val : 10, min: 1, max: 30, step: 1, type: "money", precision: 0},
        },
      
      }
    },
    computed: {
      labels() {
        return {
            amount : this.$t("amount"),
            rate : this.$t("rate"),
            long : this.$t("long"),
        }
      }, 
      payment() {
        let n = this.params.long.val * 12
        let r = this.params.rate.val / 100 / 12
        let s = this.params.amount.val
        return s * (r * Math.pow((1 + r),n) ) / (  Math.pow((1 + r),n) - 1  )
      },
      total_payment() {
        return this.payment * this.params.long.val * 12
      },
      overpay() {
        return this.total_payment - this.params.amount.val
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