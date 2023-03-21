import request from 'sync-request';
import config from '../config.json';
import { authUserId } from '../interfaces';

// const OK = 200;
const port = config.port;
const url = config.url;

function requestAuthRegister(email: string, password: string, nameFirst: string, nameLast: string): authUserId {
  const res = request(
    'POST',
    `${url}:${port}/auth/register/v2`,
    {
      json: {
        email,
        password,
        nameFirst,
        nameLast
      }
    }
  );

  return JSON.parse(res.body as string);
}

describe('Correct Registration', () => {
  beforeEach(() => {
    // requestClear
  });
  test('Correct Inputs', () => {
    const registered = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie');
    expect(registered).toStrictEqual({ token: expect.any(String), authUserId: expect.any(Number) });
  });
});

describe('Incorrect Registration', () => {
  test.each([
    { testName: 'incorrect email', email: 'foo.bar@@gmail.c@m', password: 'hello123', nameFirst: 'Daniel', nameLast: 'Murphy' },
    { testName: 'in-use email', email: 'adam.baqaie@gmail.com', password: 'hello1', nameFirst: 'Daniel', nameLast: 'Murphy' },
    { testName: 'password < 6 char', email: 'foo.bar@foobar.com', password: 'hello', nameFirst: 'Daniel', nameLast: 'Murphy' },
    { testName: 'length of nameFirst < 1 || > 50', email: 'foo.bar@foobar.com', password: 'hello1', nameFirst: '', nameLast: 'Murphy' },
    { testName: 'length of nameFirst < 1 || > 50', email: 'foo.bar@foobar.com', password: 'hello1', nameFirst: 'ghfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfh', nameLast: 'Murphy' },
    { testName: 'length of nameLast < 1 || > 50', email: 'foo.bar@foobar.com', password: 'hello1', nameFirst: 'Daniel', nameLast: '' },
    { testName: 'length of nameLast < 1 || > 50', email: 'foo.bar@foobar.com', password: 'hello1', nameFirst: 'Daniel', nameLast: 'ghfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfh' },
  ])('Input has $testName', ({ email, password, nameFirst, nameLast }) => {
    expect(requestAuthRegister(email, password, nameFirst, nameLast)).toStrictEqual({ error: expect.any(String) });
  });
});
