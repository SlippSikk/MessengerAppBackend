
import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate } from '../wrappers';
import { requestChannelMessages } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { error: expect.any(String) };

let registered1: authUserId;
let registered2: authUserId;
let channelId1: number;
let channelId2: number;

beforeEach(() => {
  requestClear();
  registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
  registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
  channelId1 = requestChannelsCreate(registered1.token, 'nest', true).channelId;
  channelId2 = requestChannelsCreate(registered2.token, 'shed', true).channelId;
});
describe('Error Cases', () => {
  // EXPECT ERROR 400
  test('Invalid channelId', () => {
    expect(requestMessageSend(registered1.token, channelId1 * channelId2 + 1, 'Hi my ducklings')).toStrictEqual(ERROR);
  });
  test('user is not in channel/dm of messageId', () => {
    expect(requestMessageSend(registered1.token, channelId1, '')).toStrictEqual(ERROR);
  });
  test('Invalid reactId', () => {
    expect(requestMessageSend(registered1.token, channelId1, fullChar)).toStrictEqual(ERROR);
  });
  test('Message already has the current reactId', () => {
    expect(requestMessageSend(registered1.token, channelId2, 'Lets dance')).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  test('Send a message', () => {
    expect(requestMessageSend(registered1.token, channelId1, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(Number) });
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message).toStrictEqual('Hi my ducklings');
  });
  test('Send two messages in the same channel', () => {
    expect(requestMessageSend(registered1.token, channelId1, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(Number) });
    expect(requestMessageSend(registered1.token, channelId1, 'How to get bread ?')).toStrictEqual({ messageId: expect.any(Number) });
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message).toStrictEqual('Hi my ducklings');
    expect(a.messages[1].message).toStrictEqual('How to get bread ?');
  });
  test('Send four messages in the two channels', () => {
    expect(requestMessageSend(registered1.token, channelId1, 'one')).toStrictEqual({ messageId: expect.any(Number) });
    expect(requestMessageSend(registered2.token, channelId2, 'two')).toStrictEqual({ messageId: expect.any(Number) });
    expect(requestMessageSend(registered1.token, channelId1, 'three')).toStrictEqual({ messageId: expect.any(Number) });
    expect(requestMessageSend(registered2.token, channelId2, 'four')).toStrictEqual({ messageId: expect.any(Number) });

    const a = requestChannelMessages(registered1.token, channelId1, 0);
    const b = requestChannelMessages(registered2.token, channelId2, 0);

    expect(a.messages[0].message).toStrictEqual('one');
    expect(a.messages[1].message).toStrictEqual('three');
    expect(b.messages[0].message).toStrictEqual('two');
    expect(b.messages[1].message).toStrictEqual('four');
  });
});
