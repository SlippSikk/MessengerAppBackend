import { requestUserProfileV2, requestClear, requestuserProfileSethandleV1, requestAuthRegister } from '../wrappers';
const ERROR = { error: expect.any(String) };

describe('/user/profile/sethandle/v1', () => {
  beforeEach(() => {
    requestClear();
  });

  describe('error', () => {
    requestClear();
    const tokenA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
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
    const tokenA = requestAuthRegister('csgo2@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
    expect(requestuserProfileSethandleV1(tokenA, 'DeathLoop')).toStrictEqual({});// more tests needed when other function finished
  });

  test('reset the handle', () => {
    const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    requestuserProfileSethandleV1(registerObject.token, 'AbCats');
    expect(requestUserProfileV2(registerObject.token, registerObject.authUserId)).toStrictEqual({
      user: {
        uId: registerObject.authUserId,
        email: 'csgo@gmail.com',
        nameFirst: 'Ab',
        nameLast: 'CDE',
        handleStr: 'AbCats'
      }
    });
  });
});
