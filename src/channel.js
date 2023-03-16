import { getData, setData } from './dataStore.js'
import { isChannelIdValid, isUserIdValid } from './helper.js'

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


export function channelMessagesV1(authUserId, channelId, start) {
     let data = getData();
     let end
     const authUser = data.users.find(object => object.uId === authUserId);
    
     const channelExists = isChannelIdValid(channelId)
     if (channelExists == false) {
          return { error: 'user is not in the channel' }
     }

     const channel = data.channels.find(object => object.channelId === channelId); 
     if (authUser === undefined) {
          return { error: 'authUserId is invalid' };
     } else if (channel === undefined) {
          return { error: 'channelId is invalid' };
     }

     const hasAuthUser = channel.allMembers.find(member => member.uId === authUserId);
     if (hasAuthUser === undefined) {
          return { error: "This user is not in the channel" }
     }

     if (start > channel.messages.length) {
          return { error: 'start is greater than the total number of messages in the channel' }  //assumption: messages array is always[]
     }
     if (channel.messages.length > start + 50) {
          end = start + 50
     } else {
          end = -1
     }
     return {

          messages: channel.messages.slice(start, end),
          start: start,
          end: end

     }
}

/**
 * Allows members of a channel to invite someone else to that channel, provided
 * they aren't already a member.
 * 
 * @param {number} authUserId - The ID of the inviter
 * @param {number} channelId  - The ID of the channel to be invited into
 * @param {number} uId        - The ID of the invitee
 * @returns {error: 'string'} - The explanation for the error, otherwise {}
 */
export function channelInviteV1(authUserId, channelId, uId) {
     if (typeof (authUserId) !== "number") {
          return { error: "authUserId is invalid" }
     } else if (typeof (channelId) !== "number") {
          return { error: "channelId is invalid" }
     } else if (typeof (uId) !== "number") {
          return { error: "userID is invalid" }
     }

     let data = getData()
     if (!isChannelIdValid(channelId)) {
          return { error: 'This channel does not exist' }
     }

     if (!isUserIdValid(authUserId)) {
          return { error: 'The inviter does not exist' }
     }

     if (!isUserIdValid(uId)) {
          return { error: 'The invitee does not exist' }
     }

     // checks if that user is already in the channel
     if (authUserId === uId && authUserId != 1) {
          return {error: 'A user cannot invite themselves'}
     } 

     const channelIndex = data.channels.findIndex(channel => channel.channelId === channelId)
     let channel = data.channels[channelIndex]
     const hasUser = channel.allMembers.find(member => member.uId === uId);
     const hasAuthUser = channel.allMembers.find(member => member.uId === authUserId);
     if (hasUser !== undefined) {
          return { error: "This user is already in this channel" }
     } else if (hasAuthUser === undefined && authUserId != 1) {
          return { error: "This auth user is not in the channel" }
     }

     
     const userIndex = data.users.findIndex(user => user.uId === uId);
     const userObj = {
          uId: uId,
          email: data.users[userIndex].email,
          nameFirst: data.users[userIndex].nameFirst,
          nameLast: data.users[userIndex].nameLast,
          handleStr: data.users[userIndex].handleStr
     }
     
     // finally adds user to channel
     data.channels[channelIndex].allMembers.push(userObj)
     setData(data)

     return {}
}

/**
 * Allows regular users to join public channels. If the user is a global owner,
 * they can join any channel.
 * 
 * @param {number} authUserId - The ID of the user joining a channel
 * @param {number} channelId  - The ID of the channel to be joined
 * @returns {error: 'string'} - The explanation for the error, otherwise {}
 */
export function channelJoinV1(authUserId, channelId) {
     if (typeof (authUserId) != "number") {
          return { error: "authUserId is invalid" }
     } else if (typeof (channelId) != "number") {
          return { error: "channelId is invalid" }
     }

     let data = getData()
     

     if (!isChannelIdValid(channelId)) {
          return { error: 'This channel does not exist' }
     }

     if (!isUserIdValid(authUserId)) {
          return { error: 'This user does not exist' }
     }

     const channelIndex = data.channels.findIndex(channel => channel.channelId === channelId)
     // checks if a non-global owner is joining a private channel

     if (!data.channels[channelIndex].isPublic && authUserId != 1) {
          return { error: "Regular users cannot join private channels" }
     }

     // checks if that user is already in the channel
     let channel = data.channels[channelIndex]
     const hasUser = channel.allMembers.find(member => member.uId === authUserId);
     if (hasUser !== undefined) {
          return { error: "This user is already in this channel" }
     }

     const userIndex = data.users.findIndex(user => user.uId === authUserId);
     const userObj = {
          uId: authUserId,
          email: data.users[userIndex].email,
          nameFirst: data.users[userIndex].nameFirst,
          nameLast: data.users[userIndex].nameLast,
          handleStr: data.users[userIndex].handleStr
     }

     // finally adds user to channel
     data.channels[channelIndex].allMembers.push(userObj)
     setData(data)

     return {}
}

/**
 * 
 * @param {number} authUserId 
 * @param {number} channelId 
 * @returns 
 */
export function channelDetailsV1(authUserId, channelId) {
     let data = getData();
     if (!isUserIdValid(authUserId)) {
          return { error: 'authUserId not valid' };
     }
     if (!isChannelIdValid(channelId)) {
          return { error: 'channelId not valid' };
     }
     // error handle for channelId is valid and the authorised user is not a member of the channel
     const channel = data.channels.find(channel => channel.channelId === channelId);

     const hasUser = channel.allMembers.find(member => member.uId === authUserId);
     if (hasUser === undefined && authUserId != 1) {
          return { error: 'authUserId is not a member of channelId' };
     }

     const returnObject = {};
     // global owner -> uId = 1;
     
   //if ( (channel.allMembers.findIndex(member => member.uId === authUserId) || authUserId === 1)) {
          returnObject.name = channel.name;
          returnObject.isPublic = channel.isPublic;
          returnObject.ownerMembers = channel.ownerMembers;
          returnObject.allMembers = channel.allMembers;
   // }
     return returnObject;
}