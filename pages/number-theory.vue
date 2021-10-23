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
          v-model="inversionForm.p"
          placeholder="Введите число p:"
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
        p: null,
        answer: null,
        loading: false,
      },
    };
  },
  methods: {
    exponentiationFunc(a, n, m) {
      let c = 1;

      for (let index = 1; index <= n; index++)
        c = (parseInt(c) * parseInt(a)) % parseInt(m);

      return c;
    },
    nodFunc(a, b) {
      let u = [a, 1, 0];
      let v = [b, 0, 1];
      let q = 0;
      let t = 0;

      while (v[0] !== 0) {
        q = u[0] / v[0];
        t = [u[0] % v[0], u[1] - q * v[1], u[2] - q * v[2]];
        u = v;
        v = t;
      }

      return u;
    },
    inversionFunc(x, p) {
      let a = x;
      let b = p;
      let result = 0;

      if (a !== 0 && b !== 0) {
        if (a < 0) {
          a = b - (a % b);
        } else {
          a = a % b;
        }

        result = this.nodFunc(b, a);
      }

      if (result[2] < 0) {
        result[2] = parseInt(b) + parseInt(result[2]);
      }

      console.log("result", result);

      return result[2];
    },
    onSubmitExponentiation() {
      let { a, n, m } = this.exponentiationForm;

      this.exponentiationForm.loading = true;
      this.exponentiationForm.answer = this.exponentiationFunc(a, n, m);
      this.exponentiationForm.loading = false;
    },
    onSubmitDivisor() {
      let { a, b } = this.divisorForm;

      this.divisorForm.loading = true;
      this.divisorForm.answer = this.nodFunc(a, b)[0];
      this.divisorForm.loading = false;
    },
    onSubmitInversion() {
      let { x, p } = this.inversionForm;

      this.inversionForm.loading = true;
      this.inversionForm.answer = this.inversionFunc(x, p);
      this.inversionForm.loading = false;
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
