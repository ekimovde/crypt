<template>
  <div class="diffie-hellman">
    <div class="diffie-hellman__wrapper">
      <h3 class="diffie-hellman__title">Диффи-Хеллман</h3>

      <div class="diffie-hellman__form">
        <DiffieHellmanPrimeNumbers
          class="diffie-hellman__block"
          v-model="diffieHellman.primeNumbers"
          @input="
            diffieHellman = { ...diffieHellman, primeNumbers: { ...$event } }
          "
        />

        <DiffieHellmanParametr
          class="diffie-hellman__block"
          :value="diffieHellman.primeNumbers"
          @input="diffieHellman.primeNumbers = { ...$event }"
        />

        <DiffieHellmanKeys
          class="diffie-hellman__block"
          :primeNumbers="diffieHellman.primeNumbers"
          :keysA.sync="diffieHellman.keysA"
          :keysB.sync="diffieHellman.keysB"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DiffieHellmanPrimeNumbers from "@/components/DiffieHellman/DiffieHellmanPrimeNumbers";
import DiffieHellmanParametr from "@/components/DiffieHellman/DiffieHellmanParametr";
import DiffieHellmanKeys from "@/components/DiffieHellman/DiffieHellmanKeys";

export default {
  name: "DiffieHellman",
  components: {
    DiffieHellmanPrimeNumbers,
    DiffieHellmanParametr,
    DiffieHellmanKeys,
  },
  data() {
    return {
      diffieHellman: {
        primeNumbers: {
          p: null,
          q: null,
          g: null,
          loading: false,
          size: 99999999,
        },
        keysA: {
          publicKey: null,
          privateKey: null,
          sharedPrivateKey: null,
        },
        keysB: {
          publicKey: null,
          privateKey: null,
          sharedPrivateKey: null,
        },
      },
    };
  },
};
</script>

<style lang="stylus">
.diffie-hellman
  height 100%
  display flex
  flex-direction: column
  align-items center

  &__wrapper
    background #F3F3F7
    padding 20px
    border-radius 5px
    margin-top 30px
    text-align center

  &__title
    margin-bottom 15px

  &__form
    display flex
    flex-direction column

  &__block
    margin-bottom 10px

  &__span
    font-size 13px
    font-weight 600
</style>
