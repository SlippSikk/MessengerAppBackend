export { users, channels, user, messages, dataTs, authUserId }
interface users {
    uId: number,
    email: string,
    nameFirst: string,
    nameLast: string,
    handleStr: string,
    password: string,
};

interface user {
    uId: number,
    nameFirst: string,
    nameLast: string,
    handleStr: string,
};

interface messages {
    messageId: number,
    uId: number,
    message: string,
    timeSent: number
}

interface channels {
    channelId: number
    name: string
    isPublic: boolean
    ownerMembers: user[]
    allMembers: user[]
    messages: messages[]
}

interface dataTs {
    users: users[]
    channels: channels[]
}

type authUserId = { token: string, authUserId: number } | { error: string }
