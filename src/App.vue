<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-flex xs6>
        <v-app-bar-nav-icon @click="navbar = !navbar" ></v-app-bar-nav-icon>
        <v-icon>mdi-sack-percent</v-icon>
        <span class=".text-xl-h3">
          {{$t(title)}}
        </span>  
      </v-flex>
      <v-spacer></v-spacer>
      <language />

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <navbar />
  </v-app>
</template>

<script>
import Home from './views/Home';
import language from "./components/lib/language"
import {get,sync} from 'vuex-pathify'
import navbar from './components/lib/navbar'
export default {
  name: 'App',

  components: {
    Home,
    language,
    navbar
  },

  data: () => ({
    //
  }),
  computed: {
    navbar: sync("navbar"),
    title() {
      return this.$route.meta.title
    }
  },
};
</script>

<style>
.v-app-bar.v-app-bar--fixed {
  z-index: 99 !important;
}
.v-navigation-drawer {
  z-index: 100 !important;
}
</style>
