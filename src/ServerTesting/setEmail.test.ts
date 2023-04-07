import { requestClear, requestAuthRegister, requestuserSetemailV2, requestUserProfileV3 } from '../wrappers';
beforeEach(() => {
  requestClear();
});

describe('/user/profile/setemail/v2', () => {
  describe('error', () => {
    test('input email is invaild', () => {
      const registerObject = requestAuthRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug');
      expect(requestuserSetemailV2('AI').statusCode).toBe(400);
      expect(requestuserSetemailV2('AI').body.error).toStrictEqual({ message: expect.any(String) })
    });
    test('input email is invaild', () => {
      const registerObject = requestAuthRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug');
      const registerObject2 = requestAuthRegister('csgo6@gmail.com', 'qwer', 'tyu', 'io');
      expect(requestuserSetemailV2('csgo3@gmail.com').statusCode).toBe(400);
      expect(requestuserSetemailV2('csgo3@gmail.com').body.error).toStrictEqual({ message: expect.any(String) })
    });
    
  });

  test('return value', () => {
    requestClear();
    const tokenA = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    expect(requestuserSetemailV2('Eatham@gmail.com').statusCode).toBe(200);
    expect(requestuserSetemailV2('Eatham@gmail.com').body).toStrictEqual({})
  });
  test('reset the email', () => {
    requestClear();
    const registerObject = requestAuthRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
    requestuserSetemailV2('tEaiHem@gmail.com');
    expect(requestUserProfileV3(registerObject.authUserId).body).toStrictEqual({
      user: {
        uId: registerObject.authUserId,
        email: 'tEaiHem@gmail.com',
        nameFirst: 'Ab',
        nameLast: 'CDE',
        handleStr: 'abcde'
      }
    });
    expect(requestuserSetemailV2('Eatham@gmail.com').statusCode).toBe(200);
    requestClear();
  });
});
