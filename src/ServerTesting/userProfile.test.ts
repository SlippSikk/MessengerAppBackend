import { requestClear, requestUserProfileV3, requestAuthRegister } from '../wrappers';
const ERROR = { error: expect.any(String) };

beforeEach(() => {
  requestClear();
});

describe('/user/profile/v2', () => {
    test('Uid is invaild', () => {
      requestClear();
      const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
      expect(requestUserProfileV3(registerObject.authUserId + 1).statusCode).toBe(400);
      expect(requestUserProfileV3(registerObject.authUserId + 1).body.error).toStrictEqual({ message: expect.any(String) })
    });

  test('viewing someone himself', () => {
    requestClear();
    const registerObjectA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    expect(requestUserProfileV3(registerObjectA.authUserId).statusCode).toBe(200);
    expect(requestUserProfileV3(registerObjectA.authUserId).body).toStrictEqual({
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
    const registerObjectB = requestAuthRegister('csgoFaze@gmail.com', 'counterStrike', 'boost', 'run');
    const registerObjectA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    expect(requestUserProfileV3(registerObjectB.authUserId).statusCode).toBe(200);
    expect(requestUserProfileV3(registerObjectB.authUserId).body).toStrictEqual({
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

