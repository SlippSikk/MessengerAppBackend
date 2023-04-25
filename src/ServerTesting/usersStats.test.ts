import { authUserId, channelId } from '../interfaces';
import { requestUsersStats, requestClear, requestAuthRegister, requestChannelsCreate, requestDmCreate, requestMessageSend} from './../wrappers';

// test success cases
let registered: authUserId;
let chanId: channelId
let num: number = 1;
describe('Success Test', () => {
  
  test('Get Stats', () => {
    requestClear();
    registered = requestAuthRegister('adam@gmail.com', 'hello123', 'Adam', 'Baqaie');
    chanId = requestChannelsCreate(registered.token, 'nest', false).body;
    requestDmCreate(registered.token, []);
    requestMessageSend(registered.token, chanId.channelId, 'Hello');
    expect(requestUsersStats(registered.token).body).toStrictEqual({
        userStats: {
            channelsExist: [{numChannelsExist: 0, timeStamp: 0},{numChannelsExist: 1, timeStamp: expect.any(Number)}],
            dmsExist: [{numDmsExist: 0, timeStamp: 0}, {numDmsExist: 1, timeStamp: expect.any(Number)}], 
            messagesExist: [{numMessagesExist: 0, timeStamp: 0}, {numMessagesExist: 1, timeStamp: expect.any(Number)}], 
            involvementRate: 1 
            }
    });


  });

});

describe('Error Cases', () => {
  test('Invalid token', () => {
    requestClear();
    expect(requestUsersStats('h').body.error).toStrictEqual({ message: expect.any(String) });
    expect(requestUsersStats('h').statusCode).toBe(403);
  });
});