<template>
  <div :class="{'input-wrapper__active': focused, 'input-wrapper__error': isEmptyError}"
       class="input-wrapper">
    <div :class="{'input-placeholder__active': isPlaceholderActive, 'input-placeholder__error': isEmptyError}"
         class="input-placeholder">
      <div v-if="required"
          class="input-placeholder__required"
      >*</div>
      <div class="input-placeholder__text">{{placeholder}}</div>
    </div>
    <input :value="value"
           :disabled="disabled"
           @focus="focused = true"
           @blur="onBlur"
           @input="onInput($event.target.value)"
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
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focused: false,
      isEmptyError: false
    };
  },
  computed:{
    isPlaceholderActive() {
      return this.value.trim().length || this.focused;
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
      if (this.required) {
        this.isEmptyError = !(value.trim());
      }
    },
    onBlur() {
      this.focused = false;
      if(this.required && !this.value.trim()){
        this.isEmptyError = true;
      }
    },
  }
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
  &__error:after{
    background: red;
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
  display: flex;
  // color: $blue-color;
  align-items: center;
  &__active {
    top: 0%;
    font-size: 12px;
    color: $blue-color;
  }
  &__error {
    color: red;
  }
  &__required{
    color: red;
    margin-right: 3px;
    // font-size: 20px;
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
