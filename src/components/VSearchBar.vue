<template>
  <div :class="{'search-bar__active': focused}"
       class="search-bar"
  >
    <i :class="{'search-bar__icon-active': focused}"
       @click="onFocus"
       class="material-icons search-bar__icon">
      search
    </i>
    <input :value="value"
           :placeholder="placeholder"
           @input="$emit('input', $event.target.value)"
           @focus="focused=true"
           @blur="focused=false"
           ref="input"
           type="text"
           class="search-bar__input"
    >
    <i v-if="value"
       @click="$emit('input', '')"
       class="material-icons search-bar__clear">
      clear
    </i>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search'
    }
  },
  data() {
    return {
      focused: false,
    }
  },
  methods: {
    onFocus() {
      this.$refs.input.focus();
      this.focused = true;
    }
  }
}
</script>

<style lang="scss" scoped>
$blue-color: #328bca;

.search-bar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px 5px 10px;
  transition: .4s;
  background: #e9e9e9;
  border-radius: 20px;
  width: 150px;
  &__icon{
    transition: .4s;
    color: #333;
    &-active{
      color: $blue-color;
    }
  }
  &__input{
    border: 0;
    outline: none;
    background: none;
    transition: .4s;
    width: 100%;
  }
  &__active{
    background: #fff;
    box-shadow: 0 0 3px $blue-color;
    width: 250px;
  }
  &__clear{
    transition: .3s;
    cursor: pointer;
    color: #8a8a8a;
    &:hover{
      color: #000;
    }
  }
}
</style>
