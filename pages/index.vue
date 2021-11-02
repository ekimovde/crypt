<template>
  <div class="index">
    <div class="index__top">
      <img
        src="https://lh3.googleusercontent.com/khT0t4Tx4l2ppzo5uLBtA0TJxsxVLF3COBr_prD8Wu5GF3G2UTnswzEZKsRbXp8WBOg6LOziU1vBRl4JF6Y52NU=w128-h128-e365-rj-sc0x00ffffff"
        alt=""
        class="index__image"
      />

      <h1>Криптография</h1>
    </div>

    <vTabs :tabs="pages" />
  </div>
</template>

<script>
import vTabs from "@/components/vTabs";

export default {
  name: "Index",
  components: {
    vTabs,
  },
  data() {
    return {
      pages: [
        {
          title: "Лабораторная работа #1",
          to: "/number-theory",
        },
        {
          title: "Лабораторная работа #2",
          to: "/rsa",
        },
        {
          title: "Лабораторная работа #3",
          to: "/diffie-hellman",
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
.index
  height 100%
  display flex
  align-items center
  flex-direction column

  &__top
    margin 50px 0 30px 0

  &__image
    width 50px
    margin 0 auto
    display block
</style>
