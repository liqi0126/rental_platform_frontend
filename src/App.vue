<template>
  <div>
    <div id="nav">
      <v-nav></v-nav>
    </div>
  </div>
</template>

<style lang="scss">
#nav {
  left: 0;
  padding: 0;
  margin: 0;
}
</style>

<script>
import nav from './component/nav'
export default {
  components: {
    'v-nav': nav
  }
}
</script>
