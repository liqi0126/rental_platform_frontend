// writen by xyh
<template>
  <div>
    <new-release-application-card :id="id"></new-release-application-card>
  </div>
</template>

<script>
import newreleaseApplicationCard from '../components/create-card/new-release-application-card.vue'
export default {
  data: function () {
    return {
      id: parseInt(this.$route.params.equipmentId)
    }
  },
  components: {
    'new-release-application-card': newreleaseApplicationCard
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
