<template>
  <div class="v-tabs">
    <vInput
      v-model="search"
      placeholder="Введите название лабораторной работы"
    />

    <h3 class="v-tabs__title">Лабораторные работы</h3>

    <ul class="v-tabs__list">
      <li v-for="(tab, index) in tabs" :key="index" class="v-tabs__item">
        <vTab :tab="tab" />
      </li>
    </ul>
  </div>
</template>

<script>
import vInput from "@/components/vInput";
import vTab from "@/components/vTab";

export default {
  name: "vTabs",
  components: {
    vInput,
    vTab,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style lang="stylus">
.v-tabs
  background #F3F3F7
  padding 20px
  border-radius 5px

  &__title
    margin-top 20px

  &__list
    margin-top 15px

  &__item
    margin-bottom 10px

    &:last-child
      margin-bottom 0
</style>
