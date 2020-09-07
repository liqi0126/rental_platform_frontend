<template>
  <div class="hello">
    <button @click='HelloWorld'>你好</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export default {
  methods: {
    HelloWorld () {
      this.$http({
        url: '/api/v1/hello',
        method: 'get'
        // data: {
        //   content: this.$refs.editor.content
        // },
        // headers: {
        //   Authorization: this.$store.getters.getToken
        // }
      })
        .then(response => {
          console.log(response.data.greet)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
