import { channelInviteV1 } from './../channel.js'
import { authRegisterV1 } from './../auth.js'
import { channelsCreateV1 } from './../channels.js'
import { clearV1 } from './../other.js'

/*const authID2 = authRegisterV1('bob@gmail.com', 'efk289', 'Bob', 'Smith')
    const authID3 = authRegisterV1('susan@outlook.com', 'hello321', 'Susan', 'Miller')
*/
//after each, before each, test each

beforeEach(() => {
    clearV1()
    // note that globalOwnerID is the first ID and hence a global owner
    const globalOwnerID = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams')
    // globalChannelID corresponds to the first channel, owned by the global owner
    const globalChannelID = channelsCreateV1(globalOwnerID, 'Channel 1', true)
    // authID2 is the ID of a regular user
    const authID2 = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums')
    // channel2 is a regular channel
    const channelID2 = channelsCreateV1(authID2, 'Channel 2', true) 

    const authID3 = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman')
});


describe('Members with different permissions inviting once', () => {
    
    test ('Global owner invites regular user', () => {        
        expect(channelInviteV1(globalOwnerID, globalChannelID, authID2)).toEqual('')
        expect(chanelDetailsV1(globalOwnerID, globalChannelID)).toEqual({
            name: "Channel 1",
            isPublic: true,
            ownerMembers: globalOwnerID,
            allMembers: [globalOwnerID, authID2],
        })
    });

    test ('Global owner invites user to a channel they do not own', () => {        
        expect(channelInviteV1(globalOwnerID, channelID2, authID3)).toEqual('')
        expect(chanelDetailsV1(globalOwnerID, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2, authID3],
        })
    });

    test ('Regular owner invites global owner', () => {        
        expect(channelInviteV1(authID2, channelID2, globalOwnerID)).toEqual('')
        expect(chanelDetailsV1(authID2, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2, globalOwnerID],
        })
    });

    test ('Regular owner invites another regular user', () => {
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual('')
        expect(chanelDetailsV1(authID2, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2, authID3],
        })
    });

    test ('Owner invites multiple users', () => {
        const authID4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora')
        const authID5 = authRegisterV1('eugene@outlook.com', 'eee123', 'Eugene', 'Eggbert')
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual('')
        expect(channelInviteV1(authID2, channelID2, authID4)).toEqual('')
        expect(channelInviteV1(authID2, channelID2, authID5)).toEqual('')
        expect(chanelDetailsV1(authID2, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2, authID3, authID4, authID5],
        })
    });

    test ('Regular member invites others', () => {
        const authID4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora')
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual('')
        expect(channelInviteV1(authID3, channelID2, authID4)).toEqual('')
        expect(chanelDetailsV1(authID3, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2, authID3, authID4],
        })
    });
});

describe('Multiple invites', () => {
    test ('Member invites multiple others', () => {
        const authID4 = authRegisterV1('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora')
        const authID5 = authRegisterV1('eugene@outlook.com', 'eee123', 'Eugene', 'Eggbert')
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual('')
        expect(channelInviteV1(authID3, channelID2, authID4)).toEqual('')
        expect(channelInviteV1(authID3, channelID2, authID5)).toEqual('')
        expect(chanelDetailsV1(authID3, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2, authID3, authID4, authID5],
        })
    });

    test ('Member part of multiple channels', () => {
        expect(channelInviteV1(globalChannelID, globalOwnerID, authID3)).toEqual('')
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual('')
        expect(channelInviteV1(globalOwnerID, channelID2, globalOwnerID)).toEqual('')
        expect(chanelDetailsV1(authID3, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2, authID3, globalOwnerID],
        })
        expect(chanelDetailsV1(globalOwnerID, globalChannelID)).toEqual({
            name: "Channel 1",
            isPublic: true,
            ownerMembers: globalOwnerID,
            allMembers: [globalOwnerID, authID3],
        })
    });
})

describe('ERRORS: Reinviting users', () => {
    test ('Owner reinvites themselves', () => {     
        expect(channelInviteV1(authID2, channelID2, authID2)).toEqual({error: expect.any(String)})
        expect(chanelDetailsV1(authID2, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2],
        })
    });

    test ('Owner reinvites another user', () => {
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual('')   
        expect(channelInviteV1(authID2, channelID2, authID3)).toEqual({error: expect.any(String)})
        expect(chanelDetailsV1(authID2, channelID2)).toEqual({
            name: "Channel 2",
            isPublic: true,
            ownerMembers: authID2,
            allMembers: [authID2, authID3],
        })
    });
})


describe('Miscallaneous errors', () => {
    test ('Invalid Channel ID', () => {
        expect(channelInviteV1(authID2, 'a', authID2)).toEqual({error: expect.any(String)}) 
    });

    test ('Valid channel ID but user not a member', () => {
        expect(channelInviteV1(authID3, channelID2, authID3)).toEqual({error: expect.any(String)}) 
    });

    test ('Invalid UserID', () => {
        expect(channelInviteV1(authID2, channelID2, 'abc')).toEqual({error: expect.any(String)})
    });

    test ('Invalid authUserID', () => {
        expect(channelInviteV1('abc', channelID2, authID2)).toEqual({error: expect.any(String)})
    });

});
