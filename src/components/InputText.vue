<template>
  <div class="input-wrapper" v-bind:class="{inputActiveLine: focused}">
    <div
      class="input-placeholder"
      v-bind:class="{placeholderActive: value.trim().length || focused}"
    >{{placeholder ? placeholder : 'Text'}}</div>
    <input
      type="text"
      @focus="focused=true"
      @blur="focused=false"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
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
      required: false,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  mounted() {
    // this.inputText = this.$props.text;
  },
};
</script>

<style scoped>
.input-wrapper {
  padding-top: 13px;
  position: relative;
  min-height: 40px;
  width: 100%;
  overflow: hidden;
}

.input-placeholder {
  transition: 0.5s;
  color: #c2c2c2;
  font-size: 15px;
  position: absolute;
  left: 0%;
  top: 48%;
}

.placeholderActive {
  top: 0%;
  font-size: 12px;
  color: #328bca;
}

.input-wrapper:before {
  content: "";
  position: absolute;
  bottom: 1px;
  height: 1px;
  background: #c2c2c2;
  width: 100%;
}

.input-wrapper:after {
  transition: all ease 0.3s;
  content: "";
  position: absolute;
  bottom: 0%;
  transform: translateX(-100%);
  height: 2px;
  background: #328bca;
  width: 100%;
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

.inputActiveLine:after {
  transform: translateX(0%);
}
</style>