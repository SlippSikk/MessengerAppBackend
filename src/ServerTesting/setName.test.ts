import { requestClear, requestAuthRegister, requestSetNameV2, requestUserProfileV3 } from '../wrappers';
const ERROR = { error: expect.any(String) };

beforeEach(() => {
  requestClear();
  const tokenA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
});

describe('/user/profile/setname/v1', () => {
  test('return value', () => {
    requestClear();
    const tokenA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
    expect(requestSetNameV2('DeathLoop', 'ABCD')).toStrictEqual({});// more tests needed when other function finished
  });

  describe('error', () => {
    test('nameFirst is too long', () => {
      requestClear();
      const registerObject = requestAuthRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug');
      expect(requestSetNameV2('ILoveAnimationGirlAndTheyAreMyWaifuHeiHeiHeiHeiHeiHei','Ichiru').statusCode).toBe(400);
      expect(requestSetNameV2('ILoveAnimationGirlAndTheyAreMyWaifuHeiHeiHeiHeiHeiHei','Ichiru').body.error).toStrictEqual({ message: expect.any(String) })
    });
    test('nameLast is too long', () => {
      requestClear();
      const registerObject = requestAuthRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug');
      expect(requestSetNameV2('Ichiru','ILoveAnimationGirlAndTheyAreMyWaifuHeiHeiHeiHeiHeiHei').statusCode).toBe(400);
      expect(requestSetNameV2('Ichiru','ILoveAnimationGirlAndTheyAreMyWaifuHeiHeiHeiHeiHeiHei').body.error).toStrictEqual({ message: expect.any(String) })
    });
    test('nameFirst is empty', () => {
      requestClear();
      const registerObject = requestAuthRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug');
      expect(requestSetNameV2('','Ichiru').statusCode).toBe(400);
      expect(requestSetNameV2('','Ichiru').body.error).toStrictEqual({ message: expect.any(String) })
    });
    test('nameLast is empty', () => {
      requestClear();
      const registerObject = requestAuthRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug');
      expect(requestSetNameV2('Ichiru','').statusCode).toBe(400);
      expect(requestSetNameV2('Ichiru','').body.error).toStrictEqual({ message: expect.any(String) })
    });
  });

  test('return value', () => {
    requestClear();
    const tokenA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    expect(requestSetNameV2('DeathLoop', 'ABCD').statusCode).toBe(200);
    expect(requestSetNameV2('DeathLoop', 'ABCD').body).toStrictEqual({})
  });
  test('reset the name', () => {
    requestClear();
    const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    requestSetNameV2('Ichiru', 'Shirase');
    expect(requestSetNameV2('Ichiru', 'Shirase').statusCode).toBe(200);
    expect(requestUserProfileV3(registerObject.authUserId).body).toStrictEqual({
      user: {
        uId: registerObject.authUserId,
        email: 'csgo@gmail.com',
        nameFirst: 'Ichiru',
        nameLast: 'Shirase',
        handleStr: 'abcde'
      }
    });
  });
});
