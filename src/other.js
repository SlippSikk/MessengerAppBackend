/**
 * Resets the internal data of the application to its initial state
 * @param none
 * @returns {{}}
 */
<<<<<<< HEAD
import { setData } from './dataStore.js';
=======
import { setData } from './dataStore'
>>>>>>> c403676 (edited authRegister tests to clear beforeeach, added wrapper helper file)
export function clearV1() {
  const iniData = {
    users: [],
    channels: [],

  };
  setData(iniData);

  return {};
}
