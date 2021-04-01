<template>
  <div class="home">
    <calc />
  </div>
</template>

<script>
// @ is an alias to /src
import calc from '@/components/compoundInterest.vue'

export default {
  name: 'Home',
  components: {
    calc
  }
}
</script>
