/*
import request from 'sync-request';
import { getData } from './dataStore';
import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;
const ERROR = { error: expect.any(String) };
*/
// delete below
test('Test placeholder', () => {
  expect(1 + 1).toStrictEqual(2);
});
/*
function requestMessageSend(token: string, channelId: number, message: string) {
  const res = request(
    'POST',
    SERVER_URL + '/message/send/v1',
    {
      json: {
        token: token,
        channelId: channelId,
        message: message
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

let registered1: authUserId;
let registered2: authUserId;
let channelId1: number;
let channelId2: number;

beforeEach(() => {
  requestClear();
  registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
  registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
  channelId1 = requestChannelsCreate(registered1.authUserId, 'nest', true).channelId;
  channelId2 = requestChannelsCreate(registered2.authUserId, 'shed', true).channelId;
});
describe('Error Cases', () => {
  test('Invalid channelId', () => {
    expect(requestMessageSend(registered1.token, channelId1 + 1, 'Hi my ducklings')).toStrictEqual(ERROR);
  });
  test('Message must be between 1 to 1000 letters', () => {
    expect(requestMessageSend(registered1.token, channelId1, '')).toStrictEqual(ERROR);
  });
  test('Message must be between 1 to 1000 letters', () => {
    let fullChar = '';
    for (let i = 0; 1001 > i; i++) {
      fullChar += 'p';
    }
    expect(requestMessageSend(registered1.token, channelId1, fullChar)).toStrictEqual(ERROR);
  });
  test('User is not member of channel', () => {
    expect(requestMessageSend(registered1.token, channelId2, 'Lets dance')).toStrictEqual(ERROR);
  });
  test('Invalid token', () => {
    // white box testing
    expect(requestMessageSend(registered1.token + 'p', channelId1, 'Lets dance')).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  test('Send a message', () => {
    expect(requestMessageSend(registered1.token, channelId1, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(String) });
  });
  test('Send two messages in the same channel', () => {
    expect(requestMessageSend(registered1.token, channelId1, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(String) });
    expect(requestMessageSend(registered1.token, channelId1, 'How to get bread ?')).toStrictEqual({ messageId: expect.any(String) });
    // white box testing
    const data = getData();
    expect(data.channels[0].messages[0].message).toStrictEqual('Hi my ducklings');
    expect(data.channels[0].messages[1].message).toStrictEqual('How to get bread ?');
  });
  test('Send four messages in the two channels', () => {
    expect(requestMessageSend(registered1.token, channelId1, 'one')).toStrictEqual({ messageId: expect.any(String) });
    expect(requestMessageSend(registered1.token, channelId2, 'two')).toStrictEqual({ messageId: expect.any(String) });
    expect(requestMessageSend(registered2.token, channelId1, 'three')).toStrictEqual({ messageId: expect.any(String) });
    expect(requestMessageSend(registered2.token, channelId2, 'four')).toStrictEqual({ messageId: expect.any(String) });
    // white box testing
    const data = getData();
    expect(data.channels[0].messages[0].message).toStrictEqual('one');
    expect(data.channels[0].messages[1].message).toStrictEqual('three');
    expect(data.channels[1].messages[0].message).toStrictEqual('two');
    expect(data.channels[1].messages[1].message).toStrictEqual('four');
  });
  test('Check message from messageId', () => {
    const firstId = requestMessageSend(registered1.token, channelId1, 'Hi my ducklings');
    const secondId = requestMessageSend(registered1.token, channelId1, 'How to get bread ?')
    // white box testing
    const data = getData();
    expect(data.channels[0].messages[0].messageId).toStrictEqual(firstId);
    expect(data.channels[0].messages[1].messageId).toStrictEqual(secondId);
  });
});

*/
