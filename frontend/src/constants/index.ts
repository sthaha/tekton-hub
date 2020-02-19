export const ENTER_KEY = 13;

declare global {
  interface Window {
    config: any;
  }
}

export const API_URL = window.config.API_URL;
console.debug(`Using config: ${API_URL} | config:`, window.config);
