<template>
  <div class="shamir">
    <div class="shamir__wrapper">
      <h3 class="shamir__title">Шамир</h3>

      <div class="shamir__form">
        <ShamirPrimeNumbers
          class="shamir__block"
          v-model="shamir.primeNumbers"
          @input="shamir = { ...shamir, primeNumbers: { ...$event } }"
        />

        <div class="shamir__block">
          <label class="shamir__label"> Сообщение для отправки </label>
          <vInput v-model="shamir.message" placeholder="Введите сообщение" />
        </div>

        <ShamirEncryption
          class="shamir__block"
          v-model="shamir.encryption"
          :prime-numbers="shamir.primeNumbers"
          :message="shamir.message"
          @input="shamir = { ...shamir, encryption: { ...$event } }"
        />

        <div class="shamir__block">
          <label class="shamir__label"> Полученное сообщение </label>
          <vInput
            v-model="shamir.encryption.receivedMessage"
            placeholder="Сообщение"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShamirPrimeNumbers from "@/components/Shamir/ShamirPrimeNumbers";
import ShamirEncryption from "@/components/Shamir/ShamirEncryption";
import vInput from "@/components/vInput";

export default {
  name: "shamir",
  components: {
    ShamirPrimeNumbers,
    ShamirEncryption,
    vInput,
  },
  data() {
    return {
      shamir: {
        message: "",
        primeNumbers: {
          p: null,
          Ca: null,
          Cb: null,
          da: null,
          db: null,
          size: 29,
        },
        encryption: {
          mi: null,
          x1: null,
          x2: null,
          x3: null,
          x4: null,
          receivedMessage: "",
        },
      },
    };
  },
};
</script>

<style lang="stylus">
.shamir
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
