export function log(message, type) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}]: ${message}`)
};

export const logTypes = {
  INIT : 'INIT',
  REQUEST : 'REQUEST',
  INFO : 'INFO',
  ERROR : 'ERROR',
  RESPONSE : 'RESPONSE'
}