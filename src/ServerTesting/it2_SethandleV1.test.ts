
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

function requestUserProfileV2(token: string, uId: number) {
  return requestHelper('GET', '/user/profile/v2', { token, uId });
}

function requestuserProfileSethandleV1(token: string, handleStr: string) {
  return requestHelper('PUT', '/user/profile/sethandle/v1', { token, handleStr });
}

function requestClear() {
  return requestHelper('DELETE', '/clear/v1', {});
}

function requestRegister(email: string, password: string, nameFirst: string, nameLast: string) {
  return requestHelper('POST', '/auth/register/v2', { email, password, nameFirst, nameLast });
}

beforeEach(() => {
  requestClear();
});

describe('/user/profile/sethandle/v1', () => {
  describe('error', () => {
    requestClear();
    const tokenA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
    test.each([
      { token: tokenA + 'A', handleStr: 'Unsw1531' },
      { token: tokenA, handleStr: 'AI' },
      { token: tokenA, handleStr: 'ILoveAnimationGirlAndTheyAreMyWaifu' },
      { token: tokenA, handleStr: ':d%^$#!@$#%^' },
    ])('token=$token, handleStr=$handleStr', ({ token, handleStr }) => {
      expect(requestuserProfileSethandleV1(token, handleStr)).toStrictEqual(ERROR);
    });
  });

  test('return value', () => {
    requestClear();
    const tokenA = requestRegister('csgo2@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
    expect(requestuserProfileSethandleV1(tokenA, 'DeathLoop')).toStrictEqual({});// more tests needed when other function finished
  });
  requestClear();
  test('reset the handle', () => {
    const registerObject = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    requestuserProfileSethandleV1(registerObject.token, 'AbCats');
    expect(requestUserProfileV2(registerObject.token, registerObject.authUserId)).toStrictEqual({
      user: {
        uId: registerObject.authUserId,
        email: 'csgo@gmail.com',
        nameFirst: 'Ab',
        nameLast: 'CDE',
        handleStr: 'AbCats'
      }
    });// more tests needed when other function finished
  });
});
