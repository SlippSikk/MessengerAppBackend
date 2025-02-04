import { requestAuthRegister, requestPermissionChange, requestClear, requestChannelsCreate, requestChannelAddowner, requestChannelJoin, requestChannelRemoveOwner, requestChannelDetails, requestChanLeavenel } from '../wrappers';
const INPUT_ERROR = 400;
const AUTH_ERROR = 403;

// WHEN CHRISTOPHER DONE NEED TO ADD .BODY TO CHANNELDETAILS

describe('Valid Inputs', () => {
  let authId1: number;
  let authId2: number;
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

    authToken3 = requestAuthRegister('claire@gmail.com', 'ccc123', 'Claire', 'Christopher').token;

    channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).body.channelId;
    requestChannelJoin(authToken2, channelId1);
    requestChannelAddowner(authToken1, channelId1, authId2);

    channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).body.channelId;
    requestChannelJoin(authToken3, channelId2);
    // Channel1: [Owners: authId1, authId2], [Members: authId1, authId2]
    // Channel2: [Owners: authId2], [Members: authId2, authId3]
  });

  test('Owner removes self', () => {
    expect(requestChannelRemoveOwner(authToken2, channelId1, authId2).body).toEqual({});
    expect(requestChannelDetails(authToken1, channelId1).body).toEqual({
      name: 'Channel 1',
      isPublic: true,
      ownerMembers: [{
        uId: authId1,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Albert',
        handleStr: expect.any(String),
      },
      ],
      allMembers: [{
        uId: authId1,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Albert',
        handleStr: expect.any(String),
      },
      {
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Baqaie',
        handleStr: expect.any(String),
      },
      ]
    });
  });

  test('Owner removes other', () => {
    expect(requestChannelRemoveOwner(authToken1, channelId1, authId2).body).toEqual({});
    expect(requestChannelDetails(authToken1, channelId1).body).toEqual({
      name: 'Channel 1',
      isPublic: true,
      ownerMembers: [{
        uId: authId1,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Albert',
        handleStr: expect.any(String),
      },
      ],
      allMembers: [{
        uId: authId1,
        email: 'anna@gmail.com',
        nameFirst: 'Anna',
        nameLast: 'Albert',
        handleStr: expect.any(String),
      },
      {
        uId: authId2,
        email: 'bob@outlook.com',
        nameFirst: 'Bob',
        nameLast: 'Baqaie',
        handleStr: expect.any(String),
      },
      ]
    });
  });

  describe('Invalid Inputs', () => {
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
      requestChannelJoin(authToken3, channelId1);

      channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).body.channelId;
      requestChannelJoin(authToken3, channelId2);
      // Channel1: [Owners: authId1, authId2], [Members: authId1, authId2, authId3]
      // Channel2: [Owners: authId2], [Members: authId2, authId3]
    });

    test('Invalid channelId', () => {
      expect(requestChannelRemoveOwner(authToken1, (channelId1 ** 2 + channelId2 ** 2) / 2, authId2).statusCode).toBe(INPUT_ERROR);
    });

    test('Invalid uId', () => {
      expect(requestChannelRemoveOwner(authToken1, channelId1, authId1 ** 2 + authId2 ** 2 + authId3 ** 2).statusCode).toBe(INPUT_ERROR);
    });

    test('uId is not already an owner', () => {
      expect(requestChannelRemoveOwner(authToken1, channelId1, authId3).statusCode).toBe(INPUT_ERROR);
    });

    test('uId is the only owner', () => {
      expect(requestChannelRemoveOwner(authToken2, channelId2, authId2).statusCode).toBe(INPUT_ERROR);
    });

    test('Valid channelId but authUser does not have owner permissions', () => {
      expect(requestChannelRemoveOwner(authToken3, channelId1, authId2).statusCode).toBe(AUTH_ERROR);
    });

    test('Invalid token', () => {
      expect(requestChannelRemoveOwner(authToken1 + authToken2 + authToken3, channelId1, 0).statusCode).toBe(AUTH_ERROR);
    });
  });
});

describe('Owner permission test', () => {
  requestClear();
  beforeEach(() => {
    requestClear();
  }); // beforeEach does't work again haha
  test('global owner(not the channel owner)have the same permission to remove himself as channel owner', () => {
    requestClear();
    const registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
    const registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
    const registered3 = requestAuthRegister('dog@gmail.com', 'doggy123', 'dog', 'drown');
    const channelId1 = requestChannelsCreate(registered1.token, 'nest', true).body.channelId;
    requestPermissionChange(registered1.token, registered2.authUserId, 1);
    requestChannelJoin(registered3.token, channelId1);
    requestChannelJoin(registered2.token, channelId1);
    expect(requestChannelAddowner(registered2.token, channelId1, registered2.authUserId).body).toStrictEqual({});
    expect(requestChannelRemoveOwner(registered2.token, channelId1, registered2.authUserId).body).toStrictEqual({});
  });
  test('global owner is not in the list of owner', () => {
    requestClear();
    const registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
    const registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
    const registered3 = requestAuthRegister('dog@gmail.com', 'doggy123', 'dog', 'drown');
    const channelId1 = requestChannelsCreate(registered1.token, 'nest', true).body.channelId;
    requestPermissionChange(registered1.token, registered2.authUserId, 1);
    requestChannelJoin(registered3.token, channelId1);
    requestChannelJoin(registered2.token, channelId1);
    expect(requestChannelRemoveOwner(registered1.token, channelId1, registered2.authUserId).statusCode).toBe(400);
  });
  test('global owner leave the channel and see if he dont have owner permission to remove others anymore', () => {
    requestClear();
    const registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
    const registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
    const registered3 = requestAuthRegister('dog@gmail.com', 'doggy123', 'dog', 'drown');
    const channelId1 = requestChannelsCreate(registered1.token, 'nest', true).body.channelId;
    requestPermissionChange(registered1.token, registered2.authUserId, 1);
    requestChannelJoin(registered3.token, channelId1);
    requestChannelJoin(registered2.token, channelId1);
    expect(requestChannelAddowner(registered2.token, channelId1, registered2.authUserId).body).toStrictEqual({});
    expect(requestChannelAddowner(registered2.token, channelId1, registered3.authUserId).body).toStrictEqual({});
    requestChanLeavenel(registered2.token, channelId1);
    expect(requestChanLeavenel(registered2.token, channelId1).statusCode).toStrictEqual(403);
    expect(requestChannelRemoveOwner(registered2.token, channelId1, registered3.authUserId).statusCode).toStrictEqual(403);
  });
});
