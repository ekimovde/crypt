<template>
  <div class="shamir-encryption">
    <h4 class="shamir-encryption">Шифрование</h4>

    <div class="shamir-encryption__block">
      <label class="diffie-hellman-prime-numbers__label"> Число mi </label>
      <vTextarea v-model="localValue.mi" />
    </div>

    <div class="shamir-encryption__wrapper">
      <div class="shamir-encryption__block">
        <label class="diffie-hellman-prime-numbers__label"> Шаг x1 </label>
        <vTextarea v-model="localValue.x1" />
      </div>

      <div class="shamir-encryption__block">
        <label class="diffie-hellman-prime-numbers__label"> Шаг x1 </label>
        <vTextarea v-model="localValue.x2" />
      </div>
    </div>

    <div class="shamir-encryption__wrapper">
      <div class="shamir-encryption__block">
        <label class="diffie-hellman-prime-numbers__label"> Шаг x3 </label>
        <vTextarea v-model="localValue.x3" />
      </div>

      <div class="shamir-encryption__block">
        <label class="diffie-hellman-prime-numbers__label"> Шаг x4 </label>
        <vTextarea v-model="localValue.x4" />
      </div>
    </div>

    <vButton
      class="shamir-encryption__button"
      title="Отправить сообщение"
      @click="onSendMessage"
    />
  </div>
</template>

<script>
import { exponentiationNumberMod } from "@/helpers/functions";
import vTextarea from "@/components/vTextarea";
import vButton from "@/components/vButton";

export default {
  name: "ShamirEncryption",
  components: {
    vTextarea,
    vButton,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    primeNumbers: {
      type: Object,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    onSendMessage() {
      const { p, Ca, Cb, da, db } = this.primeNumbers;

      // Вычисление числа mi
      const mi = parseInt(this.message);

      // Шаг #1
      const x1 = exponentiationNumberMod(mi, Ca, p);

      // Шаг #2
      const x2 = exponentiationNumberMod(x1, Cb, p);

      // Шаг #3
      const x3 = exponentiationNumberMod(x2, da, p);

      // Шаг #4
      const x4 = exponentiationNumberMod(x3, db, p);

      this.localValue = {
        ...this.localValue,
        mi,
        x1,
        x2,
        x3,
        x4,
        receivedMessage: x4,
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
.shamir-encryption
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
