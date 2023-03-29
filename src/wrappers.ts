import request from 'sync-request';
import config from './config.json';
import { dmId } from './interfaces'

const port = config.port;
const url = config.url;
// import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;

function requestAuthRegister(email: string, password: string, nameFirst: string, nameLast: string) {
    const res = request(
        'POST',
        `${url}:${port}/auth/register/v2`,
        {
            json: {
                email,
                password,
                nameFirst,
                nameLast
            }
        }
    );

    return JSON.parse(res.getBody() as string);
}

function requestAuthLogin(email: string, password: string) {
    const res = request(
        'POST',
        `${url}:${port}/auth/login/v2`,
        {
            json: {
                email,
                password
            }
        }
    );

    return JSON.parse(res.getBody() as string);
}

function requestClear() {
    const res = request(
        'DELETE',
        `${url}:${port}/clear/v1`,
        {

        }
    );

    return JSON.parse(res.getBody() as string);
}

export function requestAddowner(token: string, channelId: number, uId: number) {
    const res = request(
        'POST',
        SERVER_URL + '/channel/addowner/v1',
        {
            json: {
                token: token,
                channelId: channelId,
                uId: uId
            }
        }
    );
    return JSON.parse(res.getBody() as string);
}

export function requestAuthLogout(token: string) {
    const res = request(
        'POST',
        `${url}:${port}/auth/logout/v1`,
        {
            json: {
                token
            }
        }
    );

    return JSON.parse(res.getBody() as string);
}

export function requestChannelLeave(token: string, channelId: number) {
    const res = request(
        'POST',
        SERVER_URL + '/channel/leave/v1',
        {
            json: {
                token: token,
                channelId: channelId,
            }
        }
    );
    return JSON.parse(res.getBody() as string);
}

export function requestDmCreate(token: string, uIds: number[]): dmId {
    const res = request(
        'POST',
        `${url}:${port}/dm/create/v1`,
        {
            json: {
                token,
                uIds
            }
        }
    );

    return JSON.parse(res.getBody() as string);
};

export function requestDmLeave(token: string, dmId: number) {
    const res = request(
        'POST',
        `${url}:${port}/dm/leave/v1`,
        {
            json: {
                token,
                dmId
            }
        }
    );

    return JSON.parse(res.getBody() as string);
};

export function requestDmRemove(token: string, dmId: number) {
    const res = request(
        'DELETE',
        `${url}:${port}/dm/remove/v1`,
        {
            qs: {
                token,
                dmId
            }
        }
    );

    return JSON.parse(res.getBody() as string);
};

export { requestAuthRegister, requestAuthLogin, requestClear };
