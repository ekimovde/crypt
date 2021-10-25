<template>
  <div class="default">
    <client-only>
      <notifications class="default__notifications" group="notify" />
    </client-only>

    <nuxt />
  </div>
</template>

<script>
export default {
  name: "Default",
};
</script>

<style lang="stylus">
.default
  width 100%
  height 100vh

  &__notifications
    position fixed
    padding 10px
    margin 0 5px 5px
    font-size 12px
    color #ffffff
    background transparent
</style>
