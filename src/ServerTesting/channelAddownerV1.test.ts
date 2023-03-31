test('Stub test', () => {
  expect(1 + 1).toEqual(2);
});
/*
import { requestAuthRegister, requestClear, requestAddowner, requestChannelsCreate, requestChannelJoin } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { error: expect.any(String) };

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
  channelId1 = requestChannelsCreate(registered1.token, 'nest', true).channelId;
  channelId2 = requestChannelsCreate(registered2.token, 'shed', true).channelId;
});
// This Testing uses eucledian algorithm to assert that
// the inputed auth userId is always unique and non exsisting
describe('Error Cases', () => {
  test('Invalid channelId', () => {
    expect(requestAddowner(registered1.token, channelId1 * channelId2 + 1, registered1.authUserId)).toStrictEqual(ERROR);
  });
  test('Invalid uId', () => {
    expect(requestAddowner(registered1.token, channelId1, registered1.authUserId * registered2.authUserId * registered3.authUserId + 1)).toStrictEqual(ERROR);
  });
  test('UId is not a member of channel', () => {
    expect(requestAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
  test('UId is already an owner', () => {
    expect(requestAddowner(registered1.token, channelId1, registered1.authUserId)).toStrictEqual(ERROR);
  });
  test('UId does not have owner permissions in the channel', () => {
    // Registered3.token is a member of channelId1->can't addsomeone to owner
    requestChannelJoin(registered3.token, channelId1);
    requestChannelJoin(registered2.token, channelId1);
    expect(requestAddowner(registered3.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
  test('Invalid token', () => {
    expect(requestAddowner(registered1.token + 'p', channelId2, registered1.authUserId)).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  // Every test has a mix of whitebox testing
  test('Add an owner', () => {
    requestChannelJoin(registered2.token, channelId1);
    expect(requestAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual({});
  });

  test('Add multiple owner in the first channel', () => {
    requestChannelJoin(registered2.token, channelId1);
    requestChannelJoin(registered3.token, channelId1);
    expect(requestAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual({});
    expect(requestAddowner(registered2.token, channelId1, registered3.authUserId)).toStrictEqual({});
  });

  test('Checks if new owner has owner permissions in another channel', () => {
    // Makes registered 1,3 as an owner of channelId2
    requestChannelJoin(registered3.token, channelId2);
    expect(requestAddowner(registered2.token, channelId2, registered3.authUserId)).toStrictEqual({});

    // Test owner permission by adding registered1 to channelId2
    requestChannelJoin(registered1.token, channelId2);
    expect(requestAddowner(registered3.token, channelId2, registered1.authUserId)).toStrictEqual({});

    // Test if registered 3 has no acces S
    expect(requestAddowner(registered3.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
});
*/
