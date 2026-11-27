<template>
  <div id='app-bar'>
    <v-app-bar app color="primary" dark>

      <v-toolbar-title>Todo App</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- This v-if is used to only show this button when the user is logged in -->
      <v-btn v-if="loggedIn" icon v-on:click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list-item>
        <v-list-item-title>{{ user.userName }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <!-- This link logs a user out -->
        <v-list-item link :href="logoutURL">

          <v-icon>mdi-logout-variant</v-icon>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { authenticated } from '@/util'
export default {

  name: 'AppBar',
  props: {
    // The user prop is defined and its userName's default value is blank.
    user: {
      type: Object,
      default: () => ({
        userName: ''
      })
    }
  },
  data: () => ({
    drawer: false,
    loggedIn: false,
    origin: process.env.VUE_APP_API_ORIGIN
  }
  ),
  computed: {
    // This is where the logout link is assembled.
    logoutURL() {
      const url = new URL('/api/v1/auth/logout', this.origin)
      url.searchParams.set('returnTo', `${window.location.origin}${process.env.BASE_URL}`)
      return url.toString()
    }
  },
  methods: {
    // Gets the user info by calling `authenticated()` and sets the user logged in state as true or false.
    async getLoggedIn() {
      try {
        const response = await authenticated()
        if (response == false) {
          this.loggedIn = false
        }
        else {
          this.loggedIn = true
        }
      }
      catch (error) {
        console.error(error.message)
        this.loggedIn = false
      }
    }
  },
  mounted() {
    this.getLoggedIn()
  }

}
</script>
