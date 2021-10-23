<template>
  <div class="rsa-prime-numbers">
    <h4 class="rsa-prime-numbers__title">Простые числа</h4>

    <div class="rsa-prime-numbers__block">
      <label class="rsa-prime-numbers__label">Простое число p</label>
      <vInput v-model="localValue.p" placeholder="Введите число p:" />
    </div>

    <div class="rsa-prime-numbers__block">
      <label class="rsa-prime-numbers__label">Простое число q</label>
      <vInput v-model="localValue.q" placeholder="Введите число q:" />
    </div>

    <vButton
      class="rsa-prime-numbers__button"
      title="Сгенерировать простые числа"
      :loading="localValue.loading"
      @click="onGeneratePrimeNumbers"
    />
  </div>
</template>

<script>
import { generatePrimeNumber } from "@/helpers/functions";
import vInput from "@/components/vInput.vue";
import vButton from "@/components/vButton.vue";

export default {
  name: "RSAPrimeNumbers",
  components: {
    vInput,
    vButton,
  },
  props: {
    primeNumbers: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localValue: { ...this.primeNumbers },
    };
  },
  methods: {
    async onGeneratePrimeNumbers() {
      this.localValue.loading = true;

      // Генерация простых чисел
      let p = await generatePrimeNumber(this.localValue.size);
      let q = await generatePrimeNumber(this.localValue.size);

      while (p === q) q = await generatePrimeNumber(this.localValue.size);

      setTimeout(() => {
        this.localValue.loading = false;
        this.localValue.p = parseInt(p); // p
        this.localValue.q = parseInt(q); // q
        this.$emit("update:primeNumbers", this.localValue);
      }, 300);
    },
  },
  watch: {
    localValue: {
      deep: true,
      handler(v) {
        this.$emit("update:primeNumbers", v);
      },
    },
  },
};
</script>

<style lang="stylus">
.rsa-prime-numbers
  &__block
    text-align left
    margin-bottom 10px

  &__label
    font-size 13px
    font-weight 600
    margin-bottom 5px
    display inline-block
</style>
