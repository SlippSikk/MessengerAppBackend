import request from 'sync-request';

import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;
const ERROR = { error: expect.any(String) };


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
let channelId1: number;

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
  beforeEach(() => {

  });
  test('Invalid token', () => {

  });

});