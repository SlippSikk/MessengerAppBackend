test('PlaceHolder', () => {
    expect(1 + 1).toStrictEqual(2);
  });

/*
import request, { HttpVerb } from 'sync-request';

import { port, url } from '../config.json';

const SERVER_URL = `${url}:${port}`;
const ERROR = { error: expect.any(String) };

function requestHelper(method: HttpVerb, path: string, payload: object) {
  let qs = {};
  let json = {};
  if (['GET', 'DELETE'].includes(method)) {
    qs = payload;
  } else {
    // PUT/POST
    json = payload;
  }
  const res = request(method, SERVER_URL + path, { qs, json, timeout: 20000 });
  return JSON.parse(res.getBody('utf-8'));
}

function requestClear() {
  return requestHelper('DELETE', '/clear/v1', {});
}

function requestRegister(email: string, password: string, nameFirst: string, nameLast: string) {
  return requestHelper('POST', '/auth/register/v2', {email,password,nameFirst,nameLast});
}

function requestUserAllV1(token: string) {
  return requestHelper('GET', '/users/all/v1', { token });
}

describe('correct return value', () => {
  test('correct return value', () => {
    expect(requestClear()).toStrictEqual({});
  });
  test('delete all users', () => {
    const registerObjectA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    const registerObjectB = requestRegister('csgogo@gmail.com', 'counterStrike2', 'john', 'cena');
    requestClear()
    const registerObjectC = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    expect(requestUserAllV1(registerObjectA.token)).toStrictEqual({users:[
      {
        uId:registerObjectC.authUserId, 
        email:'csgo@gmail.com', 
        nameFirst:'Ab', 
        nameLast:'CDE', 
        handleStr:'abcde'
    }
    ]})
  });
});


/*  old version
import { clearV1 } from '../other.js';

import { authRegisterV1 } from '../auth.js';

import { channelsCreateV1, channelsListAllV1 } from './../channels.js';

import { channelJoinV1 } from './../channel.js';

import { userProfileV1 } from '../users.js';
describe('three tests', () => {
  test('Empty dataStore object', () => {
    const authId1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;
    expect(clearV1()).toStrictEqual({});
    expect(channelsListAllV1(authId1)).toStrictEqual({ error: expect.any(String) });
    expect(userProfileV1(authId1, authId1)).toStrictEqual({ error: expect.any(String) });
  });

  test('clear the userMember', () => {
    const authId1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;
    const channelId1 = channelsCreateV1(authId1, 'Channel 1', true).channelId;
    const authId2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui').authUserId;
    const authId3 = authRegisterV1('lion@qq.com', 'asduif8195', 'agsdfoj', 'antman').authUserId;

    channelJoinV1(authId1, channelId1);
    expect(userProfileV1(authId2, authId2)).toEqual({
      user: {
        uId: authId2,
        email: 'Ina@outlook.com',
        nameFirst: 'me',
        nameLast: 'vasdui',
        handleStr: 'mevasdui',
      }
    });
    clearV1();
    expect(userProfileV1(authId2, authId3)).toStrictEqual({ error: expect.any(String) });
    expect(channelsListAllV1(authId1)).toStrictEqual({ error: expect.any(String) });
  });

  test('clear all channels', () => {
    const authId1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;
    const channelId1 = channelsCreateV1(authId1, 'Channel 1', true).channelId;
    channelJoinV1(authId1, channelId1);
    expect(channelsListAllV1(authId1)).toStrictEqual({
      channels: [{
        channelId: authId1,
        name: 'Channel 1',
      }]
    });

    clearV1();
    expect(channelsListAllV1(authId1)).toStrictEqual({ error: expect.any(String) });
    expect(userProfileV1(authId1, authId1)).toStrictEqual({ error: expect.any(String) });
  });
});
*/