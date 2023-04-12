import { requestPermissionChange } from '../XujiWrap'
import { requestAuthRegister, requestClear, requestChannelsCreate, requestChannelAddowner, requestChannelJoin, requestChannelDetails } from '../wrappers';
import {userIndexUid,isGlobalOwnerFromToken,getPermissionIdFromUid,isGlobalOwnerFromUid} from '../helper'
describe('test only for changePermission', () => {
  let authId1: number;
  let authId2: number;
  let authId3: number;
  let authToken1: string;
  let authToken2: string;
  let authToken3: string;
  let channelId1: number;
  let channelId2: number;

  beforeEach(() => {
    requestClear();
    const user1 = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Albert');
    authId1 = user1.authUserId;
    authToken1 = user1.token;

    const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Baqaie');
    authId2 = user2.authUserId;
    authToken2 = user2.token;

    const user3 = requestAuthRegister('claire@gmail.com', 'ccc123', 'Claire', 'Christopher');
    authId3 = user3.authUserId;
    authToken3 = user3.token;

    channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).body.channelId;
    requestChannelJoin(authToken2, channelId1);
    requestChannelAddowner(authToken1, channelId1, authId2);

    channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).body.channelId;
    requestChannelJoin(authToken3, channelId2);
    // Channel1: [Owners: authId1, authId2], [Members: authId1, authId2]
    // Channel2: [Owners: authId2], [Members: authId2, authId3]
  });

  test('Backstab: The initial global owner upgrade a member perimission and then he downgrade the ex-owner ', () => {
    expect(requestPermissionChange(authToken1, authId2, 1).body).toEqual({});
    expect(requestPermissionChange(authToken2, authId1, 2).body).toEqual({});
    expect(requestPermissionChange(authToken1, authId2, 2).statusCode).toBe(403);
  });
  
  describe('test only about register and permission ', () => {
    let authId1: number;
    let authId2: number;
    let authId3: number;
    let authToken1: string;
    let authToken2: string;
    let authToken3: string;
    let channelId1: number;
    let channelId2: number;
    let authPId1: number;
    let authPId2: number;
    beforeEach(() => {
      requestClear();
      const user1 = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Albert');
      authId1 = user1.authUserId;
      authToken1 = user1.token;
      authPId1 = user1.permissionId

      const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Baqaie');
      authId2 = user2.authUserId;
      authToken2 = user2.token;
      authPId2 = user2.permissionId

      const user3 = requestAuthRegister('claire@gmail.com', 'ccc123', 'Claire', 'Christopher');
      authId3 = user3.authUserId;
      authToken3 = user3.token;

      channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).body.channelId;
      requestChannelJoin(authToken2, channelId1);
      requestChannelAddowner(authToken1, channelId1, authId2);
      requestChannelJoin(authToken3, channelId1);

      channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).body.channelId;
      requestChannelJoin(authToken3, channelId2);
      // Channel1: [Owners: authId1, authId2], [Members: authId1, authId2, authId3]
      // Channel2: [Owners: authId2], [Members: authId2, authId3]
    });

    test('Invalid uId', () => {
      expect(requestPermissionChange(authToken1, (authId1  + authId2 + authId3), 1).statusCode).toBe(400);
    });

    test('Invalid token', () => {
      expect(requestPermissionChange(authToken1 + authToken2 + authToken3, authId2, 1).statusCode).toBe(403);
    });

    test('uId already have permissionId 2', () => {
      expect(requestPermissionChange(authToken1, authId2, 2).statusCode).toBe(400);
    });

    test('uId already have permissionId1', () => {
      expect(requestPermissionChange(authToken1, authId2, 1).body).toEqual({});
      expect(requestPermissionChange(authToken2, authId1, 1).statusCode).toBe(400);
    });
    test('global owner try to demoted himself to a user', () => {
      expect(requestPermissionChange(authToken1, authId2, 1).body).toEqual({});
      expect(requestPermissionChange(authToken1, authId1, 2).statusCode).toBe(400);
    });
    test('only global owner try to demoted himself to a user', () => {
      expect(requestPermissionChange(authToken1, authId1, 2).statusCode).toBe(400);
    });

    test('Invalid permissionId', () => {
      expect(requestPermissionChange(authToken1, authId2, authPId1 + authPId2 ).statusCode).toBe(400);
    });
  });
});


