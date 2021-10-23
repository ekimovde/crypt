<template>
  <input
    v-model="localValue"
    type="text"
    :placeholder="placeholder"
    class="v-input"
  />
</template>

<script>
export default {
  name: "vInput",
  props: {
    value: {
      type: [String, Number],
      default: () => "",
    },
    placeholder: {
      type: String,
      default: () => "Placeholder",
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  watch: {
    localValue(v) {
      this.$emit("input", v);
    },
    value(v) {
      this.localValue = v;
    },
  },
};
</script>

<style lang="stylus">
.v-input
  padding 10px 15px
  border 1px solid #B8B7BE
  border-radius 5px
  cursor pointer
  width 100%
  min-width 400px

  &::placeholder
    color #B1B1B1

  &:focus
    border-color #1852F0
</style>
