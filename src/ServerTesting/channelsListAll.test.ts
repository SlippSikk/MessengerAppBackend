import request from './../../node_modules/sync-request';
import { port, url } from './../config.json';
import { requestChannelsListAll, requestAuthRegister, requestChannelsCreate, requestClear } from './../wrappers'
import {requestChannelInvite, requestChannelJoin } from './../wrappers'
const SERVER_URL = `${url}:${port}`;





const ERROR = { error: expect.any(String) };

describe('test requestChannelsListAll', () => {
  beforeEach(() => {
    requestClear();
  });

  test('Test for Invalid user ID', () => {
    const token = requestAuthRegister('duck@gmail.com', '123456', 'duck', 'dash').token;
    expect(requestChannelsListAll(token + 1)).toStrictEqual(ERROR);
  });
  test('Test for valid user ID', () => {
    const token = requestAuthRegister('duck@gmail.com', '123456', 'duck', 'dash').token;
    expect(requestChannelsListAll(token)).toStrictEqual({ channels: [] });
  });
  test('Test return value after creating multiple Public channels', () => {
    const token = requestAuthRegister('duck@gmail.com', '123456', 'duck', 'dash').token;
    const firstId = requestChannelsCreate(token, 'first', true).channelId;
    const secondId = requestChannelsCreate(token, 'second', true).channelId;
    const thirdId = requestChannelsCreate(token, 'third', true).channelId;
    expect(requestChannelsListAll(token)).toStrictEqual({
      channels: [
        {
          channelId: firstId,
          name: 'first',
        },
        {
          channelId: secondId,
          name: 'second',
        },
        {
          channelId: thirdId,
          name: 'third',
        },
      ],
    });
  });
  test('Test return value after creating multiple Non Public channels', () => {
    const token = requestAuthRegister('duck@gmail.com', '123456', 'duck', 'dash').token;
    const firstId = requestChannelsCreate(token, 'first', false).channelId;
    const secondId = requestChannelsCreate(token, 'second', false).channelId;
    const thirdId = requestChannelsCreate(token, 'third', false).channelId;
    expect(requestChannelsListAll(token)).toStrictEqual({
      channels: [
        {
          channelId: firstId,
          name: 'first',
        },
        {
          channelId: secondId,
          name: 'second',
        },
        {
          channelId: thirdId,
          name: 'third',
        },
      ],
    });
  });
  test('Test return value after creating multiple mix public channels', () => {
    const token = requestAuthRegister('duck@gmail.com', '123456', 'duck', 'dash').token;
    const firstId = requestChannelsCreate(token, 'first', false).channelId;
    const secondId = requestChannelsCreate(token, 'second', true).channelId;
    const thirdId = requestChannelsCreate(token, 'third', false).channelId;
    expect(requestChannelsListAll(token)).toStrictEqual({
      channels: [
        {
          channelId: firstId,
          name: 'first',
        },
        {
          channelId: secondId,
          name: 'second',
        },
        {
          channelId: thirdId,
          name: 'third',
        },
      ],
    });
  });
  test('test output with channel inv ', () => {
    const token = requestAuthRegister('duck@gmail.com', '123456', 'duck', 'dash').token;
    const token2 = requestAuthRegister('dog@gmail.com', '123456', 'dog', 'drown').token;
    const firstId = requestChannelsCreate(token, 'first', false).channelId;
    const secondId = requestChannelsCreate(token, 'second', true).channelId;
    const thirdId = requestChannelsCreate(token, 'third', false).channelId;
    requestChannelInvite(token, firstId, token2);
    expect(requestChannelsListAll(token)).toStrictEqual({
      channels: [
        {
          channelId: firstId,
          name: 'first',
        },
        {
          channelId: secondId,
          name: 'second',
        },
        {
          channelId: thirdId,
          name: 'third',
        },
      ],
    });
  });
  test('test output with channel inv and channelJoin', () => {
    const token = requestAuthRegister('duck@gmail.com', '123456', 'duck', 'dash').token;
    const token2 = requestAuthRegister('dog@gmail.com', '123456', 'dog', 'drown').token;
    const firstId = requestChannelsCreate(token, 'first', false).channelId;
    const secondId = requestChannelsCreate(token, 'second', true).channelId;
    const thirdId = requestChannelsCreate(token, 'third', true).channelId;
    requestChannelInvite(token, firstId, token2);
    expect(requestChannelsListAll(token2)).toStrictEqual({
      channels: [
        {
          channelId: firstId,
          name: 'first',
        },
        {
          channelId: secondId,
          name: 'second',
        },
        {
          channelId: thirdId,
          name: 'third',
        },
      ],
    });
    requestChannelJoin(token2, thirdId);
    expect(requestChannelsListAll(token2)).toStrictEqual({
      channels: [
        {
          channelId: firstId,
          name: 'first',
        },
        {
          channelId: secondId,
          name: 'second',
        },
        {
          channelId: thirdId,
          name: 'third',
        },
      ],
    });
  });
});