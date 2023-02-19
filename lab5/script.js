//Asynchroniczna funkcja dodająca

const asyncAdd = async (a,b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve(a+b)
    }, 100)
  })
}

//Suma wszystkich elementów, iteracja po każdym z wykorzystaniem operatora rest
const asyncAddMany = async (...args) => {
  let result = 0;
  for (let i = 0; i < args.length; i += 2) {
    const a = args[i];
    const b = args[i + 1];
    result = await asyncAdd(a, b);
  }
  return result;
}

//Funkcja mierząca czas wykonania
const measureTime = async (fn, ...args) => {
  const start = Date.now();
  const result = await fn(...args);
  const end = Date.now();
  const time = end - start;
  console.log(`Czas wykonania: ${time}ms`);
  return result;
}


//Wynik i ilość operacji
const arr = Array.from({length: 100}, () => Math.floor(Math.random() * 100));
measureTime(asyncAddMany, ...arr).then(result => {
  console.log(`Wynik: ${result}`);
  console.log(`Ilość operacji asynchronicznych: ${arr.length / 2}`);
});
