<template>
  <div class="diffie-hellman-keys">
    <div class="diffie-hellman-keys__wrapper">
      <div>
        <h4 class="diffie-hellman-keys__title">Ключи абонента A</h4>

        <div class="diffie-hellman-keys__block">
          <label class="diffie-hellman-keys__label">Секретное число Xa</label>
          <vTextarea v-model.number="localKeysA.privateKey" />
        </div>

        <div class="diffie-hellman-keys__block">
          <label class="diffie-hellman-keys__label">Открытый ключ Ya</label>
          <vTextarea v-model.number="localKeysA.publicKey" />
        </div>

        <div class="diffie-hellman-keys__block">
          <label class="diffie-hellman-keys__label">
            Общий закрытый ключ Zab
          </label>
          <vTextarea v-model.number="localKeysA.sharedKey" />
        </div>
      </div>

      <div>
        <h4 class="diffie-hellman-keys__title">Ключи абонента B</h4>

        <div class="diffie-hellman-keys__block">
          <label class="diffie-hellman-keys__label">Секретное число Xb</label>
          <vTextarea v-model.number="localKeysB.privateKey" />
        </div>

        <div class="diffie-hellman-keys__block">
          <label class="diffie-hellman-keys__label">Открытый ключ Yb</label>
          <vTextarea v-model.number="localKeysB.publicKey" />
        </div>

        <div class="diffie-hellman-keys__block">
          <label class="diffie-hellman-keys__label">
            Общий закрытый ключ Zba
          </label>
          <vTextarea v-model.number="localKeysB.sharedKey" />
        </div>
      </div>
    </div>

    <vButton
      title="Вычислить ключи"
      :loading="loading"
      :disabled="!disabledButton"
      @click="onGenerateKeys"
    />
  </div>
</template>

<script>
import {
  isPrime,
  checkNumber,
  generatePrimeNumber,
  exponentiationNumberMod,
} from "@/helpers/functions";
import vTextarea from "@/components/vTextarea";
import vButton from "@/components/vButton";

export default {
  name: "DiffieHellmanKeys",
  components: {
    vTextarea,
    vButton,
  },
  props: {
    primeNumbers: {
      type: Object,
      required: true,
    },
    keysA: {
      type: Object,
      required: true,
    },
    keysB: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localKeysA: { ...this.keysA },
      localKeysB: { ...this.keysB },
      loading: false,
    };
  },
  computed: {
    disabledButton() {
      const { p, q, g } = this.primeNumbers;

      if (!isPrime(p) || !isPrime(q) || !isPrime(g)) return false;
      if (parseInt(p) !== parseInt(q) * 2 + 1) return false;
      return checkNumber(p) && checkNumber(q) && checkNumber(g);
    },
  },
  methods: {
    onGenerateKeys() {
      // Открытые ключи
      const { p, g } = this.primeNumbers;

      // Абоненты выбирают случайные большие числа
      const Xa = generatePrimeNumber(999999999);
      const Xb = generatePrimeNumber(999999999);
      this.localKeysA.privateKey = Xa;
      this.localKeysB.privateKey = Xb;

      // Абонентые вычисляют число Y
      const Ya = exponentiationNumberMod(g, Xa, p);
      const Yb = exponentiationNumberMod(g, Xb, p);
      this.localKeysA.publicKey = Ya;
      this.localKeysB.publicKey = Yb;

      // Абоненты формируют общий ключ
      const Zab = exponentiationNumberMod(Yb, Xa, p);
      const Zba = exponentiationNumberMod(Ya, Xb, p);
      this.localKeysA.sharedKey = Zab;
      this.localKeysB.sharedKey = Zba;
    },
  },
  watch: {
    localKeysA: {
      deep: true,
      handler(value) {
        this.$emit("update:keysA", value);
      },
    },
    localKeysB: {
      deep: true,
      handler(value) {
        this.$emit("update:keysB", value);
      },
    },
  },
};
</script>

<style lang="stylus">
.diffie-hellman-keys
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
