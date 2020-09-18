<template>
  <div class="datepicker-wrapper" v-bind:class="{datepickerActiveLine: focused}">
    <label
      class="datepicker-placeholder"
      v-bind:class="{datepickerPlaceholderActive: value || focused}"
    >{{placeholder}}</label>
    <input
      type="date"
      @input="$emit('input', $event.target.value);"
      @focus="focused=true"
      @blur="focused=false"
      v-bind:class="{invisible: !value && !focused}"
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
  mounted() {
    // const { date } = this.$props;
    // if (date) {
    //   this.dateInput = `${date.getFullYear()}-${(
    //     "0" +
    //     (date.getMonth() + 1)
    //   ).substr(-2)}-${("0" + date.getDate()).substr(-2)}`;
    // }
  },
};
</script>

<style scoped>
.datepicker-wrapper {
  padding-top: 13px;
  position: relative;
  min-height: 40px;
  width: 100%;
  overflow: hidden;
}

.datepicker-placeholder {
  transition: 0.5s;
  color: #c2c2c2;
  font-size: 15px;
  position: absolute;
  left: 0%;
  top: 48%;
}

.datepickerPlaceholderActive {
  top: 0%;
  font-size: 12px;
  color: #328bca;
}

.datepicker-wrapper:before {
  content: "";
  position: absolute;
  bottom: 1px;
  height: 1px;
  background: #c2c2c2;
  width: 100%;
}

.datepicker-wrapper:after {
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
  transition: opacity ease 0.5s;
}

.invisible {
  opacity: 0;
}

.datepickerActiveLine:after {
  transform: translateX(0%);
}
</style>