import { channelInviteV1 } from '../channel.js'


describe('channelInviteV1 Expected Inputs', () => {
    test ('Authorised user invites themselves (1)', () => {
        expect(channelInviteV1(2, 5, 2).toEqual('')) 
    });

    test ('Authorised user invites themselves (2)', () => {
        expect(channelInviteV1(3, 1, 3).toEqual('')) 
    });

    test ('Authorised user invites themselves (3)', () => {
        expect(channelInviteV1(10, 10, 10).toEqual('')) 
    });


    test ('Authorised user invites someone else (1)', () => {
        expect(channelInviteV1(3, 7, 4).toEqual('')) 
    });

    test ('Authorised user invites someone else (2)', () => {
        expect(channelInviteV1(5, 2, 1).toEqual('')) 
    });

    test ('Authorised user invites someone else (3)', () => {
        expect(channelInviteV1(1, 27, 4).toEqual('')) 
    });

});



describe('channelInviteV1 Errors', () => {
    // how to check if valid channel/user ID? or if user already member?
    test ('Channel ID is letter (1)', () => {
        expect(channelInviteV1(2, 'a', 2).toEqual({error: 'error'})) 
    });

    test ('Channel ID is letter (2)', () => {
        expect(channelInviteV1(2, 'H', 2).toEqual({error: 'error'})) 
    });

    test ('Channel ID is negative (1)', () => {
        expect(channelInviteV1(2, -74, 2).toEqual({error: 'error'})) 
    });

    test ('Channel ID is negative (2)', () => {
        expect(channelInviteV1(2, -1, 2).toEqual({error: 'error'})) 
    });

    test ('authUserID is letter (1)', () => {
        expect(channelInviteV1('d', 2, 2).toEqual({error: 'error'})) 
    });

    test ('authUserID is letter (2)', () => {
        expect(channelInviteV1('M', 2, 2).toEqual({error: 'error'})) 
    });

    test ('authUserID is negative (1)', () => {
        expect(channelInviteV1(-1, 2, 2).toEqual({error: 'error'})) 
    });

    test ('authUserID is negative (2)', () => {
        expect(channelInviteV1(-4, 2, 2).toEqual({error: 'error'})) 
    });

    test ('userID is letter (1)', () => {
        expect(channelInviteV1(2, 2, 'g').toEqual({error: 'error'})) 
    });

    test ('userID is letter (2)', () => {
        expect(channelInviteV1(2, 2, 'R').toEqual({error: 'error'})) 
    });

    test ('userID is negative (1)', () => {
        expect(channelInviteV1(2, 2, -2).toEqual({error: 'error'})) 
    });

    test ('userID is negative (2)', () => {
        expect(channelInviteV1(2, 2, -7634).toEqual({error: 'error'})) 
    });



});
