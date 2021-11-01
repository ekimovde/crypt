<template>
  <div class="number-theory">
    <div class="number-theory__wrapper">
      <h3 class="number-theory__title">Возведение в степень по модулю</h3>

      <div class="number-theory__form">
        <vInput
          class="number-theory__input"
          v-model.number="exponentiationForm.a"
          placeholder="Введите число a:"
        />
        <vInput
          class="number-theory__input"
          v-model.number="exponentiationForm.n"
          placeholder="Введите степень n:"
        />
        <vInput
          class="number-theory__input"
          v-model.number="exponentiationForm.mod"
          placeholder="Введите mod:"
        />

        <span class="number-theory__span"
          >Ответ: {{ exponentiationForm.answer }}</span
        >

        <vButton
          class="number-theory__button"
          title="Найти"
          :loading="exponentiationForm.loading"
          @click="onSubmitExponentiation"
        />
      </div>
    </div>

    <div class="number-theory__wrapper">
      <h3 class="number-theory__title">Наибольший общий делитель</h3>

      <div class="number-theory__form">
        <vInput
          class="number-theory__input"
          v-model.number="divisorForm.a"
          placeholder="Введите число a:"
        />
        <vInput
          class="number-theory__input"
          v-model.number="divisorForm.b"
          placeholder="Введите число b:"
        />

        <span class="number-theory__span">Ответ: {{ divisorForm.answer }}</span>

        <vButton
          class="number-theory__button"
          title="Найти"
          :loading="divisorForm.loading"
          @click="onSubmitDivisor"
        />
      </div>
    </div>

    <div class="number-theory__wrapper">
      <h3 class="number-theory__title">Обратный элемент по модулю</h3>

      <div class="number-theory__form">
        <vInput
          class="number-theory__input"
          v-model.number="inversionForm.x"
          placeholder="Введите число x:"
        />
        <vInput
          class="number-theory__input"
          v-model.number="inversionForm.mod"
          placeholder="Введите модуль mod:"
        />

        <span class="number-theory__span"
          >Ответ: {{ inversionForm.answer }}</span
        >

        <vButton
          class="number-theory__button"
          title="Найти"
          :loading="inversionForm.loading"
          @click="onSubmitInversion"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  exponentiationNumberMod,
  nod,
  inverseNumberMod,
  checkNumber,
} from "@/helpers/functions.js";
import vInput from "@/components/vInput";
import vButton from "@/components/vButton";

export default {
  name: "NumberTheory",
  components: {
    vInput,
    vButton,
  },
  data() {
    return {
      exponentiationForm: {
        a: null,
        n: null,
        mod: null,
        answer: null,
        loading: false,
      },
      divisorForm: {
        a: null,
        b: null,
        answer: null,
        loading: false,
      },
      inversionForm: {
        x: null,
        mod: null,
        answer: null,
        loading: false,
      },
    };
  },
  methods: {
    onSubmitExponentiation() {
      let { a, n, mod } = this.exponentiationForm;

      if (checkNumber(a) && checkNumber(n) && checkNumber(mod)) {
        this.exponentiationForm.loading = true;

        setTimeout(() => {
          this.exponentiationForm.answer = exponentiationNumberMod(a, n, mod);
          this.exponentiationForm.loading = false;
          this.$notify({
            type: "success",
            group: "notify",
            text: "Отлично. Все прошло успешно!",
          });
        }, 200);
      } else {
        this.$notify({
          type: "error",
          group: "notify",
          text: "Произошла ошибка. Заполните все поля формы!",
        });
      }
    },
    onSubmitDivisor() {
      let { a, b } = this.divisorForm;

      if (checkNumber(a) && checkNumber(b)) {
        this.divisorForm.loading = true;

        setTimeout(() => {
          this.divisorForm.answer = nod(a, b)[0];
          this.divisorForm.loading = false;
          this.$notify({
            type: "success",
            group: "notify",
            text: "Отлично. Все прошло успешно!",
          });
        }, 200);
      } else {
        this.$notify({
          type: "error",
          group: "notify",
          text: "Произошла ошибка. Заполните все поля формы!",
        });
      }
    },
    onSubmitInversion() {
      let { x, mod } = this.inversionForm;

      if (checkNumber(x) && checkNumber(mod)) {
        this.inversionForm.loading = true;

        setTimeout(() => {
          this.inversionForm.answer = inverseNumberMod(
            parseInt(x),
            parseInt(mod)
          );
          this.inversionForm.loading = false;
          this.$notify({
            type: "success",
            group: "notify",
            text: "Отлично. Все прошло успешно!",
          });
        }, 200);
      } else {
        this.$notify({
          type: "error",
          group: "notify",
          text: "Произошла ошибка. Заполните все поля формы!",
        });
      }
    },
  },
};
</script>

<style lang="stylus">
.number-theory
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

  &__input
    margin-bottom 10px

  &__span
    font-size 13px
    font-weight 600

  &__button
    margin-top 15px
</style>
