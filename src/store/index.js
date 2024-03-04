import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  }),
  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find(task => task.id === id)
    }
  },
  actions: {
    addTask(task) {
      this.tasks.push(task)
      this.saveTasksToLocalStorage()
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
      this.saveTasksToLocalStorage()
    },
    toggleTaskStatus(id) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.completed = !task.completed
        this.saveTasksToLocalStorage()
      }
    },
    updateTaskDescription(id, description) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.description = description
        this.saveTasksToLocalStorage()
      }
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
})
