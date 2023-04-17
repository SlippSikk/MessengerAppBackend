import HTTPError from 'http-errors';
import { user, channel, dataTs } from './interfaces';
import { getData, setData } from './dataStore';
import { channelJoinV3, channelLeaveV2 } from './channel';
import { isChannelIdValid, validateToken, userIndexUid, isUserIdValid, getUIdFromToken, isOwner, getChannel, isMember, getUser, isOwnerByToken,isGlobalOwnerFromToken, isGlobalOwnerFromUid } from './helper';

/**
 *
 * @param token
 * @param uId
 * @returns none
 * @method POST
 * @summary
 * Given a user by their uId, removes them from Memes.
 */
export function userRemove(token: string, uId: number){
    const data: dataTs = getData();
    if (!validateToken(token)) {
        throw HTTPError(403, 'Invalid Token');
    }
    
    if (!isUserIdValid(uId)) {
        throw HTTPError(400, 'Invalid uId');
    }


    let newArrays = data.users.filter(function(item){
        return item.permissionId === 1;
    });
    if (newArrays.length === 1 && uId === getUIdFromToken(token)){
        throw HTTPError(400, 'You are the only global user now and you can not remove yourself!');
    }
    if (!isGlobalOwnerFromToken(token)) {
        throw HTTPError(403, 'You are not global owner');
    }
    
    let mId: number;
    let messagesObject;
    let arrayHaveMessge
    
    for (const channel of data.channels) {   
        arrayHaveMessge = channel.messages.filter(element => element.uId === uId)
            for ( let aMessagePack of arrayHaveMessge){
                aMessagePack.message = 'Removed user'
            }
            const channelIndex: number = data.channels.findIndex(c => c.channelId === channel.channelId);
            data.channels[channelIndex].ownerMembers = channel.ownerMembers.filter(owner => owner.uId !== uId);
            data.channels[channelIndex].allMembers = channel.allMembers.filter(member => member.uId !== uId);
    }

    for (const dm of data.dms){
      let arrayHaveDm = dm.messages.filter(element => element.uId === uId)
        for ( let aDmPack of arrayHaveDm){
            aDmPack.message = 'Removed user'
        }
        const dmIndex = data.dms.findIndex(element => element.dmId === dm.dmId);
        const authIndex = data.dms[dmIndex].members.findIndex(element => element.uId === uId);
        data.dms[dmIndex].members.splice(authIndex, 1);

          
    }
    data.users[userIndexUid(uId)].nameFirst = 'Removed';
    data.users[userIndexUid(uId)].nameLast = 'user';
    data.deletedUsers.push(data.users[userIndexUid(uId)]);
    data.users.splice(userIndexUid(uId),1);
    setData(data);
    return {};
}