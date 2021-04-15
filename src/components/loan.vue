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
        text="monthly_pay"
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
      <v-flex class="chart" xs11 md5>
        <chartPie :series="pieChartSeries" :labels="pieLabels"/>
        <lineChart title="loanT" :series="chartSeries"/> 

      </v-flex>

      <v-flex class="my-5" xs11 md7>
        <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th v-for="h in headers" :key="h.value" class="text-right">
                  {{h.text}}
                </th>
              </tr>
            </thead>
            <tbody v-if="showMoreBtn">
              <tr class="text-right" v-for="item in tableItems.slice(0,2)" :key="item.month">
                <td>{{ item.month }}</td>
                <td>{{ item.totalDebt }}</td>
                <td>{{ item.interestsPayment }}</td>
                <td>{{ item.debtPayment }}</td>
                <td>{{ item.totalPayment }}</td>
                <td>{{ item.paymentsAcc }}</td>
              </tr>
              <tr>
                <v-btn text @click.once="showMoreBtn=!showMoreBtn" block >Show more</v-btn>
              </tr>
              <tr class="text-right" v-for="item in tableItems.slice(-2)" :key="item.month">
                <td>{{ item.month }}</td>
                <td>{{ item.totalDebt }}</td>
                <td>{{ item.interestsPayment }}</td>
                <td>{{ item.debtPayment }}</td>
                <td>{{ item.totalPayment }}</td>
                <td>{{ item.paymentsAcc }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-right" v-for="item in tableItems" :key="item.month">
                <td>{{ item.month }}</td>
                <td>{{ item.debtPayment }}</td>
                <td>{{ item.totalDebt }}</td>
                <td>{{ item.interestsPayment }}</td>
                <td>{{ item.totalPayment }}</td>
                <td>{{ item.paymentsAcc }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>

    </v-row>
    
  </v-container>
</template>

<script>
  import slider from "./lib/slider"
  import tween from 'vue-tween-number'
  import utils from "./lib/utils"
  import card from "./lib/numberCard"
  import lineChart from "./lib/lineChart"
  import chartPie from "./lib/chartPie"
  
  export default {
    components : {slider, tween, card, lineChart, chartPie},
    mixins: [utils],
    data() {
      return {
        params: {
          amount:  { val : 5000000, min: 50000, max: 50000000, step: 10000, type: "money", precision: 0},
          rate:  {val : 0.2, min: 0.1, max: 100, step: 0.05, type: "percentage", precision: 2},
          long:  {val : 10, min: 1, max: 30, step: 1, type: "money", precision: 0},
        },
        showMoreBtn: true,
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
      },
      pieChartSeries() {
        return [this.overpay, this.params.amount.val]
      },
      pieLabels() {
        return ["Overpay", "Principal"]
      },
      totalDebtSeries() {
        let arr = this.tableItems.filter((i,k) => k%12 == 0)
        return arr.map(i => i.totalDebtNumber)
      },
      paymentsAccSeries() {
        let arr = this.tableItems.filter((i,k) => (k+1)%12 == 0)
        return arr.map(i => i.paymentsAccNumber)
      },
      chartSeries() {
        return [
          {
            name: this.$t("totalDebt"),
            color: "#141619",
            data: this.totalDebtSeries
          },
          {
            name: this.$t("paymentsAcc"),
            color: "#941319",
            data: this.paymentsAccSeries
          },
        ]
      },
      headers() {
        return [
          {text: "Month",value: "month", align: "end"},
          {text: "Total Debt",value: "totalDebt", align: "end"},
          {text: "Interests",value: "interestsPayment", align: "end"},
          {text: "Debt payment",value: "debtPayment", align: "end"},
          {text: "Total monthly payment",value: "totalPayment", align: "end"},
          {text: "Payments accumulated",value: "paymentsAcc", align: "end"},
        ]
      },
      tableItems() {
        let data = []
        let debtPayment = this.params.amount.val / (this.params.long.val * 12)
        let predebtPayment = this.params.amount.val
        let paymentsAcc = 0
        for (let month = 1; month <= this.params.long.val * 12; month++) {
          let interestsPayment =  predebtPayment * (this.params.rate.val / 12 / 100)
          let totalPayment = debtPayment + interestsPayment
          paymentsAcc += totalPayment
          let a = {
            month,
            debtPayment: this.delimiter(debtPayment.toFixed(2), " "),
            totalDebt: this.delimiter(predebtPayment.toFixed(2), " "), 
            totalDebtNumber: predebtPayment.toFixed(2), 
            interestsPayment: this.delimiter(interestsPayment.toFixed(2), " "), 
            totalPayment: this.delimiter(totalPayment.toFixed(2), " "),
            paymentsAccNumber: paymentsAcc,
            paymentsAcc: this.delimiter(paymentsAcc.toFixed(2), " "),
          }
          predebtPayment -= debtPayment
          data.push(a)
        }
        return data
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

td {
  white-space: nowrap;
}

</style>