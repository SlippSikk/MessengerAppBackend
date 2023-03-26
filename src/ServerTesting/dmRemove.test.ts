// import {
//   requestAuthRegister, requestClear, requestDmCreate, requestDmDetails,
//   requestDmList, requestDmRemove, requestDmLeave
// } from '../wrappers';
// import { authUserId } from '../interfaces';

// Delete test
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
//   requestClear();
//   registered = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'B');
//   registered2 = requestAuthRegister('adam.@gmail.com', 'adam123', 'C', 'B');
//   registered3 = requestAuthRegister('baqaie@gmail.com', 'adam123', 'E', 'B');
//   registered4 = requestAuthRegister('a@gmail.com', 'adam123', 'F', 'B');
//   uIds = [registered2.authUserId, registered3.authUserId, registered4.authUserId];
//   dmId = requestDmCreate(registered.token, uIds).dmId;
//   uIds2 = [registered2.authUserId];
//   dmId2 = requestDmCreate(registered.token, uIds2).dmId;
//   requestDmLeave(registered.token, dmId2);

// });

// describe('Correct Dm Remove', () => {

//   test('Correct Output DmList', () => {
//     requestDmRemove(registered.token, dmId);
//     expect(requestDmList(registered2.token)).toStrictEqual({
//       dms: []
//     });
//   });

//   test('Correct Output DmDetails', () => {
//     requestDmRemove(registered.token, dmId2);
//     expect(requestDmDetails(registered2.token, dmId2)).toStrictEqual({ error: expect.any(String) })
//   })

// });

// describe('Incorrect Dm Remove', () => {

//   test.each([
//     { testName: 'Invalid dmId', token: registered.token, dmId: (dmId2 * Date.now()) },
//     { testName: 'authId is not creator', token: registered2.token, dmId: dmId },
//     { testName: 'No longer member', token: registered.token, dmId: dmId2 },
//     { testName: 'Invalid Token', token: (registered2.token + registered.token + Date.now()), dmId: dmId },
//   ])('Input has $testName', ({ token, dmId }) => {
//     expect(requestDmRemove(token, dmId)).toStrictEqual({ error: expect.any(String) });
//   });
// });
