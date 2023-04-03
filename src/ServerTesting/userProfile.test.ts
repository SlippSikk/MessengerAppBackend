import { requestClear, requestUserProfileV2, requestAuthRegister } from '../wrappers';
const ERROR = { error: expect.any(String) };

beforeEach(() => {
  requestClear();
});

describe('/user/profile/v2', () => {
  describe('error', () => {
    requestClear();
    const registerObjectA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    test.each([
      { token: registerObjectA.token + 'A', uId: registerObjectA.authUserId },
      { token: registerObjectA.token, uId: registerObjectA.authUserId + 1 },
    ])('token=$token, uId=$uId', ({ token, uId }) => {
      expect(requestUserProfileV2(token, uId)).toStrictEqual(ERROR);
    });
  });

  test('viewing someone himself', () => {
    requestClear();
    const registerObjectA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
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
    const registerObjectA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    const registerObjectB = requestAuthRegister('csgoFaze@gmail.com', 'counterStrike', 'boost', 'run');
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
