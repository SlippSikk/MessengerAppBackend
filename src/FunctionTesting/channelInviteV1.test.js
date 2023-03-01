import { channelInviteV1 } from '../channel.js'
import { authRegisterV1 } from '../auth.js'
import { channelsCreateV1 } from '../channels.js'
import { clear } from '../other.js'

/*const authID2 = authRegisterV1('bob@gmail.com', 'efk289', 'Bob', 'Smith')
    const authID3 = authRegisterV1('susan@outlook.com', 'hello321', 'Susan', 'Miller')
*/
//after each, before each, test each

beforeEach(() => {
    clear()
    const authID1 = authRegisterV1('jfmsaul@gmail.com', 'abcd1234', 'John', 'Saul')
    const authID2 = authRegisterV1('bob@outlook.com', '1a23sb4', 'Bob', 'Robinson')
    const channelID1 = channelsCreateV1(authID1, 'Channel 1', true)

});


describe('channelInviteV1 Expected Inputs', () => {
    
    test ('Authorised user invites themselves (1)', () => {        
        expect(channelInviteV1(authID1, channelID1, authID1).toEqual(''))
    });

    test ('Authorised user invites themselves (2)', () => {
        const authID1 = authRegisterV1('bob@outlook.com', '1a23b4', 'Bob', 'Robinson')
        const channelID1 = channelsCreateV1(authID1, 'Channel 1', true)
        expect(channelInviteV1(authID1, channelID1, authID1).toEqual(''))
    });


    test ('Authorised user invites someone else (1)', () => {
        const authID1 = authRegisterV1('jfmsaul@gmail.com', 'abcd1234', 'John', 'Saul')
        const authID2 = authRegisterV1('bob@outlook.com', '1a23sb4', 'Bob', 'Robinson')
        const channelID1 = channelsCreateV1(authID1, 'Channel 1', true)
        expect(channelInviteV1(authID1, channelID1, authID2).toEqual(''))
    });

    test ('Authorised user invites someone else (2)', () => {
        const authID1 = authRegisterV1('susan@gmail.com', '7833dk', 'Susan', 'Boyle')
        const authID2 = authRegisterV1('craig@yahoo.com', '1a23bs4', 'Craig', 'Chaddington')
        const channelID1 = channelsCreateV1(authID1, 'Channel 1', true)
        expect(channelInviteV1(authID2, channelID1, authID1).toEqual(''))
    });


});



describe('channelInviteV1 Errors', () => {
    // how to check if valid channel/user ID? or if user already member?
    test ('Channel ID is constter (1)', () => {
        expect(channelInviteV1(2, 'a', 2).toEqual({error: 'error'})) 
    });

    test ('Channel ID is constter (2)', () => {
        expect(channelInviteV1(2, 'H', 2).toEqual({error: 'error'})) 
    });

    test ('Channel ID is negative (1)', () => {
        expect(channelInviteV1(2, -74, 2).toEqual({error: 'error'})) 
    });

    test ('Channel ID is negative (2)', () => {
        expect(channelInviteV1(2, -1, 2).toEqual({error: 'error'})) 
    });

    test ('authUserID is constter (1)', () => {
        expect(channelInviteV1('d', 2, 2).toEqual({error: 'error'})) 
    });

    test ('authUserID is constter (2)', () => {
        expect(channelInviteV1('M', 2, 2).toEqual({error: 'error'})) 
    });

    test ('authUserID is negative (1)', () => {
        expect(channelInviteV1(-1, 2, 2).toEqual({error: 'error'})) 
    });

    test ('authUserID is negative (2)', () => {
        expect(channelInviteV1(-4, 2, 2).toEqual({error: 'error'})) 
    });

    test ('userID is constter (1)', () => {
        expect(channelInviteV1(2, 2, 'g').toEqual({error: 'error'})) 
    });

    test ('userID is constter (2)', () => {
        expect(channelInviteV1(2, 2, 'R').toEqual({error: 'error'})) 
    });

    test ('userID is negative (1)', () => {
        expect(channelInviteV1(2, 2, -2).toEqual({error: 'error'})) 
    });

    test ('userID is negative (2)', () => {
        expect(channelInviteV1(2, 2, -7634).toEqual({error: 'error'})) 
    });



});
