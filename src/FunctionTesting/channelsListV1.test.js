import { channelsListV1 } from './../channels.js';
import { authRegisterV1 } from './../auth.js';
import { channelsCreateV1 } from './../channels.js';
import { channelInviteV1 } from './../channel.js';
import { channelJoinV1 } from './../channel.js';
import { clearV1 } from './../other.js';

beforeEach(() => {
  clearV1();
});

// test Success cases
describe('channelsListV1 Success Test', () => {
  test('Test 1', () => {
    const authUserId_1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId_2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const invalidUserId = (authUserId_1 + authUserId_2) * 2;
    const channelId = channelsCreateV1(authUserId_1, 'testChannel', true).channelId;
    channelInviteV1(authUserId_1, channelId, authUserId_2);
    channelJoinV1(authUserId_2, channelId);
    expect(channelsListV1(authUserId_2)).toEqual({
      channels: [
        {
          channelId: channelId,
          name: 'testChannel',
        }
      ],
    });
  });

  test('Test 2', () => {
    const authUserId_1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId_2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const authUserId_3 = authRegisterV1('john.saul@gmail.com', 'john123', 'John', 'Saul').authUserId;
    const invalidUserId = (authUserId_1 + authUserId_2) * 2;
    const channelId = channelsCreateV1(authUserId_1, 'testChannel', true).channelId;
    channelInviteV1(authUserId_1, channelId, authUserId_2);
    channelJoinV1(authUserId_2, channelId);
    expect(channelsListV1(authUserId_3)).toEqual({
      channels: [],
    });
  });

  test('Test 3', () => {
    const authUserId_1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId_2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const invalidUserId = (authUserId_1 + authUserId_2) * 2;
    const channelId = channelsCreateV1(authUserId_1, 'testChannel', false).channelId;
    channelInviteV1(authUserId_1, channelId, authUserId_2);
    channelJoinV1(authUserId_2, channelId);
    expect(channelsListV1(authUserId_2)).toEqual({
      channels: [
        {
          channelId: channelId,
          name: 'testChannel',
        },
      ],
    });
  });

  test('Test 4', () => {
    const authUserId_1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId_2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const channelId = channelsCreateV1(authUserId_2, 'testChannel', false).channelId;
    const channelId_2 = channelsCreateV1(authUserId_2, 'testChannel_2', false).channelId;
    expect(channelsListV1(authUserId_2)).toEqual({
      channels: [
        {
          channelId: channelId,
          name: 'testChannel',
        },
        {
          channelId: channelId_2,
          name: 'testChannel_2',
        },
      ],
    });
  });

  test('Test 5', () => {
    const authUserId_1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId_2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const channelId = channelsCreateV1(authUserId_2, 'testChannel', false).channelId;
    const channelId_2 = channelsCreateV1(authUserId_2, 'testChannel_2', false).channelId;
    const channelId_3 = channelsCreateV1(authUserId_1, 'testChannel_2', false).channelId;
    expect(channelsListV1(authUserId_2)).toEqual({
      channels: [
        {
          channelId: channelId,
          name: 'testChannel',
        },
        {
          channelId: channelId_2,
          name: 'testChannel_2',
        },
      ],
    });
  });
});

// test Error cases
describe('channelsListV1 Error Test', () => {
  test('Test 1: Invalid authUserID', () => {
    const authUserId_1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId_2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const invalidUserId = (authUserId_1 + authUserId_2) * 2;
    const channelId = channelsCreateV1(authUserId_1, 'testChannel', true).channelId;
    expect(channelsListV1(invalidUserId)).toEqual({ error: expect.any(String) });
  });
});
