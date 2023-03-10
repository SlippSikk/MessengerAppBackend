import { authRegisterV1 } from '../auth.js'
import { clearV1 } from '../other.js'
import { channelsCreateV1 } from '../channels.js'
import{channelInviteV1,channelJoinV1, channelMessagesV1} from '../channel'

const authID1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li');
const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui');
const authID3 = authRegisterV1('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase');
const channelID1 = channelsCreateV1(authID1.authUserId, 'Channel 1', true).channelId
const channelID2 = channelsCreateV1(authID2.authUserId, 'Channel 2', true).channelId
const channelID3 = channelsCreateV1(authID3.authUserId, 'Channel 3', false).channelId  //a private 
channelJoinV1(authID1,channelID1)
channelJoinV1(authID2,channelID2)
channelJoinV1(authID3,channelID3)

beforeEach(() => {
    clearV1();
    
  });

describe("Incorrect input", () => {
    test.each([
        { testName: 'invaild authUserId', authUserId:810, channelId:channelID1, start:0  },
        { testName: 'start that greater than the total number of messages', authUserId:authID1, channelId:channelID1, start:250 },
        { testName: 'invaild channelId', authUserId:authID2, channelId:channelID1 + 1, start:0  },
        { testName: 'channelId is vaild but the authorised user is not a member of the channel', authUserId:authID1, channelId:channelID2, start:0 },
        { testName: 'invaild channelId and authUserId ', authUserId:810, channelId:233, start:0 },
    ])('Input has $testName', ({ authUserId, channelId, start }) => {
        expect(channelMessagesV1(authUserId, channelId, start)).toStrictEqual({ error: expect.any(String) });
    });
});

describe('correct input', () => {
    test ('private channel', () => {
        const authID1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;
        const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui').authUserId;
        const authID3 = authRegisterV1('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase').authUserId;
        const channelID1 = channelsCreateV1(authID1, 'Channel 1', true).channelId
        const channelID2 = channelsCreateV1(authID2, 'Channel 2', true).channelId
        const channelID3 = channelsCreateV1(authID3, 'Channel 3', false).channelId  //a private 
        channelJoinV1(authID1,channelID1)
        channelJoinV1(authID2,channelID2)
        channelJoinV1(authID3,channelID3)

        expect(channelMessagesV1(authID3, channelID3, 0)).toEqual({messages: [],
            start: 0,
            end: -1})
    });
            //error here channelID3 is invaild


    test ('public channel', () => {
        const authID1 = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li').authUserId;
        const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui').authUserId;
        const authID3 = authRegisterV1('ichiru@qq.com', 'asduif8195', 'ichiru', 'shirase').authUserId;
        const channelID1 = channelsCreateV1(authID1, 'Channel 1', true).channelId
        const channelID2 = channelsCreateV1(authID2, 'Channel 2', true).channelId
        const channelID3 = channelsCreateV1(authID3, 'Channel 3', false).channelId  //a private 
        channelJoinV1(authID1,channelID1)
        channelJoinV1(authID2,channelID2)
        channelJoinV1(authID3,channelID3)

        expect(channelMessagesV1(authID2, channelID2, 0)).toEqual({messages: [],
            start: 0,
            end: -1})
    });
});

/* note: for black box test, the only situation is there is no message
because there is no function for sending message*/
