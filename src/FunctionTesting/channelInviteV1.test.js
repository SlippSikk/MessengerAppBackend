import { channelDetailsV1, channelInviteV1 } from './../channel.js'
import { authRegisterV1 } from './../auth.js'
import { channelsCreateV1 } from './../channels.js'
import { clearV1 } from './../other.js'
import { checkExists } from '../helper.js';



describe('Members with different permissions inviting once', () => {
    let globalOwnerID;
    let globalChannelID;
    let authID2;
    let channelID2;
    let authID3;

    beforeEach(() => {
        clearV1();
        // note that globalOwnerID is the first ID and hence a global owner
        globalOwnerID = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId;
        // globalChannelID corresponds to the first channel, owned by the global owner
        globalChannelID = channelsCreateV1(globalOwnerID, 'Channel 1', true).channelId;
        // authID2 is the ID of a regular user
        authID2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId;
        // channel2 is a regular channel
        channelID2 = channelsCreateV1(authID2, 'Channel 2', true).channelId;
    
        authID3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId;
    });
    test ('Global owner invites regular user', () => {      
        expect(channelInviteV1(globalOwnerID, globalChannelID, authID2)).toEqual({})
        expect(channelDetailsV1(globalOwnerID, globalChannelID)).toEqual({
            channelName: "Channel 1",
            isPublic: true,
            ownerId: globalOwnerID,
            memberIds: [globalOwnerID, authID2],
        })
    });

    test ('Global owner invites user to a channel they do not own', () => {        
        expect(channelInviteV1(globalOwnerID, channelID2, authID3)).toEqual({})
        expect(channelDetailsV1(globalOwnerID, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2, authID3],
        })
    });

    test ('Regular owner invites global owner', () => {        
        expect(channelInviteV1(authID2, channelID2, globalOwnerID)).toEqual({})
        expect(channelDetailsV1(authID2, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2, globalOwnerID],
        })
    });

    test ('Regular owner invites another regular user', () => {
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual({})
        expect(channelDetailsV1(authID2, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2, authID3],
        })
    });

    test ('Owner invites multiple users', () => {
        const authID4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId;
        const authID5 = authRegisterV1('eugene@outlook.com', 'eee123', 'Eugene', 'Ew').authUserId;
        
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual({})
        expect(channelInviteV1(authID2, channelID2, authID4)).toEqual({})
        expect(channelInviteV1(authID2, channelID2, authID5)).toEqual({})
        expect(channelDetailsV1(authID2, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2, authID3, authID4, authID5],
        })
    });

    test ('Regular member invites others', () => {
        const authID4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId;
   
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual({})
        expect(channelInviteV1(authID3, channelID2, authID4)).toEqual({})
        expect(channelDetailsV1(authID3, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2, authID3, authID4],
        })
    });
});

describe('Multiple invites', () => {
    let globalOwnerID;
    let globalChannelID;
    let authID2;
    let channelID2;
    let authID3;

    beforeEach(() => {
        clearV1();
        // note that globalOwnerID is the first ID and hence a global owner
        globalOwnerID = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId;
        // globalChannelID corresponds to the first channel, owned by the global owner
        globalChannelID = channelsCreateV1(globalOwnerID, 'Channel 1', true).channelId;
        // authID2 is the ID of a regular user
        authID2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId;
        // channel2 is a regular channel
        channelID2 = channelsCreateV1(authID2, 'Channel 2', true).channelId;
    
        authID3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId;
    });
    test ('Member invites multiple others', () => {
        const authID4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId
        const authID5 = authRegisterV1('eugene@outlook.com', 'eee123', 'Eugene', 'Eggbert').authUserId
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual({})
        expect(channelInviteV1(authID3, channelID2, authID4)).toEqual({})
        expect(channelInviteV1(authID3, channelID2, authID5)).toEqual({})
        expect(channelDetailsV1(authID3, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2, authID3, authID4, authID5],
        })
    });

    test ('Member part of multiple channels', () => {
        expect(channelInviteV1(globalChannelID, globalOwnerID, authID3)).toEqual({})
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual({})
        expect(channelInviteV1(globalOwnerID, channelID2, globalOwnerID)).toEqual({})
        expect(channelDetailsV1(authID3, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2, authID3, globalOwnerID],
        })
        expect(channelDetailsV1(globalOwnerID, globalChannelID)).toEqual({
            channelName: "Channel 1",
            isPublic: true,
            ownerId: globalOwnerID,
            memberIds: [globalOwnerID, authID3],
        })
    });
})

describe('ERRORS: Reinviting users', () => {    
    let globalOwnerID;
    let globalChannelID;
    let authID2;
    let channelID2;
    let authID3;

    beforeEach(() => {
        clearV1();
        // note that globalOwnerID is the first ID and hence a global owner
        globalOwnerID = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId;
        // globalChannelID corresponds to the first channel, owned by the global owner
        globalChannelID = channelsCreateV1(globalOwnerID, 'Channel 1', true).channelId;
        // authID2 is the ID of a regular user
        authID2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').authUserId;
        // channel2 is a regular channel
        channelID2 = channelsCreateV1(authID2, 'Channel 2', true).channelId;
    
        authID3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId;
    });

    test ('Owner reinvites themselves', () => {     
        expect(channelInviteV1(authID2, channelID2, authID2)).toEqual({error: expect.any(String)})
        expect(channelDetailsV1(authID2, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2],
        })
    });

    test ('Owner reinvites another user', () => {
        
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual({})   
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual({error: expect.any(String)})
        expect(channelDetailsV1(authID2, channelID2)).toEqual({
            channelName: "Channel 2",
            isPublic: true,
            ownerId: authID2,
            memberIds: [authID2, authID3],
        })
    });
})


describe('Miscallaneous errors', () => {
    let globalOwnerID;
    let globalChannelID;
    let authID2;
    let channelID2;
    let authID3;

    beforeEach(() => {
        clearV1();
        // note that globalOwnerID is the first ID and hence a global owner
        globalOwnerID = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams');
        // globalChannelID corresponds to the first channel, owned by the global owner
        globalChannelID = channelsCreateV1(globalOwnerID, 'Channel 1', true);
        // authID2 is the ID of a regular user
        authID2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
        // channel2 is a regular channel
        channelID2 = channelsCreateV1(authID2, 'Channel 2', true);
    
        authID3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
    });


    test ('Invalid Channel ID', () => {
        clearV1();
        expect(channelInviteV1(authID2, 'a', authID2)).toEqual({error: expect.any(String)}) 
    });

    test ('Valid channel ID but user not a member', () => {
        expect(channelInviteV1(authID3, channelID2, authID3)).toEqual({error: expect.any(String)}) 
    });

    test ('Invalid UserID', () => {
        expect(channelInviteV1(authID2, channelID2, 'abc')).toEqual({error: expect.any(String)})
    });

    test ('Invalid authUserID', () => {
        clearV1()
        expect(channelInviteV1('abc', channelID2, authID2)).toEqual({error: expect.any(String)})
    });

});
