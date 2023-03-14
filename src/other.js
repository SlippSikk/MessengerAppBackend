/**
 * Resets the internal data of the application to its initial state
 * @param none
 * @returns {{}}
 */
import {setData, getData} from './dataStore.js'
export function clearV1(){
    
    let ini_data = {
        users: [],
        channels: [],
    
    }
    setData(ini_data)
    
      return {};
    
}
