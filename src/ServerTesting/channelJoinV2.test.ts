
import { requestAuthRegister, requestChannelDetails, requestChannelsCreate, requestClear, requestChannelJoin } from '../wrappers';

describe('Valid joining sequences', () => {
  let globalOwnerId: number;
  let globalOwnerToken: string;
  let globalChannelId: number;
  let regularOwnerId: number;
  let regularOwnerToken: string;
  let publicChannelId: number;
  let privateChannelId: number;
  let regularUserId: number;
  let regularUserToken: string;

  beforeEach(() => {
    requestClear();
    const globalOwner = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams');
    globalOwnerId = globalOwner.authUserId;
    globalOwnerToken = globalOwner.token;

    globalChannelId = requestChannelsCreate(globalOwnerToken, 'Global Channel', true).channelId;

    const regularOwner = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
    regularOwnerId = regularOwner.authUserId;
    regularOwnerToken = regularOwner.token;

    publicChannelId = requestChannelsCreate(regularOwnerToken, 'Public Channel', true).channelId;
    privateChannelId = requestChannelsCreate(regularOwnerToken, 'Private Channel', false).channelId;

    const regularUser = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
    regularUserId = regularUser.authUserId;
    regularUserToken = regularUser.token;
  });

  test('Global owner joins private channel', () => {
    expect(requestChannelJoin(globalOwnerToken, privateChannelId)).toEqual({});
    expect(requestChannelDetails(globalOwnerToken, privateChannelId)).toEqual({
      name: 'Private Channel',
      isPublic: false,
      ownerMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: globalOwnerId,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Adams',
        handleStr: expect.any(String),
      }]
    });
  });

  test('Regular user joins public channel', () => {
    expect(requestChannelJoin(regularUserToken, publicChannelId)).toEqual({});
    expect(requestChannelDetails(regularUserToken, publicChannelId)).toEqual({
      name: 'Public Channel',
      isPublic: true,
      ownerMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: regularUserId,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      }]
    });
  });
});

describe('InvalId joining sequences', () => {
  let globalOwnerToken: string;
  let regularOwnerId: number;
  let regularOwnerToken: string;
  let publicChannelId: number;
  let privateChannelId: number;
  let regularUserId: number;
  let regularUserToken: string;

  beforeEach(() => {
    requestClear();
    globalOwnerToken = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams').token;

    const regularOwner = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
    regularOwnerId = regularOwner.authUserId;
    regularOwnerToken = regularOwner.token;

    publicChannelId = requestChannelsCreate(regularOwnerToken, 'Public Channel', true).channelId;
    privateChannelId = requestChannelsCreate(regularOwnerToken, 'Private Channel', false).channelId;

    const regularUser = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
    regularUserId = regularUser.authUserId;
    regularUserToken = regularUser.token;
  });

  test('Regular user joins private channel', () => {
    expect(requestChannelJoin(globalOwnerToken, publicChannelId)).toEqual({});
    expect(requestChannelJoin(regularUserToken, privateChannelId)).toEqual({ error: expect.any(String) });
    expect(requestChannelDetails(regularOwnerToken, privateChannelId)).toEqual({
      name: 'Private Channel',
      isPublic: false,
      ownerMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }]
    });
  });

  test('Regular user joins multiple times', () => {
    expect(requestChannelJoin(regularUserToken, publicChannelId)).toEqual({});
    expect(requestChannelJoin(regularUserToken, publicChannelId)).toEqual({ error: expect.any(String) });
    expect(requestChannelDetails(regularUserToken, publicChannelId)).toEqual({
      name: 'Public Channel',
      isPublic: true,
      ownerMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: regularUserId,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      }]
    });
  });

  test('Owner rejoins channel', () => {
    expect(requestChannelJoin(regularOwnerToken, publicChannelId)).toEqual({ error: expect.any(String) });
    expect(requestChannelDetails(regularOwnerToken, publicChannelId)).toEqual({
      name: 'Public Channel',
      isPublic: true,
      ownerMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
    });
  });

  test('InvalId userId', () => {
    expect(requestChannelJoin('abc', publicChannelId)).toEqual({ error: expect.any(String) });
    expect(requestChannelDetails(regularOwnerToken, publicChannelId)).toEqual({
      name: 'Public Channel',
      isPublic: true,
      ownerMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }]
    });
  });

  test('InvalId channelId', () => {
    expect(requestChannelJoin(regularUserToken, publicChannelId + +privateChannelId + 1)).toEqual({ error: expect.any(String) });
    expect(requestChannelDetails(regularOwnerToken, publicChannelId)).toEqual({
      name: 'Public Channel',
      isPublic: true,
      ownerMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: regularOwnerId,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }]
    });
  });
});
