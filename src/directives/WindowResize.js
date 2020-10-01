import Vue from 'vue';

export default Vue.directive('window-resize', {
    bind: function (el, binding) {
      window.addEventListener("resize", binding.value);
    },
    unbind: function (el, binding) {
      window.removeEventListener("resize", binding.value);
    }
});
