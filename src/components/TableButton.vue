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

<style>
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 4px;
  transition: 0.3s;
  outline: none;
}

.red {
  border: 2px solid #ac0b0b;
  background: #cd2f2f;
  color: #fff;
}

.red:hover {
  background: #fff;
  color: #ac0b0b;
}

.green {
  border: 2px solid #0aab4e;
  background: #2fcd74;
  color: #fff;
}

.green:hover {
  background: #fff;
  color: #0aab4e;
}

button:active {
  transform: scale(0.9);
}
</style>