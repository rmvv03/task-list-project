<template>
  <div class="home">
    <v-card class="mx-auto" max-width="900" >

      <!-- TODO: Add your NewTaskForm component -->
      <!-- Make sure to pass in any necessary props -->
      <new-task-form :form="form" :createTask="createTask"/>

      <v-divider></v-divider>
      <v-list subheader two-line flat >
        <v-list-subheader>

          <!-- TODO: use the `user` prop to display the user's username here -->{{user.userName}}'s Tasks:
          
        </v-list-subheader>

        <task-list 
        :tasks="tasks"
        :update-task="updateTask"
        :delete-task="deleteTask"
        />

        <!-- TODO: Add your TaskList component -->
        <!-- Make sure to pass in any necessary props -->

      </v-list>
    </v-card>
  </div>
</template>

<script>
import { getCurrentDate, formatDate } from '@/util'
// TODO: Import the components you want to use from their files
import NewTaskForm from '@/components/NewTaskForm.vue';
import TaskList from '@/components/TaskList.vue';

export default {
  name: 'Home',
  components: {
    // TODO: Use the Vue Documentation to find out how to use this property
    NewTaskForm,
    TaskList
  },
  props: {
    // TODO: Add the user object as a prop that's passed in from the App.vue component
    user: {
      type: Object,
      default: () => ({
      userName: ''
    })
      
    }
  },
  data: () => ({
    fetched: false, // This keeps us from getting an error when the page loads, but there's no data
    tasks: [], // This will hold the list of tasks you get from your API
    form: {
      // TODO: Add 2 properties to this form data object to track the Text and the Date
      // HINT: Capitalize the "Text" and "Date" properties to make it easier to pass the data to your API
      // HINT: You can use the `getCurrentDate()` method to get today's date in the proper format for the date picker
      Text: '',
      Date: ''
    },
  }),
  mounted() {
    // TODO: Call the method that gets the tasks from your API
    this.readTasks()
  },
  methods: {
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

      // TODO: Remember to get the updated task list when it's done
      // TODO: Remember to reset the values in this.form to their initial values when it's done
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
      // TODO: Remember that the task's ID should be included in the path of the request, i.e. http://yourserverurl/api/v1/tasks/2r984hfiwufw948feoi
      // TODO: Remember to get the updated task list when it's done
    },
    // This method is given to you. Use it to see how to make fetch() requests.
    deleteTask(task) {
      fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`,
        // The second parameter is an object with options. You can include request
        // headers here, options for credentials, which method, which mode, etc.
        {
          method: `DELETE`,
          credentials: `include`,
        }
        // Note: The default for method is GET, so you don't need to include the
        // method on any GET requests.
      ).then(response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, we want to update the task list.
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


