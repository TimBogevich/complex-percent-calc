<template>
  <v-menu
    ref="menu"
    v-model="menu"
    transition="scale-transition"
    bottom
    left
    offset-y="20"
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker 
    v-model="date" 
    @change="$emit('update:date', date)" 
    type="month" 
    no-title 
    scrollable />
  </v-menu>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 7),
    },
    label: {
      type: String,
      default: "Picker in menu"
    }
  },
  data() {
    return {
      menu: false,
    }
  },


};
</script>

<style lang="scss" scoped>
</style>