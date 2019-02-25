<template>
  <div class="hello">
    <h1>{{ msg }}{{ apiMsg }}</h1>
    <h2>API Links</h2>
    <button @click="apiPublic">public</button>
    <button @click="apiPrivate">private</button>
    <button @click="test">test</button>
  </div>
</template>

<script>
import axios from 'axios'
// import axiosBase from 'axios'

// const axios = axiosBase.create({
//   baseURL: 'http://127.0.0.1:8080',
//   headers: {
//     //'Content-Type': 'application/json',
//     //'X-Requested-With': 'XMLHttpRequest',
//     //'Access-Control-Allow-Origin': '*',
//     'Accept': 'application/json'
//   },
//   //responseType: 'json',
//   //credentials: false,
// });

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      apiMsg: 'API Message'
    }
  },
  methods: {
    apiPublic: async function () {
//       axios.get('/v1/object/', {
//   //withCredentials: true,
//   headers: {
//     //'Content-Type': 'application/json',
//     //'X-Requested-With': 'XMLHttpRequest',
//     //'Access-Control-Allow-Origin': '*',
//     'Accept': 'application/json'
//   },
//   //responseType: 'json',
//   //credentials: false,
// })
//         .then(function (response) {
//           // handle success
//           alert(response);
//         })
//         .catch(function (error) {
//           // handle error
//           alert(error);
//         })
//         .then(function () {
//           // always executed
//         });
      let res = await axios.get('/v1/object/')
      this.apiMsg = res.data
    },
    apiPrivate: async function () {
      let res = await axios.get('/v1/user/')
      this.apiMsg = res.data
    },
    test: function () {
      alert(process.env.VUE_APP_NAME) // test env
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

button
  margin 10px 0
  padding 10px

</style>
