
import { requestAuthRegister, requestClear, requestChannelLeave, requestChannelsCreate, requestChannelJoin } from '../wrappers';
import { requestChannelAddowner } from '../wrappers';
import { authUserId } from '../interfaces';
// import { requestStandupStart } from '../wrappers';

let registered1: authUserId;
let registered2: authUserId;
let channelId1: number;
let channelId2: number;

beforeEach(() => {
  requestClear();
  registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
  registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
  channelId1 = requestChannelsCreate(registered1.token, 'nest', true).body.channelId;
  channelId2 = requestChannelsCreate(registered2.token, 'shed', true).body.channelId;
});

describe('Error Cases', () => {
  test('Invalid channelId', () => {
    expect(requestChannelLeave(registered1.token, channelId1 * channelId2 + 1).statusCode).toStrictEqual(400);
  });
  test('User (token) is not a member of channel', () => {
    expect(requestChannelLeave(registered1.token, channelId2).statusCode).toStrictEqual(403);
  });
  test('Invalid token', () => {
    expect(requestChannelLeave(registered1.token + registered1.token + 'p', channelId1).statusCode).toStrictEqual(400);
  });
  // test('Standup is active', () => {
  //   requestStandupStart(channelId1, 10);
  //   expect(requestChannelLeave(registered1.token, channelId1).statusCode).toStrictEqual(400);
  // });
});

describe('Function Testing', () => {
  test('Member leaving', () => {
    requestChannelJoin(registered2.token, channelId1);
    expect(requestChannelLeave(registered2.token, channelId1).body).toStrictEqual({});
    expect(requestChannelLeave(registered2.token, channelId1).statusCode).toStrictEqual(403);
  });
  test('Owner leaves', () => {
    expect(requestChannelLeave(registered1.token, channelId1).body).toStrictEqual({});
    expect(requestChannelLeave(registered1.token, channelId1).statusCode).toStrictEqual(403);
    requestChannelJoin(registered1.token, channelId1);
    requestChannelJoin(registered2.token, channelId1);
    // Check if owner Id is removed when leaving the channel
    expect(requestChannelAddowner(registered1.token, channelId1, registered2.authUserId).statusCode).toStrictEqual(403);
  });
  test('Owner leaves (not original owner)', () => {
    requestChannelJoin(registered2.token, channelId1);
    expect(requestChannelAddowner(registered1.token, channelId1, registered2.authUserId).body).toStrictEqual({});
    expect(requestChannelLeave(registered2.token, channelId1).body).toStrictEqual({});
    expect(requestChannelAddowner(registered1.token, channelId1, registered2.authUserId).statusCode).toStrictEqual(400);
  });
});
