export function log(message, type) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}]: ${message} `)
};