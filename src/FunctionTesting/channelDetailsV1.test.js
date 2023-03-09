import { authRegisterV1, authLoginV1 } from './../auth.js'
import { channelMessagesV1, channelInviteV1, channelJoinV1, channelDetailsV1 } from './../auth.js'
import { channelsListV1, channelsCreateV1, channelsListAllV1 } from './../channels.js'
import { clearV1 } from './../other.js'

const ERROR = { error: expect.any(String) };
describe('test channelDetailsV1', () => {
     //Check authUserId
     //  uses an invalid authUserId
     beforeEach(() => {
          clearV1();
     });
     test('Test for Invalid authUserId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
          console.log(authUserId);
          console.log(authUserId2);
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;

          console.log(courseId1Public);
          console.log(courseId3NotPublic);

          expect(channelDetailsV1(authUserId + 1, courseId1Public)).toBe(ERROR)
     });
     test('Test for Invalid courseId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelDetailsV1(authUserId, courseId1Public + 1)).toBe(ERROR)
     });
     test('Test for not a member', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelDetailsV1(authUserId2, courseId1Public)).toBe(ERROR)
     });

     test('Test: call function -> public courseId ', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelDetailsV1(authUserId, courseId1Public)).toBe({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId],
          });
     });
     test('Test: call function -> non public courseId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          expect(channelDetailsV1(authUserId, courseId1Public)).toBe({
               channelName: 'third',
               isPublic: false,
               ownerId: authUserId,
               memberIds: [authUserId],
          });
     });
     // * CONFUSION IN CHANNLJOIN AND CHANNEL INV FUNCTION
     test('Test: call function -> channelJoin, and public courseId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          channelJoinV1(authUserId2, courseId1Public);
          expect(channelDetailsV1(authUserId, courseId1Public)).toBe({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId, authUserId2],
          });
     });
     test('Test: call function -> channelInvite, mix public courseId', () => {
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash').authUserId;
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown').authUserId;
          let courseId1Public = channelsCreateV1(authUserId, 'first', true).channelId;
          let courseId2Public = channelsCreateV1(authUserId, 'second', true).channelId;
          let courseId3NotPublic = channelsCreateV1(authUserId, 'third', false).channelId;
          let uId = authUserId;
          channelInviteV1(authUserId2, courseId1Public, uId);
          expect(channelDetailsV1(authUserId, courseId1Public)).toBe({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId, authUserId2],
          });
          channelInviteV1(authUserId2, courseId3NotPublic, uId);
          expect(channelDetailsV1(authUserId, courseId1Public)).toBe({
               channelName: 'third',
               isPublic: false,
               ownerId: authUserId,
               memberIds: [authUserId, authUserId2],
          });
     });
});

