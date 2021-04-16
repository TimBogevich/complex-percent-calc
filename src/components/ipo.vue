<template>
  <v-row class="mt-5 justify-center">
      <v-flex xs11 md6>
        <v-row class="ma-0 justify-center">
          <datePicker
          :rows="1" 
          :columns="3"
          :attributes="attrs"
          v-model="dateSelected" />
        </v-row>
        <v-row>
          <v-card
          v-for="item in iposSelected"
          :key="item.symbol"
            class="mx-auto"
            width="100%"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                {{item.name}}
              </p>
              <p>
                
              </p>
              <div class="text--primary">
                {{item.symbol}}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
              >
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-flex>
  </v-row>

</template>

<script>
  const { DateTime } = require("luxon");
  import calendar from 'v-calendar/lib/components/calendar.umd'
  import datePicker from 'v-calendar/lib/components/date-picker.umd'
  const finnhub = require('finnhub');
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = "c1s9t22ad3i9o8u9fu10" // Replace this
  const finnhubClient = new finnhub.DefaultApi()
  

  export default {
    components: {calendar, datePicker},
    data() {
      return {
        dateSelected : new Date(),
        ipos: [],

      }
    },
    computed: {
      attrs() {
        return [
          {
            key: '1',
            highlight: 'red',
            dates: this.ipos.length == 0 ? [] : this.ipos.map(i => i.date),
          },
        ]
      },
      iposSelected() {
        console.log(this.dateSelected)
        let dateSelected = this.dateSelected
        dateSelected = DateTime.fromJSDate(dateSelected).toISODate()
        return this.ipos.filter(i => i.date == dateSelected)
      }
    },
    mounted() {
      finnhubClient.ipoCalendar("2021-04-01", "2021-06-30", (error, data, response) => {
          this.ipos = data.ipoCalendar
      });
    },
  }
</script>

<style lang="scss" scoped>

</style>