<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
     <v-app-bar-title>Сложный процент</v-app-bar-title>
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
