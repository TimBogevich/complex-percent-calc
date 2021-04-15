<template>
  <apexchart width="100%" height="100%" type="line" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
  import utils from "./utils"

  export default {
    mixins : [utils],
    props: {
      title: {
        type: String,
        default: ""
      },
      series: {
        type: Array
      }
    },
    computed: {
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
                text: this.$t(this.title),
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
                    formatter: (seriesName) => this.delimiter(seriesName),
                    title: {
                        formatter: (seriesName) => seriesName,
                    },
                },
              },
              xaxis: {
                categories: [],
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
                  formatter: (val) => (val) ,
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
  }
</script>

<style lang="scss" scoped>

</style>