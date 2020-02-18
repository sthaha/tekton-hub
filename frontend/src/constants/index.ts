export const ENTER_KEY = 13;
var api2 = window.location.host.replace(/^\w+-/, 'api-')
export const API_URL = 'https://' + api2

console.debug(`Using api: ${API_URL}`);
console.debug(`env:`, process.env);
