<template>
  <button :type="type"
          :disabled="disabled"
          @click="$emit('click')"
          @submit="$emit('submit')"
  >
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
  &:hover:enabled {
    transform: scale(1.1);
    background: white;
    box-shadow: 0 0px 10px $blue-color;
    color: $blue-color;
  }
  &:active:enabled {
    transform: scale(1);
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
