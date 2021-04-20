<template>
  <v-card
  :color="color"
  :dark="dark"
  class="mt-5"
    max-width="100%"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="title-1 mb-1">
          {{$t(text)}}
        </v-list-item-title>
      </v-list-item-content>

      <tween
      class="font-weight-black text-xl-h4"
      :duration='500'
        :value='v'
        :formatter='val => delimiter(val.toFixed(digits), delim) + appendVal '>
        </tween>
    </v-list-item>
  </v-card>
</template>

<script>
  import tween from 'vue-tween-number'
  import utils from "./utils"
  export default {
    props: {
      v: {},
      delim: {},
      text: {
        type: String
      },
      color: {
        type: String,
        default: ""
      },
      dark: {
        type: Boolean,
        default: false
      },
      digits: {
        type: Number,
        default: 0

      },
      appendVal: {
        type: String,
        default: "",
      }
    },
    components: {tween},
    mixins: [utils]
  }
</script>

<style lang="scss" scoped>

</style>