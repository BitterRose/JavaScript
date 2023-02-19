// funkcja, która dodaje dowolną ilość argumentów korzystając z asyncAdd()
async function addNumbers(...numbers) {
    let sum = 0;
    for (const number of numbers) {
      sum = await asyncAdd(sum, number);
    }
    return sum;
  }
  
  // funkcja mierząca czas wykonania kodu
  function measureTime(func, ...args) {
    const start = Date.now();
    const result = func(...args);
    const end = Date.now();
    const executionTime = end - start;
    return { result, executionTime };
  }
  
  // przykładowe dane wejściowe
  const data = Array.from({ length: 100 }, (_, i) => i + 1);
  
  // pomiar czasu wykonania funkcji dodającej
  const { result, executionTime } = measureTime(addNumbers, ...data);
  
  console.log(`Wynik: ${result}`);
  console.log(`Czas wykonania: ${executionTime} ms`);
  console.log(`Ilość operacji asynchronicznych: ${data.length}`);
  