<template>
  <div class="rsa">
    <div class="rsa__wrapper">
      <h3 class="rsa__title">RSA</h3>

      <div class="rsa__form">
        <RSAPrimeNumbers
          class="rsa__block"
          :primeNumbers.sync="rsa.primeNumbers"
        />

        <RSAKeys
          class="rsa__block"
          :primeNumbers="rsa.primeNumbers"
          :keys.sync="rsa.keys"
        />

        <div class="rsa-prime-numbers__block">
          <label class="rsa-prime-numbers__label">Открытый текст</label>
          <vInput v-model="rsa.message" placeholder="Введите текст:" />
        </div>

        <RSAEncrypt
          class="rsa__block"
          :message="rsa.message"
          :publicKey="rsa.keys.publicKey"
          :messageEncrypt.sync="rsa.messageEncrypt"
          :messageEncryptArray.sync="rsa.messageEncryptArray"
        />

        <RSADecrypt
          class="rsa__block"
          :privateKey="rsa.keys.privateKey"
          :messageEncryptArray="rsa.messageEncryptArray"
          :messageDecrypt.sync="rsa.messageDecrypt"
          :messageDecryptArray.sync="rsa.messageDecryptArray"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vInput from "@/components/vInput.vue";
import RSAPrimeNumbers from "@/components/RSA/RSAPrimeNumbers.vue";
import RSAKeys from "@/components/RSA/RSAKeys.vue";
import RSAEncrypt from "@/components/RSA/RSAEncrypt.vue";
import RSADecrypt from "@/components/RSA/RSADecrypt.vue";

export default {
  name: "RSA",
  components: {
    vInput,
    RSAPrimeNumbers,
    RSAKeys,
    RSAEncrypt,
    RSADecrypt,
  },
  data() {
    return {
      rsa: {
        primeNumbers: {
          p: null,
          q: null,
          loading: false,
          size: 9999999999999999,
        },
        keys: {
          publicKey: {
            e: null,
            mod: null,
          },
          privateKey: {
            d: null,
            mod: null,
          },
          loading: false,
        },
        message: "",
        messageEncrypt: "",
        messageEncryptArray: [],
        messageDecrypt: "",
        messageDecryptArray: [],
        loading: false,
        answer: null,
      },
    };
  },
};
</script>

<style lang="stylus">
.rsa
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
