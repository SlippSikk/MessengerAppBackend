
import { requestAuthRegister, requestClear, requestChannelsCreate, requestChannelAddowner, requestChannelJoin, requestChannelRemoveOwner, requestChannelDetails } from '../wrappers';

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

  channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).channelId;
  requestChannelJoin(authToken2, channelId1);
  requestChannelAddowner(authToken1, channelId1, authId1);
  requestChannelJoin(authToken3, channelId1);

  channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).channelId;
  requestChannelJoin(authToken3, channelId2);
  // Channel1: [Owners: authId1, authId2], [Members: authId1, authId2, authId3]
  // Channel2: [Owners: authId2], [Members: authId2, authId3]
});

describe('Invalid Inputs', () => {
  test('Invalid channelId', () => {
    expect(requestChannelRemoveOwner(authToken1, (channelId1 ** 2 + channelId2 ** 2) / 2, authId2)).toEqual({ error: expect.any(String) });
  });

  test('Invalid uId', () => {
    expect(requestChannelRemoveOwner(authToken1, channelId1, authId1 ** 2 + authId2 ** 2 + authId3 ** 2)).toEqual({ error: expect.any(String) });
  });

  test('uId is not already an owner', () => {
    expect(requestChannelRemoveOwner(authToken1, channelId1, authId3)).toEqual({ error: expect.any(String) });
  });

  test('uId is the only owner', () => {
    expect(requestChannelRemoveOwner(authToken2, channelId2, authId2)).toEqual({ error: expect.any(String) });
  });

  test('Valid channelId but authUser does not have owner permissions', () => {
    expect(requestChannelRemoveOwner(authToken3, channelId1, authId2)).toEqual({ error: expect.any(String) });
  });

  test('Invalid token', () => {
    expect(requestChannelRemoveOwner(authToken1 + authToken2 + authToken3, channelId1, 0)).toEqual({ error: expect.any(String) });
  });
});

describe('Valid Inputs', () => {
  test('Owner removes self', () => {
    expect(requestChannelRemoveOwner(authToken2, channelId1, authId2)).toEqual({});
    expect(requestChannelDetails(authToken1, channelId1)).toEqual({
      name: 'Channel 1',
      isPublic: true,
      ownerMembers: [authId1],
      allMembers: [authId1, authId2, authId3]
    });
  });

  test('Global owner removes another in a channel they are not in', () => {
    requestChannelAddowner(authToken3, channelId2, authId3);
    expect(requestChannelRemoveOwner(authToken1, channelId2, authId2)).toEqual({});
    expect(requestChannelDetails(authToken1, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [authId3],
      allMembers: [authId2, authId3]
    });
  });

  test('Owner removes other', () => {
    expect(requestChannelRemoveOwner(authToken1, channelId1, authId2)).toEqual({});
    expect(requestChannelDetails(authToken1, channelId1)).toEqual({
      name: 'Channel 1',
      isPublic: true,
      ownerMembers: [authId1],
      allMembers: [authId1, authId2, authId3]
    });
  });
});

