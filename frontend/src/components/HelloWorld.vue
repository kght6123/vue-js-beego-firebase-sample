<template>
  <div class="hello">
    <h1>{{ msg }} Hello {{ name }}!!</h1>
    <h2>{{ apiMsg }}</h2>
    <h3>API Links</h3>
    <button @click="signOut">Sign out</button>
    <button @click="apiPublic">Public API</button>
    <button @click="apiPrivate">Private API</button>
    <button @click="test">Test env</button>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      apiMsg: 'API Message',
      name: firebase.auth().currentUser ? firebase.auth().currentUser.email : ""
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem('jwt')
        this.$router.push('/signin')
      })
    },
    apiPublic: async function () {
      let res = await axios.get('/v1/object/')
      this.apiMsg = res.data
    },
    apiPrivate: async function () {
      let res = await axios.get('/v1/user/')
      this.apiMsg = res.data
    },
    test: function () {
      alert(process.env.VUE_APP_NAME) // test env
      alert(process.env.VUE_APP_FB_API_KEY)
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
