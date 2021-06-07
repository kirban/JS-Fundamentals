console.log('Topic: Sync-Generators');

// Task 1. 
// RU: Наишите функцию-генератор generateSequence, которая генерирует числа в диапазоне от start до end.
// EN: Create function-generator generateSequence, which generates and returns numbers from start to end.

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// console.log([...generateSequence(3, 15)]);

// Task 2. Long Sequences
// RU: Создать массив из чисел от 1 до 1000. 
//     Реализовать функцию-генератор для формирования всех пар из этого массива.
//     Генератор возвращает одну пару за один раз.  
//     Результат [1, 1], [1, 2], ..., [2, 1], [2, 2], ..., [1000, 1000]
// EN: Create an array of numbers from 1 to 1000.
//     Implement a generator function to create all pairs from this array.
//     Result [1, 1], [1, 2], ..., [2, 1], [2, 2], ..., [1000, 1000]

const sequence = []
for (let i = 1; i <= 1000; i++) {
  sequence.push(i);
}

function* longSequencePair(){
  for (let i = 0; i < sequence.length; i++) {
    for(let j = 0; j < sequence.length; j++) {
      yield [sequence[i], sequence[j]];
    }
  }
}

// const it = longSequencePair();
// console.log(it.next().value)
// console.log(it.next().value)
// console.log(it.next().value)
// console.log(it.next().value)

// Task 3. 
// RU: Реализуйте функцию генерации чисел Фибоначчи до бесконечности
// EN: Implement the infinite function-generator of generating Fibonacci numbers

// let [prev, sum] = [0, 1];

function* fibGenerator() {
  const next = prev+ sum;
  prev = sum;
  sum = next;

  yield sum;
}

// [...Array(10)].forEach(() => {
//   console.log(fibGenerator().next().value)
// })

// Task 4. yield* 
// RU: Реализуйте функцию-генератор, которая будет генерировать последовательность 
//     символов от 0 до 9, затем от a до z, затем от A до Z. Воспользуйтесь функцией генератором
//     generateSequence, реализованой выше, String.fromCharCode(code), и диапазоном чисел от 48 до 57,
//     от 65 до 90 и от 97 до 122
// EN: Create a function-generator that will generate a sequence
//     characters from 0 to 9, then from a to z, then from A to Z. 
//     Use the function-generator generateSequence implemented above, 
//     String.fromCharCode (code), and a range of numbers from 48 to 57,
//     65 to 90 and 97 to 122

function* symbolsSequence() {
  // 0..9
  yield* generateSequence(48, 57);
  // A..Z
  yield* generateSequence(65, 90);
  // a..z
  yield* generateSequence(97, 122);
}

let s = "";
for (let code of symbolsSequence()) {
  s += String.fromCharCode(code);
}
// console.log(s);

// Task 5. Sync Piping
// RU: Создайте-функцию генератор multipleByTwo, которая принимает массив чисел, 
//     умножает каждое число на 2 и возвращает их по одному
//     Создайте-функцию генератор minusOne, которая принимает массив чисел, 
//     отнимает 1 и возвращает их по одному
//     Создайте-функцию генератор isMultipleOfThree, которая принимает массив чисел, 
//     и возвращает только те, которые делятся на 3 без остатка по одному
//     Объявите массив от 0 до 9
//     Вызовите первую функцию и передайте ей массив, результат этой функции передайте второй
//     а затем результат второй передайтетретей.
//     Примените спред оператор к резульату третей функции и создайте массив тех чисел, 
//     которые останутся
// EN: Create a function-generator multipleByTwo that takes an array of numbers,
//     multiplies each number by 2 and returns them one at a time
//     Create a function-generator minusOne that takes an array of numbers,
//     takes 1 and returns them one at a time
//     Create a function-generator isMultipleOfThree that takes an array of numbers,
//     and returns only those that are divided by 3 without remain part one at a time
//     Declare an array from 0 to 9
//     Call the first function and pass an array to it, pass the result of this function 
//     to the second and then the result of the second pass to the third function.
//     Apply the spread operator to the result of the third function and create an array 
//     of those numbers which will remain

function* multipleByTwo(numbers) {
  for (const number of numbers) {
    yield number * 2;
  }
}

function* minusOne(numbers) {
  for (const number of numbers) {
    yield number - 1;
  }
}

function* isMultipleOfThree(numbers) {
  for(const value of numbers) {
    if (value % 3 === 0 && value) {
      yield value;
    }
  }
}

const testArr = [0,1,2,3,4,5,6,7,8,9];

// const res1 = multipleByTwo(testArr);
// const res2 = [...minusOne(res1)];
// const result = [...isMultipleOfThree(res2)];
// console.log(result);

// Task 6. Communication with Infinite Generator
// RU: Реализуйте бесконечную функцию-генератор calculation, которая будет выводить выражения
//     a + b = ?, где a, b будет случайно генерировать и запрашивать у пользователя ответ.
//     Если ответ верный, то писать в консоль true, иначе false. 
//     Запустите код в консоли браузера
// EN: Implement an infinite calculation generator-function that will output expressions
//     a + b = ?, where a, b will be randomly generated and request a response from the user.
//     If the answer is correct, then write true to the console, otherwise false.


function* randomizer() {
  while(1) {
    yield Math.ceil(Math.random() * 100);
  }
}

function* calculation() {
  while(1) {
    try {
      let [a, b] = randomizer();
      let result = a + b;
      let guessedResult = parseInt(window.prompt(`${a} + ${b} = ?\nWhats the answer?`));
      yield (result === guessedResult);
    } catch (e) {
      console.warn(`Failed calculating:\n${e}`)
    }
  }
}

// const it = calculation();
// console.log(it.next().value);
// it.throw("Test error");
// console.log(it.next().value);

// Task 7. throw method
// RU: Модифицируйте код предыдущего задания так, чтобы при вызове it.throw() генератор 
//     не прекращал свою работу
// EN: Modify the code of the previous task so that when it.throw() is called, the generator
//     did not stop its work


// Task 8. 
// RU: В коллекции хранятся все имена пользователей, которые присоединились 
//     к определенной группе телеграмм.
//     Булевый флаг указывает, является ли пользователь администратором группы.
//     Создайте генератор, который на вход получает этот объект и 
//     возвращает только имена администраторов по одному за вызов.
// EN: The collection stores all the usernames that joined
//     to a specific telegram group.
//     A boolean flag indicates whether the user is a group administrator.
//     Create a generator that receives this object as input
//     and returns only admin names.

const users = {
  anna: false,
  boris: true, // admin
  christina: false,
  dave: false,
  elena: false,
  felix: true,  // admin
};

function* yieldAdmins(users) {
  const adminEntries = Object.entries(users).filter(([name, isAdmin]) => isAdmin).map((pair) => pair[0]);
  yield* adminEntries;
}

// const itAdmins = yieldAdmins(users);
// console.log(itAdmins.next().value);
// console.log(itAdmins.next().value);