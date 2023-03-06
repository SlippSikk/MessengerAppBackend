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

const ERROR = { error: expect.any(String) };

describe('test channelsListAllV1', () => {
     //Check authUserId
     //  uses an invalid authUserId
     beforeEach(() => {
          clearV1();
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash');
     });

     test('Test for Invalid user ID', () => expect(channelsListAllV1(authUserId + 1)).toBe(ERROR));
     test('Test for valid user ID', () => expect(channelsListAllV1(authUserId)).toBe({ channels: [] }));
     //  function parameter  reminder
     //  channelsCreateV1((authUserId, name, isPublic));
     test('Test return value after creating multiple Public channels', () => {
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
     test('Test return value after creating multiple Non Public channels', () => {
          let firstId = channelsCreateV1((authUserId, 'first', false));
          let secondId = channelsCreateV1((authUserId, 'second', false));
          let thirdId = channelsCreateV1((authUserId, 'third', false));
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
     test('Test return value after creating multiple mix public channels', () => {
          let firstId = channelsCreateV1((authUserId, 'first', false));
          let secondId = channelsCreateV1((authUserId, 'second', true));
          let thirdId = channelsCreateV1((authUserId, 'third', false));
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

