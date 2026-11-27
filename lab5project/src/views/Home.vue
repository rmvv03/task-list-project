<template>
  <div class="home">
    <v-card class="mx-auto" max-width="900" >
      <new-task-form :form="form" :createTask="createTask"/>
      <v-divider></v-divider>
      <v-list subheader two-line flat >
        <v-list-subheader>

          <!-- Uses the `user` prop to display the user's username -->{{user.userName}}'s Tasks:
          
        </v-list-subheader>
        <!-- Passes the task-list component with props -->
        <task-list 
        :tasks="tasks"
        :update-task="updateTask"
        :delete-task="deleteTask"
        />
      </v-list>
    </v-card>
  </div>
</template>

<script>
import NewTaskForm from '@/components/NewTaskForm.vue';
import TaskList from '@/components/TaskList.vue';

export default {
  name: 'Home',
  components: {
    NewTaskForm,
    TaskList
  },
  props: {
    // Adds the user object as a prop that's passed in from the App.vue component
    user: {
      type: Object,
      default: () => ({
      userName: ''
    })
      
    }
  },
  data: () => ({
    fetched: false, // This keeps us from getting an error when the page loads, but there's no data
    tasks: [], // This will hold the list of tasks you get from the API
    form: {
      Text: '',
      Date: ''
    },
  }),
  mounted() {
    // Calls the method that gets the tasks from the API
    this.readTasks()
  },
  methods: {
      // Sends a POST request to create a new task and refreshes the task list
      // Sends POST request containing the appropriate authorization credentials and the form’s data in JSON syntax.
      // Resets form to default values.
      // Refreshes task list
      createTask(form) {
      fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`, {

        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: form.Text,
          date: form.Date
        })
      }).then(response => {
        if (response.ok) {
          this.readTasks()
          this.form = {
            Text: '',
            Date: ''
          }
        }
      })
    },

    // Retrieves all tasks for the authenticated user and updates UI
    // Sends GET request containing the appropriate authorization credentials.
    // Maps API data (text, date, done) to UI syntax to be displayed.
    // Updates tasks
    readTasks() {
      fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          }
        })
        .then(data => {
          if (data) {
            this.tasks = data.map(task => ({
              ...task,
              Text: task.text,
              Date: task.date,
              Done: task.done
            }))
          }else{
              this.tasks = []
            }
            this.fetched = true
          
        })
    },

    // Toggles task completion status via PUT request
    // Sends PUT request including the appropriate authorization credentials, and the done status in JSON notation.
    // The fetch() uses the task id to update the data in the database too.
    updateTask(task) {
      // TODO: Use fetch() to send a PUT request to your API to update an task to be Done/not Done.
      fetch(
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`,

        {
          method: `PUT`,
          credentials: `include`,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            done: !task.done
          })
        }).then(response =>{
          if(response.ok){
            this.readTasks()
          }
        })
    },

    // Deletes a task via DELETE request
    // Sends DELETE request including the appropriate authorization credentials.
    // The fetch() uses the task id to delete the data in the database too.
    // Refreshes tasks
    deleteTask(task) {
      fetch(
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`,
        {
          method: `DELETE`,
          credentials: `include`,
        }
      ).then(response => {
        if (response.ok) {
          this.readTasks()
        }
      })
    }
  }
}
</script>

<style scoped>
.form {
  padding: 0 1rem;
}
</style>


