export function logInfo(message, meta = {}) {
  console.log(JSON.stringify({
    message,
    meta,
    time: new Date().toISOString()
  }));
}
