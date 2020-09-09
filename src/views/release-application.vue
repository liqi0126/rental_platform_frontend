// writen by xyh
<template>
  <div>
    <release-application-card :id="id">
    </release-application-card>
  </div>
</template>

<script>
import releaseApplicationCard from '../components/card/release-application-card'
export default {
  components: {
    'release-application-card': releaseApplicationCard
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.releaseApplicationId)
    }
  }
}
</script>
