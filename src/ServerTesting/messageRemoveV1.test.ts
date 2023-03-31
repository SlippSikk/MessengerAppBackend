
import { requestAuthRegister, requestClear, requestChannelsCreate, requestChannelMessages, requestMessageSend, requestDmCreate, requestMessageSenddm, requestChannelJoin, requestMessageRemove, requestDmMessages } from '../wrappers';

let authToken1: string;
let authToken2: string;
let authToken3: string;
let authId1: number;
let authId2: number;
let authId3: number;
let channelId1: number;
let messageId1: number;
let messageId2: number;
let messageId3: number;
let dmId1: number;

beforeEach(() => {
  requestClear();
  const user1 = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Albert');
  authToken1 = user1.token;
  authId1 = user1.authUserId;

  const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Billington');
  authToken2 = user2.token;
  authId2 = user2.authUserId;

  const user3 = requestAuthRegister('claire@gmail.com', 'ccc123', 'Claire', 'Cucumber');
  authToken3 = user3.token;
  authId3 = user3.authUserId;

  channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).channelId;
  requestChannelJoin(authToken2, channelId1);
  requestChannelJoin(authToken3, channelId1);
  messageId1 = requestMessageSend(authToken1, channelId1, 'First message').messageId;
  messageId2 = requestMessageSend(authToken2, channelId1, 'Second message').messageId;
  messageId3 = requestMessageSend(authToken1, channelId1, 'Third message').messageId;
  dmId1 = requestDmCreate(authToken1, [authId2, authId3]).dmId;
  requestMessageSenddm(authToken1, dmId1, 'First DM');
  requestMessageSenddm(authToken1, dmId1, 'Second DM');
});

describe('Invalid inputs', () => {
  test('Valid authUser but invalid messageId/dmID', () => {
    expect(requestMessageRemove(authToken1, messageId1 ** 2 + messageId2 ** 2 + messageId3 ** 2)).toStrictEqual({ error: expect.any(String) });
    expect(requestMessageRemove(authToken1, dmId1 + 1)).toStrictEqual({ error: expect.any(String) });
  });

  test('AuthUser did not send message and does not have owner permissions', () => {
    expect(requestMessageRemove(authToken2, messageId1)).toStrictEqual({ error: expect.any(String) });
    expect(requestMessageRemove(authToken2, dmId1)).toStrictEqual({ error: expect.any(String) });
  });

  test('Invalid token', () => {
    const invalidToken = authToken1 + authToken2 + authToken3;
    expect(requestMessageRemove(invalidToken, messageId1)).toStrictEqual({ error: expect.any(String) });
    expect(requestMessageRemove(invalidToken, dmId1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('Valid inputs', () => {
  test('Remove channel message', () => {
    expect(requestMessageRemove(authToken1, messageId2)).toStrictEqual({});
    expect(requestChannelMessages(authToken1, channelId1, 0)).toEqual({
      messages: [{
        messageId: messageId1,
        uId: authId1,
        message: 'First message',
        timeSent: expect.any(Number)
      },
      {
        messageId: messageId3,
        uId: authId1,
        message: 'Third message',
        timeSent: expect.any(Number)
      }],
      start: 0,
      end: -1
    });
  });

  test('Remove DM message', () => {
    expect(requestMessageRemove(authToken1, dmId1)).toStrictEqual({});
    // whole DM deleted so dmID1 no longer exists
    expect(requestDmMessages(authToken1, dmId1, 0)).toEqual({ error: expect.any(String) });
  });
});

