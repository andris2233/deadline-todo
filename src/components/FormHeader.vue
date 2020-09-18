<template>
  <div class="slot-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped>
.slot-wrapper {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  font-size: 24px;
  font-weight: 700;
  padding: 30px 0;
  background: #fcfcfc;
  border-bottom: 1px solid #dadada;
  color: #3f3f3f;
}
</style>