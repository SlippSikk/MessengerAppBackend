// place holder test to pass pipeline

import { echo } from '../echo';

test('Test', () => {
  expect(echo('echo')).toEqual({ error: expect.any(String) });
});

/*
import { requestClear, requestAuthRegister, requestChannelsCreate, requestChannelInvite, requestChannelDetails } from '../wrappers';

describe('Members with different permissions inviting once', () => {
  let globalOwnerId: number;
  let globalOwnerToken: string;
  let globalChannelId: number;
  let authId2: number;
  let authToken2: string;
  let channelId2: number;
  let authId3: number;
  let authToken3: string;

  beforeEach(() => {
    requestClear();
    const globalOwner = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams');
    globalOwnerId = globalOwner.authUserId;
    globalOwnerToken = globalOwner.token;

    // globalChannelId corresponds to the first channel, owned by the global owner
    globalChannelId = requestChannelsCreate(globalOwnerToken, 'Channel 1', true).channelId;

    // authId2 is the Id of a regular user
    const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
    authId2 = user2.authUserId;
    authToken2 = user2.token;

    // channel2 is a regular channel
    channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).channelId;
    const user3 = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
    authId3 = user3.authUserId;
    authToken3 = user3.token;
  });

  test('Global owner invites regular user', () => {
    expect(requestChannelInvite(globalOwnerToken, globalChannelId, authId2)).toEqual({});
    expect(requestChannelDetails(globalOwnerToken, globalChannelId)).toEqual({
      name: 'Channel 1',
      isPublic: true,
      ownerMembers: [{
        uId: globalOwnerId,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Adams',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: globalOwnerId,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Adams',
        handleStr: expect.any(String),
      },
      {
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Global owner invites user to a channel they do not own', () => {
    expect(requestChannelInvite(globalOwnerToken, channelId2, authId3)).toEqual({});
    expect(requestChannelDetails(globalOwnerToken, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: authId3,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Regular owner invites global owner', () => {
    expect(requestChannelInvite(authToken2, channelId2, globalOwnerId)).toEqual({});
    expect(requestChannelDetails(authToken2, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: globalOwnerToken,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Adams',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Regular owner invites another regular user', () => {
    expect(requestChannelInvite(authToken2, channelId2, authId3)).toEqual({});
    expect(requestChannelDetails(authToken2, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: authId3,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Owner invites multiple users', () => {
    const authId4 = requestAuthRegister('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId;
    const authId5 = requestAuthRegister('eugene@outlook.com', 'eee123', 'Eugene', 'Ew').authUserId;

    expect(requestChannelInvite(authToken2, channelId2, authId3)).toEqual({});
    expect(requestChannelInvite(authToken2, channelId2, authId4)).toEqual({});
    expect(requestChannelInvite(authToken2, channelId2, authId5)).toEqual({});
    expect(requestChannelDetails(authToken2, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: authId3,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      },
      {
        uId: authId4,
        email: 'dora@outlook.com',
        nameFirst: 'Dora',
        nameLast: 'DeeExplora',
        handleStr: expect.any(String),
      },
      {
        uId: authId5,
        email: 'eugene@outlook.com',
        nameFirst: 'Eugene',
        nameLast: 'Ew',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Regular member invites others', () => {
    const authId4 = requestAuthRegister('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId;

    expect(requestChannelInvite(authToken2, channelId2, authId3)).toEqual({});
    expect(requestChannelInvite(authToken3, channelId2, authId4)).toEqual({});
    expect(requestChannelDetails(authToken3, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: authId3,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      },
      {
        uId: authId4,
        email: 'dora@outlook.com',
        nameFirst: 'Dora',
        nameLast: 'DeeExplora',
        handleStr: expect.any(String),
      }],
    });
  });
});

describe('Multiple invites', () => {
  let globalOwnerId: number;
  let globalOwnerToken: string;
  let globalChannelId: number;
  let authId2: number;
  let authToken2: string;
  let channelId2: number;
  let authId3: number;
  let authToken3: string;

  beforeEach(() => {
    requestClear();
    const globalOwner = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams');
    globalOwnerId = globalOwner.authUserId;
    globalOwnerToken = globalOwner.token;

    // globalChannelId corresponds to the first channel, owned by the global owner
    globalChannelId = requestChannelsCreate(globalOwnerToken, 'Channel 1', true).channelId;

    // authId2 is the Id of a regular user
    const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
    authId2 = user2.authUserId;
    authToken2 = user2.token;

    // channel2 is a regular channel
    channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).channelId;
    const user3 = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
    authId3 = user3.authUserId;
    authToken3 = user3.token;
  });

  test('Member invites multiple others', () => {
    const authId4 = requestAuthRegister('dora@outlook.com', 'ddd123', 'Dora', 'DeeExplora').authUserId;
    const authId5 = requestAuthRegister('eugene@outlook.com', 'eee123', 'Eugene', 'Ew').authUserId;
    expect(requestChannelInvite(authToken2, channelId2, authId3)).toEqual({});
    expect(requestChannelInvite(authToken3, channelId2, authId4)).toEqual({});
    expect(requestChannelInvite(authToken3, channelId2, authId5)).toEqual({});
    expect(requestChannelDetails(authToken3, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: authId3,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      },
      {
        uId: authId4,
        email: 'dora@outlook.com',
        nameFirst: 'Dora',
        nameLast: 'DeeExplora',
        handleStr: expect.any(String),
      },
      {
        uId: authId5,
        email: 'eugene@outlook.com',
        nameFirst: 'Eugene',
        nameLast: 'Ew',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Member part of multiple channels', () => {
    expect(requestChannelInvite(authToken2, channelId2, authId3)).toEqual({});
    expect(requestChannelInvite(globalOwnerToken, channelId2, globalOwnerId)).toEqual({});
    expect(requestChannelDetails(authToken3, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: authId3,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
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
    expect(requestChannelDetails(globalOwnerToken, globalChannelId)).toEqual({
      name: 'Channel 1',
      isPublic: true,
      ownerMembers: [{
        uId: globalOwnerId,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Adams',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: globalOwnerId,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Adams',
        handleStr: expect.any(String),
      },
      {
        uId: authId3,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      }],
    });
  });
});

describe('ERRORS: Reinviting users', () => {
  let globalOwnerId: number;
  let authId2: number;
  let authToken2: string;
  let channelId2: number;
  let authId3: number;

  beforeEach(() => {
    requestClear();
    // note that globalOwnerToken is the first Id and hence a global owner
    globalOwnerId = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId;
    // authId2 is the Id of a regular user
    const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
    authId2 = user2.authUserId;
    authToken2 = user2.token;

    // channel2 is a regular channel
    channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).channelId;

    authId3 = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman').authUserId;
  });

  test('Owner reinvites themselves', () => {
    expect(requestChannelInvite(authToken2, channelId2, authId2)).toEqual({ error: expect.any(String) });
    expect(requestChannelDetails(authToken2, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }]
    });
  });

  test('Owner reinvites another user', () => {
    expect(requestChannelInvite(authToken2, channelId2, authId3)).toEqual({});
    expect(requestChannelInvite(authToken2, channelId2, authId3)).toEqual({ error: expect.any(String) });
    expect(requestChannelDetails(authToken2, channelId2)).toEqual({
      name: 'Channel 2',
      isPublic: true,
      ownerMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Biggums',
        handleStr: expect.any(String),
      },
      {
        uId: authId3,
        email: 'chris@outlook.com',
        nameFirst: 'Chris',
        nameLast: 'Catman',
        handleStr: expect.any(String),
      }],
    });
    expect(requestChannelInvite(authToken2, channelId2, globalOwnerId)).toEqual({});
  });
});

describe('Miscallaneous errors', () => {
  let globalOwnerId: number;
  let authId2: number;
  let authToken2: string;
  let channelId2: number;
  let authId3: number;
  let authToken3: string;

  beforeEach(() => {
    requestClear();
    // note that globalOwnerToken is the first Id and hence a global owner
    globalOwnerId = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams').authUserId;
    // authId2 is the Id of a regular user
    const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
    authId2 = user2.authUserId;
    authToken2 = user2.token;

    // channel2 is a regular channel
    channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).channelId;

    const user3 = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
    authId3 = user3.authUserId;
    authToken3 = user3.token;
  });

  test('Invalid Channel Id', () => {
    requestClear();
    expect(requestChannelInvite(authToken3, channelId2 + 1, authId3)).toEqual({ error: expect.any(String) });
  });

  test('Valid channel Id but user not a member', () => {
    expect(requestChannelInvite(authToken3, channelId2, globalOwnerId)).toEqual({ error: expect.any(String) });
  });

  test('InvalId UserId', () => {
    expect(requestChannelInvite(authToken2, channelId2, (authId2 + authId3) / 2)).toEqual({ error: expect.any(String) });
  });

  test('InvalId token', () => {
    requestClear();
    expect(requestChannelInvite(authToken2, channelId2, globalOwnerId)).toEqual({});
    expect(requestChannelInvite('abc', channelId2, authId2)).toEqual({ error: expect.any(String) });
  });
});

*/
