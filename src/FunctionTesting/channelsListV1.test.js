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
    const authUserId1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const channelId = channelsCreateV1(authUserId1, 'testChannel', true).channelId;
    channelInviteV1(authUserId1, channelId, authUserId2);
    channelJoinV1(authUserId2, channelId);
    expect(channelsListV1(authUserId2)).toEqual({
      channels: [
        {
          channelId: channelId,
          name: 'testChannel',
        }
      ],
    });
  });

  test('Test 2', () => {
    const authUserId1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const authUserId3 = authRegisterV1('john.saul@gmail.com', 'john123', 'John', 'Saul').authUserId;
    const channelId = channelsCreateV1(authUserId1, 'testChannel', true).channelId;
    channelInviteV1(authUserId1, channelId, authUserId2);
    channelJoinV1(authUserId2, channelId);
    expect(channelsListV1(authUserId3)).toEqual({
      channels: [],
    });
  });

  test('Test 3', () => {
    const authUserId1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const channelId = channelsCreateV1(authUserId1, 'testChannel', false).channelId;
    channelInviteV1(authUserId1, channelId, authUserId2);
    channelJoinV1(authUserId2, channelId);
    expect(channelsListV1(authUserId2)).toEqual({
      channels: [
        {
          channelId: channelId,
          name: 'testChannel',
        },
      ],
    });
  });

  test('Test 4', () => {
    const authUserId2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const channelId = channelsCreateV1(authUserId2, 'testChannel', false).channelId;
    const channelId2 = channelsCreateV1(authUserId2, 'testChannel_2', false).channelId;
    expect(channelsListV1(authUserId2)).toEqual({
      channels: [
        {
          channelId: channelId,
          name: 'testChannel',
        },
        {
          channelId: channelId2,
          name: 'testChannel_2',
        },
      ],
    });
  });

  test('Test 5', () => {
    const authUserId2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const channelId = channelsCreateV1(authUserId2, 'testChannel', false).channelId;
    const channelId2 = channelsCreateV1(authUserId2, 'testChannel_2', false).channelId;
    expect(channelsListV1(authUserId2)).toEqual({
      channels: [
        {
          channelId: channelId,
          name: 'testChannel',
        },
        {
          channelId: channelId2,
          name: 'testChannel_2',
        },
      ],
    });
  });
});

// test Error cases
describe('channelsListV1 Error Test', () => {
  test('Test 1: Invalid authUserID', () => {
    const authUserId1 = authRegisterV1('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authUserId;
    const authUserId2 = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authUserId;
    const invalidUserId = (authUserId1 + authUserId2) * 2;
    expect(channelsListV1(invalidUserId)).toEqual({ error: expect.any(String) });
  });
});
