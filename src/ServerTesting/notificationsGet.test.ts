
// import { requestAuthRegister, requestClear, requestMessageSend, requestChannelsCreate, requestDmCreate } from '../wrappers';
// import { requestChannelMessages } from '../wrappers';
// import { authUserId } from '../interfaces';

//////////////////////// delete me /////////////////////////
test('stub', () => {
    expect(1 + 1).toStrictEqual(2);
})

////////////////////////////////////////////////////////////

// let registered1: authUserId;
// let registered2: authUserId;
// let channelId1: number;
// let dmId1: number;

// beforeEach(() => {
//     requestClear();
//     registered1 = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash');
//     registered2 = requestAuthRegister('chick@gmail.com', 'chick123', 'chick', 'mafia');
//     channelId1 = requestChannelsCreate(registered1.token, 'nest', true).channelId;
//     dmId1 = requestDmCreate(registered1.token, [registered2.authUserId]).dmId;
//     requestMessageSend(registered2.token, channelId1, '@duckdash, Hi my ducklings')
//     requestMessageSend(registered1.token, channelId1, '@duckdash! Reminder!!')
//     requestMessageSend(registered1.token, dmId1, 'hello @duckdash')

// });

// describe('Function Testing', () => {
//     test('Tags from channels & Dm', () => {
//         expect(requestNotificationsGet(registered1.token)).toStrictEqual([
//             {
//                 channelId: channelId1,
//                 dmId: -1,
//                 notificationMessage: '{duckdash} tagged you in {nest}: @duckdash! Reminder!'
//             },
//             {
//                 channelId: channelId1,
//                 dmId: -1,
//                 notificationMessage: '{chickmafia} tagged you in {nest}: @duckdash, Hi my duck'
//             },
//             {
//                 channelId: -1,
//                 dmId: dmId1,
//                 notificationMessage: '{duckdash} tagged you in {duckdash, chickmafia}: hello @duckdash'
//             }
//         ]);
//     });

//     test('Notif from joining channel', () => {
//         const registered3 = requestAuthRegister('adam@gmail.com', 'adam123', 'adam', 'baqaie');
//         requestChannelInvite(registered1.authUserId, channelId1, registered3.authUserId);
//         requestMessageSend(registered2.token, channelId1, '@adambaqaie hello mate')
//         expect(requestNotificationsGet(registered3.token)).toStrictEqual([
//             {
//                 channelId: channelId1,
//                 dmId: -1,
//                 notificationMessage: '{chickmafia} tagged you in {nest}: hello mate'
//             },
//             {
//                 channelId: channelId1,
//                 dmId: -1,
//                 notificationMessage: '{duckdash} added you to {nest}'
//             }
//         ]);
//     });

//     test('Notif from react', () => {
//         // Get registered 1 to react to registered 2 message
//         expect(requestNotificationsGet(registered2.token)).toStrictEqual([
//             {
//                 channelId: channelId1,
//                 dmId: -1,
//                 notificationMessage: '{duckdash} reacted to your message in {nest}'
//             }
//         ]);
//     })
// });


// describe('Error Cases', () => {
//     test('Invalid token', () => {
//         expect(requestNotificationsGet(registered1.token + Date.now()).error).toStrictEqual({ message: expect.any(String) });
//     });
// });