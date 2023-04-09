import { requestAuthRegister, requestClear } from '../wrappers';
import { requestAuthPasswordResetReset } from '../adamWrappers';

// Global
beforeEach(() => {
  requestClear();
  requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adamk', 'Baqaie');
});

// describe('Correct Reset', () => {

//     test('Correct resetcode', () => {
//         expect(requestAuthPasswordResetReset('1234', 'hell11o').body.error).toStrictEqual({ message: expect.any(String) });
//         expect(requestAuthPasswordResetReset('1234', 'hell11o').statusCode).toStrictEqual(400);
//     });
// });

describe('Incorrect Reset', () => {
  test('incorrect resetcode', () => {
    expect(requestAuthPasswordResetReset('1234', 'hell11o').body.error).toStrictEqual({ message: expect.any(String) });
    expect(requestAuthPasswordResetReset('1234', 'hell11o').statusCode).toStrictEqual(400);
  });
  test('Short password', () => {
    expect(requestAuthPasswordResetReset('1234', 'hello').body.error).toStrictEqual({ message: expect.any(String) });
    expect(requestAuthPasswordResetReset('1234', 'hello').statusCode).toStrictEqual(400);
  });
});
