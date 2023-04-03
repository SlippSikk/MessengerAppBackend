import { requestClear, requestAuthRegister, requestSetNameV1, requestUserProfileV2 } from '../wrappers';
const ERROR = { error: expect.any(String) };

beforeEach(() => {
  requestClear();
});

describe('/user/profile/setname/v1', () => {
  describe('error', () => {
    requestClear();
    const tokenA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
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
    const tokenA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
    expect(requestSetNameV1(tokenA, 'DeathLoop', 'ABCD')).toStrictEqual({});// more tests needed when other function finished
  });

  test('reset the name', () => {
    requestClear();
    const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    requestSetNameV1(registerObject.token, 'Ichiru','Shirase');
    expect(requestUserProfileV2(registerObject.token, registerObject.authUserId)).toStrictEqual({
      user: {
        uId: registerObject.authUserId,
        email: 'csgo@gmail.com',
        nameFirst: 'Ichiru',
        nameLast: 'Shirase',
        handleStr: 'abcde'
      }
    })

  });
});