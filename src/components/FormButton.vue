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

<style lang="scss" scoped>
$blue-color: #328bca;

button {
  border: 0;
  background: $blue-color;
  padding: 8px 0;
  border-radius: 20px;
  transition: all ease 0.3s;
  color: white;
  width: 110px;
  outline: none;
  box-shadow: 0 0px 5px $blue-color;

  &:hover {
    transform: scale(1.1);
    background: white;
    box-shadow: 0 0px 10px $blue-color;
    color: $blue-color;
  }

  &:active {
    transform: scale(1);
  }

  &:disabled,
  &:disabled:hover {
    background: $blue-color;
    box-shadow: 0 0px 5px $blue-color;
    color: white;
    opacity: 0.5;
    transform: scale(1);
  }
}
</style>