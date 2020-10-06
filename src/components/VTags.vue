<template>
  <transition-group :class="{'tags__active': focused, 'tags__error': isEmptyError}"
                    name="tag"
                    tag="div"
                    class="tags"
  >
    <div :class="{'tags-placeholder__active': isActiveInput, 'tags-placeholder__error': isEmptyError}"
         class="tags-placeholder"
         key="placeholder">
      <div v-if="required && !disabled"
           class="tags-placeholder__required">*</div>
      <div class="tags-placeholder__text">{{placeholder}}</div>
    </div>
    <div v-for="tag in tags" 
         :key="tag.id"
         class="tag"
    >
      <div class="tag-name">{{tag.name}}</div>
      <transition name="icon-close">
        <i v-if="!disabled"
           @click="onRemove(tag.id)"
           class="material-icons tag-icon"
        >close</i>
      </transition>
    </div>
    <input v-model="tag"
           :disabled="disabled"
           ref="tagsInput"
           @keyup.enter="createTag"
           @focus="focused=true"
           @blur="onBlur"
           type="text"
           autocomplete="off"
           key="input"
           class="tags-input"
    />
  </transition-group>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Tags',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tag: '',
      focused: false,
      isEmptyError: false,
    };
  },
  computed: {
    isActiveInput() {
      return !!(this.tags.length || this.focused || this.tag.trim().length);
    },
  },
  methods: {
    createTag() {
      const cleanTag = this.tag.trim();
      if (cleanTag && !this.tags.find((item) => item.name === cleanTag)) {
        const tag = {
          name: cleanTag,
          id: Date.now(),
        };
        this.$emit('create-tag', tag);
      }
      this.tag = '';
    },
    onBlur() {
      this.focused = false;
      this.createTag();
      if (this.required && !this.tags.length) {
        this.isEmptyError = true;
      }
    },
    onRemove(id) {
      this.$emit('remove-tag', id);
    },
  },
  watch: {
    tags() {
      if(this.required){
        this.isEmptyError = !this.tags.length;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$blue-color: #328bca;
$gray-color: #c2c2c2;

.tags {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  position: relative;
  transition: all ease 0.3s;
  overflow: hidden;
  padding-top: 13px;
  min-height: 40px;
  &:before {
    content: "";
    position: absolute;
    bottom: 1px;
    background: $gray-color;
    width: 100%;
    height: 1px;
    border-radius: 5px;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0%;
    background: $blue-color;
    transition: 0.3s;
    width: 100%;
    transform: translateX(-100%);
    height: 2px;
    border-radius: 5px;
  }
  &__active:after {
    transform: translateX(0%);
  }
  &__error:after {
    transform: translateX(0%);
    background: red;
  }
  &-placeholder {
    transition: 0.5s;
    color: $gray-color;
    font-size: 15px;
    position: absolute;
    left: 0%;
    top: 48%;
    display: flex;
    align-items: center;
    &__active {
      top: 0%;
      font-size: 12px;
      color: $blue-color;
    }
    &__error {
      color: red;
    }
    &__required {
      color: red;
      margin-right: 3px;
    }
  }
}

.tag {
  border-radius: 20px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  background: $blue-color;
  color: #fff;
  margin: 0 5px 5px 0;
  min-width: 40px;
  transition: 0.2s;
}

input {
  flex: 1;
  outline: none;
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 30px;
  background: none;
}

.tag-icon {
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.tag-enter-active,
.tag-leave-active {
  transition: all 0.4s;
}

.tag-leave-active {
  position: absolute;
}

.tag-enter,
.tag-leave-to {
  transform: scale(0);
  opacity: 0;
}

.tag-move {
  transition: 0.2s;
}

.icon-close-enter-active {
  animation: bounce-in 0.4s;
}

.icon-close-leave-active {
  animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
