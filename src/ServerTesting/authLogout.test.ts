// import { requestAuthLogout, requestAuthRegister, requestAuthLogin, requestClear } from '../wrappers';

// delete below
test('Test placeholder', () => {
    expect(1 + 1).toStrictEqual(2);
  });
  
  // let token1: string;
  // let token2: string;
  // beforeEach(() => {
  //   requestClear();
  //   token1 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').token;
  //   token2 = requestAuthRegister('John@gmail.com', 'John123', 'John', 'Saul').token;
  // });
  
  // describe('Correct token', () => {
  //   test('Correct Inputs', () => {
  //     const registered = requestAuthLogin('adam.baqaie@gmail.com', 'adam123').token;
  //     const registered2 = requestAuthLogin('adam.baqaie@gmail.com', 'adam123').token;
  //     const registered3 = requestAuthRegister('John@gmail.com', 'John123', 'John', 'Saul').token;
  //     expect(requestAuthLogout(token2)).toStrictEqual({});
  //     expect(requestAuthLogout(registered)).toStrictEqual({});
  //     expect(requestAuthLogout(registered2)).toStrictEqual({});
  //     expect(requestAuthLogout(registered3)).toStrictEqual({});
  //     expect(requestAuthLogout(token1)).toStrictEqual({});
  //   });
  // });
  
  // describe('Incorrect token', () => {
  //   test.each([
  //     { testName: 'incorrect token', token: (token1 + token2) },
  //     { testName: 'incorrect token', token: (token1.slice(1)) },
  //   ])('Input has $testName', ({ token }) => {
  //     expect(requestAuthLogout(token)).toStrictEqual({ error: expect.any(String) });
  //   });
  // });
  