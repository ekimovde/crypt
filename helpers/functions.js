// Генерация случайного простого числа
export const generatePrimeNumber = (size) => {
  let randomNumber = Math.floor(Math.random() * size);

  while (!isPrime(randomNumber)) {
    randomNumber++;
  }

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

// Проверка числа в степень по модулю
export const exponentiationNumberMod = (a, n, mod) => {
  let y = 1;
  let s = parseInt(a);
  let array = n.toString(2).split("").reverse();
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
    q = u[0] / v[0];
    t = [u[0] % v[0], u[1] - q * v[1], u[2] - q * v[2]];
    u = v;
    v = t;
  }

  return u;
};

export const inverseNumberMod = (x, p) => {
  let a = x;
  let b = p;
  let result = 0;

  if (a !== 0 && b !== 0) {
    if (a < 0) {
      a = b - (a % b);
    } else {
      a = a % b;
    }

    result = nod(b, a);
  }

  if (result[2] < 0) {
    result[2] = parseInt(b) + parseInt(result[2]);
  }

  console.log("result", result);

  return result;
};
