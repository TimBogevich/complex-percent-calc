<template>
  <v-container grid-list-xs>
    <v-row class="mt-5 mb-2 justify-center">
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

        <v-row class="px-2">
          <v-flex xs6>
            <monthPicker :label='$t("dateStart")' :date.sync="dateStart" />
          </v-flex>
          <v-flex xs6>
            <monthPicker :label='$t("dateEnd")'  :date.sync="dateEnd" />
          </v-flex>
        </v-row>


        <card 
        :v="Income"
        text="income"
        delim=" "
        color="warning"
        :dark="true"
        />

        <card 
        :v="rateOfReturn"
        text="rateOfReturn"
        appendVal = " %"
        :digits="1"
        delim=" "
        color="warning"
        :dark="true"
        />

        <card 
        :v="RorPerMonth"
        text="RorPerMonth"
        appendVal = " %"
        :digits="1"
        delim=" "
        />

        <card 
        :v="RorPerYear"
        text="RorPerYear"
        appendVal = " %"
        :digits="1"
        delim=" "
        />
        
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
  import slider from "./lib/slider"
  import tween from 'vue-tween-number'
  import monthPicker from './lib/monthPicker'
  import card from "./lib/numberCard"
  const { DateTime, Interval } = require("luxon");

  const delimiter = (val) => val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  
  export default {
    components : {slider, tween, monthPicker, card},
    data() {
      return {
        params: {
          house_price:  {id : "house_price", val : 5600000, min: 50000, max: 50000000, step: 10000, type: "money"},
          repairExpenses:  {id : "repairExpenses", val : 400000, min: 50000, max: 5000000, step: 1000, type: "money"},
          sellPrice:  {id : "sellPrice", val : 7000000, min: 50000, max: 50000000, step: 10000, type: "money"},
        },
        dateStart: DateTime.now().toFormat("yyyy-MM"),
        dateEnd: DateTime.now().plus({ months: 3 }).toFormat("yyyy-MM"),
      
      }
    },
    computed: {
      labels() {
        return {
            house_price : this.$t("house_price"),
            repairExpenses : this.$t("repairExpenses"),
            sellPrice : this.$t("sellPrice"),
        }
      }, 
      rateOfReturn() {
        let house_price = this.params.house_price.val
        let repairExpenses = this.params.repairExpenses.val
        let sellPrice = this.params.sellPrice.val
        return (sellPrice  - ( house_price + repairExpenses)) /  ( house_price + repairExpenses) * 100
      },
      RorPerMonth() {
        return this.rateOfReturn / this.durationMonth
      },
      RorPerYear() {
        return this.RorPerMonth * 12
      },
      Income() {
        return this.params.sellPrice.val - (this.params.house_price.val + this.params.repairExpenses.val)
      },
      durationMonth() {
        let dStart = DateTime.fromString(this.dateStart, "yyyy-MM")
        let dEnd = DateTime.fromString(this.dateEnd, "yyyy-MM")
        return Interval.fromDateTimes(dStart, dEnd).count("months")
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