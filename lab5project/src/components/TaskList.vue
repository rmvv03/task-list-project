<template>
 
  <div id='task-list'>
    <v-list>
       <!-- This v-for attribute allows the tasks to be displayed one by one, and to be assigned a task id -->
      <v-list-item v-for="task in tasks" :key="task._id">

          <template v-slot:prepend>
            <!-- click event handler attribute that updates a task -->
            <v-btn variant="text" @click="updateTask(task)">
            <!-- Shows different icons (checked or not checked box) according to 'done' status -->
            <v-icon v-if="task.Done">mdi-checkbox-marked</v-icon>
            <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
            </v-btn>
          </template>

          <v-list-item-title>
            <!-- Shows the value of the task's Text property -->
             {{ task.Text }}
          

          </v-list-item-title>
          <v-list-item-subtitle>
            <!-- Shows the value of the task's Date property -->
          {{ task.Date }}

          </v-list-item-subtitle>
          <template v-slot:append>
            <!-- Click event handler attribute that deletes the task -->
            <v-btn icon="mdi-trash-can" color="red" variant="text" @click="deleteTask(task)">
            </v-btn>
          </template>

      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    // Prop set as an empty array by default.
    tasks: {
      type: Array,
      default: () => []
      },
      // Prop set as an empty function by default.
      updateTask: {
        type: Function,
        default: () => {}
      },
      // Prop set as an empty function by default.
      deleteTask: {
        type: Function,
        default: () => {}
      }
    }
  }
</script>
