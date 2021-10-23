<template>
  <nuxt-link class="v-tab" :to="tab.to">
    <img
      src="https://cdn.dribbble.com/assets/dribbble-ball-icon-4e54c54abecf8efe027abe6f8bc7794553b8abef3bdb49cd15797067cf80ca53.svg"
      alt=""
      class="v-tab__icon"
    />

    <p class="v-tab__title">{{ tab.title }}</p>
  </nuxt-link>
</template>

<script>
export default {
  name: "vTab",
  props: {
    tab: {
      type: Object,
      default: () => ({
        title: "Tab",
        to: "/",
      }),
    },
  },
};
</script>

<style lang="stylus">
.v-tab
  padding 10px 8px
  display flex
  align-items center
  background transparent
  border 1px solid #E5E5E5
  border-radius 5px
  cursor pointer
  transition-duration .2s

  &:hover
    background-color #fff
    border-color #fff
    transform scale(1.01)

  &__icon
    margin-right 5px
    width 18px

  &__title
    color #000
</style>
