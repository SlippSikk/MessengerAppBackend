import { authUserId, channelId } from '../interfaces';
import { requestUsersStats, requestClear, requestAuthRegister, requestChannelsCreate, requestDmCreate, requestMessageSend, requestMessageRemove, requestDmRemove} from './../wrappers';

// test success cases
let registered: authUserId;
let chanId: channelId
let Id: number
describe('Success Test', () => {
  
  test('Get Stats', () => {
    requestClear();
    registered = requestAuthRegister('adam@gmail.com', 'hello123', 'Adam', 'Baqaie');
    chanId = requestChannelsCreate(registered.token, 'nest', false).body;
    const dmId = requestDmCreate(registered.token, []).dmId;
    Id = requestMessageSend(registered.token, chanId.channelId, 'Hello').body.messageId;
    requestMessageRemove(registered.token, Id);
    requestDmRemove(registered.token, dmId);
    expect(requestUsersStats(registered.token).body).toStrictEqual({
        workspaceStats: {
            channelsExist: [{numChannelsExist: 0, timeStamp: expect.any(Number)},{numChannelsExist: 1, timeStamp: expect.any(Number)}],
            dmsExist: [{numDmsExist: 0, timeStamp: expect.any(Number)}, {numDmsExist: 1, timeStamp: expect.any(Number)}, {numDmsExist: 0, timeStamp: expect.any(Number)}], 
            messagesExist: [{numMessagesExist: 0, timeStamp: expect.any(Number)}, {numMessagesExist: 1, timeStamp: expect.any(Number)}, {numMessagesExist: 0, timeStamp: expect.any(Number)}], 
            utilizationRate: 1 
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