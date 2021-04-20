<template>
    <v-navigation-drawer
    v-model="navbar"
    app
    touchless
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
        right: null,
      }
    },
    computed: {
      navbar: sync("navbar"),
      items() { 
        return [
          { title: this.$t("compoundPercentT"), icon: 'mdi-chart-bell-curve', link: "/" },
          { title: this.$t("rentalIncomeT"), icon: 'mdi-numeric', link: "/rental_income" },
          { title: this.$t("fixAndFlipT"), icon: 'mdi-numeric', link: "/fixFlip" },
          { title: this.$t("loanT"), icon: 'mdi-numeric', link: "/loan" },
          { title: this.$t("mortgageT"), icon: 'mdi-numeric', link: "/mortgage", },
          { title: this.$t("ipoT"), icon: 'mdi-calendar', link: "/ipo_calendar" },
        ]},
    }
  }
</script>