<template>
  <div class="diffie-hellman-parametr">
    <h4 class="diffie-hellman-parametr__title">Вычисление параметра</h4>

    <div class="diffie-hellman-parametr__block">
      <label class="diffie-hellman-parametr__label"> Параметр g </label>
      <vInput v-model.number="localValue.g" placeholder="Введите параметр g:" />
    </div>

    <vButton
      title="Вычислить параметр"
      :loading="loading"
      :disabled="!disabledButton"
      @click="onGenerateParametr"
    />
  </div>
</template>

<script>
import {
  exponentiationNumberMod,
  generatePrimeNumber,
  isPrime,
  checkNumber,
} from "@/helpers/functions";
import vInput from "@/components/vInput";
import vButton from "@/components/vButton";

export default {
  name: "DiffieHellmanParametr",
  components: {
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
      loading: false,
    };
  },
  computed: {
    disabledButton() {
      const { p, q } = this.value;

      if (!isPrime(p) || !isPrime(q)) return false;
      if (parseInt(p) !== parseInt(q) * 2 + 1) return false;
      return checkNumber(p) && checkNumber(q);
    },
  },
  methods: {
    onGenerateParametr() {
      this.loading = true;

      const { p, q } = this.value;
      let g = generatePrimeNumber(99);

      while (exponentiationNumberMod(g, q, p) === 1)
        g = generatePrimeNumber(99);

      setTimeout(() => {
        this.loading = false;
        this.localValue.g = g;
        this.$notify({
          type: "success",
          group: "notify",
          text: "Отлично. Все прошло успешно!",
        });
      }, 300);
    },
  },
  watch: {
    localValue: {
      deep: true,
      handler(value) {
        this.$emit("input", { ...this.value, g: value.g });
      },
    },
  },
};
</script>

<style lang="stylus">
.diffie-hellman-parametr
  &__title
    margin-bottom 5px

  &__block
    text-align left
    margin-bottom 10px

  &__label
    font-size 13px
    font-weight 600
    margin-bottom 5px
    display inline-block
</style>
