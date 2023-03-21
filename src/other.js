/**
 * Resets the internal data of the application to its initial state
 * @param none
 * @returns {{}}
 */
import { setData } from './dataStore.js';
export function clearV1() {
  const iniData = {
    users: [],
    channels: [],

  };
  setData(iniData);

  return {};
}
