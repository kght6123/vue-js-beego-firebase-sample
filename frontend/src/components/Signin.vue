<template>
    <div class="signin">
        <h2>Sign in</h2>
        <input type="text" placeholder="eMail" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <button @click="signIn">Signin</button>
        <p>You don't have an account?
            <router-link to="/signup">create account now!!</router-link>
        </p>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Signin',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(res => {
        // https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ja
        /*firebase.auth().currentUser*/res.user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          localStorage.setItem('jwt', idToken)
        }).catch(function(error) {
          // Handle error
          alert('get id token error message: ' + error.message)
        });
        this.$router.push('/')
      }, error => {
        alert('auth error message: ' + error.message)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

.signin
  margin-top 20px
  display flex
  flex-flow column nowrap
  justify-content center
  align-items center

input
  margin 10px 0
  padding 10px

button
  margin 10px 0
  padding 10px

</style>