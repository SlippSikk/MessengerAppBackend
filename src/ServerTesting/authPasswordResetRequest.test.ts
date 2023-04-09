import { requestAuthRegister, requestClear } from '../wrappers';
import { authUserId } from '../interfaces';
import { requestAuthPasswordResetRequest } from '../adamWrappers';


// Global
let registered: authUserId;
beforeEach(() => {
    requestClear();
    registered = requestAuthRegister('ilyas.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie');
});

describe('Email Sent', () => {
    test('Correct Inputs', () => {
        expect(requestAuthPasswordResetRequest('ilyas.baqaie@gmail.com').body).toStrictEqual({});
        expect(requestAuthPasswordResetRequest('ilyas.baqaie@gmail.com').statusCode).toBe(200);
    });
});

