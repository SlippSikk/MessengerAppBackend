import { authRegisterV1 } from '../auth.js'
import { clearV1 } from '../other.js'
import { userProfileV1 } from '../users.js'
beforeEach(() => {
    clearV1();
    
  });
  


describe("Invaild input", () => {
    const authID1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li');
    const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui');
    test.each([
        { testName: 'invaild authUserId, vaild uId', authUserId:5201314, uId:authID1.authUserId },
        { testName: 'vaild authUserId, invaild uId', authUserId:authID2.authUserId, uId:1981019 },
        { testName: 'invaild authUserId, invaild uId', authUserId:19191919, uId:9527 },
    ])('Input has $testName', ({ authUserId,uId }) => {
        expect(userProfileV1(authUserId,uId)).toStrictEqual({ error: expect.any(String) });
    });
});

describe('valid input', () => {

    test('check someone himself profile', () => {   
        const authID1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li');
        const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui');
        const authID3 = authRegisterV1('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase');  
        expect(userProfileV1(authID1.authUserId, authID1.authUserId)).toEqual( {user: {
            uId: authID1.authUserId,
            email: 'gura@gmail.com',
            nameFirst: 'huaizhi',
            nameLast: 'li',
            handleStr: 'huaizhili',
          }});
        expect(userProfileV1(authID2.authUserId, authID2.authUserId)).toEqual(
            {user: {
                uId: authID2.authUserId,
                email: 'Ina@outlook.com',
                nameFirst: 'me',
                nameLast: 'vasdui',
                handleStr: 'mevasdui',
              }}
        )
    });

    test ('see others profile', () => {
        const authID1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li');
        const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui');
        const authID3 = authRegisterV1('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase');
        expect(userProfileV1(authID3.authUserId, authID1.authUserId)).toEqual( {user: {
            uId: authID1.authUserId,
            email: 'gura@gmail.com',
            nameFirst: 'huaizhi',
            nameLast: 'li',
            handleStr: 'huaizhili',
          }})
    });
})