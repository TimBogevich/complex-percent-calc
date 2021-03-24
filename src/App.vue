<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-flex xs6>
        <v-icon>mdi-sack-percent</v-icon>
        <span class=".text-xl-h3">
          {{$t("title")}}
        </span>  
      </v-flex>
      <v-spacer></v-spacer>
      <language />

    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './views/Home';
import language from "./components/language"
import {get,sync} from 'vuex-pathify'
export default {
  name: 'App',

  components: {
    Home,
    language
  },

  data: () => ({
    //
  }),
  computed: {
  },
  created() {

  },
};
</script>

<style>
.v-app-bar.v-app-bar--fixed {
  z-index: 99 !important;
}
</style>
