<template>
  <div class="textarea-wrapper" v-bind:class="{wrapperActive: focused}">
    <div
      class="textarea__placeholder"
      v-bind:class="{textarea__placeholderActive: focused || description.trim().length}"
    >{{placeholder}}</div>
    <textarea
      class="textarea"
      @focus="focused=true"
      @blur="focused=false"
      v-model="description"
      @input="$emit('input', $event.target.value);"
      :disabled="disabled"
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
    text: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      description: "",
      focused: false,
    };
  },
  mounted() {
    if (this.$props.text.trim()) {
      this.description = this.$props.text;
    }
  },
};
</script>

<style scoped>
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
  border: 1px solid #c2c2c2;
  transition: all ease 0.3s;
  overflow: hidden;
  background: #fff;
}

.textarea__placeholder {
  transition: 0.5s;
  color: #c2c2c2;
  font-size: 16px;
  position: absolute;
  left: 10px;
  top: 100px;
}

.textarea__placeholderActive {
  top: 5px;
  font-size: 12px;
  color: #328bca;
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

.wrapperActive {
  background: white;
  border: 1px solid #328bca;
  box-shadow: 0 0 0 1px #328bca;
}
</style>