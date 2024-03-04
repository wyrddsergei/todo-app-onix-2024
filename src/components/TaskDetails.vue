<template>
  <!-- Task Details Component -->
  <div class="task-details">
      <!-- Title -->
      <h2>Task Details</h2>
      <div class="task-info">
          <!-- Task Name -->
          <h3>{{ task.name }}</h3>
          <!-- Task Description (if available) -->
          <p v-if="task.description" class="description">{{ task.description }}</p>
          <!-- Task Status -->
          <p>Status: <span :class="task.completed ? 'completed' : 'active'">{{ task.completed ? 'Completed' : 'Active' }}</span></p>
      </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTodoStore } from '../store/index'

export default {
  name: 'TaskDetails',
  setup() {
      const route = useRoute()
      const todoStore = useTodoStore()

      // Computed property to get the task based on the route parameter
      const task = computed(() => {
          return todoStore.getTaskById(parseInt(route.params.id))
      })

      return { task }
  }
}
</script>

<style scoped>
.task-details {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.task-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
}

.description {
  margin-bottom: 10px;
}

.completed {
  color: green;
}

.active {
  color: red;
}
</style>
