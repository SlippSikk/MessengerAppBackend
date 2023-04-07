import { requestUserProfileV3, requestClear, requestuserProfileSethandleV2, requestAuthRegister } from '../wrappers';
const ERROR = { error: expect.any(String) };
beforeEach(() => {
  requestClear();
  const registerObject = requestAuthRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug');  //why before each never work???
});

describe('/user/profile/sethandle/v1', () => {
  describe('error', () => {
    test('the length of new handle smaller than 3', () => {
      requestClear();
      const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
      expect(requestuserProfileSethandleV2('AI').statusCode).toBe(400);
      expect(requestuserProfileSethandleV2('AI').body.error).toStrictEqual({ message: expect.any(String) })
    });
    test('the length of new handle greater than 20', () => {
      requestClear();
      const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
      expect(requestuserProfileSethandleV2('ILoveAnimationGirlAndTheyAreMyWaifu').statusCode).toBe(400);
      expect(requestuserProfileSethandleV2('ILoveAnimationGirlAndTheyAreMyWaifu').body.error).toStrictEqual({ message: expect.any(String) })
    });
    test('handleStr include non alphanumeric', () => {
      requestClear();
      const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
      expect(requestuserProfileSethandleV2(':d%^$#!@$#%^').statusCode).toBe(400);
      expect(requestuserProfileSethandleV2(':d%^$#!@$#%^').body.error).toStrictEqual({ message: expect.any(String) })
    });

  });

  test('return value', () => {
    requestClear();
    const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    requestuserProfileSethandleV2('AbCats');
    expect(requestuserProfileSethandleV2('AbCats').statusCode).toBe(200);
    expect(requestuserProfileSethandleV2('AbCats').body).toStrictEqual({})
  });

  test('reset the handle', () => {
    requestClear();
    const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    requestuserProfileSethandleV2('AbCats');
    expect(requestuserProfileSethandleV2('AbCats').statusCode).toBe(200);
    expect(requestUserProfileV3(registerObject.authUserId).body).toStrictEqual({
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
