import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  mutations: {
    CREATE_TASK(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    REMOVE_TASK(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    COMPLETE_TASK(state, id) {
      const index = state.tasks.findIndex(t => t.id === +id);
      state.tasks[index].status = 'completed';
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({ commit }, task) {
      if (task.date < Date.now()) {
        task.status = 'expired';
      }
      commit('CREATE_TASK', task);
    },
    removeTask({ commit }, id) {
      commit('REMOVE_TASK', id)
    },
    completeTask({ commit }, id) {
      commit('COMPLETE_TASK', id)
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
