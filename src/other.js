/**
 * Resets the internal data of the application to its initial state
 * @param none
 * @returns {{}}
 */
import { setData } from './dataStore';
export function clearV1() {
  const iniData = {
    users: [],
    channels: [],
    dms: []

  };
  setData(iniData);
  return {};
}
