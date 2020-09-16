<template>
  <transition-group name="tag" tag="div" class="tags-row" v-bind:class="{focusedInput:focused}">
    <label
      for="tags"
      class="tags__placeholder"
      v-bind:class="{placeholderActive: tags.length || focused || tag.trim().length}"
      key="placeholder"
    >{{placeholder ? placeholder : 'Tags'}}</label>
    <div class="tag" v-for="tag in tags" :key="tag.id">
      <div class="tag-name">{{tag.name}}</div>
      <i class="material-icons close" @click="removeTag(tag.id)">close</i>
    </div>
    <input
      type="text"
      name="tags"
      class="tags-input"
      @keyup.enter="createTag"
      @focus="focused=true"
      @blur="focused=false"
      v-model="tag"
      autocomplete="off"
      key="input"
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
    },
  },
  data() {
    return {
      tag: "",
      focused: false,
    };
  },
  methods: {
    deleteTag(id) {
      this.$emit("delete-tag", id);
    },
    createTag() {
      const cleanTag = this.tag.trim();
      if (
        !cleanTag ||
        this.$props.tags.find((item) => item.name === cleanTag)
      ) {
        this.tag = "";
        return;
      }
      const tag = {
        name: cleanTag,
        id: Date.now(),
      };
      this.tag = "";
      this.$emit("create-tag", tag);
    },
    removeTag(id) {
      this.$emit("remove-tag", id);
    },
    stopPropogate(e) {
      e.stopPropogation();
    },
  },
};
</script>

<style scoped>
.tags-row {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  position: relative;
  transition: all ease 0.3s;
  overflow: hidden;
  padding-top: 13px;
  min-height: 40px;
}

.tags-row:before {
  content: "";
  position: absolute;
  bottom: 1px;
  background: #c2c2c2;
  width: 100%;
  height: 1px;
  border-radius: 5px;
}

.tags-row:after {
  content: "";
  position: absolute;
  bottom: 0%;
  background: #328bca;
  transition: 0.3s;
  width: 100%;
  transform: translateX(-100%);
  height: 2px;
  border-radius: 5px;
}

.focusedInput:after {
  transform: translateX(0%);
}

.tags__placeholder {
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

.tag {
  border-radius: 20px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  background: #328bca;
  color: white;
  margin: 0 5px 5px 0;
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

.close {
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

.tag-enter,
.tag-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>