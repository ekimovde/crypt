<template>
  <div class="shamir-prime-numbers">
    <h4 class="shamir-prime-numbers__title">Простые числа</h4>

    <div class="shamir-prime-numbers__block">
      <label class="shamir-prime-numbers__label"> Простое число p </label>
      <vTextarea v-model="localValue.p" />
    </div>

    <div class="shamir-prime-numbers__wrapper">
      <div class="shamir-prime-numbers__block">
        <label class="shamir-prime-numbers__label"> Число Ca </label>
        <vTextarea v-model="localValue.Ca" />
      </div>

      <div class="shamir-prime-numbers__block">
        <label class="shamir-prime-numbers__label"> Число Cb </label>
        <vTextarea v-model="localValue.Cb" />
      </div>
    </div>

    <div class="shamir-prime-numbers__wrapper">
      <div class="shamir-prime-numbers__block">
        <label class="shamir-prime-numbers__label"> Число da </label>
        <vTextarea v-model="localValue.da" />
      </div>

      <div class="shamir-prime-numbers__block">
        <label class="shamir-prime-numbers__label"> Число db </label>
        <vTextarea v-model="localValue.db" />
      </div>
    </div>

    <vButton
      title="Сгенерировать простые числа"
      @click="onGeneratePrimeNumbers"
    />

    <vButton
      class="shamir-prime-numbers__button"
      title="Найти числа da, db"
      @click="onCalculateDaDb"
    />
  </div>
</template>

<script>
import {
  generatePrimeNumber,
  nod,
  inverseNumberMod,
} from "@/helpers/functions";
import vTextarea from "@/components/vTextarea.vue";
import vButton from "@/components/vButton.vue";

export default {
  name: "ShamirPrimeNumbers",
  components: {
    vTextarea,
    vButton,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    onGeneratePrimeNumbers() {
      const { size } = this.value;

      // Генерация простого числа p
      const p = generatePrimeNumber(size);
      console.log("p:", p);

      // Генерация чисел Ca
      let Ca = generatePrimeNumber(size);

      while (nod(Ca, p - 1)[0] !== 1) Ca = generatePrimeNumber(size);
      console.log("Ca:", Ca);

      // Генерация чисел Cb
      let Cb = generatePrimeNumber(size);

      while (nod(Cb, p - 1)[0] !== 1) Cb = generatePrimeNumber(size);
      console.log("Cb:", Cb);

      this.localValue = {
        ...this.localValue,
        p,
        Ca,
        Cb,
      };
    },
    onCalculateDaDb() {
      const { p, Ca, Cb } = this.localValue;

      // Генерация числа da
      let da = inverseNumberMod(Ca, p - 1);
      console.log("da:", da);

      // Генерация числа db
      let db = inverseNumberMod(Cb, p - 1);
      console.log("db:", db);

      this.localValue = {
        ...this.localValue,
        da,
        db,
      };
    },
  },
  watch: {
    localValue: {
      deep: true,
      handler(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="stylus">
.shamir-prime-numbers
  &__title
    margin-bottom 5px

  &__block
    text-align left
    margin-bottom 10px

  &__wrapper
    display grid
    grid-template-columns repeat(2, 1fr)
    grid-gap 10px

  &__label
    font-size 13px
    font-weight 600
    margin-bottom 5px
    display inline-block

  &__button
    margin-top 5px
</style>
