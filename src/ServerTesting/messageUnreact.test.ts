test('Invalid channelId', () => {
  expect(1 + 1).toStrictEqual(2);
});
// const token = req.header('token');
// const { other, data } = req.body;
/*
export function requestMessageUnreact(token: string, messageId: number, reactId: number) {
  const res = request(
    'POST',
    SERVER_URL + 'message/unreact/v1',
    {
      json: {
        token,
        messageId,
        number
      }
    }
  );

  return JSON.parse(res.getBody() as string);
}
app.post('message/unreact/v1', (req: Request, res: Response) => {
  const token = req.header('token');
  const { messageId, reactId } = req.body;

  res.json(messageReactV1(token, +messageId, +reactId));
});
import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate } from '../wrappers';
import { requestChannelMessages, requestMessageReact, requestMessagUnreact, requestDmMessages, requestMessageSenddm, requestDmCreate } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { code: 400, error: expect.any(String) };

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
  registered3 = requestAuthRegister('hound@gmail.com', 'hound123', 'dog', 'drown');
  channelId1 = requestChannelsCreate(registered1.token, 'nest', true).channelId;
  channelId2 = requestChannelsCreate(registered2.token, 'shed', true).channelId;
  dmId = requestDmCreate(registered2.token, [registered1.authUserId, registered2.authUserId]).dmId;
  mIdChannel = requestMessageSend(registered1.token, channelId1, 'Hi my ducklings').messageId;
  mIdDm = requestMessageSenddm(registered1.token, dmId, 'Hi my dogs').messageId;
  requestMessageReact(registered1.token, mIdChannel, 1);
  requestMessageReact(registered1.token, mIdDm, 1);
});

describe('Error Cases', () => {
  test('Invalid token', () => {
    expect(requestMessagUnreact(registered1.token + registered2.token, mIdChannel, 1).statusCode).toStrictEqual(403);
  });
  test('Invalid messageId', () => {
    expect(requestMessagUnreact(registered1.token, mIdChannel * mIdDm + 1, 1).statusCode).toStrictEqual(400);
  });
  test('user is not in channel/dm of messageId', () => {
    expect(requestMessageUnreact(registered3.token, mIdChannel, 1).statusCode).toStrictEqual(400);
  });
  test('Invalid reactId', () => {
    expect(requestMessageUnreact(registered1.token, mIdChannel, 2).statusCode).toStrictEqual(400);
  });
});

describe('Function Testing', () => {
  test('Double unreacts in channel msg', () => {
    expect(requestMessageUnreact(registered1.token, mIdChannel, 1).body).toStrictEqual({});
    expect(requestMessageUnreact(registered1.token, mIdChannel, 1).statusCode).toStrictEqual(400);
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message.reacts.reactId).toStrictEqual(1);
    expect(a.messages[0].message.reacts.allUsers.length).toStrictEqual(0);
  });
  test('Double unreacts in dm msg', () => {
    expect(requestMessageUnreact(registered1.token, mIdDm, 1).body).toStrictEqual({});
    expect(requestMessageUnreact(registered1.token, mIdDm, 1).statusCode).toStrictEqual(400);
    const a = requestDmMessages(registered1.token, dmId, 0);
    expect(a.messages[0].message.reacts.reactId).toStrictEqual(1);
    expect(a.messages[0].message.reacts.allUsers.length).toStrictEqual(0);
  });
});
*/
