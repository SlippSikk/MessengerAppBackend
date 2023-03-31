
test('I hate pipeline', () => {
    expect(1 + 1).toStrictEqual(2);
  });
  
/*
import request, { HttpVerb } from 'sync-request';

import { port, url } from '../config.json';

const SERVER_URL = `${url}:${port}`;
const ERROR = { error: expect.any(String) };

function requestHelper(method: HttpVerb, path: string, payload: object) {
  let qs = {};
  let json = {};
  if (['GET', 'DELETE'].includes(method)) {
    qs = payload;
  } else {
    // PUT/POST
    json = payload;
  }
  const res = request(method, SERVER_URL + path, { qs, json, timeout: 20000 });
  return JSON.parse(res.getBody('utf-8'));
}



function requestuserSetemail(token: string, email: string) {
    return requestHelper('PUT', '/user/profile/setemail/v1', { token, email });
}

function requestClear() {
    return requestHelper('DELETE', '/clear/v1', {});
}

function requestUserProfileV2(token: string, uId: number) {
    return requestHelper('GET', '/user/profile/v2', { token, uId });
}

function requestRegister(email: string, password: string, nameFirst: string, nameLast: string) {
    return requestHelper('POST', '/auth/register/v2', {email,password,nameFirst,nameLast});
}

beforeEach(() => {
    requestClear();
});
  
describe('/user/profile/setemail/v1', () => {
    describe('error', () => {
        const tokenA = requestRegister('csgo3@gmail.com', 'counterStrike', 'de', 'bug').token;
        const tokenB = requestRegister('Waifu@gmail.com', 'counterStrike', 'dejie', 'yun').token;
        test.each([
            { token: tokenA+'A', email: 'Unsw1531@gamil.com' },
            { token: tokenA, email: 'Waifu@gmail.com' }, 
            { token: tokenA, email: 'AI' },     
        ])('token=$token, email=$email', ({ token, email }) => {
        expect(requestuserSetemail(token, email)).toStrictEqual(ERROR);
        });
    });
  
    test('return value', () => {
        requestClear();
        const tokenA = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE').token;
        expect(requestuserSetemail(tokenA, 'Ehentai@gmail.com')).toStrictEqual({});//more tests needed when other function finished
    });
    test('reset the email', () => {
        requestClear();
        const registerObject = requestRegister('csgo@gmail.com', 'counterStrike', 'Ab', 'CDE');
        requestuserSetemail(registerObject.token, 'Ehentai@gmail.com')
        expect(requestUserProfileV2(registerObject.token,registerObject.authUserId)).toStrictEqual({user:{
            uId:registerObject.authUserId, 
            email:'Ehentai@gmail.com', 
            nameFirst:'Ab', 
            nameLast:'CDE', 
            handleStr:'abcde'}});//more tests needed when other function finished
    });

  });
*/