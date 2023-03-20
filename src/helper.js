
import { getData } from './dataStore.js'
/**
 * 
 * @param {number} searchID      - the unique ID to search for in the array
 * @param {integer} array        - an array of IDS
 * @returns {integer | boolean}  - either the index of search ID, or false if unfound
 * 
 */
// check if an object exists in an array of objects based on searchID
// returns the index of that object if it exists, otherwise returns false
export function checkExists(searchID, array) {
     let i = 0;
     for (const element of array) {
          // the ID of a channel or user is always the first value in both objects
          const currentID = Object.values(element)[0];
          if (currentID === searchID) {
               return i;
          }
          i++
     }

     return false;
}

/**
 *  
 * @param {integer} authUserId 
 * @returns {boolean} 
 * note: check  if authUserId is valid/notValid
 * NOTE ****** data store a.id // the structure of the object is unknown
 */
export function isUserIdValid(userId) {
     let dataStore = getData();
     for (let a of dataStore.users) {
          if (a.uId === userId) return true;
     }
     return false;
}
export function isChannelIdValid(channelId) {
     let dataStore = getData();
     for (let a of dataStore.channels) {
          if (a.channelId === channelId) return true;
     }
     return false;
}