import Vue from 'vue';

export default Vue.directive('click-outside', {
    bind: function (el, binding) {
        el.clickHandler = function (e) {
            if (e.target !== el && !el.contains(e.target)) {
                binding.value(e);
            }
        }
        document.addEventListener("mousedown", el.clickHandler);
    },
    unbind: function (el) {
        document.removeEventListener("mousedown", el.clickHandler);
    }
});