<template>
  <div v-bind:class="{'wrapper-active': focused}" class="textarea-wrapper">
    <div v-bind:class="{'textarea__placeholder-active': focused || value.trim().length}"
         @click="textareaFocus"
         class="textarea__placeholder"
    >{{placeholder}}</div>
    <textarea :value="value"
              :disabled="disabled"
              @focus="focused=true"
              @blur="focused=false"
              @input="$emit('input', $event.target.value);"
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
      required: false,
      default: "Description",
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
      focused: false,
    };
  },
  methods: {
    textareaFocus() {
      if (!this.focused) {
        this.$refs.textarea.focus();
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

  &.wrapper-active {
    background: #fff;
    border: 1px solid $blue-color;
    box-shadow: 0 0 0 1px $blue-color;
  }

  .textarea {
    resize: none;
    flex: 1;
    border: 0;
    margin: 0;
    padding: 0;
    background: #fff;
    outline: none;
  }
}

.textarea__placeholder {
  transition: 0.5s;
  color: $gray-color;
  font-size: 16px;
  position: absolute;
  left: 10px;
  top: 100px;

  &-active {
    top: 5px;
    font-size: 12px;
    color: $blue-color;
  }
}
</style>
