import { getData } from "./dataStore";

function channelsListV1(authUserId) {
    // Error: invalid user ID
    if (!getData().userMembers.userID.includes(authUserId)) {
        return { error: 'authUserId is invalid' };
    }

    let channels = [];

    for (let i = 0; i < getData().channelDetails.length; i++) {
        if (getData().channelDetails[i].memberIDs.includes(authUserId) == true) {
            let curr_channel = {
                channelId: getData().channelDetails[i].channelID,
                name: getData().channelDetails[i].channelName
            }

            channels.push(curr_channel);
        }
    }

    return {
        channels
    };
}

function channelsCreateV1(authUserId, name, isPublic) {
    return {
        channelId: 1
    };
}

function channelsListAllV1(authUserId) {
    return {
        channels: [
            {
                channelId: 1,
                name: 'My Channel',
            }
        ],
    };

}