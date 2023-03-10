import { channelJoinV1 } from './../channel.js'
import { authRegisterV1 } from './../auth.js'
import { channelsCreateV1 } from './../channels.js'
import { clearV1 } from './../other.js'
import { channelDetailsV1 } from './../channel.js'


describe('ValId joining sequences', () => {
    let globalOwnerId;
    let globalChannelId;
    let regularOwnerId;
    let publicChannelId;
    let privateChannelId;
    let regularUserId;

    beforeEach(() => {
        clearV1()
        globalOwnerId = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId
        globalChannelId = channelsCreateV1(globalOwnerId, 'Global Channel', true).channelId
        regularOwnerId = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId
        publicChannelId = channelsCreateV1(regularOwnerId, 'Public Channel', true).channelId
        privateChannelId = channelsCreateV1(regularOwnerId, 'Private Channel', false).channelId
        regularUserId = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId
    });

    test('Global owner joins private channel', () => {
        expect(channelJoinV1(globalOwnerId, privateChannelId)).toEqual({})
        expect(channelDetailsV1(globalOwnerId, privateChannelId)).toEqual({
            channelName: "Private Channel",
            isPublic: false,
            ownerId: regularOwnerId,
            memberIds: [regularOwnerId, globalOwnerId],
        })
    });

    test('Regular user joins public channel', () => {
        expect(channelJoinV1(regularUserId, publicChannelId)).toEqual({})
        expect(channelDetailsV1(regularUserId, publicChannelId)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerId,
            memberIds: [regularOwnerId, regularUserId],
        })
    });

    test('Regular user joins multiple channels', () => {
        expect(channelJoinV1(regularUserId, globalChannelId)).toEqual({})
        expect(channelJoinV1(regularUserId, publicChannelId)).toEqual({})
        expect(channelDetailsV1(regularUserId, publicChannelId)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerId,
            memberIds: [regularOwnerId, regularUserId],
        })
        expect(channelDetailsV1(regularUserId, globalChannelId)).toEqual({
            channelName: "Global Channel",
            isPublic: true,
            ownerId: globalOwnerId,
            memberIds: [globalOwnerId, regularUserId],
        })
    });

})

describe('InvalId joining sequences', () => {
    let globalOwnerId;
    let globalChannelId;
    let regularOwnerId;
    let publicChannelId;
    let privateChannelId;
    let regularUserId;

    beforeEach(() => {
        clearV1()
        globalOwnerId = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId
        globalChannelId = channelsCreateV1(globalOwnerId, 'Global Channel', true).channelId
        regularOwnerId = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId
        publicChannelId = channelsCreateV1(regularOwnerId, 'Public Channel', true).channelId
        privateChannelId = channelsCreateV1(regularOwnerId, 'Private Channel', false).channelId
        regularUserId = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId
    });
    test('Regular user joins private channel', () => {
        expect(channelJoinV1(regularUserId, privateChannelId)).toEqual({ error: expect.any(String) })
        expect(channelDetailsV1(regularOwnerId, privateChannelId)).toEqual({
            channelName: "Private Channel",
            isPublic: false,
            ownerId: regularOwnerId,
            memberIds: [regularOwnerId],
        })
    });

    test('Regular user joins multiple times', () => {
        expect(channelJoinV1(regularUserId, publicChannelId)).toEqual({})
        expect(channelJoinV1(regularUserId, publicChannelId)).toEqual({ error: expect.any(String) })
        expect(channelDetailsV1(regularUserId, publicChannelId)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerId,
            memberIds: [regularOwnerId, regularUserId],
        })
    });

    test('Owner rejoins channel', () => {
        expect(channelJoinV1(regularOwnerId, publicChannelId)).toEqual({ error: expect.any(String) })
        expect(channelDetailsV1(regularOwnerId, publicChannelId)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerId,
            memberIds: [regularOwnerId],
        })
    });

    test('InvalId userId', () => {
        expect(channelJoinV1('abc', publicChannelId)).toEqual({ error: expect.any(String) })
        expect(channelDetailsV1(regularOwnerId, publicChannelId)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerId,
            memberIds: [regularOwnerId],
        })
    });

    test('InvalId channelId', () => {
        expect(channelJoinV1(regularUserId, 'abc')).toEqual({ error: expect.any(String) })
        expect(channelDetailsV1(regularOwnerId, publicChannelId)).toEqual({
            channelName: "Public Channel",
            isPublic: true,
            ownerId: regularOwnerId,
            memberIds: [regularOwnerId],
        })
    });
})