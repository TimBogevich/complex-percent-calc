<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
          style="font-size:20px"
        >
          <flag class="elevation-10 rounded" :iso="selectedLang.flag" v-bind="attrs" v-on="on" />
        </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in langs"
        :key="index"
        @click="setLocale(item.code)"
      >
        <v-list-item-title>
          <flag class="rounded-sm" :iso="item.flag" /> {{ item.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {sync} from 'vuex-pathify'
export default {
  data() {
    return {

    }
  },
  computed: {
    locale: sync("locale"),
    langs: sync("langs"),
    selectedLang() {
      return this.langs.find(i => i.code === this.$i18n.locale)
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.locale = locale;
    },
  }, 
  created() {
    let locale =
    this.locale || navigator.language.substring(0, 2).toLowerCase();
    this.$i18n.locale = this.langs.map(i => i.code).includes(locale) ? locale : "en";  
  },
  
};
</script>

<style lang="scss" scoped>
#lang {
  flex: none !important;
}

</style>