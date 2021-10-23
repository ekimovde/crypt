<template>
  <div class="rsa-decrypt">
    <div class="rsa-decrypt__block">
      <vTextarea v-model="localValue" />
    </div>

    <vButton class="rsa-keys__button" title="Расшифровать" @click="onDecrypt" />
  </div>
</template>

<script>
import { exponentiationNumberMod } from "@/helpers/functions";
import vTextarea from "@/components/vTextarea.vue";
import vButton from "@/components/vButton.vue";

export default {
  name: "RSADecrypt",
  components: {
    vTextarea,
    vButton,
  },
  props: {
    privateKey: {
      type: Object,
      required: true,
    },
    messageEncryptArray: {
      type: Array,
      required: true,
    },
    messageDecrypt: {
      type: String,
      required: true,
    },
    messageDecryptArray: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.messageDecrypt,
    };
  },
  watch: {
    messageDecrypt(v) {
      this.localValue = v;
    },
  },
  methods: {
    onDecrypt() {
      // Decrypt
      let messageDecryptArray = this.messageEncryptArray;
      const { d, mod } = this.privateKey;

      messageDecryptArray = messageDecryptArray.map((symbol) =>
        exponentiationNumberMod(symbol, d, mod)
      );

      console.log("messageDecryptArray", messageDecryptArray);

      // messageDecryptArray = messageDecryptArray.map((number) => {
      //   return String.fromCharCode(number);
      // });

      console.log("Decrypt:", messageDecryptArray);

      this.$emit("update:messageDecrypt", messageDecryptArray.join(""));
      this.$emit("update:messageDecryptArray", messageDecryptArray);
    },
  },
};
</script>

<style lang="stylus">
.rsa-decrypt
  &__block
    margin-bottom 10px
</style>
