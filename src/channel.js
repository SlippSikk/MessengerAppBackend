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
     if (typeof(authUserID) != "number") {
          return {error: "authUserID is invalid"}
     } else if (typeof(channelID) != "number") {
          return {error: "channelID is invalid"}
     } else if (typeof(uID) != "number") {
          return {error: "userID is invalid"}
     }

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