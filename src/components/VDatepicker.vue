<template>
  <div :class="{'datepicker-wrapper__active': focused}"
       class="datepicker-wrapper">
    <label :class="{'datepicker-placeholder__active': value || focused}"
           class="datepicker-placeholder"
    >{{placeholder}}</label>
    <input :value="value"
           :class="{'datepicker__invisible': !value && !focused}"
           :disabled="disabled"
           @input="$emit('input', $event.target.value);"
           @focus="focused=true"
           @blur="focused=false"
           class="datepicker"
           type="date"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "Date",
    },
    value: {
      default: "",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      dateInput: null,
      focused: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$blue-color: #328bca;

.datepicker-wrapper {
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

.datepicker {
  position: absolute;
  height: 70%;
  width: 100%;
  bottom: 0;
  background: none;
  outline: none;
  border: 0;
  transition: opacity ease 0.5s;
  cursor: text;
  &.datepicker__invisible {
    opacity: 0;
  }
  &:disabled {
    cursor: default;
  }
  &-placeholder {
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
}
</style>
