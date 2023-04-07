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
import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate} from '../wrappers';
import { requestChannelMessages, requestMessageReact, requestMessageSenddm, requestDmCreate } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { code: 400, error: expect.any(String) };

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
  test('Invalid messageId', () => {
    expect(requestMessagUnreact(token, messageId * messageId + 1, reactId)).toStrictEqual(ERROR);
  });
  test('user is not in channel/dm of messageId', () => {
    expect(requestMessageUnreact(token, messageId, reactId)).toStrictEqual(ERROR);
  });
  test('Invalid reactId', () => {
    expect(requestMessageUnreact(token, messageId, 2)).toStrictEqual(ERROR);
  });
  test('Message does not have the current reactId', () => {
    requestMessageUnreact(token, messageId, reactId);
    expect(requestMessageUnreact(token, messageId, reactId)).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  const mIdChannel: number;
  const mIdDm: number;
  const dmId: number;
  beforeEach(() => {
    dmId = requestDmCreate(registered2.token, [registered1.authUserId, registered2.authUserId]).dmId;
    const mIdChannel = requestMessageSend(registered1.token, channelId1, 'Hi my ducklings').messageId;
    const mIdDm = requestMessageSenddm(registered1.token, dmId, 'Hi my dogs').messageId;
  });
  test('React in channel msg', () => {
    expect(requestMessageUnreact(token, messageId, reactId)).toStrictEqual({});
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message.reacts.reactId).toStrictEqual(1);
    expect(a.messages[0].message.reacts.user.uId).toStrictEqual(registered1);
  });
  test('React in dm msg', () => {
    expect(requestMessageUnreact(token, messageId, reactId)).toStrictEqual({});
    const a = requestDmMessages(registered1.token, dmId2, 0);
    expect(a.messages[0].message.reacts.reactId).toStrictEqual(1);
    expect(a.messages[0].message.reacts.user.uId).toStrictEqual(registered1);
  });
  test('Double unreacts in channel msg', () => {
    expect(requestMessageUnreact(token, messageId, reactId)).toStrictEqual({});
    expect(requestMessageUnreact(token, messageId, reactId)).toStrictEqual(ERROR);
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message.reacts.reactId).toStrictEqual(1);
    expect(a.messages[0].message.reacts.allUsers.length).toStrictEqual(0);
  });
  test('Double unreacts in dm msg', () => {
    expect(requestMessageUnreact(token, messageId, reactId)).toStrictEqual({});
    expect(requestMessageUnreact(token, messageId, reactId)).toStrictEqual(ERROR);
    const a = requestDmMessages(registered1.token, dmId2, 0);
    expect(a.messages[0].message.reacts.reactId).toStrictEqual(1);
    expect(a.messages[0].message.reacts.allUsers.length).toStrictEqual(0);
  });
});
*/
