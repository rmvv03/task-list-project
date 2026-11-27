<template>
  <div id="new-task-form">
     <!-- Event handler attribute that handles the form submission. The ".prevent" keeps the page from reloading every time the user submits a task. -->
    <v-form @submit.prevent="createTask(form)">

      <v-container>
        <v-row>

          <v-col cols="12" xs="12" sm="6">
            <v-text-field label="Add a task..." prepend-icon="edit" required v-model="form.Text"></v-text-field>
          </v-col>

          <v-col cols="12" xs="12" sm="4">
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
              <template #activator="{ props }">
                <v-text-field label="When should the task be done?" prepend-icon="event" v-model="form.Date" v-bind="props" readonly>
                </v-text-field>
              </template>
            <v-date-picker v-model="form.Date" @update:model-value="handleDate"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" xs="4" offset-xs="4" sm="2">
            <v-btn class="mt-3" type="submit" text color="success" block>
              <v-icon left>mdi-plus</v-icon>
              Add Task
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { formatDate } from '@/util'

export default {
  name: 'NewTaskForm',
  props: {
    // The form prop’s default values for the text and date are set to an empty string. It’s also set as an object.
    form: {
      type: Object,
      default: () => ({
        Text: '',
        Date: ''
      })
    },
    // CreateTask is set as a function.
    createTask:{
    type: Function,
    default: () =>{}
  },
  },
  data: () => ({
    menu: false,
  }),

methods: {
  // Updates the form’s date using the value selected from the date picker and closes the menu. The formatting is handled elsewhere when displaying tasks.
  handleDate(value) {
    this.form.Date = formatDate(value)
    this.menu = false
  }
}
}
</script>

<style scoped>
form {
  padding: 0 1rem;
}
</style>
