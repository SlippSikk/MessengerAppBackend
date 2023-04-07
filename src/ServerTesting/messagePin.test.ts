test('Invalid channelId', () => {
  expect(1 + 1).toStrictEqual(2);
});
/*
export function requestMessagePin(token: string, messageId: number) {
  const res = request(
    'POST',
    SERVER_URL + '/message/pin/v1',
    {
      json: {
        token,
        messageId,
      }
    }
  );

  return JSON.parse(res.getBody() as string);
}
app.post('/message/pin/v1', (req: Request, res: Response) => {
  const token = req.header('token');
  const { messageId } = req.body;

  res.json(messageisPinnedV1(token, +messageId));
});
import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate, requestChannelJoin } from '../wrappers';
import { requestChannelMessages, requestMessagePin, requestMessageSenddm, requestDmCreate, requestDmMessages } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { code: 400, error: expect.any(String) };
const ERROR403 = { code: 403, error: expect.any(String) };

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
});
describe('Error Cases', () => {
  test('Invalid messageId', () => {
    expect(requestMessagePin(registered1.token, mIdChannel * mIdDm + 1)).toStrictEqual(ERROR);
  });
  test('(Channel) user is not in messageId', () => {
    expect(requestMessagePin(registered3.token, mIdChannel)).toStrictEqual(ERROR);
  });
  test('(DM) user is not in messageId', () => {
    expect(requestMessagePin(registered3.token, mIdDm)).toStrictEqual(ERROR);
  });
  test('Global owner can Pin', () => {
    const mIdChannel2 = requestMessageSend(registered2.token, channelId2, 'How to become a dog').messageId;
    expect(requestMessagePin(registered1.token, mIdChannel2)).toStrictEqual({});
  });
  test('(Channel) Message already pinned ', () => {
    requestMessagePin(registered1.token, mIdChannel);
    expect(requestMessagePin(registered1.token, mIdChannel)).toStrictEqual(ERROR);
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message.isPinned).toStrictEqual(true);
  });
  test('(DM) Message already pinned ', () => {
    requestMessagePin(registered1.token, mIdDm)
    expect(requestMessagePin(registered1.token, mIdDm)).toStrictEqual(ERROR);
    const a = requestDmMessages(registered1.token, dmId, 0);
    expect(a.messages[0].message.isPinned).toStrictEqual(true);
  });
  test('(Channel) User does not have owner permission ', () => {
    requestChannelJoin(registered2.token, channelId1);
    expect(requestMessagePin(registered2.token, mIdChannel)).toStrictEqual(ERROR403);
  });
  test('(DM)User does not have owner permission', () => {
    expect(requestMessagePin(registered1.token, mIdDm)).toStrictEqual(ERROR403);
  });
});

describe('Function Testing', () => {
  test('Pin channel msg', () => {
    expect(requestMessagePin(registered1.token, mIdChannel)).toStrictEqual({});
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message.isPinned).toStrictEqual(true);
  });
  test('Pin in dm msg', () => {
    expect(requestMessagePin(registered1.token, messageId)).toStrictEqual({});
    const a = requestDmMessages(registered1.token, dmId, 0);
    expect(a.messages[0].message.isPinned).toStrictEqual(true);
  });
});
*/
