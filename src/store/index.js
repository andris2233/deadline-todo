import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  mutations: {
    createTask(state, task){
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({commit}, task){
      if(task.date < Date.now()){
        task.status = 'expired';
      }
      commit('createTask', task);
    }
  },
  getters: {
    getTasks(state){
      return state.tasks;
    }
  }
})
