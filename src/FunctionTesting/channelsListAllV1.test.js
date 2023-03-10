import { authRegisterV1, authLoginV1 } from './../auth.js'
import { channelMessagesV1, channelInviteV1, channelJoinV1, channelDetailsV1 } from './../auth.js'
import { channelsListV1, channelsCreateV1, channelsListAllV1 } from './../channels.js'
import { clearV1 } from './../other.js'


const ERROR = { error: expect.any(String) };

describe('test channelsListAllV1', () => {
     beforeEach(() => {
          clearV1();
     });

     test('Test for Invalid user ID', () => {
          let authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
          expect(channelsListAllV1(authUserId + 1)).toStrictEqual(ERROR)
     });
     test('Test for valid user ID', () => {
          let authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
          expect(channelsListAllV1(authUserId)).toStrictEqual({ channels: [] })
     });
     test('Test return value after creating multiple Public channels', () => {
          let authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
          let firstId = channelsCreateV1(authUserId, 'first', true).channelId;
          let secondId = channelsCreateV1(authUserId, 'second', true).channelId;
          let thirdId = channelsCreateV1(authUserId, 'third', true).channelId;
          expect(channelsListAllV1(authUserId)).toStrictEqual({
               channels: [
                    {
                         channelId: firstId,
                         channelName: 'first',
                    },
                    {
                         channelId: secondId,
                         channelName: 'second',
                    },
                    {
                         channelId: thirdId,
                         channelName: 'third',
                    },
               ],
          });
     });
     test('Test return value after creating multiple Non Public channels', () => {
          let authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
          let firstId = channelsCreateV1(authUserId, 'first', false).channelId;
          let secondId = channelsCreateV1(authUserId, 'second', false).channelId;
          let thirdId = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelsListAllV1(authUserId)).toStrictEqual({
               channels: [
                    {
                         channelId: firstId,
                         channelName: 'first',
                    },
                    {
                         channelId: secondId,
                         channelName: 'second',
                    },
                    {
                         channelId: thirdId,
                         channelName: 'third',
                    },
               ],
          });
     });
     test('Test return value after creating multiple mix public channels', () => {
          let authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
          let firstId = channelsCreateV1(authUserId, 'first', false).channelId;
          let secondId = channelsCreateV1(authUserId, 'second', true).channelId;
          let thirdId = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelsListAllV1(authUserId)).toStrictEqual({
               channels: [
                    {
                         channelId: firstId,
                         channelName: 'first',
                    },
                    {
                         channelId: secondId,
                         channelName: 'second',
                    },
                    {
                         channelId: thirdId,
                         channelName: 'third',
                    },
               ],
          });
     });
});

