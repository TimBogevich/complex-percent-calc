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
        <apexchart width="100%" height="100%" type="line" :options="chartOptions" :series="totalSerices"></apexchart>
      </v-flex>
      <v-flex xs11 md12 lg10 xl6 class="mt-4 mb-4">
        <v-data-table
          dense
          :mobile-breakpoint="0"
          :headers="headers"
          :items="tableValues"
          :items-per-page="15"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
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
            {id : "startCapital", val : 500000, min: 50000, max: 5000000, step: 10000, type: "money"},
            {id : "income", val : 100000, min: 10000, max: 300000, step: 1000, type: "money"},
            {id : "expenses", val : 70000, min: 10000, max: 100000, step: 1000, type: "money"},
            {id : "growExpected", val : 7, min: 0, max: 100, step: 1, type: "percentage"},
            {id : "investPercentage", val : 4, min: 0, max: 40, step: 1, type: "percentage"},
            {id : "inflation", val : 4, min: 0, max: 40, step: 1, type: "percentage"},
          ]
      
      }
    },
    computed: {
      labels() {
        return {
            startCapital : this.$t("startCapital"),
            income : this.$t("income") + " " + this.$t("now"),
            expenses : this.$t("expenses") + " " + this.$t("now"),
            growExpected : this.$t("growExpected"),
            investPercentage : this.$t("investPercentage"),
            inflation : this.$t("inflation"),
        }
      }, 
      headers()  {
        return [
          { text: this.$t("year"), align: 'end', value: 'year'},
          { text: this.$t("incomeMounth"), value: 'income', align: 'end'},
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
        let prevYearCapital = this.params[0].val
        let income = this.params[1].val
        let expenses = this.params[2].val
        let growExpected = this.params[3].val
        let investPercentage = this.params[4].val
        let inflation = this.params[5].val
        let profit = income - expenses
        let currYearProfit = profit * 12
        let percentOnPrevCapital =  prevYearCapital * (investPercentage / 100)
        let percentOnCurrentYearProfit = currYearProfit * (investPercentage / 100)  / 2
        let total = percentOnCurrentYearProfit + percentOnPrevCapital + currYearProfit + prevYearCapital
        data.push({ year: 1, income, expenses, profit, currYearProfit, prevYearCapital, percentOnPrevCapital, percentOnCurrentYearProfit, total}) 
        for (let i = 2; i <= 15; i++) {
          income += income * (growExpected / 100)
          expenses += expenses * (inflation / 100)
          profit = income - expenses
          currYearProfit = profit * 12
          prevYearCapital = total
          percentOnPrevCapital =  prevYearCapital * (investPercentage / 100)
          percentOnCurrentYearProfit = currYearProfit * (investPercentage / 100)  / 2
          total = percentOnCurrentYearProfit + percentOnPrevCapital + currYearProfit + prevYearCapital
          data.push({ year: i, income, expenses, profit, currYearProfit, prevYearCapital, percentOnPrevCapital, percentOnCurrentYearProfit, total}) 
        }
        data = data.map(d => {
          return { 
            year : d.year, 
            income : delimiter(Math.round(d.income)), 
            expenses : delimiter(Math.round(d.expenses)), 
            profit: delimiter(Math.round(d.profit)), 
            currYearProfit : delimiter(Math.round(d.currYearProfit)), 
            prevYearCapital : delimiter(Math.round(d.prevYearCapital)), 
            percentOnPrevCapital : delimiter(Math.round(d.percentOnPrevCapital)), 
            percentOnCurrentYearProfit : delimiter(Math.round(d.percentOnCurrentYearProfit)), 
            total : delimiter(Math.round(d.total)), 
            totalInt : Math.round(d.total), 
          }
        })
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
                  text: this.$t("year"),
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