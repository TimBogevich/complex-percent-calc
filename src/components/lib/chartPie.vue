<template>
  <apexchart type="pie" :height="height" width="100%" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
import utils from "./utils"

export default {
  mixins: [utils],
  props: {
    series: {
      type: Array,
      default: [1],
    },
    labels: {
      default: ['A']
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  computed: {
    chartOptions() {
      return {
          chart: {
            type: 'pie',
          },
          labels: this.labels,
          tooltip: {
            y: {
                formatter: (v) => this.delimiter(v.toFixed(0), " ")
            }
          },
          colors: ['#cc807a', '#91c99b'],
          stroke: {
            width: 4
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ['#111']
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              borderWidth: 0
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: 'right'
              }
            }
          }]
        }
    }
  },
  
};
</script>

<style lang="scss" scoped>

</style>