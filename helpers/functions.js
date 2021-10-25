// Генерация случайного простого числа
export const generatePrimeNumber = (size) => {
  let randomNumber = Math.floor(Math.random() * size);

  while (!isPrime(randomNumber)) randomNumber++;

  return randomNumber;
};

// Проверка числа на простоту
export const isPrime = (number) => {
  let index = 2;
  const limit = Math.sqrt(number);

  while (index <= limit) {
    if (number % index === 0) return false;
    index++;
  }

  return true;
};

// Возведение числа в степень по модулю
export const exponentiationNumberMod = (a, n, mod) => {
  let y = 1;
  let s = parseInt(a);
  let array = parseInt(n).toString(2).split("").reverse();
  array = array.map((el) => parseInt(el));

  for (let i = 0; i < array.length; i++) {
    if (array[i] === 1) y = (y * s) % mod;
    s = (s * s) % mod;
  }

  return y;
};

// Вычисление НОД
export const nod = (a, b) => {
  let u = [a, 1, 0];
  let v = [b, 0, 1];
  let q = 0;
  let t = 0;

  while (v[0] !== 0) {
    q = parseInt(u[0] / v[0]);
    t = [
      parseInt(u[0] % v[0]),
      parseInt(u[1] - q * v[1]),
      parseInt(u[2] - q * v[2]),
    ];
    u = v;
    v = t;
  }

  return u;
};

// Вычисление обратного числа по модулю
export const inverseNumberMod = (a, mod) => {
  let x = a;
  let result = [];

  if (x !== 0 && mod !== 0) {
    if (x < 0) x = mod - (x % mod);
    else x = x % mod;

    result = nod(parseInt(mod), x);
  } else {
    console.log("Ошибка! Ни один из параметров не должен быть равен нулю!");
  }

  if (result[0] !== 1)
    console.log("Ошибка! Введенные параметры обязаны быть взаимно простыми!");

  if (result[2] < 0) result[2] = parseInt(mod) + parseInt(result[2]);

  return result[2];
};
