<template>
  <button
    class="v-button"
    :class="{ 'v-button_disabled': disabled }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <i
      v-if="loading"
      class="bx bx-loader-circle bx-spin bx-flip-horizontal v-button__icon"
    />

    <p v-else>{{ title }}</p>
  </button>
</template>

<script>
export default {
  name: "vButton",
  props: {
    title: {
      type: String,
      default: () => "Submit",
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus">
.v-button
  width 100%
  display flex
  align-items center
  justify-content center
  outline none
  border none
  padding 10px 0
  border-radius 5px
  background-color #9246FF
  color #fff
  font-size 13px
  cursor pointer

  &:hover
    opacity 0.9

  &_disabled
    opacity 0.7
    cursor initial

    &:hover
      opacity 0.7

  &__icon
    font-size 15px
</style>
