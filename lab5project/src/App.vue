<template>
  <v-app>
    <!-- Link to Material Icons-->
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      rel="stylesheet"
      type="text/css"
    />
    <!-- Adding an AppBar component here, making sure to pass in the user object as a prop. -->    
    <AppBar :user="user"/>
    

    <v-main>
      <router-view :user="user"></router-view>
    </v-main>

  </v-app>
</template>

<script>
// Importing the AppBar component here 
import AppBar from '@/components/AppBar.vue';

export default {
  name: 'App',
  components: {
    // TODO: Use the Vue Documentation to find out how to use this property
    AppBar
  },
  data:()=> ({
    user: {
      UserName:''
    },
    defaultUser: {
      UserName: ''
    }}
    ),
    methods: {
    //This function updates the user variable with a fetch request. Uses fetch to get the user from your API backend. It returns an object identical to the `default` if fetch() fails.
     async getUser(){ 
        try{
          const res = await fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/user`,{
            credentials: 'include'
          })
          if (!res.ok){
            throw new Error (`Request failed with status ${res.status}`)
          }
          this.user = await res.json()
          console.log(this.user)
        } catch (error){
          console.error(error.message)
          this.user = {...this.defaultUser}
        }
    }
    },
    mounted(){ // this is used to call getUser when the page loads 
      this.getUser()
    }     
}
</script>