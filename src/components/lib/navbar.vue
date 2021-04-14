<template>
    <v-navigation-drawer
    v-model="navbar"
    app
    clipped
      temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Fincalc
          </v-list-item-title>
          <v-list-item-subtitle>
            Financial calculators
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>


<script>
  import {get,sync} from 'vuex-pathify'
  export default {
    data () {
      return {
        items: [
          { title: 'Compound interest', icon: 'mdi-chart-bell-curve', link: "/" },
          { title: 'Rent income', icon: 'mdi-chart-bell-curve', link: "/rental_income" },
        ],
        right: null,
      }
    },
    computed: {
      navbar: sync("navbar"),
    }
  }
</script>