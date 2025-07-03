import express from 'express';
import { log, logTypes } from '../logger.js';

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

const isMatrixNumeric = (matrix) => {
  return Array.isArray(matrix) && matrix.every( row => Array.isArray(row) && row.every( item => typeof item === 'number'))
}


router.post('/math', (req, res) => {
  log(`Processing request with body: ${req.body.input}`, logTypes.INFO)
  const input = JSON.parse(req.body.input);
 
  const result = {};
  
  const fibonacciInput = input.find(obj => obj.method === 'getFibonacci')
  if (!fibonacciInput) {
    log('Invalid method', logTypes.ERROR)
    return res.status(404).json({ error: 'Invalid method.' });
  }

  const { params, method: fibonacciMethod } = fibonacciInput;

  if (!'number' in params || isNaN(params.number)) {
    log('Missing or invalid parameter', logTypes.ERROR)
    return res.status(400).json({ error: 'Missing or invalid parameter.' }); 
  }

  const fibonacciNumber = getFibonacci(Number(params.number));

  result[fibonacciMethod] = fibonacciNumber;


  const matricesInput = input.find(obj => obj.method === 'multiplyMatrices');
  if (!matricesInput) {
    log('Invalid method', logTypes.ERROR)
    return res.status(404).json({ error: 'Invalid method.' });
  }
  
  const { method: matricesMethod, params: matricesParams} = matricesInput
  const { A, B } = matricesParams;

  if ( !isMatrixNumeric(A) || !isMatrixNumeric(B) ) {
    log('Missing or invalid parameter', logTypes.ERROR)
    return res.status(400).json({ error: 'Missing or invalid parameter.' });
  }

  try {
    const multipliedMatrices = multiplyMatrices(A, B)
    result[matricesMethod] = multipliedMatrices
  } catch (err) {
    log(err.message, logTypes.ERROR)
    return res.status(400).json({ error: err.message})
  }

  log(JSON.stringify(result), logTypes.RESPONSE)
  res.status(200).json({result: result})
})

export default router;