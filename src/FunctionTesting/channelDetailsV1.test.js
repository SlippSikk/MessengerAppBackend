import { authRegisterV1, authLoginV1 } from './../auth.js'
import { channelsListV1, channelsCreateV1, channelsListAllV1 } from './../channels.js'
import { channelMessagesV1, channelInviteV1, channelJoinV1, channelDetailsV1 } from './../channel.js'
import { clearV1 } from './../other.js'

const ERROR = { error: expect.any(String) };
describe('Test : channelDetailsV1', () => {
     beforeEach(() => {
          clearV1();
     });
     test('Test for Invalid authUserId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          expect(channelDetailsV1(authUserId + 1, courseId1Public)).toStrictEqual(ERROR)
     });
     test('Test for Invalid courseId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          expect(channelDetailsV1(authUserId, courseId1Public + 1)).toStrictEqual(ERROR)
     });
     test('Test for not a member', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelDetailsV1(authUserId2, courseId1Public)).toStrictEqual(ERROR)
     });

     test('Test: call function -> public courseId ', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelDetailsV1(authUserId, courseId1Public)).toStrictEqual({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId],
          });
     });
     test('Test: call function -> non public courseId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', '123456', 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelDetailsV1(authUserId, courseId3NotPublic)).toStrictEqual({
               channelName: 'third',
               isPublic: false,
               ownerId: authUserId,
               memberIds: [authUserId],
          });
     });

     //Note: 1.what happens when u join to a closed channel
     //          2. when global owner join channel
     test('Test: channelJoin -> public courseId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', '123456', 'dog', 'drown').authUserId;
          let authUserId3 = authRegisterV1('donkey@gmail.com', '123456', 'donkey', 'fly').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          channelJoinV1(authUserId2, courseId1Public);
          expect(channelDetailsV1(authUserId, courseId1Public)).toStrictEqual({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId, authUserId2],
          });
          channelJoinV1(authUserId3, courseId1Public);
          expect(channelDetailsV1(authUserId, courseId1Public)).toStrictEqual({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId, authUserId2, authUserId3],
          });
     });

     test('Test: channelInvite ->2 public courseId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', '123456', 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', '123456', 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          channelInviteV1(authUserId, courseId1Public, authUserId2);
          expect(channelDetailsV1(authUserId, courseId1Public)).toStrictEqual({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId, authUserId2],
          });
          channelInviteV1(authUserId, courseId3NotPublic, authUserId2);
          expect(channelDetailsV1(authUserId, courseId3NotPublic)).toStrictEqual({
               channelName: 'third',
               isPublic: false,
               ownerId: authUserId,
               memberIds: [authUserId, authUserId2],
          });
     });
});

