<template>
  <div class="datepicker-wrapper" v-click-outside="clickOutside">
    <div class="input-wrapper" :class="{inputActiveLine: focused}">
      <div class="calendar__placeholder" v-bind:class="{placeholderActive: focused}">{{placeholder}}</div>
      <input type="text" @click="focused=true" />
    </div>
    <div class="calendar" :class="{'calendar-active': focused}">
      <div class="calendar__months"></div>
      <div class="calendar__days"></div>
      <div class="calendar__content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      deafault: "",
    },
    placeholder: {
      default: "Date",
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  methods: {
    clickOutside() {
      this.focused = false;
    },
  },
};
</script>

<style scoped>
.datepicker-wrapper {
  position: relative;
  padding: 0px 0 5px 0;
}

.input-wrapper {
  min-height: 40px;
  position: relative;
  overflow: hidden;
}

.calendar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 220px;
  min-height: 200px;
  background: white;
  overflow: hidden;
  border-radius: 10px;
  position: absolute;
  top: 42px;
  transition: 0.2s;
  transform-origin: top left;
  box-shadow: 0 0 3px #575757;
  transform: scale(0);
  z-index: 2;
}

.calendar-active {
  transform: scale(1);
}

input {
  width: 100%;
  height: 40px;
  outline: none;
  box-sizing: border-box;
  border: 0;
}

.calendar__placeholder {
  transition: 0.3s;
  color: #c2c2c2;
  font-size: 15px;
  position: absolute;
  left: 0%;
  top: 45%;
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
  left: 0%;
  bottom: 0%;
  transform: translateX(-100%);
  height: 2px;
  background: #328bca;
  width: 100%;
}

.inputActiveLine:after {
  transform: translateX(0%);
}
</style>