import {
  requestAuthRegister, requestClear, requestDmCreate, requestDmDetails,
  requestDmList, requestDmRemove, requestDmLeave
} from '../wrappers';

import { authUserId } from '../interfaces';

// Global
let registered: authUserId;
let registered2: authUserId;
let registered3: authUserId;
let registered4: authUserId;
let uIds: number[];
let uIds2: number[];
let dmId: number;
let dmId2: number;
beforeEach(() => {
  requestClear();
  registered = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'B');
  registered2 = requestAuthRegister('adam@gmail.com', 'adam123', 'C', 'B');
  registered3 = requestAuthRegister('baqaie@gmail.com', 'adam123', 'E', 'B');
  registered4 = requestAuthRegister('a@gmail.com', 'adam123', 'F', 'B');
  uIds = [registered2.authUserId, registered3.authUserId, registered4.authUserId];
  dmId = requestDmCreate(registered.token, uIds).dmId;
  uIds2 = [registered2.authUserId];
  dmId2 = requestDmCreate(registered.token, uIds2).dmId;
  requestDmLeave(registered.token, dmId2);
});

describe('Correct Dm Remove', () => {
  test('Correct removal', () => {
    expect(requestDmRemove(registered.token, dmId)).toStrictEqual({});
  });

  test('Correct Output DmList', () => {
    requestDmRemove(registered.token, dmId);
    expect(requestDmList(registered3.token)).toStrictEqual({
      dms: []
    });
  });

  test('Correct Output DmDetails', () => {
    requestDmRemove(registered.token, dmId2);
    expect(requestDmDetails(registered2.token, dmId2)).toStrictEqual({ error: expect.any(String) })
  })

});

describe('Incorrect Dm Remove', () => {
  test('Invalid dmId', () => {
    expect(requestDmRemove(registered.token, (dmId2 * Date.now()))).toStrictEqual({ error: expect.any(String) });
  });
  test('authId is not creator', () => {
    expect(requestDmRemove(registered2.token, dmId)).toStrictEqual({ error: expect.any(String) });
  });
  test('Invalid dmId', () => {
    expect(requestDmRemove(registered.token, dmId2)).toStrictEqual({ error: expect.any(String) });
  });
  test('Invalid dmId', () => {
    expect(requestDmRemove((registered2.token + registered.token + Date.now()), dmId)).toStrictEqual({ error: expect.any(String) });
  });
});
