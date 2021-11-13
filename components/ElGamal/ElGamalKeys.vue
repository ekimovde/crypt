<template>
  <div class="el-gamal-keys">
    <div class="el-gamal-keys__wrapper">
      <div>
        <h4 class="el-gamal-keys__title">Ключи абонента A</h4>

        <div class="el-gamal-keys__block">
          <label class="el-gamal-keys__label">Секретное число Xa</label>
          <vTextarea v-model.number="localValue.Xa" />
        </div>

        <div class="el-gamal-keys__block">
          <label class="el-gamal-keys__label">Открытый ключ Ya</label>
          <vTextarea v-model.number="localValue.Ya" />
        </div>
      </div>

      <div>
        <h4 class="el-gamal-keys__title">Ключи абонента B</h4>

        <div class="el-gamal-keys__block">
          <label class="el-gamal-keys__label">Секретное число Xb</label>
          <vTextarea v-model.number="localValue.Xb" />
        </div>

        <div class="el-gamal-keys__block">
          <label class="el-gamal-keys__label">Открытый ключ Yb</label>
          <vTextarea v-model.number="localValue.Yb" />
        </div>
      </div>
    </div>

    <vButton title="Вычислить ключи" @click="onGenerateKeys" />
  </div>
</template>

<script>
import {
  generatePrimeNumber,
  exponentiationNumberMod,
} from "@/helpers/functions";
import vTextarea from "@/components/vTextarea";
import vButton from "@/components/vButton";

export default {
  name: "ElGamalKeys",
  components: {
    vTextarea,
    vButton,
  },
  props: {
    primeNumbers: {
      type: Object,
      required: true,
    },
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
    onGenerateKeys() {
      // Открытые простые числа
      const { p, g } = this.primeNumbers;

      // Абоненты выбирают случайные секретные большие числа
      const Xa = 7; // generatePrimeNumber(999999999);
      const Xb = 13; // generatePrimeNumber(999999999);

      // Абонентые вычисляют число Y
      const Ya = exponentiationNumberMod(g, Xa, p);
      const Yb = exponentiationNumberMod(g, Xb, p);

      this.localValue = {
        ...this.localValue,
        Xa,
        Xb,
        Ya,
        Yb,
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
.el-gamal-keys
  &__wrapper
    display grid
    grid-template-columns repeat(2, 1fr)
    grid-gap 10px

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
