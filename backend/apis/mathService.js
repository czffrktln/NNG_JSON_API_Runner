import express from 'express';

const router = express.Router();

const getFibonacci = (() => {
  const memo = {};
  return function f(n) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = f(n - 1) + f(n - 2);
    return memo[n];
  }
})();

const multiplyMatrices = (A, B) => {
  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;

  if (colsA !== rowsB) {
    throw new Error('Number of columns in A must match number of rows in B.');
  }

  const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += A[i][k] * B[k][j]
      }
    }
  }
  return result
};


router.post('/math', (req, res) => {
  console.log("reqbody math", JSON.parse(req.body.input));
  const input = JSON.parse(req.body.input);
 
  const result = {};
  
  
  const fibonacciInput = input.find(obj => obj.method === "getFibonacci")
  const fibonacciNumber = fibonacciInput.params.number
  const fibonacciMethod = fibonacciInput.method

  if (fibonacciInput) {
    if (fibonacciNumber && !isNaN(fibonacciNumber)) {
      const fibo = getFibonacci(Number(fibonacciNumber))
      console.log(fibo);
      result[fibonacciMethod] = fibo
    }
  } 
  
  const matricesInput = input.find(obj => obj.method === "multiplyMatrices")
  const matricesMethod = matricesInput.method
  const matricesParams = matricesInput.params;
  // if (matricesInput && matricesParams && )
  const matrixA = matricesInput.params.A
  const matrixB = matricesInput.params.B

  result[matricesMethod] = multiplyMatrices(matrixA, matrixB)



  console.log("result", result);

  res.status(200).json({result: result})
  

})

export default router;