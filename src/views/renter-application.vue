// writen by xyh
<template>
  <div>
    <renter-application-card :id="id"></renter-application-card>
  </div>
</template>

<script>
import renterApplicationCard from '../components/renter-application-card'
export default {
  components: {
    'renter-application-card': renterApplicationCard
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.renterApplicationId)
    }
  }
}
</script>
