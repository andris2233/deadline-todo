<template>
  <div class="modal-background" :style="{'z-index': show ? 10 : -1}">
    <transition name="show">
      <div class="modal" v-if="show">
        <FormHeader class="modal__header">
          <slot name="header">header</slot>
          <i class="material-icons icon" @click="$emit('cancel')">close</i>
        </FormHeader>
        <div class="modal__content">
          <div class="modal__body">
            <slot name="body">body</slot>
          </div>
          <div class="modal__control">
            <slot name="control">control</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import FormHeader from "@/components/FormHeader";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  components: { FormHeader },
  methods: {
    cancel() {
      console.log("clcik outside");
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.modal-background {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.modal {
  z-index: 11;
  min-height: 300px;
  max-width: 550px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: white;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 15px;
}

.modal__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 15px;
}

.modal__body {
  flex: 1;
  border-bottom: 1px solid #dadada;
}

.icon {
  outline: none;
  cursor: pointer;
}

.show-enter-active {
  animation: modal 0.4s;
}

.show-leave-active {
  animation: modal 0.4s reverse;
}
@keyframes modal {
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

.popup-enter-active,
.popup-leave-active {
  transition: 0.3s;
}

.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>