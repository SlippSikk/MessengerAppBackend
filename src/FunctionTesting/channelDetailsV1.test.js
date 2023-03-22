
import { authRegisterV1 } from './../auth.js';
import { channelsCreateV1 } from './../channels.js';
import { channelInviteV1, channelJoinV1, channelDetailsV1 } from './../channel.js';
import { clearV1 } from './../other.js';

const ERROR = { error: expect.any(String) };
describe('Test : channelDetailsV1', () => {
  beforeEach(() => {
    clearV1();
  });
  test('Test for Invalid authUserId', () => {
    const authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
    const channelIdPublic1 = channelsCreateV1(authUserId, 'first', true).channelId;
    expect(channelDetailsV1(authUserId + 1, channelIdPublic1)).toStrictEqual(ERROR);
  });
  test('Test for Invalid courseId', () => {
    const authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
    const channelIdPublic1 = channelsCreateV1(authUserId, 'first', true).channelId;
    expect(channelDetailsV1(authUserId, channelIdPublic1 + 1)).toStrictEqual(ERROR);
  });
  test('Test for not a member', () => {
    const authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
    const authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
    const channelIdPublic1 = channelsCreateV1(authUserId, 'first', true).channelId;
    const channelIdPublic2 = channelsCreateV1(authUserId, 'second', true).channelId;
    const channelIdPrivate = channelsCreateV1(authUserId, 'third', false).channelId;
    expect(channelDetailsV1(authUserId2, channelIdPublic1)).toStrictEqual(ERROR);
  });

  test('Test: call function -> public courseId ', () => {
    const authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
    const channelIdPublic1 = channelsCreateV1(authUserId, 'first', true).channelId;
    const channelIdPrivate = channelsCreateV1(authUserId, 'third', false).channelId;
    expect(channelDetailsV1(authUserId, channelIdPublic1)).toStrictEqual({
      name: 'first',
      isPublic: true,
      ownerMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
    });
  });
  test('Test: call function -> non public courseId', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    const authUserId2 = authRegisterV1('dog@gmail.com', '123456', 'dog', 'drown').authUserId;
    const channelIdPublic1 = channelsCreateV1(authUserId, 'first', true).channelId;
    const channelIdPublic2 = channelsCreateV1(authUserId, 'second', true).channelId;
    const channelIdPrivate = channelsCreateV1(authUserId, 'third', false).channelId;
    expect(channelDetailsV1(authUserId, channelIdPrivate)).toStrictEqual({
      name: 'third',
      isPublic: false,
      ownerMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
    });
  });

  // Note: 1.what happens when u join to a closed channel
  //          2. when global owner join channel
  test('Test: channelJoin -> public courseId', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    const authUserId2 = authRegisterV1('dog@gmail.com', '123456', 'dog', 'drown').authUserId;
    const authUserId3 = authRegisterV1('donkey@gmail.com', '123456', 'donkey', 'fly').authUserId;
    const channelIdPublic1 = channelsCreateV1(authUserId, 'first', true).channelId;
    channelJoinV1(authUserId2, channelIdPublic1);
    expect(channelDetailsV1(authUserId, channelIdPublic1)).toStrictEqual({
      name: 'first',
      isPublic: true,
      ownerMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      },
      {
        uId: authUserId2,
        email: 'dog@gmail.com',
        nameFirst: 'dog',
        nameLast: 'drown',
        handleStr: expect.any(String),
      }],
    });
    channelJoinV1(authUserId3, channelIdPublic1);
    expect(channelDetailsV1(authUserId, channelIdPublic1)).toStrictEqual({
      name: 'first',
      isPublic: true,
      ownerMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      },
      {
        uId: authUserId2,
        email: 'dog@gmail.com',
        nameFirst: 'dog',
        nameLast: 'drown',
        handleStr: expect.any(String),
      },
      {
        uId: authUserId3,
        email: 'donkey@gmail.com',
        nameFirst: 'donkey',
        nameLast: 'fly',
        handleStr: expect.any(String),
      }],
    });
  });

  test('Test: channelInvite ->2 public courseId', () => {
    const authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
    const authUserId2 = authRegisterV1('dog@gmail.com', '123456', 'dog', 'drown').authUserId;
    const channelIdPublic1 = channelsCreateV1(authUserId, 'first', true).channelId;
    const channelIdPublic2 = channelsCreateV1(authUserId, 'second', true).channelId;
    const channelIdPrivate = channelsCreateV1(authUserId, 'third', false).channelId;
    channelInviteV1(authUserId, channelIdPublic1, authUserId2);
    expect(channelDetailsV1(authUserId, channelIdPublic1)).toStrictEqual({
      name: 'first',
      isPublic: true,
      ownerMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      },
      {
        uId: authUserId2,
        email: 'dog@gmail.com',
        nameFirst: 'dog',
        nameLast: 'drown',
        handleStr: expect.any(String),
      }],
    });
    channelInviteV1(authUserId, channelIdPrivate, authUserId2);
    expect(channelDetailsV1(authUserId, channelIdPrivate)).toStrictEqual({
      name: 'third',
      isPublic: false,
      ownerMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      }],
      allMembers: [{
        uId: authUserId,
        email: 'duck@gmail.com',
        nameFirst: 'duck',
        nameLast: 'dash',
        handleStr: expect.any(String),
      },
      {
        uId: authUserId2,
        email: 'dog@gmail.com',
        nameFirst: 'dog',
        nameLast: 'drown',
        handleStr: expect.any(String),
      }],
    });
  });
});
