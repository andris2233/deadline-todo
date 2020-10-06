<template>
  <div :class="{'textarea-wrapper__active': focused, 'textarea-wrapper__error': isEmptyError}"
       class="textarea-wrapper">
    <div :class="{'textarea-placeholder__active': placeholderActive, 'textarea-placeholder__error': isEmptyError}"
         @click="textareaFocus"
         class="textarea-placeholder"
    >
      <div v-if="required && !disabled"
           class="textarea-placeholder__required">*</div>
      <div class="textarea-placeholder__text">{{placeholder}}</div>
    </div>
    <textarea :value="value"
              :disabled="disabled"
              @focus="focused=true"
              @blur="onBlur"
              @input="onInput($event.target.value)"
              ref="textarea"
              class="textarea"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Description",
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
      default: false,
    }
  },
  data() {
    return {
      focused: false,
      isEmptyError: false,
    };
  },
  computed: {
    placeholderActive() {
      return !!(this.focused || this.value.trim().length);
    }
  },
  methods: {
    textareaFocus() {
      if (!this.focused) {
        this.$refs.textarea.focus();
      }
    },
    onInput(value) {
      this.$emit('input', value);
    },
    onBlur() {
      this.focused = false;
      if (this.required && !this.value.trim()) {
        this.isEmptyError = true;
      }
    }
  },
  watch: {
    value() {
      if (this.required) {
        this.isEmptyError = !this.value.trim();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$blue-color: #328bca;
$gray-color: #c2c2c2;

.textarea-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  padding: 20px 10px 0px 10px;
  height: 130px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid $gray-color;
  transition: all ease 0.3s;
  overflow: hidden;
  background: #fff;
  &__active {
    border: 1px solid $blue-color;
    box-shadow: 0 0 0 1px $blue-color;
  }
  &__error {
    border: 1px solid red;
    box-shadow: 0 0 0 1px red;
  }
}

.textarea {
  resize: none;
  flex: 1;
  border: 0;
  margin: 0;
  padding: 0;
  background: #fff;
  outline: none;
  &-placeholder {
    transition: 0.5s;
    color: $gray-color;
    font-size: 15px;
    position: absolute;
    left: 10px;
    top: 100px;
    display: flex;
    align-items: center;
    &__active {
      top: 5px;
      font-size: 12px;
      color: $blue-color;
    }
    &__error{
      color: red;
    }
    &__required{
      color: red;
      margin-right: 3px;
    }
  }
}
</style>
