<template>
  <div :class="{'input-wrapper__active': focused}" class="input-wrapper">
    <div :class="{'input-placeholder__active': isPlaceholderActive}"
         class="input-placeholder"
    >{{placeholder ? placeholder : 'Text'}}</div>
    <input :value="value"
           :disabled="disabled"
           @focus="focused = true"
           @blur="focused = false"
           @input="$emit('input', $event.target.value)"
           type="text"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    value: {
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed:{
    isPlaceholderActive() {
      return this.value.trim().length || this.focused;
    },
    placeholderText() {
      return this.placeholder ? this.placeholder : 'Text';
    }
  },
};
</script>

<style lang="scss" scoped>
$blue-color: #328bca;

.input-wrapper {
  padding-top: 13px;
  position: relative;
  min-height: 40px;
  width: 100%;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    bottom: 1px;
    height: 1px;
    background: #c2c2c2;
    width: 100%;
  }
  &:after {
    transition: all ease 0.3s;
    content: "";
    position: absolute;
    bottom: 0%;
    transform: translateX(-100%);
    height: 2px;
    background: $blue-color;
    width: 100%;
  }
  &__active:after {
    transform: translateX(0%);
  }
}

.input-placeholder {
  transition: 0.5s;
  color: #c2c2c2;
  font-size: 15px;
  position: absolute;
  left: 0%;
  top: 48%;
  &__active {
    top: 0%;
    font-size: 12px;
    color: $blue-color;
  }
}

input {
  position: absolute;
  height: 70%;
  width: 100%;
  bottom: 0;
  background: none;
  outline: none;
  border: 0;
}
</style>
