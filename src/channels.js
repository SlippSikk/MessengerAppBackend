import { getData, setData } from "./dataStore";

function channelsListV1(authUserId) {
    let data = getData();

    // Error: invalid user ID
    const find = data.users.find(element => element.userId === authUserId);
    if (find === undefined) {
        return { error: 'authuserId is invalid' };
    }

    let channels = [];
    let curr_channel = {};

    curr_channel = {
        channelId: data.channels[0].channelId,
        name: data.channels[0].channelName
    }

    channels.push(curr_channel);

    // for (let i = 0; i < data.channels.length; i++) {
    //     if (data.channels[i].memberIds.includes(authUserId) === true) {
    //         curr_channel = {
    //             channelId: data.channels[i].channelId,
    //             name: data.channels[i].channelName
    //         }

    //         channels.push(curr_channel);
    //     }
    // }

    return {
        channels: channels
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

export { channelsListV1 };
export { channelsCreateV1 };

