<template>
  <div class="el-gamal-decrypt">
    <h4 class="el-gamal-decrypt__title">Decrypt</h4>

    <vInput
      class="el-gamal-encrypt__block"
      v-model="localValue"
      placeholder="Зашифрованное сообщение"
    />

    <vButton title="Расшифровать" @click="onDecrypt" />
  </div>
</template>

<script>
import { exponentiationNumberMod } from "@/helpers/functions";

export default {
  name: "ElGamalDecrypt",
  props: {
    value: {
      type: String,
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
    encrypt: {
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
    onDecrypt() {
      const { p } = this.primeNumbers;
      const { Xb } = this.keys;
      const { e, r } = this.encrypt;

      // Вычисление т' = е • r^(p-1-CB) mod p.
      let messageDecrypt = exponentiationNumberMod(r, p - 1 - Xb, p);
      messageDecrypt = (e * messageDecrypt) % p;

      this.localValue = `${messageDecrypt}`;
    },
  },
  watch: {
    localValue(v) {
      this.$emit("input", v);
    },
  },
};
</script>

<style lang="stylus">
.el-gamal-decrypt
  &__title
    margin-bottom 5px

  &__block
    text-align left
    margin-bottom 10px
</style>
