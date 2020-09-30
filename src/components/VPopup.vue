<template>
  <transition name="bg" appear>
    <div class="modal-background">
      <transition name="show" appear>
        <div class="modal" v-click-outside="cancel">
          <VFormHeader class="modal__header">
            <slot name="header">header</slot>
            <i class="material-icons icon" @click="cancel">close</i>
          </VFormHeader>
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
  </transition>
</template>

<script>
import VFormHeader from "@/components/VFormHeader";

export default {
  components: { VFormHeader },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
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
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: white;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 15px;
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 15px;
  }
  &__body {
    flex: 1;
    border-bottom: 1px solid #dadada;
  }
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
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.bg-enter-active,
.bg-leave-active {
  transition: 0.3s;
}

.bg-enter,
.bg-leave-to {
  opacity: 0;
}
</style>
