
import { requestAuthRegister, requestClear, requestChannelsCreate, requestChannelMessages, requestMessageSend, requestDmCreate, requestMessageSenddm, requestChannelJoin, requestMessageEdit, requestDmMessages } from '../wrappers';

let authToken1: string;
let authToken2: string;
let authToken3: string;
let authId1: number;
let authId2: number;
let authId3: number;
let channelId1: number;
let messageId1: number;
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
  dmId1 = requestDmCreate(authToken1, [authId2, authId3]).dmId;
  requestMessageSenddm(authToken1, dmId1, 'First DM');
});

describe('Invalid inputs', () => {
  test('New message too long', () => {
    const longString = Array(1001).join('x');
    expect(requestMessageEdit(authToken1, messageId1, longString)).toStrictEqual({ error: expect.any(String) });
    expect(requestMessageEdit(authToken1, dmId1, longString)).toStrictEqual({ error: expect.any(String) });
  });

  test('Valid authUser but invalid messageId/dmID', () => {
    expect(requestMessageEdit(authToken1, messageId1 + 1, 'My new message')).toStrictEqual({ error: expect.any(String) });
    expect(requestMessageEdit(authToken1, dmId1 + 1, 'My new DM')).toStrictEqual({ error: expect.any(String) });
  });

  test('AuthUser did not send message and does not have owner permissions', () => {
    expect(requestMessageEdit(authToken2, messageId1, 'My new message')).toStrictEqual({ error: expect.any(String) });
    expect(requestMessageEdit(authToken2, dmId1, 'My new DM')).toStrictEqual({ error: expect.any(String) });
  });

  test('Invalid token', () => {
    const invalidToken = authToken1 + authToken2 + authToken3;
    expect(requestMessageEdit(invalidToken, messageId1, 'My new message')).toStrictEqual({ error: expect.any(String) });
    expect(requestMessageEdit(invalidToken, dmId1, 'My new DM')).toStrictEqual({ error: expect.any(String) });
  });
});

describe('Valid inputs', () => {
  test('New message', () => {
    const newString = 'New String';
    expect(requestMessageEdit(authToken1, messageId1, newString)).toStrictEqual({});
    expect(requestMessageEdit(authToken1, dmId1, newString)).toStrictEqual({});
    expect(requestChannelMessages(authToken1, channelId1, 0)).toEqual({
      messages: [{
        messageId: messageId1,
        uId: authId1,
        message: newString,
        timeSent: expect.any(Number)
      }],
      start: 0,
      end: -1
    });

    expect(requestDmMessages(authToken1, dmId1, 0)).toEqual({
      messages: [{
        messageId: messageId1,
        uId: authId2,
        message: newString,
        timeSent: expect.any(Number)
      }],
      start: 0,
      end: -1
    });
  });

  test('Delete message', () => {
    const newString = '';
    const messageId2 = requestMessageSend(authToken1, channelId1, 'Second message').messageId;
    requestMessageSenddm(authToken1, dmId1, 'Second DM');
    expect(requestMessageEdit(authToken1, messageId1, newString)).toStrictEqual({});
    expect(requestMessageEdit(authToken1, dmId1, newString)).toStrictEqual({});
    expect(requestChannelMessages(authToken1, channelId1, 0)).toEqual({
      messages: [{
        messageId: messageId2,
        uId: authId1,
        message: 'Second message',
        timeSent: expect.any(Number)
      }],
      start: 0,
      end: -1
    });

    // THIS COULD BE WRONG- DONT RLLY GET DMs
    expect(requestDmMessages(authToken1, dmId1, 0)).toEqual({
      messages: [{
        messageId: messageId1,
        uId: authId2,
        message: 'Second DM',
        timeSent: expect.any(Number)
      }],
      start: 0,
      end: -1
    });
  });
});

