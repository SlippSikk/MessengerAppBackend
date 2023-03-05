import { getData, setData } from './dataStore.js'

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

// check if an object exists in an array of objects based on searchID
// returns the index of that object if it exists, otherwise returns false
function checkExists(searchID, array) {
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

function channelInviteV1(authUserID, channelID, uID) {
     if (typeof(authUserID) != "number") {
          return {error: "authUserID is invalid"}
     } else if (typeof(channelID) != "number") {
          return {error: "channelID is invalid"}
     } else if (typeof(uID) != "number") {
          return {error: "userID is invalid"}
     }

     let data = getData()
     let channelExists = checkExists(channelID, data.channelDetails)
     if (channelExists === false) {
          return {error: 'This channel does not exist'}
     }

     if (checkExists(authUserID, data.userMembers) === false) {
          return {error: 'The inviter does not exist'}
     }

     if (checkExists(uID, data.userMembers) === false) {
          return {error: 'The invitee does not exist'}
     }

     // checks if that user is already in the channel
     let channelMembers = data.channelDetails[channelExists].memberIDs
     if (channelMembers.includes(uID)) {
          return {error: "This user is already in this channel"}
     }

     // finally adds user to channel
     data.channelDetails[channelExists].memberIDs.push(uID)
     setData(data)

     return {}
}

function channelJoinV1(authUserID, channelID) {
     return {}
}

function channelDetailsV1(authUserId, channelId) {
     return {
          name: 'Hayden',
          ownerMembers: [
               {
                    uId: 1,
                    email: 'example@gmail.com',
                    nameFirst: 'Hayden',
                    nameLast: 'Jacobs',
                    handleStr: 'haydenjacobs',
               }
          ],
          allMembers: [
               {
                    uId: 1,
                    email: 'example@gmail.com',
                    nameFirst: 'Hayden',
                    nameLast: 'Jacobs',
                    handleStr: 'haydenjacobs',
               }
          ],
     };
}