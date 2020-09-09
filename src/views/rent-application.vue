// writen by xyh
<template>
  <div>
    <rent-application-card :id="id"></rent-application-card>
  </div>
</template>

<script>
import rentApplicationCard from '../components/card/rent-application-card'
export default {
  components: {
    'rent-application-card': rentApplicationCard
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.rentApplicationId)
    }
  }
}
</script>
