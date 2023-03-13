import { channelDetailsV1, channelInviteV1 } from './../channel.js'
import { authRegisterV1 } from './../auth.js'
import { channelsCreateV1 } from './../channels.js'
import { clearV1 } from './../other.js'
import { checkExists } from '../helper.js';



describe('Members with different permissions inviting once', () => {
    let globalOwnerId;
    let globalChannelId;
    let authId2;
    let channelId2;
    let authId3;

    beforeEach(() => {
        clearV1();
        // note that globalOwnerId is the first Id and hence a global owner
        globalOwnerId = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId;
        // globalChannelId corresponds to the first channel, owned by the global owner
        globalChannelId = channelsCreateV1(globalOwnerId, 'Channel 1', true).channelId;
        // authId2 is the Id of a regular user
        authId2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId;
        // channel2 is a regular channel
        channelId2 = channelsCreateV1(authId2, 'Channel 2', true).channelId;

        authId3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId;
    });
    test('Global owner invites regular user', () => {
        expect(channelInviteV1(globalOwnerId, globalChannelId, authId2)).toEqual({})
        expect(channelDetailsV1(globalOwnerId, globalChannelId)).toEqual({
            channelName: "Channel 1",
            isPublic: true,
            ownerId: globalOwnerId,
            memberIds: [globalOwnerId, authId2],
        })
    });

    test('Global owner invites user to a channel they do not own', () => {
        expect(channelInviteV1(globalOwnerId, channelId2, authId3)).toEqual({})
        expect(channelDetailsV1(globalOwnerId, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2, authId3],
        })
    });

    test('Regular owner invites global owner', () => {
        expect(channelInviteV1(authId2, channelId2, globalOwnerId)).toEqual({})
        expect(channelDetailsV1(authId2, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2, globalOwnerId],
        })
    });

    test('Regular owner invites another regular user', () => {
        expect(channelInviteV1(authId2, channelId2, authId3)).toEqual({})
        expect(channelDetailsV1(authId2, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2, authId3],
        })
    });

    test('Owner invites multiple users', () => {
        const authId4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId;
        const authId5 = authRegisterV1('eugene@outlook.com', 'eee123', 'Eugene', 'Ew').authUserId;

        expect(channelInviteV1(authId2, channelId2, authId3)).toEqual({})
        expect(channelInviteV1(authId2, channelId2, authId4)).toEqual({})
        expect(channelInviteV1(authId2, channelId2, authId5)).toEqual({})
        expect(channelDetailsV1(authId2, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2, authId3, authId4, authId5],
        })
    });

    test('Regular member invites others', () => {
        const authId4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId;

        expect(channelInviteV1(authId2, channelId2, authId3)).toEqual({})
        expect(channelInviteV1(authId3, channelId2, authId4)).toEqual({})
        expect(channelDetailsV1(authId3, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2, authId3, authId4],
        })
    });
});

describe('Multiple invites', () => {
    let globalOwnerId;
    let globalChannelId;
    let authId2;
    let channelId2;
    let authId3;

    beforeEach(() => {
        clearV1();
        // note that globalOwnerId is the first Id and hence a global owner
        globalOwnerId = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId;
        // globalChannelId corresponds to the first channel, owned by the global owner
        globalChannelId = channelsCreateV1(globalOwnerId, 'Channel 1', true).channelId;
        // authId2 is the Id of a regular user
        authId2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId;
        // channel2 is a regular channel
        channelId2 = channelsCreateV1(authId2, 'Channel 2', true).channelId;

        authId3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId;
    });
    test('Member invites multiple others', () => {
        const authId4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId
        const authId5 = authRegisterV1('eugene@outlook.com', 'eee123', 'Eugene', 'Eggbert').authUserId
        expect(channelInviteV1(authId2, channelId2, authId3)).toEqual({})
        expect(channelInviteV1(authId3, channelId2, authId4)).toEqual({})
        expect(channelInviteV1(authId3, channelId2, authId5)).toEqual({})
        expect(channelDetailsV1(authId3, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2, authId3, authId4, authId5],
        })
    });

    test('Member part of multiple channels', () => {
        expect(channelInviteV1(globalChannelId, globalOwnerId, authId3)).toEqual({})
        expect(channelInviteV1(authId2, channelId2, authId3)).toEqual({})
        expect(channelInviteV1(globalOwnerId, channelId2, globalOwnerId)).toEqual({})
        expect(channelDetailsV1(authId3, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2, authId3, globalOwnerId],
        })
        expect(channelDetailsV1(globalOwnerId, globalChannelId)).toEqual({
            channelName: "Channel 1",
            isPublic: true,
            ownerId: globalOwnerId,
            memberIds: [globalOwnerId, authId3],
        })
    });
})

describe('ERRORS: Reinviting users', () => {
    let globalOwnerId;
    let globalChannelId;
    let authId2;
    let channelId2;
    let authId3;

    beforeEach(() => {
        clearV1();
        // note that globalOwnerId is the first Id and hence a global owner
        globalOwnerId = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId;
        // globalChannelId corresponds to the first channel, owned by the global owner
        globalChannelId = channelsCreateV1(globalOwnerId, 'Channel 1', true).channelId;
        // authId2 is the Id of a regular user
        authId2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId;
        // channel2 is a regular channel
        channelId2 = channelsCreateV1(authId2, 'Channel 2', true).channelId;

        authId3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId;
    });

    test('Owner reinvites themselves', () => {
        expect(channelInviteV1(authId2, channelId2, authId2)).toEqual({ error: expect.any(String) })
        expect(channelDetailsV1(authId2, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2],
        })
    });

    test('Owner reinvites another user', () => {

        expect(channelInviteV1(authId2, channelId2, authId3)).toEqual({})
        expect(channelInviteV1(authId2, channelId2, authId3)).toEqual({ error: expect.any(String) })
        expect(channelDetailsV1(authId2, channelId2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authId2,
            memberIds: [authId2, authId3],
        })
    });
})


describe('Miscallaneous errors', () => {
    let globalOwnerId;
    let globalChannelId;
    let authId2;
    let channelId2;
    let authId3;

    beforeEach(() => {
        clearV1();
        // note that globalOwnerId is the first Id and hence a global owner
        globalOwnerId = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams');
        // globalChannelId corresponds to the first channel, owned by the global owner
        globalChannelId = channelsCreateV1(globalOwnerId, 'Channel 1', true);
        // authId2 is the Id of a regular user
        authId2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
        // channel2 is a regular channel
        channelId2 = channelsCreateV1(authId2, 'Channel 2', true);

        authId3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
    });


    test('InvalId Channel Id', () => {
        clearV1();
        expect(channelInviteV1(authId2, 'a', authId2)).toEqual({ error: expect.any(String) })
    });

    test('ValId channel Id but user not a member', () => {
        expect(channelInviteV1(authId3, channelId2, authId3)).toEqual({ error: expect.any(String) })
    });

    test('InvalId UserId', () => {
        expect(channelInviteV1(authId2, channelId2, 'abc')).toEqual({ error: expect.any(String) })
    });

    test('InvalId authUserId', () => {
        clearV1()
        expect(channelInviteV1('abc', channelId2, authId2)).toEqual({ error: expect.any(String) })
    });

});
