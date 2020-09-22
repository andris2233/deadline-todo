<template>
  <div
    class="select"
    :class="{'select-active': active}"
    ref="select"
    v-click-outside="clickOutsideEvent"
  >
    <div class="selected-prop" @click="active=!active">
      <span>{{selectedProp.title ? selectedProp.title : 'Выберите свойство'}}</span>
      <i class="material-icons arrow" :class="{activeArrow: active}">expand_more</i>
    </div>
    <div class="select-options" :class="{optionsActive: active}">
      <div
        class="option"
        v-for="(o, index) in options"
        :key="o.value"
        :class="{'option-active': o.value === selectedProp.value}"
        :style="{borderBottom: index === options.length - 1 ? 0 : '1px solid #dadada'}"
        @click="selectOption(o)"
      >{{o.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      active: false,
      selectedProp: {},
    };
  },
  methods: {
    selectOption(option) {
      this.selectedProp = option;
      this.active = false;
      this.$emit("input", option);
    },
    clickOutsideEvent(e) {
      this.active = false;
    },
  },
  mounted() {
    if (this.$props.selected) {
      this.selectedProp = this.$props.selected;
    } else if (this.$props.options.length) {
      this.selectedProp = this.$props.options[0].title;
    }
  },
};
</script>

<style lang="scss" scoped>
$blue-color: #328bca;

.select {
  position: relative;
  width: 270px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ccc;
  z-index: 3;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 10px;
  transition: 0.1s;
  font-size: 13px;

  &.select-active {
    border-radius: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 1px solid $blue-color;
    color: $blue-color;
  }
}

.selected-prop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}

.arrow {
  transition: transform ease 0.2s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &.activeArrow {
    transform: rotate(180deg);
  }
}

.select-options {
  position: absolute;
  width: 270px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  opacity: 0;
  transition: all ease 0.2s;
  top: 20px;
  left: -1px;
  z-index: -1;
  transform-origin: top center;
  transform: scaleY(0);
  background: $blue-color;
  color: #000;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid $blue-color;

  &.optionsActive {
    top: 34px;
    opacity: 1;
    z-index: 2;
    transform: scaleY(1);
  }
}

.option {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #dadada;
  transition: all ease 0.2s;
  box-sizing: border-box;
  background: #fff;

  &:hover {
    background: $blue-color;
    color: white;
  }

  &.option-active {
    font-weight: 600;
  }
}
</style>