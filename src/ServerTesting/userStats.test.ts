import { authUserId, channelId } from '../interfaces';
import { requestUserStats, requestClear, requestAuthRegister, requestChannelsCreate, requestDmCreate, requestMessageSend, requestChanLeavenel} from './../wrappers';

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
    requestChanLeavenel(registered.token, chanId.channelId)
    requestClear();
    registered = requestAuthRegister('adam@gmail.com', 'hello123', 'Adam', 'Baqaie')
    expect(requestUserStats(registered.token).body).toStrictEqual({
        userStats: {
            channelsJoined: [{numChannelsJoined: 0, timeStamp: expect.any(Number)}],
            dmsJoined: [{numDmsJoined: 0, timeStamp: expect.any(Number)}], 
            messagesSent: [{numMessagesSent: 0, timeStamp: expect.any(Number)}], 
            involvementRate: 0 
            }
    });


  });

});

describe('Error Cases', () => {
  test('Invalid token', () => {
    requestClear();
    expect(requestUserStats('h').body.error).toStrictEqual({ message: expect.any(String) });
    expect(requestUserStats('h').statusCode).toBe(403);
  });
});