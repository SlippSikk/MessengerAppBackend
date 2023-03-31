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

function requestClear() {
  return requestHelper('DELETE', '/clear/v1', {});
}

function requestRegister(email: string, password: string, nameFirst: string, nameLast: string) {
  return requestHelper('POST', '/auth/register/v2', { email, password, nameFirst, nameLast });
}

beforeEach(() => {
  requestClear();
});

describe('/user/profile/v2', () => {
  describe('error', () => {
    requestClear();
    const registerObjectA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    test.each([
      { token: registerObjectA.token + 'A', uId: registerObjectA.authUserId },
      { token: registerObjectA.token, uId: registerObjectA.authUserId + 1 },
    ])('token=$token, uId=$uId', ({ token, uId }) => {
      expect(requestUserProfileV2(token, uId)).toStrictEqual(ERROR);
    });
  });

  test('viewing someone himself', () => {
    requestClear();
    const registerObjectA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    expect(requestUserProfileV2(registerObjectA.token, registerObjectA.authUserId)).toStrictEqual({
      user: {
        uId: registerObjectA.authUserId,
        email: 'csgo@gmail.com',
        nameFirst: 'Ab',
        nameLast: 'CDE',
        handleStr: 'abcde'
      }
    });
  });
  test('viewing others', () => {
    requestClear();
    const registerObjectA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    const registerObjectB = requestRegister('csgoFaze@gmail.com', 'counterStrike', 'boost', 'run');
    expect(requestUserProfileV2(registerObjectA.token, registerObjectB.authUserId)).toStrictEqual({
      user: {
        uId: registerObjectB.authUserId,
        email: 'csgoFaze@gmail.com',
        nameFirst: 'boost',
        nameLast: 'run',
        handleStr: 'boostrun'
      }
    });
  });
});
