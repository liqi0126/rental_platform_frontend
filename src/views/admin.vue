// write by xyh
<template>
  <div>

  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data: function () {
    return {
      userLists: []
    }
  },
  created: function () {
    Axios.get('api/v1/users')
      .then((response) => {
        this.userLists = response.data
      })
      .catch((error) => {
        alert(error)
      })
  }
}
</script>
