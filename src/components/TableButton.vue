<template>
  <button
    :type="buttonType"
    :class="[theme]"
    @click="$emit('click')"
    @submit="$emit('submit')"
    :disabled="disabled"
  >
    <slot>ОК</slot>
  </button>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "green",
    },
  },
};
</script>

<style lang="scss" scoped>
$dark-red: #ac0b0b;
$light-red: #cd2f2f;

$dark-green: #0aab4e;
$light-green: #2fcd74;

button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 4px;
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  &:active:enabled {
    transform: scale(0.9);
  }
  &:disabled {
    opacity: 0.5;
  }
}

.red {
  border: 2px solid $dark-red;
  background: $light-red;
  color: #fff;
  &:hover:enabled {
    background: #fff;
    color: $dark-red;
  }
}

.green {
  border: 2px solid $dark-green;
  background: $light-green;
  color: #fff;
  &:hover:enabled {
    background: #fff;
    color: $dark-green;
  }
}
</style>