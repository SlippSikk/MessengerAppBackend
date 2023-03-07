/**
 * 
 * @param {*} searchID 
 * @param {*} array 
 * @returns 
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