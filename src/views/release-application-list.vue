<template>
  <div>
      <release-application-table :id="-1"
                               class="table"
                               height="700"
                               :pageSize="10"></release-application-table>
  </div>
</template>

<style scoped>
.table {
  width: 80%;
  margin-bottom: 200px;
}
.eltabs {
  max-width: 50%
}
</style>

<script>
import releaseApplicationTable from '../components/table/release-application-table'

export default {
  components: {
    'release-application-table': releaseApplicationTable
  },
  methods: {
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
