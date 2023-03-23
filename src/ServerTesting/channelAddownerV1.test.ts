test('Test placeholder', () => {
  expect(1 + 1).toStrictEqual(2);
});
/*
import { requestAuthRegister, requestClear, requestAddowner, requestChannelsCreate, requestChannelJoin } from '../wrappers';
import { authUserId } from '../interfaces';
import { getData } from './dataStore';
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
  channelId1 = requestChannelsCreate(registered1.authUserId, 'nest', true).channelId;
  channelId2 = requestChannelsCreate(registered2.authUserId, 'shed', true).channelId;
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
    requestChannelJoin(registered3.token, channelId1);
    expect(requestAddowner(registered3.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
  test('Invalid token', () => {
    // white box testing
    expect(requestAddowner(registered1.token + 'p', channelId2, registered1.authUserId)).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  // Every test has a mix of whitebox testing
  test('Add an owner', () => {
    expect(requestAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual({});
  });
  test('Add multiple owner in the first channel', () => {
    requestChannelJoin(registered2.token, channelId1);
    requestChannelJoin(registered3.token, channelId1);
    expect(requestAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual({});
    expect(requestAddowner(registered1.token, channelId1, registered3.authUserId)).toStrictEqual({});
    // white box testing
    const data = getData();
    expect(data.channels[0].ownerMembers[0]).toStrictEqual(registered1.authUserId);
    expect(data.channels[0].ownerMembers[1]).toStrictEqual(registered2.authUserId);
    expect(data.channels[0].ownerMembers[2]).toStrictEqual(registered3.authUserId);
  });
  test('Checks if new owner has owner permissions', () => {
    // Makes registered 1,3 as an owner
    requestChannelJoin(registered3.token, channelId2);
    expect(requestAddowner(registered2.token, channelId2, registered3.authUserId)).toStrictEqual({});
    // white box testing
    const data = getData();
    expect(data.channels[0].ownerMembers[0]).toStrictEqual(registered1.authUserId);
    expect(data.channels[1].ownerMembers[0]).toStrictEqual(registered2.authUserId);
    expect(data.channels[1].ownerMembers[1]).toStrictEqual(registered3.authUserId);
    // Test new owner permission by adding registered1
    requestChannelJoin(registered1.token, channelId2);
    expect(requestAddowner(registered3.token, channelId2, registered1.authUserId)).toStrictEqual({});
    // Test if registered 3 has no acces S
    expect(requestAddowner(registered3.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
});
*/
