<template>
  <apexchart type="pie" width="70%" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      default: [1],
    },
    labels: {
      default: ['A']
    }
  },
  computed: {
    chartOptions() {
      return {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: this.labels,
          colors: ['#cc807a', '#91c99b'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
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