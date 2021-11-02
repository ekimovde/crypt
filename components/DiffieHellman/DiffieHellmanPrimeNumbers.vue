<template>
  <div class="diffie-hellman-prime-numbers">
    <h4 class="diffie-hellman-prime-numbers__title">Простые числа</h4>

    <div class="diffie-hellman-prime-numbers__block">
      <label class="diffie-hellman-prime-numbers__label">
        Простое число p = (2 * q) + 1
      </label>
      <vTextarea v-model="localValue.p" />
    </div>

    <div class="diffie-hellman-prime-numbers__block">
      <label class="diffie-hellman-prime-numbers__label">
        Простое число q
      </label>
      <vTextarea v-model="localValue.q" />
    </div>

    <div class="diffie-hellman-prime-numbers__block">
      <input type="checkbox" id="checkbox" v-model="hasMyNumbers" />
      <label for="checkbox" class="diffie-hellman-prime-numbers__label">
        Свои числа?
      </label>
    </div>

    <vButton
      title="Сгенерировать простые числа"
      :loading="localValue.loading"
      @click="onGeneratePrimeNumbers"
    />

    <vButton
      class="diffie-hellman-prime-numbers__button"
      title="Проверить на простоту"
      @click="onCheckPrimeNumbers"
    />
  </div>
</template>

<script>
import { generatePrimeNumber, isPrime, checkNumber } from "@/helpers/functions";
import vTextarea from "@/components/vTextarea.vue";
import vButton from "@/components/vButton.vue";

export default {
  name: "DiffieHellmanPrimeNumbers",
  components: {
    vTextarea,
    vButton,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.value,
      hasMyNumbers: false,
    };
  },
  methods: {
    onGeneratePrimeNumbers() {
      this.localValue.loading = true;

      if (this.hasMyNumbers) {
        let { p, q } = this.localValue;

        if (!checkNumber(p) || !checkNumber(q)) {
          this.localValue.loading = false;
          this.$notify({
            type: "error",
            group: "notify",
            text: "Произошла ошибка. Введите цифры!",
          });

          return;
        } else {
          if ((!isPrime(p) || !isPrime(q)) && p !== 2 * q + 1) {
            this.localValue.loading = false;
            this.$notify({
              type: "error",
              group: "notify",
              text: "Произошла ошибка. Введите простые числа!",
            });

            return;
          } else {
            this.localValue.loading = false;
            this.$notify({
              type: "success",
              group: "notify",
              text: "Отлично. Все прошло успешно!",
            });
          }
        }
      } else {
        let p = generatePrimeNumber(this.localValue.size);
        let q = p / 2 - 0.5;

        while (!isPrime(q)) {
          p = generatePrimeNumber(this.localValue.size);
          q = p / 2 - 0.5;
        }

        setTimeout(() => {
          this.localValue = {
            ...this.localValue,
            p: parseInt(p),
            q: parseInt(q),
            loading: false,
          };

          this.$notify({
            type: "success",
            group: "notify",
            text: "Отлично. Все прошло успешно!",
          });
        }, 300);
      }
    },
    onCheckPrimeNumbers() {
      const { p, q } = this.localValue;

      if (!checkNumber(p) || !checkNumber(q)) {
        this.$notify({
          type: "error",
          group: "notify",
          text: "Произошла ошибка. Введите цифры!",
        });

        return;
      }

      if (!isPrime(p) || !isPrime(q)) {
        this.$notify({
          type: "error",
          group: "notify",
          text: "Произошла ошибка. Числа составные!",
        });

        return;
      }

      this.$notify({
        type: "success",
        group: "notify",
        text: "Отлично. Числа простые!",
      });
    },
  },
  watch: {
    localValue: {
      deep: true,
      handler(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="stylus">
.diffie-hellman-prime-numbers
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

  &__button
    margin-top 5px
</style>
