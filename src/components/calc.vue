<template>
  <v-container grid-list-xs>
    <v-row class="mt-5 justify-center">
      <v-flex class="justify-center" xs11 md5>
        <slider 
        v-for="(item, i) in params" :key="i"
        :lbl="item.label" 
        :min="item.min"
        :max="item.max"
        :type="item.type"
        :step="item.step"
        :vl.sync="item.val" />
      </v-flex>
      <v-flex class="chart" xs11 md5>
        <apexchart width="100%" height="100%" type="line" :options="chartOptions" :series="totalSerices"></apexchart>
      </v-flex>
      <v-flex xs11 md12 lg10 xl6 class="mt-4">
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
  import slider from "./slider"

  const delimiter = (val) => val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  
  export default {
    components : {slider},
    data() {
      return {
        params : [
          {label : "Стартовый капитал", val : 500000, min: 50000, max: 5000000, step: 10000, type: "money"},
          {label : "Доходы / мес сейчас", val : 100000, min: 10000, max: 300000, step: 1000, type: "money"},
          {label : "Расходы мес / сейчас", val : 70000, min: 10000, max: 100000, step: 1000, type: "money"},
          {label : "Прирост доходов / год, %", val : 7, min: 1, max: 100, step: 1, type: "percentage"},
          {label : "Ставка ваших инвестиций, %", val : 4, min: 1, max: 40, step: 1, type: "percentage"},
          {label : "Инфляция, %", val : 4, min: 1, max: 40, step: 1, type: "percentage"},
        ],
        headers: [
          { text: 'Год', align: 'start', value: 'year'},
          { text: 'Доходы в месяц', value: 'income' },
          { text: 'Расходы', value: 'expenses' },
          { text: 'Доходы минус расходы', value: 'profit' },
          { text: 'Аккумулированый капитал ', value: 'currYearProfit' },
          { text: 'Капитал прошлого года', value: 'prevYearCapital' },
          { text: '% на капитал прошлого года', value: 'percentOnPrevCapital' },
          { text: '% Капитал текущего года', value: 'percentOnCurrentYearProfit' },
          { text: 'Итоговый капитал', value: 'total' },
        ],
      }
    },
    computed: {
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
            name: "Итоговый капитал",
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
              text: 'График',
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
            xaxis: {
              categories: ["1","2","3","4","5","6","7","8","9", "10", "11", "12", "13", "14", "15"],
              title: {
                  text: "Год",
              },
              labels: {
                style: {
                },
              }
            },
            yaxis: {
              labels: {
                formatter: (val) =>  delimiter(val),
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

<style lang="scss" scoped>
.chart {
  min-height: 400px;
}
</style>