import { request } from 'http';
import { authUserId, channelId } from '../interfaces';
import { requestUserStats, requestClear, requestAuthRegister, requestChannelsCreate, requestDmCreate, requestMessageSend} from './../wrappers';

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
    expect(requestUserStats(registered.token).toStrictEqual({
        userStats: {
             channelsJoined: [{numChannelsJoined: 1, timeStamp: expect.any(Number)}],
             dmsJoined: [{numDmsJoined: 1, timeStamp: expect.any(Number)}], 
             messagesSent: [{numMessagesSent: 1, timeStamp: expect.any(Number)}], 
             involvementRate: 1 
            }
    }))


  });

});

