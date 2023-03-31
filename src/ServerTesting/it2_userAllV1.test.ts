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

function requestUserAllV1(token: string) {
  return requestHelper('GET', '/users/all/v1', { token });
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

describe('/users/all/v1', () => {
  describe('basic tests', () => {
    test('token invaild', () => {
      const tokenA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
      expect(requestUserAllV1(tokenA + 'a')).toStrictEqual(ERROR);
    });

    test('three users', () => {
      const registerObjectA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
      const registerObjectB = requestRegister('csgogo@gmail.com', 'counterStrike2', 'john', 'cena');
      const registerObjectC = requestRegister('csgogogo@gmail.com', 'counterStrike3', 'long', 'short');
      expect(requestUserAllV1(registerObjectA.token)).toStrictEqual({
        users: [
          {
            uId: registerObjectA.authUserId,
            email: 'csgo@gmail.com',
            nameFirst: 'Ab',
            nameLast: 'CDE',
            handleStr: 'abcde'
          },
          {
            uId: registerObjectB.authUserId,
            email: 'csgogo@gmail.com',
            nameFirst: 'john',
            nameLast: 'cena',
            handleStr: 'johncena'
          },
          {
            uId: registerObjectC.authUserId,
            email: 'csgogogo@gmail.com',
            nameFirst: 'long',
            nameLast: 'short',
            handleStr: 'longshort'
          }
        ]
      });
    });
  });
}); */
