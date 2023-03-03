import { channelJoinV1 } from '../channel.js'
import { authRegisterV1 } from '../auth.js'
import { channelsCreateV1 } from '../channels.js'
import { clearV1 } from '../other.js'


beforeEach(() => {
    clearV1()
    // note that globalOwnerID is the first ID and hence a global owner
    const globalOwnerID = authRegisterV1('anna@gmail.com', 'aaa123', 'Anna', 'Adams')
    // globalChannelID corresponds to the first channel, owned by the global owner
    const globalChannelID = channelsCreateV1(globalOwnerID, 'Global Channel', true)
    // regularOwnerID is the ID of a regular user
    const regularOwnerID = authRegisterV1('bob@outlook.com', 'bbb123', 'Bob', 'Biggums')
    const privateChannelID = channelsCreateV1(regularOwnerID, 'Private Channel', false)
    const publicChannelID = channelsCreateV1(regularOwnerID, 'Public Channel', true)
    
    const regularUserID = authRegisterV1('chris@outlook.com', 'ccc123', 'Chris', 'Catman')
});

describe('Valid joining sequences', () => {
    test ('Global owner joins private channel', () => {
        expect(channelJoinV1(globalOwnerI, privateChannelID)).toEqual('')
        expect(chanelDetailsV1(regularUserIDID, privateChannelID)).toEqual(
            ["Private Channel", false, [regularOwnerID], [regularOwnerID, globalOwnerID]]
        )
    });

    test ('Regular user joins public channel', () => {
        expect(channelJoinV1(regularUserID,publicChannelID)).toEqual('')
        expect(chanelDetailsV1(regularUserID, publicChannelID)).toEqual(
            ["Public Channel", true, [regularOwnerID], [regularOwnerID, regularUserID]]
        )
    });

    test ('Regular user joins multiple channels', () => {
        expect(channelJoinV1(regularUserID,globalChannelID)).toEqual('')
        expect(channelJoinV1(regularUserID,publicChannelID)).toEqual('')
        expect(chanelDetailsV1(regularUserID, publicChannelID)).toEqual(
            ["Public Channel", true, [regularOwnerID], [regularOwnerID, regularUserID]]
        )
        expect(chanelDetailsV1(regularUserID, globalChannelID)).toEqual(
            ["Global Channel", true, [globalOwnerID], [globalOwnerID, regularUserID]]
        )
    });

})

describe('Invalid joining sequences', () => {
    test ('Regular user joins private channel', () => {
        expect(channelJoinV1(regularUserID, privateChannelID)).toEqual({error: 'error'})
        expect(chanelDetailsV1(regularOwnerID, privateChannelID)).toEqual(
            ["Private Channel", true, [regularOwnerID], [regularOwnerID]]
        )
    });

    test ('Regular user joins multiple times', () => {
        expect(channelJoinV1(regularUserID,publicChannelID)).toEqual('')
        expect(channelJoinV1(regularUserID,publicChannelID)).toEqual({error: 'error'})
        expect(chanelDetailsV1(regularUserID, publicChannelID)).toEqual(
            ["Public Channel", true, [regularOwnerID], [regularOwnerID, regularUserID]]
        )
    });

    test ('Owner rejoins channel', () => {
        expect(channelJoinV1(regularOwnerID,publicChannelID)).toEqual({error: 'error'})
        expect(chanelDetailsV1(regularUserID, publicChannelID)).toEqual(
            ["Public Channel", true, [regularOwnerID], [regularOwnerID]]
        )
    });

    test ('Invalid userID', () => {
        expect(channelJoinV1('abc', publicChannelID)).toEqual({error: 'error'})
        expect(chanelDetailsV1(regularOwnerID, publicChannelID)).toEqual(
            ["Public Channel", true, [regularOwnerID], [regularOwnerID]]
        )
    });

    test ('Invalid channelID', () => {
        expect(channelJoinV1(regularUserID, 'abc')).toEqual({error: 'error'})
        expect(chanelDetailsV1(regularOwnerID, publicChannelID)).toEqual(
            ["Public Channel", true, [regularOwnerID], [regularOwnerID]]
        )
    });
})