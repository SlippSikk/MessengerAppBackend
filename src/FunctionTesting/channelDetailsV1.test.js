import { authRegisterV1, authLoginV1 } from '../auth.js'
import { channelMessagesV1, channelInviteV1, channelJoinV1, channelDetailsV1 } from '../auth.js'
import { channelsListV1, channelsCreateV1, channelsListAllV1 } from '../channels.js'
import { clearV1 } from './other.js'

/**
 * 
 * 
 *  ChannelsListAllV1 Testing
 * 
 * 
 * 
 */



describe('test channelDetailsV1', () => {
    //Check authUserId
    //  uses an invalid authUserId
    beforeEach(() => clearV1());

    test('Test for Invalid user ID', () => {
        let invalidUserId = 12345;
        expect(channelDetailsV1(invalidUserId)).toBe({ error: 'error' });
    });
    //  function parameter  reminder
    //  channelsCreateV1((authUserId, name, isPublic));
    test('Creating channels', () => {
        let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash');
        //let authUserId = authLoginV1('duck@gmail.com', 123);
        let firstId = channelsCreateV1((authUserId, 'first', true));
        let secondId = channelsCreateV1((authUserId, 'second', true));
        let thirdId = channelsCreateV1((authUserId, 'third', true));
        expect(channelDetailsV1(authUserId, firstId)).toBe({
            name: 'duck dash',
            isPublic: true,
            ownerMembers: authUserId,
            allMembers: [authUserId],
        });
    });
    // * CONFUSION IN CHANNLJOIN AND CHANNEL INV FUNCTION
    test('Creating channels', () => {
        let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash');
        let authUserId2 = authRegisterV1('chicken@gmail.com', 1234, 'chicken', 'swim');
        //let authUserId = authLoginV1('duck@gmail.com', 123);
        let firstId = channelsCreateV1((authUserId, 'first', true));
        channelJoinV1(authUserId2, firstId);
        expect(channelDetailsV1(authUserId, firstId)).toBe({
            name: 'duck dash',
            isPublic: true,
            ownerMembers: authUserId,
            allMembers: [authUserId, authUserId2],
        });
    });
});

