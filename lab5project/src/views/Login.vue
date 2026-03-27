<template>
  <div id='login'>
    <h1>Welcome to your Task List!</h1>
    <v-btn :href="googleAuthHref" color="primary">
      <v-icon left>mdi-google</v-icon>
      Log In with Google
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    apiOrigin: process.env.VUE_APP_API_ORIGIN
  }),
  computed: {
    googleAuthHref() {
      const origin =
        typeof window !== 'undefined'
          ? window.location.origin
          : ''
      return `${this.apiOrigin}/api/v1/auth/google?returnTo=${encodeURIComponent(origin)}`
    }
  }
}
</script>

<style scoped>
#login {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50%;
}
</style>
