<template>
  <div class="number-theory">
    <div class="number-theory__wrapper">
      <h3 class="number-theory__title">Возведение в степень по модулю</h3>

      <div class="number-theory__form">
        <vInput
          class="number-theory__input"
          v-model="exponentiationForm.a"
          placeholder="Введите число a:"
        />
        <vInput
          class="number-theory__input"
          v-model="exponentiationForm.n"
          placeholder="Введите степень n:"
        />
        <vInput
          class="number-theory__input"
          v-model="exponentiationForm.m"
          placeholder="Введите mod m:"
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
          v-model="divisorForm.a"
          placeholder="Введите число a:"
        />
        <vInput
          class="number-theory__input"
          v-model="divisorForm.b"
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
          v-model="inversionForm.x"
          placeholder="Введите число x:"
        />
        <vInput
          class="number-theory__input"
          v-model="inversionForm.mod"
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
        m: null,
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
      let { a, n, m } = this.exponentiationForm;

      this.exponentiationForm.loading = true;

      setTimeout(() => {
        this.exponentiationForm.answer = exponentiationNumberMod(a, n, m);
        this.exponentiationForm.loading = false;
      }, 200);
    },
    onSubmitDivisor() {
      let { a, b } = this.divisorForm;

      this.divisorForm.loading = true;

      setTimeout(() => {
        this.divisorForm.answer = nod(a, b)[0];
        this.divisorForm.loading = false;
      }, 200);
    },
    onSubmitInversion() {
      let { x, mod } = this.inversionForm;

      this.inversionForm.loading = true;

      setTimeout(() => {
        this.inversionForm.answer = inverseNumberMod(
          parseInt(x),
          parseInt(mod)
        );
        this.inversionForm.loading = false;
      }, 200);
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
