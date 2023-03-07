import { getData } from "./dataStore"


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
     const authUser = data.users.find(object => object.userId === authUserId);
    const channel = data.channels.find(object => object.channelID === channelId);

    if (authUser === undefined) {
        return { error: 'authUserId is invaild' };
    } else if (channel === undefined) {
        return { error: 'channelId is invaild' };
    }
    if (start > 0){
     return {error: 'start is greater than the total number of messages in the channel'}
    }
    let end = -1
     return {
          
               messages: [],
               start: 0,
               end: 50
             
}      
}

function channelInviteV1(authUserID, channelID, uID) {
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