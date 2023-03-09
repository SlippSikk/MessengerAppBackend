
import { channelsCreateV1 } from './channels.js'
import { getData, setData } from './dataStore.js'
import { checkExists, isChannelIdValid, isUserIdValid } from './helper.js'



/**
 * Given a channel with ID channelId that t
 * he authorised user is a member of
 * return up to 50 messages information
 * between index "start" and "start + 50"
 * i.e  the start and its previous message
 * @param {string} authUserId
 * @param {string} channelId
 * @param {string} start
 * @returns {messages,start,end}
 */

function channelMessagesV1(authUserId, channelId, start) {
     let data = getData();
     let end
     const authUser = data.users.find(object => object.userId === authUserId);
    const channel = data.channels.find(object => object.channelId === channelId);
     const member = data.channels.find(object => object.memberIds === channelId);
     let channelExists = checkExists(channelId, data.channels)
    if (authUser === undefined) {
        return { error: 'authUserId is invaild' };
    } else if (channel === undefined) {
        return { error: 'channelId is invaild' };
    }
    if( channelExists == false){
     return {error: 'user is not in the channel'}
}

    if (start > channel.messages.length){
     return {error: 'start is greater than the total number of messages in the channel'}  //assumption: messages array is always[]
    }
    if(channel.messages.length > start + 50){
     end = start + 50
    }else{
     end = -1
    }
     return {
           
               messages: channel.messages.slice(start,end),
               start: start,
               end: end
             
}      



}

/**
 * Allows members of a channel to invite someone else to that channel, provided
 * they aren't already a member.
 * 
 * @param {number} authUserID 
 * @param {number} channelID 
 * @param {number} uID 
 * @returns 
 */
function channelInviteV1(authUserID, channelID, uID) {
     if (typeof (authUserID) != "number") {
          return { error: "authUserID is invalid" }
     } else if (typeof (channelID) != "number") {
          return { error: "channelID is invalid" }
     } else if (typeof (uID) != "number") {
          return { error: "userID is invalid" }
     }

     let data = getData()
     let channelExists = checkExists(channelID, data.channels)
     if (channelExists === false) {
          return { error: 'This channel does not exist' }
     }

     if (checkExists(authUserID, data.users) === false) {
          return { error: 'The inviter does not exist' }
     }

     if (checkExists(uID, data.users) === false) {
          return { error: 'The invitee does not exist' }
     }

     // checks if that user is already in the channel
     let channelMembers = data.channels[channelExists].memberIds
     if (channelMembers.includes(uID)) {
          return { error: "This user is already in this channel" }
     }

     // finally adds user to channel
     data.channels[channelExists].memberIds.push(uID)
     setData(data)

     return {}
}

/**
 * Allows regular users to join public channels. If the user is a global owner,
 * they can join any channel.
 * 
 * @param {number} authUserID 
 * @param {number} channelID 
 * @returns 
 */
function channelJoinV1(authUserID, channelID) {
     if (typeof (authUserID) != "number") {
          return { error: "authUserID is invalid" }
     } else if (typeof (channelID) != "number") {
          return { error: "channelID is invalid" }
     }

     let data = getData()
     let channelExists = checkExists(channelID, data.channels)

     if (channelExists === false) {
          return { error: 'This channel does not exist' }
     }

     if (checkExists(authUserID, data.users) === false) {
          return { error: 'This user does not exist' }
     }

     // checks if a non-global owner is joining a private channel

     if (data.channels[channelExists].isPublic === false &&
          authUserID != 1) {
          return { error: "Regular users cannot join private channels" }
     }

     // checks if that user is already in the channel
     let channelMembers = data.channels[channelExists].memberIds
     if (channelMembers.includes(authUserID)) {
          console.log('user is in channel already')
          return { error: "This user is already in this channel" }
     }

     // finally adds user to channel
     data.channels[channelExists].memberIds.push(authUserID)
     setData(data)
     return {}
}

/**
 * 
 * @param {number} authUserId 
 * @param {number} channelId 
 * @returns {{channelName: string,
 * isPublic: boolean,
 * ownerId: string,
 * memberIds: [number]}}
 */
function channelDetailsV1(authUserId, channelId) {
     let dataStore = getData(); 
     if (!isUserIdValid(authUserId)) return { error: 'authUserId not valid' };
     if (!isChannelIdValid(channelId)) return { error: 'channelId not valid' };
     // error handle for channelId is valid and the authorised user is not a member of the channel
     for (let a of dataStore.channels) {
          if (a.channelId === channelId) {
               if (!(a.memberIds.includes(authUserId))) return { error: 'authUserId is not a member of channelId' };
          }
     }

     const returnObject = {};
     //NOTE: global owner is also  ownerMembers? or no  or what ?
     // for future use global owner = dataStore.users[0].userId 
     for (let a of dataStore.channels) {
          if (a.channelId === channelId && (a.memberIds.includes(authUserId) || authUserId === 1)) {
               returnObject.channelName = a.channelName;
               returnObject.isPublic = a.isPublic;
               returnObject.ownerId = a.ownerId;
               returnObject.memberIds = a.memberIds;
               break;
          }
     }
     return returnObject;
}


export { channelMessagesV1, channelInviteV1, channelJoinV1, channelDetailsV1 };