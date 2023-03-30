import { echo } from '../echo';

test('Test', () => {
  expect(echo('echo')).toEqual({ error: expect.any(String) });
});

/*
import { requestAuthRegister, requestClear, requestChannelsCreate, requestChannelMessages, requestMessageSend } from '../wrappers';

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

  channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).channelId;
  channelId2 = requestChannelsCreate(authToken2, 'Channel 2', true).channelId;
  channelId3 = requestChannelsCreate(authToken3, 'Channel 3', false).channelId;
});

describe('Incorrect input', () => {
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
  test('No messages sent', () => {
    expect(requestChannelMessages(authToken3, channelId3, 0)).toEqual({
      messages: [],
      start: 0,
      end: -1
    });
  });

  test('Single Message', () => {
    requestMessageSend(authToken3, channelId3, 'My first message!');
    expect(requestChannelMessages(authToken2, channelId2, 0)).toEqual({
      messages: ['My first message!'],
      start: 0,
      end: -1
    });
  });

  test('Start is not at index 0', () => {
    requestMessageSend(authToken2, channelId2, 'My first message!');
    requestMessageSend(authToken2, channelId2, 'My second message!');
    requestMessageSend(authToken2, channelId2, 'My third message!');
    expect(requestChannelMessages(authToken2, channelId2, 1)).toEqual({
      messages: ['My second message!', 'My third message!'],
      start: 1,
      end: -1
    });
  });

  test('Over 50 messages', () => {
    // generates 50 messages and pushes to an array: ['0', '1', '2', etc...]
    const messages: string[] = [];
    for (let i = 0; i < 55; i++) {
      const currentMessage = i.toString();
      messages.push(currentMessage);
      requestMessageSend(authToken1, channelId1, currentMessage);
    }

    expect(requestChannelMessages(authToken1, channelId2, 0)).toEqual({
      messages: messages.slice(0, 50),
      start: 0,
      end: 50
    });
  });
});
/*