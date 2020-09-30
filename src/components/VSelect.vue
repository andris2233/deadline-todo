<template>
  <div :class="{'select__active': active}"
       v-click-outside="clickOutsideEvent"
       ref="select"
       class="select"
  >
    <div class="selected-prop" @click="active = !active">
      <span>{{titleText}}</span>
      <i :class="{'arrow__active': active}" class="material-icons arrow">expand_more</i>
    </div>
    <div :class="{'select-options__active': active}" class="select-options">
      <div v-for="(o, index) in options"
           :key="o.value"
           :class="{'option__active': o.value === selectedProp.value}"
           :style="{borderBottom: optionsBorder(index, options.length)}"
           @click="selectOption(o)"
           class="option"
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
    value: {
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
    optionsBorder(idx, len){
      return idx === len - 1 ? 0 : '1px solid #dadada';
    },
  },
  computed: {
    titleText() {
      const { title } = this.selectedProp;
      return title ? title : 'Выберите свойство';
    }
  },
  mounted() {
    if (this.value) {
      this.selectedProp = this.value;
    } else if (this.options.length) {
      this.selectedProp = this.options[0];
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
  &__active {
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
  &__active {
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
  &__active {
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
  &__active {
    font-weight: 600;
  }
}
</style>
