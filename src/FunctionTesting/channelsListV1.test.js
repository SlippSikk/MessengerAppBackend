import { channelsListV1 } from './../channels.js';
import { authRegisterV1 } from './../auth.js';
import { channelsCreateV1 } from './../channels.js';
import { channelInviteV1 } from './../channels.js';
import { channelJoinV1 } from './../channels.js';
import { clearV1 } from './../other.js'

beforeEach(() => {
    clearV1();
    const authUserId_1 = authRegisterV1("albert.kim@gmail.com", "albert123", "Albert", "Kim");
    const authUserId_2 = authRegisterV1("adam.baqaie@gmail.com", "adam123", "Adam", "Baqaie");

    const invalidUserId = (authUserId_1 + authUserId_2) * 2;
});

// test Success cases
describe('channelsListV1 Success Test', () => {

    test('Test 1', () => {
        const channelId = channelsCreateV1(authUserId_1, "testChannel", true);
        channelInviteV1(authUserId_1, channelId, authUserId_2);
        channelJoinV1(authUserId_2, channelId);
        expect(channelsListV1(authUserId_2)).toEqual({ channels: expect.any(Array) });
    });

    test('Test 2', () => {
        const channelId = channelsCreateV1(authUserId_1, "testChannel", true);
        channelInviteV1(authUserId_1, channelId, authUserId_2);
        channelJoinV1(authUserId_2, channelId);
        authUserId_3 = authRegisterV1("john.saul@gmail.com", "john123", "John", "Saul");
        expect(channelsListV1(authUserId_3)).toEqual({ channels: [] });
    });

    test('Test 3', () => {
        const channelId = channelsCreateV1(authUserId_1, "testChannel", false);
        channelInviteV1(authUserId_1, channelId, authUserId_2);
        channelJoinV1(authUserId_2, channelId);
        expect(channelsListV1(authUserId_2)).toEqual({ channels: expect.any(Array) });
    });

});


// test Error cases
describe('channelsListV1 Error Test', () => {

    test('Test 1: Invalid authUserID', () => {
        expect(channelsListV1(invalidUserId)).toEqual({ error: expect.any(String) });
    });

});