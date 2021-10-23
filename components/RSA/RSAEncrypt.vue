<template>
  <div class="rsa-encrypt">
    <div class="rsa-encrypt__block">
      <vTextarea v-model="localValue" />
    </div>

    <vButton class="rsa-keys__button" title="Зашифровать" @click="onEncrypt" />
  </div>
</template>

<script>
import { exponentiationNumberMod } from "@/helpers/functions";
import vTextarea from "@/components/vTextarea.vue";
import vButton from "@/components/vButton.vue";

export default {
  name: "RSAEncrypt",
  components: {
    vTextarea,
    vButton,
  },
  props: {
    publicKey: {
      type: Object,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    messageEncrypt: {
      type: String,
      required: true,
    },
    messageEncryptArray: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.messageEncrypt,
    };
  },
  watch: {
    messageEncrypt(v) {
      this.localValue = v;
    },
  },
  methods: {
    onEncrypt() {
      // Encrypt
      let messageEncryptArray = this.message.split("");
      const { e, mod } = this.publicKey;

      messageEncryptArray = messageEncryptArray.map((symbol) =>
        symbol.charCodeAt(0)
      );
      messageEncryptArray = messageEncryptArray.map((number) =>
        exponentiationNumberMod(number, e, mod)
      );

      console.log("Encrypt", messageEncryptArray);

      // this.localValue = messageEncryptArray.join("");
      this.$emit("update:messageEncrypt", messageEncryptArray.join(""));
      this.$emit("update:messageEncryptArray", messageEncryptArray);

      // BigInt(Math.pow(2, 330))
      // str = str.replace(/[^\d]/g, '')
    },
  },
};
</script>

<style lang="stylus">
.rsa-encrypt
  &__block
    margin-bottom 10px
</style>
