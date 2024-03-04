<template>
  <div class="todo-app">
    <!-- Todo List Title -->
    <h2>Todo List</h2>

    <!-- Form to add new tasks -->
    <div class="add-task-form">
      <input v-model="newTaskName" type="text" placeholder="What's happening?">
      <input v-model="newTaskDescription" type="text" placeholder="Task Description (optional)">
      <button @click="addTask" :class="{ 'disabled': !isFormValid }">Add Task</button>
    </div>

    <!-- Filter buttons to filter tasks by status -->
    <div class="filter-container">
      <button @click="filterStatus = 'all'" :class="{ 'active': filterStatus === 'all' }">All</button>
      <button @click="filterStatus = 'active'" :class="{ 'active': filterStatus === 'active' }">Active</button>
      <button @click="filterStatus = 'completed'" :class="{ 'active': filterStatus === 'completed' }">Completed</button>
    </div>

    <!-- List of tasks -->
    <ul>
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <!-- Checkbox for task completion -->
        <div class="task-content">
          <input type="checkbox" :checked="task.completed" @change="toggleTaskStatus(task.id)">
          <!-- Task name with link to task details -->
          <router-link :to="{ name: 'TaskDetails', params: { id: task.id }}">{{ task.name }}</router-link>
        </div>
        <!-- Task description with ellipsis for long descriptions -->
        <span class="task-description" :title="task.description">{{ task.description }}</span>
        <!-- Remove button for deleting tasks -->
        <button class="remove-button" @click="removeTask(task.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useTodoStore } from '../store/index'

export default {
  name: 'TodoList',
  setup() {
    const todoStore = useTodoStore()
    const newTaskName = ref('')
    const newTaskDescription = ref('')
    let filterStatus = ref('all')

    // Adds a new task
    const addTask = () => {
      if (isFormValid.value) {
        todoStore.addTask({
          id: Date.now(),
          name: newTaskName.value,
          description: newTaskDescription.value,
          completed: false
        })
        newTaskName.value = ''
        newTaskDescription.value = ''
      }
    }

    // Removes a task
    const removeTask = (id) => {
      todoStore.removeTask(id)
    }

    // Toggles task completion status
    const toggleTaskStatus = (id) => {
      todoStore.toggleTaskStatus(id)
    }

    // Computed property to filter tasks based on filter status
    const filteredTasks = computed(() => {
      if (filterStatus.value === 'active') {
        return todoStore.tasks.filter(task => !task.completed)
      } else if (filterStatus.value === 'completed') {
        return todoStore.tasks.filter(task => task.completed)
      } else {
        return todoStore.tasks
      }
    })

    // Computed property to check if the form is valid for adding a new task
    const isFormValid = computed(() => {
      return newTaskName.value.trim() !== ''
    })

    return { newTaskName, newTaskDescription, addTask, removeTask, toggleTaskStatus, filteredTasks, filterStatus, isFormValid }
  }
}
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.add-task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}

button {
  padding: 10px;
  font-size: 14px;
  background-color: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

ul {
  list-style: none;
  padding: 0;
}

.task-item {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-content {
  display: flex;
  align-items: center;
}

.task-content input[type="checkbox"] {
  margin-right: 10px;
}

.remove-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #ff7b7b;
}

.task-description {
  flex: 1;
  margin-left: 10px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filter-container {
  margin-bottom: 20px;
}

.filter-container button {
  margin-right: 10px;
}

.filter-container button.active {
  background-color: #1da1f2;
}

.filter-container button.active:hover {
  background-color: #1a91da;
}
</style>
