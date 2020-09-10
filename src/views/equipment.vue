// writen by xyh
<template>
  <div>
    <equipment-card :id="id"></equipment-card>
  </div>
</template>

<script>
import equipmentCard from '../components/card/equipment-card.vue'
export default {
  components: {
    'equipment-card': equipmentCard
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.equipmentId)
    }
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
