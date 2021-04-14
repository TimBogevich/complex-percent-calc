<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.9)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click="navbar = !navbar" ></v-app-bar-nav-icon>
      <v-flex xs6>
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
