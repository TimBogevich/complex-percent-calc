<template>
  <fusioncharts
    :type="type"
    :width="width"
    :height="height"
    :dataFormat="dataFormat"
    :dataSource="dataSource"
  ></fusioncharts>
</template>

<script>
  const dataSource = {
    chart: {
      caption: "Website downloads for 2017",
      subcaption: "Actual vs Target",
      numbersuffix: "K",
      theme: "fusion",
      plottooltext:
        "Downloaded $datavalue times against a target of $targetDataValue"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "50",
          code: "#F2726F"
        },
        {
          minvalue: "50",
          maxvalue: "75",
          code: "#FFC533"
        },
        {
          minvalue: "75",
          maxvalue: "100",
          code: "#62B58F"
        }
      ]
    },
    value: "90",
    target: "95"
  };

  export default {
    components: {
      fusioncharts: FCComponent
    },
    data: () => ({
      type: "hbullet",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    })
  };
</script>

<style lang="scss" scoped>

</style>