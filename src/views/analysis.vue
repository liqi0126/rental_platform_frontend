<template>
  <div>
    <data-analysis></data-analysis>
  </div>
</template>

<script>
import dataAnalysis from '../components/data-analysis.vue'
export default {
  components: {
    'data-analysis': dataAnalysis
  },
  data: function () {
    return {

    }
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
