<template>
  <div class="rsa-prime-numbers">
    <h4 class="rsa-prime-numbers__title">Простые числа</h4>

    <div class="rsa-prime-numbers__block">
      <label class="rsa-prime-numbers__label">Простое число p</label>
      <vInput v-model.number="localValue.p" placeholder="Введите число p:" />
    </div>

    <div class="rsa-prime-numbers__block">
      <label class="rsa-prime-numbers__label">Простое число q</label>
      <vInput v-model.number="localValue.q" placeholder="Введите число q:" />
    </div>

    <div class="rsa-prime-numbers__block">
      <input type="checkbox" id="checkbox" v-model="hasMyNumbers" />
      <label for="checkbox" class="rsa-prime-numbers__label">Свои числа?</label>
    </div>

    <div class="rsa-prime-numbers__block">
      <input type="file" id="file" @change="handleFileUpload" />
      <label for="file" class="rsa-prime-numbers__label"></label>
    </div>

    <vButton
      title="Сгенерировать простые числа"
      :loading="localValue.loading"
      @click="onGeneratePrimeNumbers"
    />
  </div>
</template>

<script>
import { generatePrimeNumber, checkNumber, isPrime } from "@/helpers/functions";
import vInput from "@/components/vInput.vue";
import vButton from "@/components/vButton.vue";

export default {
  name: "RSAPrimeNumbers",
  components: {
    vInput,
    vButton,
  },
  props: {
    primeNumbers: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localValue: { ...this.primeNumbers },
      hasMyNumbers: false,
      file: {},
      text: "",
    };
  },
  methods: {
    async handleFileUpload(event) {
      this.file = event.target.files[0];
      this.text = await this.file.text();
      console.log("Text", this.text);
    },
    async onGeneratePrimeNumbers() {
      let p = this.localValue.p;
      let q = this.localValue.q;

      this.localValue.loading = true;

      if (this.hasMyNumbers) {
        if (!checkNumber(p) || !checkNumber(q)) {
          this.localValue.loading = false;
          this.$notify({
            type: "error",
            group: "notify",
            text: "Произошла ошибка. Попробуйте заново!",
          });

          return;
        } else {
          if (!isPrime(p) || !isPrime(q)) {
            this.localValue.loading = false;
            this.$notify({
              type: "error",
              group: "notify",
              text: "Произошла ошибка. Введите простые числа!",
            });

            return;
          }
        }
      } else {
        // Генерация простых чисел
        p = await generatePrimeNumber(this.localValue.size);
        q = await generatePrimeNumber(this.localValue.size);

        while (p === q) {
          p = await generatePrimeNumber(this.localValue.size);
          q = await generatePrimeNumber(this.localValue.size);
        }
      }

      setTimeout(() => {
        this.localValue.loading = false;
        this.localValue.p = parseInt(p);
        this.localValue.q = parseInt(q);

        this.$notify({
          type: "success",
          group: "notify",
          text: "Отлично. Все прошло успешно!",
        });

        this.$emit("update:primeNumbers", this.localValue);
      }, 300);
    },
  },
  watch: {
    localValue: {
      deep: true,
      handler(v) {
        this.$emit("update:primeNumbers", v);
      },
    },
  },
};
</script>

<style lang="stylus">
.rsa-prime-numbers
  &__block
    text-align left
    margin-bottom 10px

  &__label
    font-size 13px
    font-weight 600
    margin-bottom 5px
    display inline-block
</style>
