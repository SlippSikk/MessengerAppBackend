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



describe('test channelsListAllV1', () => {
     //Check authUserId
     //  uses an invalid authUserId
     beforeEach(() => clearV1());

     test('Test for Invalid user ID', () => {
          let invalidUserId = 12345;
          expect(channelsListAllV1(invalidUserId)).toBe({ error: 'error' });
     });
     test('Test for valid user ID', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash');
          expect(channelsListAllV1(authUserId)).toBe({});
     });
     //  function parameter  reminder
     //  channelsCreateV1((authUserId, name, isPublic));
     test('Creating channels', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', dash);
          //let authUserId = authLoginV1('duck@gmail.com', 123);
          let firstId = channelsCreateV1((authUserId, 'first', true));
          let secondId = channelsCreateV1((authUserId, 'second', true));
          let thirdId = channelsCreateV1((authUserId, 'third', true));
          expect(channelsListAllV1(authUserId)).toBe({
               channels: [
                    {
                         channelId: firstId,
                         name: 'first',
                    },
                    {
                         channelId: secondId,
                         name: 'second',
                    },
                    {
                         channelId: thirdId,
                         name: 'thrid',
                    },
               ],
          });
     });

});

