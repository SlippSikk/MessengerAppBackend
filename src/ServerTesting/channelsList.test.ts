import request from './../../node_modules/sync-request';
import { port, url } from './../config.json';
import { requestChannelsList, requestChannelsCreate, requestClear, requestAuthRegister} from './../wrappers'
import {requestChannelInvite, requestChannelJoin } from './../wrappers'
const SERVER_URL = `${url}:${port}`;

beforeEach(() => {
    requestClear();
  });
  
  // test Success cases
  describe('channelsListV2 Success Test', () => {
    test('Test 1', () => {
      const authtoken1 = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authtoken;
      const authtoken2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authtoken;
      const channelId = requestChannelsCreate(authtoken1, 'testChannel', true).channelId;
      requestChannelInvite(authtoken1, channelId, authtoken2);
      requestChannelJoin(authtoken2, channelId);
      expect(requestChannelsList(authtoken2)).toEqual({
        channels: [
          {
            channelId: channelId,
            name: 'testChannel',
          }
        ],
      });
    });
  
    test('Test 2', () => {
      const authtoken1 = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authtoken;
      const authtoken2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authtoken;
      const authtoken3 = requestAuthRegister('john.saul@gmail.com', 'john123', 'John', 'Saul').authtoken;
      const channelId = requestChannelsCreate(authtoken1, 'testChannel', true).channelId;
      requestChannelInvite(authtoken1, channelId, authtoken2);
      requestChannelJoin(authtoken2, channelId);
      expect(requestChannelsList(authtoken3)).toEqual({
        channels: [],
      });
    });
  
    test('Test 3', () => {
      const authtoken1 = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authtoken;
      const authtoken2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authtoken;
      const channelId = requestChannelsCreate(authtoken1, 'testChannel', false).channelId;
      requestChannelInvite(authtoken1, channelId, authtoken2);
      requestChannelJoin(authtoken2, channelId);
      expect(requestChannelsList(authtoken2)).toEqual({
        channels: [
          {
            channelId: channelId,
            name: 'testChannel',
          },
        ],
      });
    });
  
    test('Test 4', () => {
      const authtoken2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authtoken;
      const channelId = requestChannelsCreate(authtoken2, 'testChannel', false).channelId;
      const channelId2 = requestChannelsCreate(authtoken2, 'testChannel_2', false).channelId;
      expect(requestChannelsList(authtoken2)).toEqual({
        channels: [
          {
            channelId: channelId,
            name: 'testChannel',
          },
          {
            channelId: channelId2,
            name: 'testChannel_2',
          },
        ],
      });
    });
  
    test('Test 5', () => {
      const authtoken2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authtoken;
      const channelId = requestChannelsCreate(authtoken2, 'testChannel', false).channelId;
      const channelId2 = requestChannelsCreate(authtoken2, 'testChannel_2', false).channelId;
      expect(requestChannelsList(authtoken2)).toEqual({
        channels: [
          {
            channelId: channelId,
            name: 'testChannel',
          },
          {
            channelId: channelId2,
            name: 'testChannel_2',
          },
        ],
      });
    });
  });
  
  // test Error cases
  describe('channelsListV2 Error Test', () => {
    test('Test 1: Invalid authtoken', () => {
      const authtoken1 = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').authtoken;
      const authtoken2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').authtoken;
      const invalidtoken = authtoken1 + authtoken2;
      expect(requestChannelsList(invalidtoken)).toEqual({ error: expect.any(String) });
    });
  });