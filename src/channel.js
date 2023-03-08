function channelMessagesV1(authUserId, channelId, start) {
     return {

          messages: [
               {
                    messageId: 1,
                    uId: 1,
                    message: 'Hello world',
                    timeSent: 1582426789,
               }
          ],
          start: 0,
          end: 50,

     }
}

function channelInviteV1(authUserID, channelID, uID) {
     return {}
}

function channelJoinV1(authUserID, channelID) {
     return {}
}

/**
 * 
 * @param {integer} authUserId 
 * @param {integer} channelId 
 * @returns {{channelName: string,
 * isPublic: boolean,
 * ownerId: string,
 * memberIds: [integer]}}
 */
function channelDetailsV1(authUserId, channelId) {
     // ERROR HANDLING 
     let dataStore = getData();
     if (isValid(authUserId)) return { error: 'authUserId not valid' };
     if (isValid(channelId)) return { error: 'channelId not valid' };
     // error handle for channelId is valid and the authorised user is not a member of the channel
     for (let a of dataStore.channels) {
          if (a.channelId === channelId) {
               if (!(a.memberIds.includes(authUserId))) return { error: 'authUserId is not a member of channelId' };
          }
     }

     const returnObject = {};
     //NOTE: global owner is also  ownerMembers? or no  or what ?
     for (let a of dataStore.channels) {
          if (a.memberIds.includes(authUserId) && a.channelId === channelId) {
               returnObject.channelName = a.channelName;
               returnObject.isPublic = a.isPublic;
               returnObject.ownerId = a.ownerId;
               returnObject.memberIds = a.memberIds;
          }
     }
     return returnObject;
}
/**
 *  
 * @param {integer} authUserId 
 * @returns {boolean} 
 * note: check  if authUserId is valid/notValid
 * NOTE ****** data store a.id // the structure of the object is unknown
 */
function isValid(id) {
     let dataStore = getData();
     for (let a of dataStore.users) {
          if (a.userID === id) return true;
     }
     for (let a of dataStore.channels) {
          if (a.channelId === id) return true;
     }
     return false;
}
