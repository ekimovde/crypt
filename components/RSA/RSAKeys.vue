<template>
  <div class="rsa-keys">
    <h4 class="rsa-prime-numbers__title">Ключи</h4>

    <div class="rsa-keys__block">
      <label class="rsa-keys__label">Открытый ключ</label>

      <div class="rsa-keys__wrapper">
        <vTextarea v-model="localKeys.publicKey.e" disabled />
        <vTextarea v-model="localKeys.publicKey.mod" disabled />
      </div>
    </div>

    <div class="rsa-keys__block">
      <label class="rsa-keys__label">Закрытый ключ</label>

      <div class="rsa-keys__wrapper">
        <vTextarea v-model="localKeys.privateKey.d" disabled />
        <vTextarea v-model="localKeys.privateKey.mod" disabled />
      </div>
    </div>

    <vButton
      class="rsa-keys__button"
      title="Вычислить ключи"
      :loading="localKeys.loading"
      :disabled="!disabledButton"
      @click="onCalculateKeys"
    />
  </div>
</template>

<script>
import {
  generatePrimeNumber,
  nod,
  inverseNumberMod,
  checkNumber,
  isPrime,
} from "@/helpers/functions";
import vTextarea from "@/components/vTextarea.vue";
import vButton from "@/components/vButton.vue";

export default {
  name: "RSAKeys",
  components: {
    vTextarea,
    vButton,
  },
  props: {
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
      localKeys: { ...this.keys },
    };
  },
  computed: {
    disabledButton() {
      const { p, q } = this.primeNumbers;

      if (!isPrime(p) || !isPrime(q)) return false;
      return checkNumber(p) && checkNumber(q);
    },
  },
  methods: {
    onCalculateKeys() {
      this.localKeys.loading = true;
      const { p, q, size } = this.primeNumbers;

      if (!p || !q) {
        this.localKeys.loading = false;
        this.$notify({
          type: "error",
          group: "notify",
          text: "Произошла ошибка. Вы не заполнили поля с числами!",
        });

        return;
      }

      // Формирование публичного ключа
      // Вычисление модуля mod
      const mod = p * q;

      // Функция Эйлера
      const fi = (p - 1) * (q - 1);
      console.log("Функция Эйлера fi:", fi);

      // Открытая экспонента
      // 1. Простое число
      // 2. ... < fi
      // 3. Взаимно простое с fi
      let e = generatePrimeNumber(size);
      while (nod(fi, e)[0] !== 1 && e < fi) e = generatePrimeNumber(size);
      // e = 3;

      // Формирование закрытого ключа
      let d = inverseNumberMod(e, fi);

      setTimeout(() => {
        this.localKeys.publicKey.mod = mod;
        this.localKeys.privateKey.mod = mod;
        this.localKeys.publicKey.e = e; //
        this.localKeys.privateKey.d = d;
        this.localKeys.loading = false;
        this.$emit("update:keys", this.localKeys);
      }, 300);
    },
  },
};
</script>

<style lang="stylus">
.rsa-keys
  &__block
    text-align left
    margin-bottom 10px

  &__label
    font-size 13px
    font-weight 600
    margin-bottom 5px
    display inline-block

  &__wrapper
    display grid
    grid-template-columns repeat(2, 1fr)
    grid-gap 5px
</style>
