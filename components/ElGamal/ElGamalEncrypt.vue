<template>
  <div class="el-gamal-encrypt">
    <h4 class="el-gamal-encrypt__title">Encrypt</h4>

    <div class="el-gamal-encrypt__wrapper">
      <div class="el-gamal-encrypt__block">
        <label class="el-gamal-encrypt__label">Число k</label>
        <vTextarea v-model.number="localValue.k" />
      </div>

      <div class="el-gamal-encrypt__block">
        <label class="el-gamal-encrypt__label">Число r = g^k mod p</label>
        <vTextarea v-model.number="localValue.r" />
      </div>
    </div>

    <vInput
      class="el-gamal-encrypt__block"
      v-model.number="localValue.e"
      placeholder="Зашифрованное сообщение"
    />

    <vButton title="Зашифровать" @click="onEncrypt" />
  </div>
</template>

<script>
import {
  generatePrimeNumber,
  exponentiationNumberMod,
} from "@/helpers/functions";
import vTextarea from "@/components/vTextarea";
import vInput from "@/components/vInput";

export default {
  name: "ElGamalEncrypt",
  components: {
    vTextarea,
    vInput,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    primeNumbers: {
      type: Object,
      required: true,
    },
    keys: {
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
    onEncrypt() {
      const { g, p } = this.primeNumbers;
      const { Yb } = this.keys;
      const m = parseInt(this.message);

      // Генерация числа k
      const k = generatePrimeNumber(p - 2, 1);

      // Вычисление числа r = g^k mod p
      const r = exponentiationNumberMod(g, k, p);

      // Зашифровываем сообщение: e = m * Yb^k mod p
      let e = exponentiationNumberMod(Yb, k, p);
      e = (m * e) % p;

      this.localValue = {
        ...this.localValue,
        k,
        r,
        e,
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
.el-gamal-encrypt
  &__wrapper
    display grid
    grid-template-columns repeat(2, 1fr)
    grid-gap 10px
    margin-bottom 5px

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
