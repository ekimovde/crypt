<template>
  <textarea class="v-textarea" v-model="localValue" />
</template>

<script>
export default {
  name: "vTextarea",
  props: {
    value: {
      type: [String, Number],
      default: () => "",
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
.v-textarea
  resize none
  width 100%
  height 60px
</style>
