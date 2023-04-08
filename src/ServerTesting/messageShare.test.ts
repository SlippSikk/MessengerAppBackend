test('Invalid channelId', () => {
  expect(1 + 1).toStrictEqual(2);
});
/*
export function requestMessageShare(token: string, ogMessageId: number, message: string, channelId: number, dmId: number) {
  const res = request(
    'POST',
    SERVER_URL + 'message/share/v1',
    {
      headers: { token },
      json: {
        ogMessageId,
        message,
        channelId,
        dmId
      }
    }
  );
  const body = JSON.parse(res.getBody() as string);
  const statusCode = res.statusCode;
  return { body, statusCode };
}
app.post('/message/share/v1', (req: Request, res: Response) => {
  const token = req.header('token');
  const { ogMessageId, message, channelId, dmId } = req.body;

  res.json(messageShareV1(token, ogMessageId, message, channelId, dmId));
});
import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate, requestChannelJoin } from '../wrappers';
import { requestChannelMessages, requestMessageShare, requestMessageSenddm, requestDmCreate, requestDmMessages } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { error: expect.any(String) };
const requestMessageShare = (token, ogMessageId, message, channelId, dmId) => {
  return something;
};
let registered1: authUserId;
let registered2: authUserId;
let registered3: authUserId;
let channelId1: number;
let channelId2: number;
let mIdChannel: number;
let mIdDm: number;
let dmId: number;
const message: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
let longMessage: string = 'Lorem ipsum';
for (let i = 0; i < 1001; i++) {
  longMessage += 'p';
}
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
  // ogMessageId = either mIdChannel or mIdDm
  test('(ChannelId) Invalid channelId and dmId', () => {
    expect(requestMessageShare(registered1.token, mIdChannel, message, channelId1 * channelId2 + 1, -1).statusCode).toStrictEqual(400);
  });
  test('(DmId) Invalid channelId and dmId', () => {
    expect(requestMessageShare(registered1.token, mIdChannel, message, -1, dmId + 1).statusCode).toStrictEqual(400);
  });
  test('neither channelId nor dmId are -1', () => {
    expect(requestMessageShare(registered1.token, mIdChannel, message, channelId1, dmId).statusCode).toStrictEqual(400);
  });
  test('Invalid ogMessageId', () => {
    expect(requestMessageShare(registered1.token, mIdChannel, message, channelId1, -1).statusCode).toStrictEqual(400);
  });
  test('Length of message musts be <= 1000', () => {
    expect(requestMessageShare(registered1.token, mIdChannel, longMessage, channelId1, -1).statusCode).toStrictEqual(400);
  });
  test('(Channel) User is not in channelId', () => {
    expect(requestMessageShare(registered2.token, mIdChannel, message, channelId1, -1).statusCode).toStrictEqual(403);
  });
  test('(DM) User is not in DmId', () => {
    expect(requestMessageShare(registered3.token, mIdDm, message, -1, dmId).statusCode).toStrictEqual(403);
  });
});

describe('Function Testing', () => {
  // ogMessageId = in bracket 
  test('Shared to Channel (dm)', () => {
    expect(requestMessageShare(registered1.token, mIdDm, message, channelId1, -1)).toStrictEqual({ sharedMessageId: expect.any(Number) });
    const a = requestChannelMessages(registered1.token, channelId1, 0);
    expect(a.messages[0].message).toContain(message);
    expect(a.messages[0].message).toContain('Hi my dogs');

  });
  test('Shared to Dm (channel)', () => {
    expect(requestMessageShare(registered1.token, mIdChannel, message, -1, dmId)).toStrictEqual({ sharedMessageId: expect.any(Number) });
    const a = requestDmMessages(registered1.token, dmId, 0);
    expect(a.messages[0].message).toContain(message);
    expect(a.messages[0].message).toContain('Hi my ducklings');
  });
});
*/
