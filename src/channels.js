import { getData, setData } from "./dataStore";

function channelsListV1(authUserId) {
    return {
        channels: [
            {
                channelId: 1,
                name: 'My Channel',
            }
        ],
    };
}

function channelsCreateV1(authUserId, name, isPublic) {
    // Error cases

    // ASSUMPTION: that we will always recieve the correct data type
    // if (typeof name !== 'string') {
    //     return { error: 'name is not a string' };
    // }

    // name is less than 1 character
    if (name.length < 1) {
        return { error: 'name is less than 1 character' }
    }

    // name is more than 20 characters
    if (name.length > 20) {
        return { error: 'name is more than 20 characters' }
    }

    // authUserId is invalid
    if (!getData().users.userId.includes(authUserId)) {
        return { error: 'authUserId is invalid' }
    }

    if (getData().channels.length === 0) {
        let channelId = 1;
    } else if (getData().channels.length > 0) {
        let channelId = getData().channels[getData().channels.length - 1].channelId + 1;
    }

    let newChannel = {
        channelI: channelId,
        ownerId: authUserId,
        adminIds: [authUserId],
        memberIds: [authUserId],
        channelName: name,
        isPublic: isPublic,
        messages: []
    };

    getData.channels.push(newChannel);

    return {
        channelId
    };
}

function channelsListAllV1(authUserId) {
    let dataStore = getData();
    if (isValid(authUserId)) return { error: 'authUserId not valid' };
    const channelsObject = { channels: [] };
    for (let a of dataStore.channels) {
        if (a.allMembers.includes(authUserId)) {
            channelsObject.push({
                channelId: a.channelId,
                name: a.name,
            });
        }
    }
    return channelsObject;

}
/**
 *  
 * @param {integer} authUserId 
 * @returns {boolean} 
 * note: check  if authUserId is valid/notValid
 */
function isValid(authUserId) {
    let dataStore = getData();
    for (let a of dataStore.users) {
        if (a.id === authUserId) return true;
    }
    return false;
}


