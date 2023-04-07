import { requestUsersAllV2, requestClear, requestAuthRegister } from '../wrappers';
const ERROR = { error: expect.any(String) };

beforeEach(() => {
  requestClear();
});

describe('/users/all/v1', () => {
  describe('basic tests', () => {
    test('only one user in database', () => {
      requestClear();
      const registerObjectA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
      expect(requestUsersAllV2().statusCode).toBe(200);
      expect(requestUsersAllV2().body).toStrictEqual({
        users: [
          {
            uId: registerObjectA.authUserId,
            email: 'csgo@gmail.com',
            nameFirst: 'Ab',
            nameLast: 'CDE',
            handleStr: 'abcde'
          }
        ]
      });
    });
    test('three users', () => {
      const registerObjectA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
      const registerObjectB = requestAuthRegister('csgogo@gmail.com', 'counterStrike2', 'john', 'cena');
      const registerObjectC = requestAuthRegister('csgogogo@gmail.com', 'counterStrike3', 'long', 'short');
      expect(requestUsersAllV2().statusCode).toBe(200);
      expect(requestUsersAllV2().body).toStrictEqual({
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
});
