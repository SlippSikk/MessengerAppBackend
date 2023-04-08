import { requestAuthRegister, requestClear, requestChannelsCreate, requestChannelMessages, requestMessageSend } from '../wrappers';
import { messages } from '../interfaces';

describe('Incorrect input', () => {
  let authToken1: string;
  let authToken2: string;
  let authToken3: string;
  let channelId1: number;
  let channelId2: number;
  let channelId3: number;

  beforeEach(() => {
    requestClear();
    authToken1 = requestAuthRegister('gura@gmail.com', '114514810', 'huaizhi', 'li').token;
    authToken2 = requestAuthRegister('Ina@outlook.com', 'asdgf8', 'me', 'vasdui').token;
    authToken3 = requestAuthRegister('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase').token;

    channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).body.channelId;
    channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).body.channelId;
    channelId3 = requestChannelsCreate(authToken3, 'Channel 3', false).body.channelId;
  });
  test('Invalid token', () => {
    // concatenates all token strings together, to guarantee an invalid token
    expect(requestChannelMessages(authToken1 + authToken2 + authToken3, channelId1, 0)).toStrictEqual({ error: expect.any(String) });
  });
  test('Start that greater than the total number of messages', () => {
    expect(requestChannelMessages(authToken1, channelId1, 250)).toStrictEqual({ error: expect.any(String) });
  });
  test('Invalid channelId', () => {
    expect(requestChannelMessages(authToken1, channelId1 + channelId2 + channelId3, 0)).toStrictEqual({ error: expect.any(String) });
  });
  test('ChannelId is valid but the authorised user is not a member of the channel', () => {
    expect(requestChannelMessages(authToken1, channelId1 + channelId2 + channelId3, 0)).toStrictEqual({ error: expect.any(String) });
  });
  test('Invalid channelId and token ', () => {
    expect(requestChannelMessages(authToken1 + authToken2 + authToken3, channelId1 + channelId2 + channelId3, 0)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('Correct input', () => {
  let authToken1: string;
  let authId1: number;
  let authToken2: string;
  let authId2: number;
  let authToken3: string;
  let authId3: number;
  let channelId1: number;
  let channelId2: number;
  let channelId3: number;

  beforeEach(() => {
    requestClear();
    const user1 = requestAuthRegister('gura@gmail.com', '114514810', 'huaizhi', 'li');
    authToken1 = user1.token;
    authId1 = user1.authUserId;
    const user2 = requestAuthRegister('Ina@outlook.com', 'asdgf8', 'me', 'vasdui');
    authToken2 = user2.token;
    authId2 = user2.authUserId;
    const user3 = requestAuthRegister('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase');
    authToken3 = user3.token;
    authId3 = user3.authUserId;

    channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).body.channelId;
    channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).body.channelId;
    channelId3 = requestChannelsCreate(authToken3, 'Channel 3', false).body.channelId;
  });

  test('No messages sent', () => {
    expect(requestChannelMessages(authToken3, channelId3, 0)).toEqual({
      messages: [],
      start: 0,
      end: -1
    });
  });

  test('Single Message', () => {
    const messageId: number = requestMessageSend(authToken3, channelId3, 'My first message!').messageId;
    expect(requestChannelMessages(authToken3, channelId3, 0)).toEqual({
      messages: [{
        messageId: messageId,
        uId: authId3,
        message: 'My first message!',
        timeSent: expect.any(Number)
      }],
      start: 0,
      end: -1
    });
  });

  test('Start is not at index 0', () => {
    requestMessageSend(authToken2, channelId2, 'My first message!');
    const messageId2 = requestMessageSend(authToken2, channelId2, 'My second message!').messageId;
    const messageId3 = requestMessageSend(authToken2, channelId2, 'My third message!').messageId;
    expect(requestChannelMessages(authToken2, channelId2, 1)).toEqual({
      messages: [{
        messageId: messageId2,
        uId: authId2,
        message: 'My second message!',
        timeSent: expect.any(Number)
      },
      {
        messageId: messageId3,
        uId: authId2,
        message: 'My third message!',
        timeSent: expect.any(Number)
      }],
      start: 1,
      end: -1
    });
  });

  test('Over 50 messages', () => {
    // generates 50 messages and pushes to an array: ['0', '1', '2', etc...]
    const messages: messages[] = [];
    for (let i = 0; i < 55; i++) {
      const currentMessage = i.toString();
      const messageId: number = requestMessageSend(authToken1, channelId1, currentMessage).messageId;

      messages.push({
        messageId: messageId,
        uId: authId1,
        message: currentMessage,
        timeSent: expect.any(Number)
      });
    }

    expect(requestChannelMessages(authToken1, channelId1, 0)).toEqual({
      messages: messages.slice(0, 50),
      start: 0,
      end: 50
    });
  });
});
