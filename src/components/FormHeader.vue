<template>
  <div>{{value}}</div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped>
div {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  padding: 30px 0;
  background: #fcfcfc;
  border-bottom: 1px solid #dadada;
  color: #3f3f3f;
}
</style>