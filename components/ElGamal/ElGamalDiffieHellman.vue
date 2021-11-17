<template>
  <div class="el-gamal-diffie-hellman">
    <h4 class="el-gamal-diffie-hellman__title">
      Простые числа (Диффи-Хеллман)
    </h4>

    <div class="el-gamal-diffie-hellman__wrapper">
      <div class="el-gamal-diffie-hellman__block">
        <label class="el-gamal-diffie-hellman__label">
          Простое число p = (2 * q) + 1
        </label>
        <vTextarea v-model="localValue.p" :disabled="true" />
      </div>

      <div class="el-gamal-diffie-hellman__block">
        <label class="el-gamal-diffie-hellman__label"> Простое число q </label>
        <vTextarea v-model="localValue.q" :disabled="true" />
      </div>
    </div>

    <div class="el-gamal-diffie-hellman__block">
      <label class="el-gamal-diffie-hellman__label"> Параметр g </label>
      <vInput v-model.number="localValue.g" placeholder="Параметр g:" />
    </div>

    <vButton
      title="Сгенерировать числа"
      @click="onGeneratePrimeNumbersDiffieHellman"
    />
  </div>
</template>

<script>
import {
  generatePrimeNumber,
  exponentiationNumberMod,
  isPrime,
} from "@/helpers/functions";
import vTextarea from "@/components/vTextarea";
import vInput from "@/components/vInput";
import vButton from "@/components/vButton";

export default {
  name: "ElGamalDiffieHellman",
  components: {
    vTextarea,
    vInput,
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
    onGeneratePrimeNumbersDiffieHellman() {
      // Генерация чисел p, q
      let p = generatePrimeNumber(this.localValue.size);
      let q = p / 2 - 0.5;

      while (!isPrime(q)) {
        p = generatePrimeNumber(this.localValue.size);
        q = p / 2 - 0.5;
      }

      // Генерация числа g
      let g = generatePrimeNumber(29);

      while (exponentiationNumberMod(g, q, p) === 1)
        g = generatePrimeNumber(29);

      this.localValue = {
        ...this.localValue,
        p,
        q,
        g,
      };
    },
  },
  watch: {
    localValue: {
      deep: true,
      handler(v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>

<style lang="stylus">
.el-gamal-diffie-hellman
  &__title
    margin-bottom 5px

  &__wrapper
    display grid
    grid-template-columns repeat(2, 1fr)
    grid-gap 10px

  &__block
    text-align left
    margin-bottom 10px

  &__label
    font-size 13px
    font-weight 600
    margin-bottom 5px
    display inline-block

  &__button
    margin-top 5px
</style>
