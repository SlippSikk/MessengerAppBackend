test('PlaceHolder', () => {
  expect(1 + 1).toStrictEqual(2);
});
/**
 * For a valid user, returns information about their user ID,
 * email, first name, last name, and handle
 *
 * @param {string} authUserId
 * @param {string} uID
 * @returns {{user: object}}
 */
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

function requestSetNameV1(token: string, nameFirst: string, nameLast:string) {
  return requestHelper('PUT', '/user/profile/setname/v1', { token, nameFirst, nameLast });
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

describe('/user/profile/setname/v1', () => {
  describe('error', () => {
    requestClear();
    const tokenA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
    test.each([
      { token: tokenA, nameFirst: 'ILoveAnimationGirlAndTheyAreMyWaifuHeiHeiHeiHeiHeiHei', nameLast: 'IchiRu' },
      { token: tokenA, nameFirst: 'ShiRaSe', nameLast: 'ILoveAnimationGirlAndTheyAreMyWaifuHeiHeiHeiHeiHeiHei' },
      { token: tokenA + 'A', nameFirst: 'HuaiZhi', nameLast: 'Li' },
      { token: tokenA, nameFirst: 'HuaiZhi', nameLast: '' },
      { token: tokenA, nameFirst: '', nameLast: 'Li' },
    ])('token=$token, nameFirst=$nameFirst, nameLast=$nameLast', ({ token, nameFirst, nameLast }) => {
      expect(requestSetNameV1(token, nameFirst, nameLast)).toStrictEqual(ERROR);
    });
  });

  test('return value', () => {
    requestClear();
    const tokenA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
    expect(requestSetNameV1(tokenA, 'DeathLoop', 'ABCD')).toStrictEqual({});// more tests needed when other function finished
  });
});*/
