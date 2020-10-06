<template>
  <router-link v-if="!isHtmlLink" :to="to">
    <slot />
  </router-link>

  <a v-else
     :href="to">
     <slot />
  </a>
</template>

<script>
export default {
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    isHtmlLink: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style lang="scss" scoped>
$blue-color: #328bca;

a {
  display: inline-block;
  color: $blue-color;
  text-decoration: none;
  overflow: hidden;
  transition: 0.2s;
  position: relative;
  &:visited {
    color: $blue-color;
  }
  &:after {
    content: "";
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    background: $blue-color;
    transform: scaleX(0);
    transition: 0.2s;
  }
  &:hover:after {
    transform: scaleX(1);
  }
}
</style>
