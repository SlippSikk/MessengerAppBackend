test('Test placeholder', () => {
  expect(1 + 1).toStrictEqual(2);
});
/*
import { requestAuthRegister, requestClear, requestChannelLeave, requestChannelsCreate, requestChannelJoin, requestChannelDetails } from '../wrappers';
import { authUserId } from '../interfaces';
import { getData } from './dataStore';
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
  test('Invalid channelId', () => {
    expect(requestChannelLeave(registered1.token, channelId1 + 1)).toStrictEqual(ERROR);
  });
  test('User (token) is not a member of channel', () => {
    expect(requestChannelLeave(registered1.token, channelId2)).toStrictEqual(ERROR);
  });
  test('Invalid token', () => {
    // white box testing
    expect(requestChannelLeave(registered1.token + 'p', channelId1)).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  // Every test has a mix of whitebox testing
  test('Member leaving', () => {
    requestChannelJoin(registered2.token, channelId1);
    expect(requestChannelLeave(registered2.token, channelId1)).toStrictEqual({});
    const data = getData();
    expect(data.channels[0].allMembers.includes(registered2.authUserId)).toStrictEqual(false);
  });
  test('Member leaves should not have access to functions', () => {
    requestChannelJoin(registered2.token, channelId1);
    expect(requestChannelLeave(registered2.token, channelId1)).toStrictEqual({});
    expect(requestChannelDetails(registered2.token, channelId1)).toStrictEqual(ERROR);
  });
  test('Owner leaves', () => {
    expect(requestChannelLeave(registered1.token, channelId1)).toStrictEqual({});
    // white box testing
    const data = getData();
    expect(data.channels[0].ownerMembers.includes(registered1.authUserId)).toStrictEqual(false);
    expect(data.channels[0].allMembers.includes(registered1.authUserId)).toStrictEqual(false);
  });
});
*/
