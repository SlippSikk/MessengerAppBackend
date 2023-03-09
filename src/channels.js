import { getData, setData } from "./dataStore";

function channelsListV1(authUserId) {
    // Error: invalid user ID
    if (!getData().users.userID.includes(authUserId)) {
        return { error: 'authUserId is invalid' };
    }

    let channels = [];

    for (let i = 0; i < getData().channels.length; i++) {
        if (getData().channels[i].memberIds.includes(authUserId) == true) {
            let curr_channel = {
                channelId: getData().channels[i].channelId,
                name: getData().channels[i].channelName
            }

            channels.push(curr_channel);
        }
    }

    return {
        channels
    };
}

function channelsCreateV1(authUserId, name, isPublic) {
    let data = getData();

    // Error cases:
    // name is less than 1 character
    if (name.length < 1) {
        return { error: 'name is less than 1 character' };
    }

    // name is more than 20 characters
    if (name.length > 20) {
        return { error: 'name is more than 20 characters' };
    }

    // authUserId is invalid
    const find = data.users.find(element => element.userId === authUserId);
    if (find === undefined) {
        return { error: 'authuserId is invalid' };
    }


    // Find and assign a suitable channelId
    let channelId = typeof (Number);

    if (data.channels.length == 0) {
        channelId = 1;
    } else if (data.channels.length > 0) {
        channelId = data.channels[data.channels.length - 1].channelId + 1;
    }

    let newChannel = {
        channelId: channelId,
        ownerId: authUserId,
        adminIds: [authUserId],
        memberIds: [authUserId],
        channelName: name,
        isPublic: isPublic,
        messages: []
    };

    data.channels.push(newChannel);

    setData(data);

    return { channelId: channelId };
}

/**
 * @param {int} authUserId 
 * @returns { channels: [{ channelId: integer, channelName: string}] }
 * 
 */
function channelsListAllV1(authUserId) {
    let dataStore = getData();
    if (!isValid(authUserId)) return { error: 'authUserId not valid' };
    const channelsObject = { channels: [] };
    for (let a of dataStore.channels) {
        if (a.memberIds.includes(authUserId)) {
            channelsObject.channels.push({
                channelId: a.channelId,
                channelName: a.channelName,
            });
        }
    }
    return channelsObject;

}
/**
 *  o
 * @param {integer} authUserId 
 * @returns {bolean} 
 * note: check  if authUserId is valid/notValid
 */
function isValid(authUserId) {
    let dataStore = getData();
    for (let a of dataStore.users) {
        if (a.userId === authUserId) return true;
    }
    return false;
}

export { channelsCreateV1, channelsListV1, channelsListAllV1, isValid };

