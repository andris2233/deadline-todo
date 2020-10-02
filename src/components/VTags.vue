<template>
  <transition-group name="tag"
                    tag="div"
                    class="tags"
                    :class="{'tags__active':focused}"
  >
    <div :class="{'tags-placeholder__active': isActiveInput}"
         class="tags-placeholder"
         key="placeholder"
    >{{placeholder}}</div>
    <div v-for="tag in tags" 
         :key="tag.id"
         class="tag"
    >
      <div class="tag-name">{{tag.name}}</div>
      <transition name="icon-close">
        <i v-if="!disabled"
           @click="$emit('remove-tag', tag.id)"
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
      required: false,
      default: 'Tags',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      tag: '',
      focused: false,
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
    onBlur(){
      this.focused = false;
      this.createTag();
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
  &-placeholder {
    transition: 0.5s;
    color: $gray-color;
    font-size: 15px;
    position: absolute;
    left: 0%;
    top: 48%;
    &__active {
      top: 0%;
      font-size: 12px;
      color: $blue-color;
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