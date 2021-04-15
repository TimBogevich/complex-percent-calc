<template>
  <v-container grid-list-xs>
    <v-row class="mt-5 justify-center">
      <v-flex class="justify-center" xs11 md5>
        <slider 
        v-for="(item, i) in params" :key="i"
        :lbl="labels[item.id]" 
        :min="item.min"
        :max="item.max"
        :type="item.type"
        :step="item.step"
        :vl.sync="item.val" />
      </v-flex>
      <v-flex class="chart" xs11 md5>
        <apexchart width="100%" height="50%" type="line" :options="chartOptions" :series="totalSerices"></apexchart>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
  import slider from "./lib/slider"

  const delimiter = (val) => val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  
  export default {
    components : {slider},
    data() {
      return {
        params:  [
            {id : "income", val : 500000, min: 50000, max: 5000000, step: 10000, type: "money"},
            {id : "capital", val : 20000, min: 0, max: 50000000, step: 10000, type: "money"},
            {id : "avgIncome", val : 100000, min: 10000, max: 300000, step: 1000, type: "money"},
            {id : "avgIncomeRegion", val : 100000, min: 10000, max: 300000, step: 1000, type: "money"},
            {id : "newJobSearch", val : 100000, min: 10000, max: 300000, step: 1000, type: "money"},
            {id : "expensesFood", val : 70000, min: 10000, max: 100000, step: 1000, type: "money"},
            {id : "expensesHousehold", val : 70000, min: 10000, max: 100000, step: 1000, type: "money"},
            {id : "expensesCar", val : 70000, min: 10000, max: 100000, step: 1000, type: "money"},
            {id : "otherExpenses", val : 70000, min: 10000, max: 100000, step: 1000, type: "money"},
            {id : "savings", val : 70000, min: 10000, max: 100000, step: 1000, type: "money"},
          ]
      
      }
    },
    computed: {
      labels() {
        return {
            income : this.$t("income"),
            capital : this.$t("capital"),
            avgIncome : this.$t("avgIncome"),
            avgIncomeRegion : this.$t("avgIncomeRegion"),
            newJobSearch : this.$t("newJobSearch"),
            expensesFood : this.$t("expensesFood"),
            expensesHousehold : this.$t("expensesHousehold"),
            expensesCar : this.$t("expensesCar"),
            otherExpenses : this.$t("otherExpenses"),
            savings : this.$t("savings"),
        }
      }, 
      headers()  {
        return [
          { text: this.$t("year"), align: 'end', value: 'year'},
          { text: this.$t("incomeMonth"), value: 'income', align: 'end'},
          { text: this.$t("expenses"), value: 'expenses', align: 'end'},
          { text: this.$t("profit"), value: 'profit', align: 'end'},
          { text: this.$t("currYearProfit"), value: 'currYearProfit', align: 'end'},
          { text: this.$t("prevYearCapital"), value: 'prevYearCapital', align: 'end'},
          { text: this.$t("percentOnPrevCapital"), value: 'percentOnPrevCapital', align: 'end'},
          { text: this.$t("percentOnCurrentYearProfit"), value: 'percentOnCurrentYearProfit', align: 'end'},
          { text: this.$t("total"), value: 'total', align: 'end'},
        ]
      },
      tableValues() {
        let data = []
        return data
      },
      totalSerices() {
        return [{
            name: this.$t("totalCapital"),
            data: this.tableValues.map(i => i.totalInt)
        }]
      },
      chartOptions() {
        return {
            chart: {
              toolbar: {
                show: false
              },
              type: 'line',
              zoom: {
                enabled: false
              }
            },
          
            stroke: {
              curve: 'straight'
            },
            title: {
              text: this.$t("chartTitle"),
              align: 'left',
              style: {
                fontSize:  '14px',
                fontWeight:  'bold',
              },
            },
            grid: {
              row: {
                colors: ['#141619', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0
              },
            },
            tooltip: {
              x: {
                  show: true,
                  formatter: (val) => this.$t("year") + val,
              },
              y: {
                  formatter: (seriesName) => delimiter(seriesName),
                  title: {
                      formatter: (seriesName) => seriesName,
                  },
              },
            },
            xaxis: {
              categories: ["1","2","3","4","5","6","7","8","9", "10", "11", "12", "13", "14", "15"],
              title: {
                  text: this.$t("income"),
              },
              labels: {
                style: {
                },
              }
            },
            yaxis: {
              labels: {
                formatter: (val) => (val / 1000000) + "M" ,
              },
            },
            markers: {
              colors: ['#ff0000', '#ff0000', '#ff0000']
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#e24d42',
                },
            }
          }
        }
    },
    methods: {
    },
    
  }
</script>

<style lang="scss">
.chart {
  min-height: 400px;
}



</style>