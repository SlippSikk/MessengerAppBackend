import { requestClear, requestAuthRegister, requestuserSetemail, requestUserProfileV2 } from '../wrappers';

const ERROR = { error: expect.any(String) };

beforeEach(() => {
  requestClear();
});

describe('/user/profile/setemail/v1', () => {
  describe('error', () => {
    const tokenA = requestAuthRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug').token;
    test.each([
      { token: tokenA + 'A', email: 'Unsw1531@gamil.com' },
      { token: tokenA, email: 'Waifu@gmail.com' },
      { token: tokenA, email: 'AI' },
    ])('token=$token, email=$email', ({ token, email }) => {
      expect(requestuserSetemail(token, email)).toStrictEqual(ERROR);
    });
  });

  test('return value', () => {
    requestClear();
    const tokenA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
    expect(requestuserSetemail(tokenA, 'Ehentai@gmail.com')).toStrictEqual({});// more tests needed when other function finished
  });
  test('reset the email', () => {
    requestClear();
    const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    requestuserSetemail(registerObject.token, 'Ehentai@gmail.com');
    expect(requestUserProfileV2(registerObject.token, registerObject.authUserId)).toStrictEqual({
      user: {
        uId: registerObject.authUserId,
        email: 'Ehentai@gmail.com',
        nameFirst: 'Ab',
        nameLast: 'CDE',
        handleStr: 'abcde'
      }
    });
  });
});
