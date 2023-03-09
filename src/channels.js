import { getData, setData } from './dataStore.js';

function channelsListV1(authUserId) {
    let data = getData();

    // Error: invalid user ID
    const find = data.users.find(element => element.userId === authUserId);
    if (find === undefined) {
        return { error: 'authuserId is invalid' };
    }

    let channels = [];
    let curr_channel = {};

    for (let i = 0; i < data.channels.length; i++) {
        const temp_channel = data.channels[i];

        if (temp_channel.memberIds.includes(authUserId)) {
            curr_channel = {
                channelId: temp_channel.channelId,
                name: temp_channel.channelName
            }

            channels.push(curr_channel);
        }
    }

    return {
        channels: channels
    };
}

/**
 * Summary:
 * When given a valid authUserId, name, and privacy setting,
 * this function will create a new channel
 * 
 * Description:
 * When given a valid name and authUserId, the function will create a unique
 * channelId, and after it will create a new object containing; channelId, ownerId,
 * adminIds, memberIds, channelName, isPublic, messages. Then will set this new object into
 * the array named "channels", in the dataStore.js file using the setData function
 * 
 * @param {number} authUserId - Unique Id of a user
 * @param {string} name - Desired name for a new channel
 * @param {boolean} isPublic - Desired setting for the channel's privacy
 * 
 * @returns {error: 'string'} - Error Message - Error message describing the error cause
 * @returns {channelId: number} - The unique channelId that gets created upon creating a new channel
 */

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


export { channelsCreateV1, channelsListV1, channelsListAllV1 };