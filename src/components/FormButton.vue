<template>
  <button :type="type" @click="$emit('click')" @submit="$emit('submit')" :disabled="disabled">
    <slot>ОК</slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
button {
  border: 0;
  background: #328bca;
  padding: 8px 0;
  border-radius: 20px;
  transition: all ease 0.3s;
  color: white;
  width: 110px;
  outline: none;
  box-shadow: 0 0px 5px #328bca;
}

button:hover {
  transform: scale(1.1);
  background: white;
  box-shadow: 0 0px 10px #328bca;
  color: #328bca;
}

button:active {
  transform: scale(1);
}

button:disabled,
button:disabled:hover {
  background: #328bca;
  box-shadow: 0 0px 5px #328bca;
  color: white;
  opacity: 0.5;
  transform: scale(1);
}
</style>