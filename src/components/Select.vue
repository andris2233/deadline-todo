<template>
  <div class="select" :class="{'select-active': active}">
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

<style scoped>
.select {
  position: relative;
  padding: 5px 10px;
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
}

.select-active {
  border-radius: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #328bca;
  color: #328bca;
}

.selected-prop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow {
  transition: transform ease 0.2s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.activeArrow {
  transform: rotate(180deg);
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
  background: #328bca;
  color: #000;
  /* border: 1px solid #ccc; */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #328bca;
}

.optionsActive {
  top: 34px;
  opacity: 1;
  z-index: 2;
  transform: scaleY(1);
}

.option-active {
  font-weight: 600;
}

.option {
  cursor: pointer;
  padding: 7px 10px;
  border-bottom: 1px solid #dadada;
  transition: all ease 0.2s;
  box-sizing: border-box;
  background: #fff;
}

.option:hover {
  background: #328bca;
  color: white;
}
</style>