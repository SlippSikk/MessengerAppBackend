import { requestAuthRegister, requestChannelJoin, requestClear, requestMessageSend, requestChannelsCreate } from '../wrappers';
import { requestChannelMessages, requestMessagePin, requestMessageSenddm, requestDmCreate, requestDmMessages } from '../wrappers';
import { authUserId } from '../interfaces';
import { requestPermissionChange } from '../XujiWrap';
let registered1: authUserId;
let registered2: authUserId;
let registered3: authUserId;
let channelId1: number;
let channelId2: number;
let mIdChannel: number;
let mIdChannel2: number;
let mIdDm: number;
let dmId: number;
beforeEach(() => {
  requestClear();
  registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
  registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
  registered3 = requestAuthRegister('dog@gmail.com', 'hound123', 'dog', 'drown');
  channelId1 = requestChannelsCreate(registered1.token, 'nest', true).body.channelId;
  channelId2 = requestChannelsCreate(registered2.token, 'shed', true).body.channelId;
  dmId = requestDmCreate(registered2.token, [registered1.authUserId]).dmId;
  mIdChannel = requestMessageSend(registered1.token, channelId1, 'Hi my ducklings').body.messageId;
  mIdChannel2 = requestMessageSend(registered2.token, channelId2, 'Hi my ducklings!').body.messageId;
  mIdDm = requestMessageSenddm(registered1.token, dmId, 'Hi my dogs').body.messageId;
});
describe('Error Cases and Function Testing', () => {
  test('Invalid messageId', () => {
    expect(requestMessagePin(registered1.token, mIdChannel * mIdDm + 1).statusCode).toStrictEqual(400);
  });
  test('(Channel) user is not in messageId', () => {
    expect(requestMessagePin(registered3.token, mIdChannel).statusCode).toStrictEqual(400);
  });
  test('(DM) user is not in messageId', () => {
    expect(requestMessagePin(registered3.token, mIdDm).statusCode).toStrictEqual(400);
  });

  test('Global owner can Pin, even if the permission have been changed for a round', () => {
    expect(requestPermissionChange(registered1.token, registered2.authUserId, 1).body).toStrictEqual({});
    expect(requestPermissionChange(registered2.token, registered1.authUserId, 2).body).toStrictEqual({});
    const mIdChannel2 = requestMessageSend(registered2.token, channelId2, 'How to become a dog').body.messageId;
    expect(requestMessagePin(registered2.token, mIdChannel2).body).toStrictEqual({});
  });
  test('(Channel) Message already pinned ', () => {
    expect(requestMessagePin(registered1.token, mIdChannel).body).toStrictEqual({});
    expect(requestMessagePin(registered1.token, mIdChannel).statusCode).toStrictEqual(400);
    const a = requestChannelMessages(registered1.token, channelId1, 0).body;
    expect(a.messages[0].isPinned).toStrictEqual(true);
  });
  test('(DM) Message already pinned ', () => {
    expect(requestMessagePin(registered2.token, mIdDm).body).toStrictEqual({});
    expect(requestMessagePin(registered2.token, mIdDm).statusCode).toStrictEqual(400);
    const a = requestDmMessages(registered2.token, dmId, 0).body;
    expect(a.messages[0].isPinned).toStrictEqual(true);
  });
  test('(Channel) User does not have owner permission ', () => {
    requestChannelJoin(registered2.token, channelId1);
    expect(requestMessagePin(registered2.token, mIdChannel).statusCode).toStrictEqual(403);
  });
  test('Permission changing test in channel message pin', () => {
    expect(requestPermissionChange(registered1.token, registered2.authUserId, 1).body).toStrictEqual({});
    expect(requestPermissionChange(registered2.token, registered1.authUserId, 2).body).toStrictEqual({}); // let user2 become the only global owner
    requestChannelJoin(registered1.token, channelId2);
    expect(requestMessagePin(registered1.token, mIdChannel2).statusCode).toStrictEqual(403); // user 1 not global user and owner of channel2
  });
  test('(DM)User does not have owner permission', () => {
    expect(requestMessagePin(registered1.token, mIdDm).statusCode).toStrictEqual(403);
  });
});
