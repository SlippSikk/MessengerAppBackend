import { requestAuthRegister, requestClear } from '../wrappers';
import { authUserId } from '../interfaces';

function requestAddowner(token: string, channelId: number, uId: number) {
  const res = request(
    'POST',
    SERVER_URL + '/channel/addowner/v1',
    {
      json: {
        token: token,
        channelId: channelId,
        uId: uId
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

let registered1: authUserId;
let registered2: authUserId;
let registered3: authUserId;
let channelId1: number;
let channelId2: number;

beforeEach(() => {
  requestClear();
  registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
  registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
  registered3 = requestAuthRegister('dog@gmail.com', 'doggy123', 'dog', 'drown');
  channelId1 = requestChannelsCreate(registered1.authUserId, 'nest', true).channelId;
  channelId2 = requestChannelsCreate(registered2.authUserId, 'shed', true).channelId;
  requestChannelJoin(registered3.token, channelId1);
});

describe('Error Cases', () => {
  test('Invalid channelId', () => {
    expect(requestAddowner(registered1.token, channelId1 + 1, registered1.authUserId)).toStrictEqual(ERROR);
  });
  test('Invalid uId', () => {
    // White box testing
    expect(requestAddowner(registered1.token, channelId1, registered1.authUserId + registered2.authUserId)).toStrictEqual(ERROR);
  });
  test('UId is not a member of channel', () => {
    expect(requestAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
  test('UId is already an owner', () => {
    // white box testing
    expect(requestAddowner(registered1.token, channelId1, registered1.authUserId)).toStrictEqual(ERROR);
  });
  test('UId does not have owner permissions in the channel', () => {
    // white box testing
    // registered3.token is a member of channelId1, but not an owner, thus cann not addsomeone to owner
    expect(requestAddowner(registered3.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
  test('Invalid token', () => {
    // white box testing
    expect(requestAddowner(registered1.token + 'p', channelId2, registered1.authUserId)).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  test('Send a message', () => {
    expect(requestAddowner(registered1.token, channelId1, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(String) });
  });
  test('Send two messages in the same channel', () => {
    expect(requestAddowner(registered1.token, channelId1, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(String) });
    expect(requestAddowner(registered1.token, channelId1, 'How to get bread ?')).toStrictEqual({ messageId: expect.any(String) });
    // white box testing
    const data = getData();
    expect(data.channels[0].messages[0].message).toStrictEqual('Hi my ducklings');
    expect(data.channels[0].messages[1].message).toStrictEqual('How to get bread ?');
  });
  test('Send four messages in the two channels', () => {
    expect(requestAddowner(registered1.token, channelId1, 'one')).toStrictEqual({ messageId: expect.any(String) });
    expect(requestAddowner(registered1.token, channelId2, 'two')).toStrictEqual({ messageId: expect.any(String) });
    expect(requestAddowner(registered2.token, channelId1, 'three')).toStrictEqual({ messageId: expect.any(String) });
    expect(requestAddowner(registered2.token, channelId2, 'four')).toStrictEqual({ messageId: expect.any(String) });
    // white box testing
    const data = getData();
    expect(data.channels[0].messages[0].message).toStrictEqual('one');
    expect(data.channels[0].messages[1].message).toStrictEqual('three');
    expect(data.channels[1].messages[0].message).toStrictEqual('two');
    expect(data.channels[1].messages[1].message).toStrictEqual('four');
  });
  test('Check message from messageId', () => {
    const firstId = requestAddowner(registered1.token, channelId1, 'Hi my ducklings');
    const secondId = requestAddowner(registered1.token, channelId1, 'How to get bread ?')
    // white box testing
    const data = getData();
    expect(data.channels[0].messages[0].messageId).toStrictEqual(firstId);
    expect(data.channels[0].messages[1].messageId).toStrictEqual(secondId);
  });
});


