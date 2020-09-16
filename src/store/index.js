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
    COMPLETE_TASK(state, index) {
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
    completeTask({ commit }, index) {
      commit('COMPLETE_TASK', index)
    }
  },
  getters: {
    getAllTasks(state) {
      return state.tasks;
    }
  }
})
