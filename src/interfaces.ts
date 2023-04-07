interface users {
    uId: number,
    email: string,
    nameFirst: string,
    nameLast: string,
    handleStr: string,
    password: string,
    token: string[],
}

interface user {
    uId: number,
    email: string,
    nameFirst: string,
    nameLast: string,
    handleStr: string,
}

interface messages {
    messageId: number,
    uId: number,
    message: string,
    timeSent: number
    reacts: [{
        reactId: 1,
        allUsers: user[]
    }],
    isPinned: boolean
}

interface channels {
    channelId: number
    name: string
}

interface channel {
    channelId: number
    name: string
    isPublic: boolean
    ownerMembers: user[]
    allMembers: user[]
    messages: messages[]
}

type dmId = { dmId: number }

interface dms {
    dmId: number,
    name: string,
    creator: user,
    members: user[]
    messages: messages[]
}

interface dmsOutput {
    dmId: number,
    name: string,
}

interface dmDetails {
    name: string,
    members: user[],
}

interface dmMessages {
    messages: messages[],
    start: number,
    end: number
}
interface dataTs {
    users: users[]
    channels: channel[]
    dms: dms[]
}

type authUserId = { token: string, authUserId: number };

type error = { error: string };

type channelId = { channelId: number }

export {
  users, channels, user, messages, dataTs, authUserId, error, channel,
  dmMessages, dmDetails, dmsOutput, dmId, dms, channelId
};
