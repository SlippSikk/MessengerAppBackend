import { authRegisterV1, authLoginV1 } from './../auth.js';
import { channelMessagesV1, channelInviteV1, channelJoinV1, channelDetailsV1 } from './../channel.js';
import { channelsListV1, channelsCreateV1, channelsListAllV1 } from './../channels.js';
import { clearV1 } from './../other.js';

const ERROR = { error: expect.any(String) };

describe('test channelsListAllV1', () => {
  beforeEach(() => {
    clearV1();
  });

  test('Test for Invalid user ID', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    expect(channelsListAllV1(authUserId + 1)).toStrictEqual(ERROR);
  });
  test('Test for valid user ID', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    expect(channelsListAllV1(authUserId)).toStrictEqual({ channels: [] });
  });
  test('Test return value after creating multiple Public channels', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    const firstId = channelsCreateV1(authUserId, 'first', true).channelId;
    const secondId = channelsCreateV1(authUserId, 'second', true).channelId;
    const thirdId = channelsCreateV1(authUserId, 'third', true).channelId;
    expect(channelsListAllV1(authUserId)).toStrictEqual({
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
          name: 'third',
        },
      ],
    });
  });
  test('Test return value after creating multiple Non Public channels', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    const firstId = channelsCreateV1(authUserId, 'first', false).channelId;
    const secondId = channelsCreateV1(authUserId, 'second', false).channelId;
    const thirdId = channelsCreateV1(authUserId, 'third', false).channelId;
    expect(channelsListAllV1(authUserId)).toStrictEqual({
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
          name: 'third',
        },
      ],
    });
  });
  test('Test return value after creating multiple mix public channels', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    const firstId = channelsCreateV1(authUserId, 'first', false).channelId;
    const secondId = channelsCreateV1(authUserId, 'second', true).channelId;
    const thirdId = channelsCreateV1(authUserId, 'third', false).channelId;
    expect(channelsListAllV1(authUserId)).toStrictEqual({
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
          name: 'third',
        },
      ],
    });
  });
  test('test output with channel inv ', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    const authUserId2 = authRegisterV1('dog@gmail.com', '123456', 'dog', 'drown').authUserId;
    const firstId = channelsCreateV1(authUserId, 'first', false).channelId;
    const secondId = channelsCreateV1(authUserId, 'second', true).channelId;
    const thirdId = channelsCreateV1(authUserId, 'third', false).channelId;
    channelInviteV1(authUserId, firstId, authUserId2);
    expect(channelsListAllV1(authUserId)).toStrictEqual({
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
          name: 'third',
        },
      ],
    });
  });
  test('test output with channel inv and channelJoin', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    const authUserId2 = authRegisterV1('dog@gmail.com', '123456', 'dog', 'drown').authUserId;
    const firstId = channelsCreateV1(authUserId, 'first', false).channelId;
    const secondId = channelsCreateV1(authUserId, 'second', true).channelId;
    const thirdId = channelsCreateV1(authUserId, 'third', true).channelId;
    channelInviteV1(authUserId, firstId, authUserId2);
    expect(channelsListAllV1(authUserId2)).toStrictEqual({
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
          name: 'third',
        },
      ],
    });
    channelJoinV1(authUserId2, thirdId);
    expect(channelsListAllV1(authUserId2)).toStrictEqual({
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
          name: 'third',
        },
      ],
    });
  });
});
