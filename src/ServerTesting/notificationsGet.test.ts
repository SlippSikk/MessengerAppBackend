
import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate, requestDmCreate } from '../wrappers';
import { requestChannelMessages } from '../wrappers';
import { authUserId } from '../interfaces';
const ERROR = { error: expect.any(String) };

let registered1: authUserId;
let registered2: authUserId;
let channelId1: number;
let dmId1: number;

beforeEach(() => {
    requestClear();
    registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
    registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
    channelId1 = requestChannelsCreate(registered1.token, 'nest', true).channelId;
    dmId1 = requestDmCreate(registered1.token, [registered2.authUserId]).dmId;
    requestMessageSend(registered2.token, channelId1, '@duckdash, Hi my ducklings')
    requestMessageSend(registered1.token, channelId1, '@duckdash! Reminder!!')

});

describe('Function Testing', () => {
    test('Notifications from channels', () => {
        expect(requestNotificationsGet(registered1.token)).toStrictEqual([
            {
                channelId: channelId1,
                dmId: -1,
                notificationMessage: ''
            },
        ]);
        // const a = requestChannelMessages(registered1.token, channelId1, 0);
        // expect(a.messages[0].message).toStrictEqual('Hi my ducklings');
    });
    test('Send two messages in the same channel', () => {
        expect(requestMessageSend(registered1.token, channelId1, 'Hi my ducklings')).toStrictEqual({ messageId: expect.any(Number) });
        expect(requestMessageSend(registered1.token, channelId1, 'How to get bread ?')).toStrictEqual({ messageId: expect.any(Number) });
        const a = requestChannelMessages(registered1.token, channelId1, 0);
        expect(a.messages[0].message).toStrictEqual('Hi my ducklings');
        expect(a.messages[1].message).toStrictEqual('How to get bread ?');
    });
    test('Send four messages in the two channels', () => {
        expect(requestMessageSend(registered1.token, channelId1, 'one')).toStrictEqual({ messageId: expect.any(Number) });
        expect(requestMessageSend(registered2.token, channelId2, 'two')).toStrictEqual({ messageId: expect.any(Number) });
        expect(requestMessageSend(registered1.token, channelId1, 'three')).toStrictEqual({ messageId: expect.any(Number) });
        expect(requestMessageSend(registered2.token, channelId2, 'four')).toStrictEqual({ messageId: expect.any(Number) });

        const a = requestChannelMessages(registered1.token, channelId1, 0);
        const b = requestChannelMessages(registered2.token, channelId2, 0);

        expect(a.messages[0].message).toStrictEqual('one');
        expect(a.messages[1].message).toStrictEqual('three');
        expect(b.messages[0].message).toStrictEqual('two');
        expect(b.messages[1].message).toStrictEqual('four');
    });
});


// describe('Error Cases', () => {
//     test('Invalid channelId', () => {
//       expect(requestMessageSend(registered1.token, channelId1 * channelId2 + 1, 'Hi my ducklings')).toStrictEqual(ERROR);
//     });
//     test('Message must be between 1 to 1000 letters', () => {
//       expect(requestMessageSend(registered1.token, channelId1, '')).toStrictEqual(ERROR);
//     });
//     test('Message must be between 1 to 1000 letters', () => {
//       let fullChar = '';
//       for (let i = 0; i < 1001; i++) {
//         fullChar += 'p';
//       }
//       expect(requestMessageSend(registered1.token, channelId1, fullChar)).toStrictEqual(ERROR);
//     });
//     test('User is not member of channel', () => {
//       expect(requestMessageSend(registered1.token, channelId2, 'Lets dance')).toStrictEqual(ERROR);
//     });
//     test('Invalid token', () => {
//       expect(requestMessageSend(registered1.token + registered2.token + 'p', channelId1, 'Lets dance')).toStrictEqual(ERROR);
//     });
//   });