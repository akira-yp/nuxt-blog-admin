<template>
  <div>
    <h1>yp2.dev</h1>
    <p class="lead">This example is a quick exercise to sign in with a google acount.</p>
    <div v-if="currentUser == null">
      <button type="button" role="button" @click="signIn">
        Sign In
      </button>
    </div>
    <div v-else>
      <button type="button" role="button" @click="signOutUser">
        Sign Out
      </button>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export default {
  data: () => ({
    currentUser: null
  }),
  mounted(){
    onAuthStateChanged(getAuth(), (user) => {
      if ( user != null ){
          this.currentUser = user;
      }else{
          this.currentUser = null;
      }
    });
  },
  methods: {
    signIn() {
      var provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
      .then((auth) => {
        console.log("login", auth.user );
        if (auth.user.email !== 'yog.puripuri@gmail.com' ) {
            signOut(getAuth())
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("faild to login", errorCode, errorMessage );
      });
    },
    signOutUser() {
      signOut(getAuth());
    }
  }
}
</script>
