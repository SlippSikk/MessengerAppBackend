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

function channelInviteV1(authUserID, channelID, uID) {
     return {}
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

function channelJoinV1(authUserID, channelID) {
     if (typeof(authUserID) != "number") {
          return {error: "authUserID is invalid"}
     } else if (typeof(channelID) != "number") {
          return {error: "channelID is invalid"}
     }

     let data = getData()
     let channelExists = checkExists(channelID, data.channelDetails)
     
     if (channelExists === false) {
          return {error: 'This channel does not exist'}
     }

     if (checkExists(authUserID, data.userMembers) === false) {
          return {error: 'This user does not exist'}
     }

     // checks if a non-global owner is joining a private channel
     const globalOwnerID = data.userMembers[0].userID
     if (data.channelDetails[channelExists].isPublic === false && 
          authUserID != globalOwnerID) {
               return {error: "Regular users cannot join private channels"}
          }

     // checks if that user is already in the channel
     let channelMembers = data.channelDetails[channelExists].memberIDs
     if (channelMembers.includes(authUserID)) {
          console.log('user is in channel already')
          return {error: "This user is already in this channel"}
     }

     // finally adds user to channel
     data.channelDetails[channelExists].memberIDs.push(authUserID)
     setData(data)
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