// writen by xyh
<template>
  <div>
    <new-rent-application-card :equipmentId="equipmentId"></new-rent-application-card>
  </div>
</template>

<script>
import newRentApplicationCard from '../components/create-card/new-rent-application-card.vue'
export default {
  data: function () {
    return {
      equipmentId: parseInt(this.$route.params.equipmentId)
    }
  },
  components: {
    'new-rent-application-card': newRentApplicationCard
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
