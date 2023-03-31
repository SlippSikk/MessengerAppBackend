
import { requestAuthRegister, requestClear, requestChannelsCreate, requestChannelJoin, requestChannelInvite, requestChannelDetails } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { error: expect.any(String) };

let registered1: authUserId;
let channelId1: number;

beforeEach(() => {
  requestClear();
  registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
  channelId1 = requestChannelsCreate(registered1.token, 'first', true).channelId;
});
describe('Error cases', () => {

  test('Test for Invalid authUserId', () => {
    expect(requestChannelDetails(registered1.token + 'p', channelId1)).toStrictEqual(ERROR);
  });
  test('Test for Invalid courseId', () => {
    expect(requestChannelDetails(registered1.token, channelId1 + 1)).toStrictEqual(ERROR);
  });
  test('Test for not a member', () => {
    const registered2 = requestAuthRegister('dog@gmail.com', 'hound123', 'dog', 'drown');
    expect(requestChannelDetails(registered2.token, channelId1)).toStrictEqual(ERROR);
  });
});

describe('Function Testing', () => {

  test('Test: call function -> public courseId ', () => {
    expect(requestChannelDetails(registered1.token, channelId1)).toStrictEqual({
      name: 'first',
      isPublic: true,
      ownerMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
    });
  });
  test('Test: call function -> non public courseId', () => {
    const channelIdPrivate = requestChannelsCreate(registered1.token, 'third', false).channelId;
    expect(requestChannelDetails(registered1.token, channelIdPrivate)).toStrictEqual({
      name: 'third',
      isPublic: false,
      ownerMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Test: channelJoin -> public courseId', () => {
    const registered2 = requestAuthRegister('dog@gmail.com', 'hound123', 'dog', 'drown');
    const registered3 = requestAuthRegister('donkey@gmail.com', '123456', 'donkey', 'fly');
    console.log(requestChannelJoin(registered2.token, channelId1));
    console.log(requestChannelDetails(registered1.token, channelId1));
    expect(requestChannelDetails(registered1.token, channelId1)).toStrictEqual({
      name: 'first',
      isPublic: true,
      ownerMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      },
      {
        uId: registered2.authUserId,
        email: 'dog@gmail.com',
        nameFirst: 'dog',
        nameLast: 'drown',
        handleStr: expect.any(String),
      }],
    });
    requestChannelJoin(registered3.token, channelId1);
    expect(requestChannelDetails(registered1.token, channelId1)).toStrictEqual({
      name: 'first',
      isPublic: true,
      ownerMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      },
      {
        uId: registered2.token,
        email: 'dog@gmail.com',
        nameFirst: 'dog',
        nameLast: 'drown',
        handleStr: expect.any(String),
      },
      {
        uId: registered3.token,
        email: 'donkey@gmail.com',
        nameFirst: 'donkey',
        nameLast: 'fly',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Test: channelInvite ->2 public courseId', () => {
    const registered2 = requestAuthRegister('dog@gmail.com', 'hound123', 'dog', 'drown');
    const channelIdPrivate = requestChannelsCreate(registered1.token, 'third', false).channelId;
    requestChannelInvite(registered1.token, channelId1, registered2.authUserId);
    expect(requestChannelDetails(registered1.token, channelId1)).toStrictEqual({
      name: 'first',
      isPublic: true,
      ownerMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      },
      {
        uId: registered2.authUserId,
        email: 'dog@gmail.com',
        nameFirst: 'dog',
        nameLast: 'drown',
        handleStr: expect.any(String),
      }],
    });
    requestChannelInvite(registered1.token, channelIdPrivate, registered2.authUserId);
    expect(requestChannelDetails(registered1.token, channelIdPrivate)).toStrictEqual({
      name: 'third',
      isPublic: false,
      ownerMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: registered1.authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      },
      {
        uId: registered2.authUserId,
        email: 'dog@gmail.com',
        nameFirst: 'dog',
        nameLast: 'drown',
        handleStr: expect.any(String),
      }]
    });
  });
});
