// writen by xyh
<template>
  <div>
    <new-rent-application-card :equipmentId="equipmentId"></new-rent-application-card>
  </div>
</template>

<script>
import newRentApplicationCard from '../components/new-rent-application-card.vue'
export default {
  data: function () {
    return {
      equipmentId: parseInt(this.$route.params.equipmentId)
    }
  },
  components: {
    'new-rent-application-card': newRentApplicationCard
  }
}
</script>
