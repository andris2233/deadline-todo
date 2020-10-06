<template>
  <i :class="arrowClasses"
     class="material-icons arrow-icon">
    arrow_upward
  </i>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    top: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    arrowClasses() {
      const classes = [];
      if (this.active) {
        classes.push('arrow-icon__active');
        if (!this.top) {
          classes.push('arrow-icon__rotate');
        }
      }
      return classes;
    },
  },
  // watch: {
  //   active(value, prev) {
  //     if (prev && !value) {
  //       this.$emit('blur');
  //     }
  //   },
  // },
}
</script>

<style lang="scss" scoped>
.arrow-icon {
  transition: all ease .3s;
  opacity: .2;
  outline: none;
  display: inline-block;
  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    opacity: .6;
  }
  &__active {
    opacity: 1;
    &:hover {
      opacity: 1;
    }
  }
  &__rotate {
    transform: rotate(180deg);
  }
}
</style>
