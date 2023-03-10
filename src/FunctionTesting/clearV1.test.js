import { clearV1 } from '../other.js';

import { authRegisterV1 } from '../auth.js';

import { channelsListV1, channelsCreateV1, channelsListAllV1 } from './../channels.js'

import {channelJoinV1} from './../channel.js'

import { userProfileV1 } from '../users.js'




describe("three tests", () => {
  

test('Correct return value', () => {


  expect(clearV1()).toStrictEqual({});
});
  
    test('clear the userMember', () => {
      const authID1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;

const channelID1 = channelsCreateV1(authID1, 'Channel 1', true).channelId;

const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui').authUserId;

const channelID2 = channelsCreateV1(authID2, 'Channel 2', true).channelId;

const authID3 = authRegisterV1('lion@qq.com', 'asduif8195', 'agsdfoj', 'antman').authUserId;
channelJoinV1(authID1, channelID1)
expect(userProfileV1(authID2, authID2)).toEqual(
  {user: {
      userId: authID2,
      email: 'Ina@outlook.com',
      nameFirst: 'me',
      nameLast: 'vasdui',
      handleStr: 'mevasdui',
    }}
)
clearV1()
expect(userProfileV1(authID2,authID3)).toStrictEqual({ error: expect.any(String) });
});

  
  
  
  test('clear all channels', () => {
    const authID1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;

const channelID1 = channelsCreateV1(authID1, 'Channel 1', true).channelId;

const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui').authUserId;

const channelID2 = channelsCreateV1(authID2, 'Channel 2', true).channelId;

const authID3 = authRegisterV1('lion@qq.com', 'asduif8195', 'agsdfoj', 'antman').authUserId;
channelJoinV1(authID1, channelID1)
expect(channelsListAllV1(authID1)).toStrictEqual({channels: [
  {
       channelId: authID1,
       channelName: 'Channel 1',
  }]
});
  
  clearV1()
    expect(channelsListAllV1(authID1)).toStrictEqual({error: expect.any(String)});
  });

  



});




