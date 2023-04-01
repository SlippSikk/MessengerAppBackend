
import { requestAuthRegister, requestClear, requestChannelLeave, requestChannelsCreate, requestChannelJoin, requestChannelDetails } from '../wrappers';
import { requestChannelAddowner } from '../wrappers';
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
  test('Invalid channelId', () => {
    expect(requestChannelLeave(registered1.token, channelId1 * channelId2 + 1)).toStrictEqual(ERROR);
  });
  test('User (token) is not a member of channel', () => {
    expect(requestChannelLeave(registered1.token, channelId2)).toStrictEqual(ERROR);
  });
  test('Invalid token', () => {
    expect(requestChannelLeave(registered1.token + registered1.token + 'p', channelId1)).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {
  test('Member leaving', () => {
    expect(requestChannelJoin(registered2.token, channelId1));
    expect(requestChannelJoin(registered2.token, channelId1)).toStrictEqual(ERROR);
    expect(requestChannelLeave(registered2.token, channelId1)).toStrictEqual({});
    expect(requestChannelLeave(registered2.token, channelId1)).toStrictEqual(ERROR);
    expect(requestChannelJoin(registered2.token, channelId1));
    expect(requestChannelJoin(registered2.token, channelId1)).toStrictEqual(ERROR);
  });
  test('Owner leaves', () => {
    expect(requestChannelLeave(registered1.token, channelId1)).toStrictEqual({});
    expect(requestChannelLeave(registered1.token, channelId1)).toStrictEqual(ERROR);
    expect(requestChannelJoin(registered1.token, channelId1));
    expect(requestChannelJoin(registered1.token, channelId1)).toStrictEqual(ERROR);
    expect(requestChannelJoin(registered2.token, channelId1));
    // Check if owner Id is removed when leaving the channel
    expect(requestChannelAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
  test('Owner leaves (not original owner)', () => {
    expect(requestChannelJoin(registered2.token, channelId1)).toStrictEqual({});
    expect(requestChannelAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual({});
    expect(requestChannelLeave(registered2.token, channelId1)).toStrictEqual({});
    expect(requestChannelAddowner(registered1.token, channelId1, registered2.authUserId)).toStrictEqual(ERROR);
  });
});
