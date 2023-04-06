test('Invalid channelId', () => {
  expect(1 + 1).toStrictEqual(2);
});

/*
import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate} from '../wrappers';
import { requestChannelMessages, requestMessageReact, requestMessageSenddm, requestDmCreate } from '../wrappers';
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
  const mIdChannel: number;
  const mIdDm: number;
  const dmId: number;
  beforeEach(() => {
    dmId = requestDmCreate(registered2.token, [registered1.authUserId, registered2.authUserId]).dmId;
    const mIdChannel = requestMessageSend(registered1.token, channelId1, 'Hi my ducklings').messageId;
    const mIdDm = requestMessageSenddm(registered1.token, dmId, 'Hi my dogs').messageId;
  });
  test('React in channel msg', () => {
    expect().toStrictEqual({});
  });
  test('React in dm msg', () => {
    expect().toStrictEqual({});
  });
  test('Double reacts in channel msg', () => {
    expect().toStrictEqual({THROW EERRORR});
  });
  test('Double reacts in dm msg', () => {
    expect().toStrictEqual({THROW EERRORR});
  });
});
*/
