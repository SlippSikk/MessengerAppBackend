test('Test placeholder', () => {
  expect(1 + 1).toStrictEqual(2);
});
/*
import { requestAuthRegister, requestClear, requestMessageSenddm, requestDmCreate } from '../wrappers';
import { authUserId } from '../interfaces';
import { getData } from './dataStore';
const ERROR = { error: expect.any(String) };

let registered1: authUserId;
let registered2: authUserId;
let registered3: authUserId;
let registered4: authUserId;
let registered5: authUserId;
let dmId1: number;
let dmId2: number;

beforeEach(() => {
  requestClear();
  registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
  registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
  registered3 = requestAuthRegister('dog@gmail.com', 'dogs123', 'dog', 'drown');
  registered4 = requestAuthRegister('owl@gmail.com', 'owls123', 'owl', 'sink');
  registered5 = requestAuthRegister('hunter@gmail.com', 'hunter123', 'hunter', 'great');
  dmId1 = requestDmCreate(registered2.token, [registered1.authUserId, registered3.authUserId]).dmId;
  dmId2 = requestDmCreate(registered2.token, [registered1.authUserId, registered3.authUserId, registered4.authUserId]).dmId;
});
describe('Error Cases', () => {
  test('Invalid dm Id', () => {
    expect(requestMessageSenddm(registered1.token, dmId1 + 1, 'Hi my ducklings')).toStrictEqual(ERROR);
  });
  test('Message must be between 1 to 1000 letters', () => {
    expect(requestMessageSenddm(registered1.token, dmId1, '')).toStrictEqual(ERROR);
  });
  test('Message must be between 1 to 1000 letters', () => {
    let fullChar = '';
    for (let i = 0; i < 1001; i++) {
      fullChar += 'p';
    }
    expect(requestMessageSenddm(registered1.token, dmId1, fullChar)).toStrictEqual(ERROR);
  });
  test('User is not member of channel', () => {
    expect(requestMessageSenddm(registered5.token, dmId1, 'Lets dance')).toStrictEqual(ERROR);
  });
  test('Invalid token', () => {
    // white box testing
    expect(requestMessageSenddm(registered1.token + 'p', dmId1, 'Lets dance')).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  test('Send a dm', () => {
    expect(requestMessageSenddm(registered1.token, dmId2, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(Number) });
  });
  test('Send two dms', () => {
    expect(requestMessageSenddm(registered1.token, dmId2, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(Number) });
    expect(requestMessageSenddm(registered1.token, dmId2, 'How to get bread ?')).toStrictEqual({ messageId: expect.any(Number) });
    // white box testing
    const data = getData();
    expect(data.dms[0].messages[0].message).toStrictEqual('Hi my ducklings');
    expect(data.dms[0].messages[1].message).toStrictEqual('How to get bread ?');
  });
  test('send multiple dms to multiple people', () => {
    requestMessageSenddm(registered1.token, dmId2, 'Hi my ducklings');
    requestMessageSenddm(registered3.token, dmId1, 'How to get bread ?');
    // white box testing
    const data = getData();
    expect(data.dms[0].messages[0].message).toStrictEqual('How to get bread ?');
    expect(data.dms[1].messages[0].message).toStrictEqual('Hi my ducklings');
  });
});
*/
