import { authRegisterV1 } from '../auth.js';
import { clearV1 } from '../other.js';
import { channelsCreateV1 } from '../channels.js';
import { channelJoinV1, channelMessagesV1 } from '../channel';

const authId1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li');
const authId2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui');
const authId3 = authRegisterV1('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase');
const channelId1 = channelsCreateV1(authId1.authUserId, 'Channel 1', true).channelId;
const channelId2 = channelsCreateV1(authId2.authUserId, 'Channel 2', true).channelId;
const channelId3 = channelsCreateV1(authId3.authUserId, 'Channel 3', false).channelId; // a private
channelJoinV1(authId1, channelId1);
channelJoinV1(authId2, channelId2);
channelJoinV1(authId3, channelId3);

beforeEach(() => {
  clearV1();
});

describe('Incorrect input', () => {
  test.each([
    { testName: 'invaild authUserId', authUserId: authId1 + 1, channelId: channelId1, start: 0 },
    { testName: 'start that greater than the total number of messages', authUserId: authId1, channelId: channelId1, start: 250 },
    { testName: 'invaild channelId', authUserId: authId1, channelId: channelId1 + 1, start: 0 },
    { testName: 'channelId is vaild but the authorised user is not a member of the channel', authUserId: authId1, channelId: channelId2, start: 0 },
    { testName: 'invaild channelId and authUserId ', authUserId: authId1 + 1, channelId: (channelId1 + channelId2) / 2, start: 0 },
  ])('Input has $testName', ({ authUserId, channelId, start }) => {
    const authId1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;
    const channelId1 = channelsCreateV1(authId1, 'Channel 1', true).channelId;
    const channelId2 = channelsCreateV1(authId1, 'Channel 2', true).channelId;
    channelJoinV1(authId1, channelId1);
    channelJoinV1(authId2, channelId2);
    channelJoinV1(authId3, channelId3);

    expect(channelMessagesV1(authUserId, channelId, start)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('correct input', () => {
  test('private channel', () => {
    const authId1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;
    const authId2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui').authUserId;
    const authId3 = authRegisterV1('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase').authUserId;
    const channelId1 = channelsCreateV1(authId1, 'Channel 1', true).channelId;
    const channelId2 = channelsCreateV1(authId2, 'Channel 2', true).channelId;
    const channelId3 = channelsCreateV1(authId3, 'Channel 3', false).channelId; // a private
    channelJoinV1(authId1, channelId1);
    channelJoinV1(authId2, channelId2);
    channelJoinV1(authId3, channelId3);

    expect(channelMessagesV1(authId3, channelId3, 0)).toEqual({
      messages: [],
      start: 0,
      end: -1
    });
  });
  // error here channelId3 is invaild

  test('public channel', () => {
    const authId1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;
    const authId2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui').authUserId;
    const authId3 = authRegisterV1('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase').authUserId;
    const channelId1 = channelsCreateV1(authId1, 'Channel 1', true).channelId;
    const channelId2 = channelsCreateV1(authId2, 'Channel 2', true).channelId;
    const channelId3 = channelsCreateV1(authId3, 'Channel 3', false).channelId; // a private
    channelJoinV1(authId1, channelId1);
    channelJoinV1(authId2, channelId2);
    channelJoinV1(authId3, channelId3);

    expect(channelMessagesV1(authId2, channelId2, 0)).toEqual({
      messages: [],
      start: 0,
      end: -1
    });
  });
});

/* note: for black box test, the only situation is there is no message
because there is no function for sending message */
