<template>
  <div class="el-gamal">
    <div class="el-gamal__wrapper">
      <h3 class="el-gamal__title">Эль Гамаль</h3>

      <div class="el-gamal__form">
        <ElGamalDiffieHellman
          class="el-gamal__block"
          v-model="elGamal.primeNumbersDiffieHellman"
          @input="
            elGamal = { ...elGamal, primeNumbersDiffieHellman: { ...$event } }
          "
        />

        <ElGamalKeys
          class="el-gamal__block"
          v-model="elGamal.keys"
          :primeNumbers="elGamal.primeNumbersDiffieHellman"
          @input="elGamal = { ...elGamal, keys: { ...$event } }"
        />

        <vInput
          class="el-gamal__block"
          v-model="elGamal.message"
          placeholder="Введите сообщение"
        />

        <ElGamalEncrypt
          class="el-gamal__block"
          v-model="elGamal.encrypt"
          :message="elGamal.message"
          :primeNumbers="elGamal.primeNumbersDiffieHellman"
          :keys="elGamal.keys"
          @input="elGamal = { ...elGamal, encrypt: { ...$event } }"
        />

        <ElGamalDecrypt
          class="el-gamal__block"
          v-model="elGamal.messageDecrypt"
          :primeNumbers="elGamal.primeNumbersDiffieHellman"
          :keys="elGamal.keys"
          :encrypt="elGamal.encrypt"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ElGamalDiffieHellman from "@/components/ElGamal/ElGamalDiffieHellman";
import ElGamalKeys from "@/components/ElGamal/ElGamalKeys";
import ElGamalEncrypt from "@/components/ElGamal/ElGamalEncrypt";
import ElGamalDecrypt from "@/components/ElGamal/ElGamalDecrypt";
import vInput from "@/components/vInput";
import vButton from "@/components/vButton";

export default {
  name: "ElGamal",
  components: {
    ElGamalDiffieHellman,
    ElGamalKeys,
    ElGamalEncrypt,
    ElGamalDecrypt,
    vInput,
    vButton,
  },
  data() {
    return {
      elGamal: {
        primeNumbersDiffieHellman: {
          p: null,
          q: null,
          g: null,
          size: 9999,
        },
        keys: {
          Xa: null,
          Xb: null,
          Ya: null,
          Yb: null,
        },
        encrypt: {
          k: null,
          r: null,
          e: null, // messageEncrypt
        },
        message: "",
        messageDecrypt: "",
      },
    };
  },
};
</script>

<style lang="stylus">
.el-gamal
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

  &__label
    font-size 13px
    font-weight 600
    margin-bottom 5px
    display inline-block
</style>
