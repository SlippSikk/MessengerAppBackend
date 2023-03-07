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
    return {
        channelId: 1
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


