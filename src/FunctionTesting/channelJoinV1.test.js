import { channelJoinV1 } from './../channel.js'
import { authRegisterV1 } from './../auth.js'
import { channelsCreateV1 } from './../channels.js'
import { clearV1 } from './../other.js'
import { channelDetailsV1 } from './../channel.js'


describe('Valid joining sequences', () => {
    let globalOwnerID;
    let globalChannelID;
    let regularOwnerID;
    let publicChannelID;
    let privateChannelID;
    let regularUserID;

    beforeEach(() => {
        clearV1()
        globalOwnerID = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId
        globalChannelID = channelsCreateV1(globalOwnerID, 'Global Channel', true).channelId
        regularOwnerID = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId
        publicChannelID = channelsCreateV1(regularOwnerID, 'Public Channel', true).channelId
        privateChannelID = channelsCreateV1(regularOwnerID, 'Private Channel', false).channelId
        regularUserID = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId
    });

    test ('Global owner joins private channel', () => {
        expect(channelJoinV1(globalOwnerID, privateChannelID)).toEqual({})
        expect(channelDetailsV1(globalOwnerID, privateChannelID)).toEqual({
            channelName: "Private Channel",
            isPublic: false,
            ownerId: regularOwnerID,
            memberIds: [regularOwnerID, globalOwnerID],
        })
    });

    test ('Regular user joins public channel', () => {
        expect(channelJoinV1(regularUserID,publicChannelID)).toEqual({})
        expect(channelDetailsV1(regularUserID, publicChannelID)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerID,
            memberIds: [regularOwnerID, regularUserID],
        })
    });

    test ('Regular user joins multiple channels', () => {
        expect(channelJoinV1(regularUserID,globalChannelID)).toEqual({})
        expect(channelJoinV1(regularUserID,publicChannelID)).toEqual({})
        expect(channelDetailsV1(regularUserID, publicChannelID)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerID,
            memberIds: [regularOwnerID, regularUserID],
        })
        expect(channelDetailsV1(regularUserID, globalChannelID)).toEqual({
            channelName: "Global Channel",
            isPublic: true,
            ownerId: globalOwnerID,
            memberIds: [globalOwnerID, regularUserID],
        })
    });

})

describe('Invalid joining sequences', () => {
    let globalOwnerID;
    let globalChannelID;
    let regularOwnerID;
    let publicChannelID;
    let privateChannelID;
    let regularUserID;

    beforeEach(() => {
        clearV1()
        globalOwnerID = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId
        globalChannelID = channelsCreateV1(globalOwnerID, 'Global Channel', true).channelId
        regularOwnerID = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId
        publicChannelID = channelsCreateV1(regularOwnerID, 'Public Channel', true).channelId
        privateChannelID = channelsCreateV1(regularOwnerID, 'Private Channel', false).channelId
        regularUserID = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId
    });
    test ('Regular user joins private channel', () => {
        expect(channelJoinV1(regularUserID, privateChannelID)).toEqual({error: expect.any(String)})
        expect(channelDetailsV1(regularOwnerID, privateChannelID)).toEqual({
            channelName: "Private Channel",
            isPublic: false,
            ownerId: regularOwnerID,
            memberIds: [regularOwnerID],
        })
    });

    test ('Regular user joins multiple times', () => {
        expect(channelJoinV1(regularUserID,publicChannelID)).toEqual({})
        expect(channelJoinV1(regularUserID,publicChannelID)).toEqual({error: expect.any(String)})
        expect(channelDetailsV1(regularUserID, publicChannelID)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerID,
            memberIds: [regularOwnerID, regularUserID],
        })
    });

    test ('Owner rejoins channel', () => {
        expect(channelJoinV1(regularOwnerID,publicChannelID)).toEqual({error: expect.any(String)})
        expect(channelDetailsV1(regularOwnerID, publicChannelID)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerID,
            memberIds: [regularOwnerID],
        })
    });

    test ('Invalid userID', () => {
        expect(channelJoinV1('abc', publicChannelID)).toEqual({error: expect.any(String)})
        expect(channelDetailsV1(regularOwnerID, publicChannelID)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerID,
            memberIds: [regularOwnerID],
        })
    });

    test ('Invalid channelID', () => {
        expect(channelJoinV1(regularUserID, 'abc')).toEqual({error: expect.any(String)})
        expect(channelDetailsV1(regularOwnerID, publicChannelID)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerID,
            memberIds: [regularOwnerID],
        })
    });
})