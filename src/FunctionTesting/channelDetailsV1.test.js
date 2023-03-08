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
          let authUserId = authRegisterV1('duck@gmail.com', 1234, 'duck', 'dash');
          let authUserId2 = authRegisterV1('dog@gmail.com', 1234, 'dog', 'drown');
          let courseId1Public = channelsCreateV1((authUserId, 'first', true));
          let courseId2Public = channelsCreateV1((authUserId, 'second', true));
          let courseId3NotPublic = channelsCreateV1((authUserId, 'third', false));

     });
     test('Test for Invalid authUserId', () => expect(channelDetailsV1(authUserId + 1, courseId1Public)).toBe(ERROR));
     test('Test for Invalid courseId', () => expect(channelDetailsV1(authUserId, courseId1Public)).toBe(ERROR));
     test('Test for not a member', () => expect(channelDetailsV1(authUserId2, courseId1Public)).toBe(ERROR));

     test('Test: call function -> public courseId ', () => {
          expect(channelDetailsV1(authUserId, courseId1Public)).toBe({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId],
          });
     });
     test('Test: call function -> non public courseId', () => {
          expect(channelDetailsV1(authUserId, courseId1Public)).toBe({
               channelName: 'third',
               isPublic: false,
               ownerId: authUserId,
               memberIds: [authUserId],
          });
     });
     // * CONFUSION IN CHANNLJOIN AND CHANNEL INV FUNCTION
     test('Test: call function -> channelJoin, and public courseId', () => {
          channelJoinV1(authUserId2, courseId1Public);
          expect(channelDetailsV1(authUserId, courseId1Public)).toBe({
               channelName: 'first',
               isPublic: true,
               ownerId: authUserId,
               memberIds: [authUserId, authUserId2],
          });
     });
     test('Test: call function -> channelInvite, mix public courseId', () => {
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

