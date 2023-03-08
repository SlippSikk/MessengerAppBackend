import { getData, setData } from './dataStore.js'
import { checkExists } from './helper.js'

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
     if (typeof (authUserID) != "number") {
          return { error: "authUserID is invalid" }
     } else if (typeof (channelID) != "number") {
          return { error: "channelID is invalid" }
     } else if (typeof (uID) != "number") {
          return { error: "userID is invalid" }
     }

     let data = getData()
     let channelExists = checkExists(channelID, data.channelDetails)
     if (channelExists === false) {
          return { error: 'This channel does not exist' }
     }

     if (checkExists(authUserID, data.userMembers) === false) {
          return { error: 'The inviter does not exist' }
     }

     if (checkExists(uID, data.userMembers) === false) {
          return { error: 'The invitee does not exist' }
     }

     // checks if that user is already in the channel
     let channelMembers = data.channelDetails[channelExists].memberIDs
     if (channelMembers.includes(uID)) {
          return { error: "This user is already in this channel" }
     }

     // finally adds user to channel
     data.channelDetails[channelExists].memberIDs.push(uID)
     setData(data)

     return {}
}



function channelJoinV1(authUserID, channelID) {
     if (typeof (authUserID) != "number") {
          return { error: "authUserID is invalid" }
     } else if (typeof (channelID) != "number") {
          return { error: "channelID is invalid" }
     }

     let data = getData()
     let channelExists = checkExists(channelID, data.channelDetails)

     if (channelExists === false) {
          return { error: 'This channel does not exist' }
     }

     if (checkExists(authUserID, data.userMembers) === false) {
          return { error: 'This user does not exist' }
     }

     // checks if a non-global owner is joining a private channel
     const globalOwnerID = data.userMembers[0].userID
     if (data.channelDetails[channelExists].isPublic === false &&
          authUserID != globalOwnerID) {
          return { error: "Regular users cannot join private channels" }
     }

     // checks if that user is already in the channel
     let channelMembers = data.channelDetails[channelExists].memberIDs
     if (channelMembers.includes(authUserID)) {
          console.log('user is in channel already')
          return { error: "This user is already in this channel" }
     }

     // finally adds user to channel
     data.channelDetails[channelExists].memberIDs.push(authUserID)
     setData(data)
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
          if (a.userId === id) return true;
     }
     for (let a of dataStore.channels) {
          if (a.channelId === id) return true;
     }
     return false;
}
