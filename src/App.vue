<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-flex xs6>
        <span class=".text-xl-h4">Калькулятор сложного процента</span>  
      </v-flex>
    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.v-app-bar.v-app-bar--fixed {
  z-index: 99 !important;
}
</style>
