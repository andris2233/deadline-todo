import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(item => {
      if (new Date(item.date).getTime() <= Date.now() && item.status !== "completed") {
        item.status = "expired";
      }
      return item;
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    removeTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    completeTask(state, id) {
      const index = state.tasks.findIndex(t => t.id === +id);
      state.tasks[index].status = 'completed';
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    saveTask(state, task) {
      if (task.status !== 'completed' && Date.now() > new Date(task.date).getTime()) {
        task.status = "expired";
      } else {
        task.status = "active";
      }
      const index = state.tasks.findIndex(t => t.id === task.id);
      state.tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({ commit }, task) {
      if (new Date(task.date).getTime() < Date.now()) {
        task.status = 'expired';
      }
      commit('createTask', task);
    },
    removeTask({ commit }, id) {
      commit('removeTask', id)
    },
    completeTask({ commit }, id) {
      commit('completeTask', id)
    },
    saveTask({ commit }, task) {
      commit('saveTask', task);
    }
  },
  getters: {
    getAllTasks(state) {
      return state.tasks;
    },
    taskById(state) {
      return id => state.tasks.find(task => task.id === +id);
    }
  }
})
