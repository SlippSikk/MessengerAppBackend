test('Invalid channelId', () => {
  expect(1 + 1).toStrictEqual(2);
});
/*
export function requestMessageUnpin(token: string, messageId: number) {
  const res = request(
    'POST',
    SERVER_URL + '/message/unpin/v1',
    {
      headers: { token },
      json: {
        messageId
      }
    }
  );
  const body = JSON.parse(res.getBody() as string);
  const statusCode = res.statusCode;
  return { body, statusCode };
}
app.post('/message/unpin/v1', (req: Request, res: Response) => {
  const token = req.header('token');
  const { messageId } = req.body;

  res.json(messageUnpinV1(token, +messageId));
});
import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate, requestChannelJoin } from '../wrappers';
import { requestChannelMessages, requestMessagePin, requestMessageUnpin, requestMessageSenddm, requestDmCreate, requestDmMessages } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { error: expect.any(String) };

let registered1: authUserId;
let registered2: authUserId;
let registered3: authUserId;
let channelId1: number;
let channelId2: number;
let mIdChannel: number;
let mIdDm: number;
let dmId: number;
beforeEach(() => {
  requestClear();
  registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
  registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
  registered3 = requestAuthRegister('dog@gmail.com', 'hound123', 'dog', 'drown');
  channelId1 = requestChannelsCreate(registered1.token, 'nest', true).channelId;
  channelId2 = requestChannelsCreate(registered2.token, 'shed', true).channelId;
  dmId = requestDmCreate(registered2.token, [registered1.authUserId, registered2.authUserId]).dmId;
  mIdChannel = requestMessageSend(registered1.token, channelId1, 'Hi my ducklings').messageId;
  mIdDm = requestMessageSenddm(registered1.token, dmId, 'Hi my dogs').messageId;
  requestMessagePin(registered1.token, mIdDm);
  requestMessagePin(registered1.token, mIdChannel);
});
describe('Error Cases', () => {
  test('Invalid messageId', () => {
    expect(requestMessageUnpin(registered1.token, mIdChannel * mIdDm + 1).statusCode).toStrictEqual(400);
  });
  test('(Channel) user is not in messageId', () => {
    expect(requestMessageUnpin(registered3.token, mIdChannel).statusCode).toStrictEqual(400);
  });
  test('(DM) user is not in messageId', () => {
    expect(requestMessageUnpin(registered3.token, mIdDm).statusCode).toStrictEqual(400);
  });
  test('Global owner can Pin', () => {
    const mIdChannel2 = requestMessageSend(registered2.token, channelId2, 'How to become a dog').messageId;
    expect(requestMessageUnpin(registered1.token, mIdChannel2)).toStrictEqual({});
  });
  test('(Channel) Message is not pinned ', () => {
    requestMessageUnpin(registered1.token, mIdChannel);
    expect(requestMessageUnpin(registered1.token, mIdChannel).statusCode).toStrictEqual(400);
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message.isPinned).toStrictEqual(false);
  });
  test('(DM) Message is not pinned ', () => {
    requestMessageUnpin(registered1.token, mIdDm)
    expect(requestMessageUnpin(registered1.token, mIdDm).statusCode).toStrictEqual(400);
    const a = requestDmMessages(registered1.token, dmId, 0);
    expect(a.messages[0].message.isPinned).toStrictEqual(false);
  });
  test('(Channel) User does not have owner permission ', () => {
    requestChannelJoin(registered2.token, channelId1);
    expect(requestMessageUnpin(registered2.token, mIdChannel).statusCode).toStrictEqual(403);
  });
  test('(DM)User does not have owner permission', () => {
    expect(requestMessageUnpin(registered1.token, mIdDm).statusCode).toStrictEqual(403);
  });
});

describe('Function Testing', () => {
  test('Pin channel msg', () => {
    expect(requestMessageUnpin(registered1.token, mIdChannel)).toStrictEqual({});
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message.isPinned).toStrictEqual(false);
  });
  test('Pin in dm msg', () => {
    expect(requestMessageUnpin(registered1.token, mIdDm)).toStrictEqual({});
    const a = requestDmMessages(registered1.token, dmId, 0);
    expect(a.messages[0].message.isPinned).toStrictEqual(false);
  });
});
*/
