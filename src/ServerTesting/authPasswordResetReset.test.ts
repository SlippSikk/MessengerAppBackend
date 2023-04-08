// import { requestAuthRegister, requestClear, requestPasswordResetReset } from '../wrappers';
// import { authUserId } from '../interfaces';

///////////////////// delete this test /////////////////////
test('stub test', () => {
    expect(1 + 1).toStrictEqual(2);
})

////////////////////////////////////////////////////////////
// // Global
// let registered: authUserId;
// beforeEach(() => {
//     requestClear();
//     registered = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adamklklklk', 'Baqaieokokokokok');
// });

// describe('Incorrect Reset', () => {

//     test('incorrect resetcode', () => {
//         expect(requestPasswordResetReset(1234, 'hell11o').error).toStrictEqual({ message: expect.any(String) });
//     });
//     test('Short password', () => {
//         expect(requestPasswordResetReset(1234, 'hello').error).toStrictEqual({ message: expect.any(String) });
//     });
// });
