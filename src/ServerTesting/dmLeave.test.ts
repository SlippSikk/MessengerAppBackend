// import {
//     requestAuthRegister, requestClear, requestDmCreate, requestDmDetails,
//     requestDmList, requestDmLeave
// } from '../wrappers';
// import { authUserId } from '../interfaces';

// Delete this test
test('Delete', () => {
  expect(1 + 1).toStrictEqual(2);
});

// // Global
// let registered: authUserId;
// let registered2: authUserId;
// let registered3: authUserId;
// let registered4: authUserId;
// let uIds: number[];
// let uIds2: number[];
// let dmId: number;
// let dmId2: number;
// beforeEach(() => {
//     requestClear();
//     registered = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'B');
//     registered2 = requestAuthRegister('adam.@gmail.com', 'adam123', 'C', 'B');
//     registered3 = requestAuthRegister('baqaie@gmail.com', 'adam123', 'E', 'B');
//     registered4 = requestAuthRegister('a@gmail.com', 'adam123', 'F', 'B');
//     uIds = [registered2.authUserId, registered3.authUserId, registered4.authUserId];
//     dmId = requestDmCreate(registered.token, uIds).dmId;
//     uIds2 = [registered2.authUserId];
//     dmId2 = requestDmCreate(registered.token, uIds2).dmId;
// });

// describe('Correct Dm leave', () => {

//     test('Correct Output DmList', () => {
//         requestDmLeave(registered3.token, dmId);
//         expect(requestDmList(registered2.token)).toStrictEqual({
//             dms: []
//         });
//     });

//     test('Correct Output DmDetails', () => {
//         requestDmLeave(registered.token, dmId2);
//         expect(requestDmDetails(registered.token, dmId2)).toStrictEqual({ error: expect.any(String) })
//     })

// });

// describe('Incorrect Dm leave', () => {
//     beforeEach(() => {
//         requestDmLeave(registered.token, dmId2)
//     })
//     test.each([
//         { testName: 'Invalid dmId', token: registered.token, dmId: (dmId2 * Date.now()) },
//         { testName: 'No longer member', token: registered.token, dmId: dmId2 },
//         { testName: 'Invalid Token', token: (registered2.token + registered.token + Date.now()), dmId: dmId },
//     ])('Input has $testName', ({ token, dmId }) => {
//         expect(requestDmLeave(token, dmId)).toStrictEqual({ error: expect.any(String) });
//     });
// });
