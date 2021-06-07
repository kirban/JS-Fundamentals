console.log('Topic: Iterators');
// Task 1
// RU: Написать функцию keyValueIterable(target),
//     которая на вход получает объект и возвращает итерируемый объект.
//     Итерируемый объект позволяет получить пары ключ/значение.
//     Выведите в консоль цвета из объекта colors.
// EN: Create a function keyValueIterable(target)
//     which takes an objects and returns iterable object.
//     Iterable object allows you to get key/value pairs.
//     Display in a console all colors from the object colors.

const colors = {
  green: '#0e0',
  orange: '#f50',
  pink: '#e07'
};

function keyValueIterable(target) {
  target[Symbol.iterator] = function () {
    const keys = Object.keys(target);
    return {
      next() {
        const done = keys.length === 0;
        const key = keys.shift();

        return {
          value: [key, target[key]],
          done
        }
      }
    };
  }

  return target;
}

const itColors = keyValueIterable(colors);
for (const [, color] of itColors) {
  console.log(color);
}


// Task 2
// RU: В коллекции хранятся все имена пользователей, которые присоединились к определенной группе телеграмм.
//     Булевый флаг указывает, является ли пользователь администратором группы.
//     Создайте итератор, который возвращает только имена администраторов.
// EN: The following collection store all the names of the user that have joined a particular telegram group. 
//     The boolean flag indicates whether a user is an administrator of the group.
//     Сreatereate an iterator that returns only the administrators' names.

const users = {
  anna: false,
  boris: true, // admin
  christina: false,
  dave: false,
  elena: false,
  felix: true,  // admin
};

users[Symbol.iterator] = function () {
  const adminEntries = Object.entries(this).filter(([key, value]) => value);

  return {
    next: () => {
      const done = adminEntries.length === 0;
      const entry = adminEntries.shift();

      return {
        value: (!done) ? entry[0] : undefined,
        done
      }
    }
  };
};

[...users].forEach(name => console.log(name)); // boris, felix 


// Task 3
// RU: Написать функцию take(sequence, amount), которая из бесконечного итерируемого объекта random
//     вернет указаное количество элементов.
// EN: Create a function take(sequence, amount), which returns a specified amount of numbers
//     from iterable object random

const random = {
  [Symbol.iterator]: () => ({
    next: () => ({
      value: Math.random()
    })
  })
};

function take(sequence, amount) {
  return {
    [Symbol.iterator]: function(){
      const iterator = sequence[Symbol.iterator]();
      return {
        next: () => {
          if (amount-- < 1) {
            return {
              done: true
            }
          } else {
            return iterator.next();
          }
        }
      }
    }
  }
}

const a = [...take(random, 3)];
console.log(a);


// Task 4
// RU: Написать итерируемый итератор, который возвращает числа Фибоначи
//     Реализовать метод return для остановки итератора с помощью for-of + break
// EN: Create iterable iterator, which produces Fibonacci numbers
//     Implement method return, which allows you to stop iterator using for-of + break

// function fib(n) {
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }

// let Fib = {
//   current: 0,
//   [Symbol.iterator]: function() {
//     return {
//       next: () => {
//         this.current += 1;
//         return {
//           value: fib(this.current),
//           done: false
//         }
//       }
//     }
//   }
// }

const fib = {
  [Symbol.iterator]: () => {
    const done = false;
    let prev = [ 0, 1 ];

    return {
      next: () => {
        const value = prev[0] + prev[1];
        prev = [ prev[1], value ];
        return { value, done };
      }
    }
  }
}

const Fib = {
  [Symbol.iterator]: () => {
    const fibIterator = fib[Symbol.iterator]();
    return {
      next: fibIterator.next,
    }
  }
}

for (let v of Fib) {
  console.log(v);
  if (v > 50) break;
}

// Task 5
// RU: Написать итератор для чисел, который позволит получать массивы последовательных целых элементов.
//     Например, [...-3] => [0, -1, -2, -3], [...3] => [0, 1, 2, 3]
// EN: Create iterator for numbers, which allows you to get arrays of sequential integers.
//     Example, [...-3] => [0, -1, -2, -3], [...3] => [0, 1, 2, 3]

Number.prototype[Symbol.iterator] = function() {
  const num = this.valueOf();
  const isNegative = (num < 0);
  const valuesLimit = Math.abs(num);

  let valuesIndex = 0;

  return {
    next: () => {
      const done = valuesLimit < valuesIndex;

      let value = valuesIndex;

      if (isNegative) {
        value = -value;
      }

      valuesIndex++;

      return {
        value,
        done
      }
    }
  }
}

console.log([...-5]);
console.log([...5]);