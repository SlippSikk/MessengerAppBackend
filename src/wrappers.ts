import request from 'sync-request';
import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;

export function requestAuthRegister(email: string, password: string, nameFirst: string, nameLast: string) {
  const res = request(
    'POST',
    `${url}:${port}/auth/register/v3`,
    {
      json: {
        email,
        password,
        nameFirst,
        nameLast
      },
      timeout: 100
    }
  );

  return JSON.parse(res.body as string);
}

export function requestAuthLogin(email: string, password: string) {
  const res = request(
    'POST',
    `${url}:${port}/auth/login/v3`,
    {
      json: {
        email,
        password
      },

      timeout: 100
    }
  );

  return JSON.parse(res.body as string);
}

export function requestChannelAddowner(token: string, channelId: number, uId: number) {
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
    `${url}:${port}/auth/logout/v2`,
    {
      headers: {
        token
      },
      timeout: 100
    }
  );

  return JSON.parse(res.body as string);
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

export function requestDmDetails(token: string, dmId: number) {
  const res = request(
    'GET',
    SERVER_URL + '/dm/details/v2',
    {
      headers: { token },
      qs: {
        dmId
      },
      timeout: 100
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestDmList(token: string) {
  const res = request(
    'GET',
    SERVER_URL + '/dm/list/v2',
    {
      headers: { token },
      qs: {
      },
      timeout: 100
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestDmMessages(token: string, dmId: number, start: number) {
  const res = request(
    'GET',
    SERVER_URL + '/dm/messages/v2',
    {
      headers: { token },
      qs: {
        dmId, start
      },
      timeout: 100
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestDmCreate(token: string, uIds: number[]) {
  const res = request(
    'POST',
    `${url}:${port}/dm/create/v2`,
    {
      headers: { token },
      json: {
        uIds
      },
      timeout: 100
    }
  );

  return JSON.parse(res.body as string);
}

export function requestDmLeave(token: string, dmId: number) {
  const res = request(
    'POST',
    `${url}:${port}/dm/leave/v2`,
    {
      headers: { token },
      json: {
        dmId
      },
      timeout: 100
    }
  );

  return JSON.parse(res.body as string);
}

export function requestDmRemove(token: string, dmId: number) {
  const res = request(
    'DELETE',
    `${url}:${port}/dm/remove/v2`,
    {
      headers: { token },
      qs: {
        dmId
      },
      timeout: 100
    }
  );

  return JSON.parse(res.body as string);
}

export function requestChannelJoin(token: string, channelId: number) {
  const res = request(
    'POST',
    `${url}:${port}/channel/join/v3`,
    {
      json: {
        channelId: channelId
      },
      headers: {
        token
      },
      timeout: 100
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestChannelInvite(token: string, channelId: number, uId: number) {
  const res = request(
    'POST',
    `${url}:${port}/channel/invite/v3`,
    {
      json: {
        channelId: channelId,
        uId: uId
      },
      headers: {
        token
      },
      timeout: 100
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestChannelRemoveOwner(token: string, channelId: number, uId: number) {
  const res = request(
    'POST',
    `${url}:${port}/channel/removeowner/v2`,
    {
      json: {
        channelId: channelId,
        uId: uId,
      },
      headers: {
        token
      },
      timeout: 100
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestChannelMessages(token: string, channelId: number, start: number) {
  const res = request(
    'GET',
    `${url}:${port}/channel/messages/v3`,
    {
      qs: {
        channelId: channelId,
        start: start
      },
      headers: {
        token
      },
      timeout: 100
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestUserProfileV2(token: string, uId: number) {
  const res = request(
    'GET',
    `${url}:${port}/user/profile/v2`,
    {
      qs: {
        token: token,
        uId: uId
      }
    }
  );

  return JSON.parse(res.getBody() as string);
}
export function requestMessageEdit(token: string, messageId: number, message: string) {
  const res = request(
    'PUT',
    `${url}:${port}/message/edit/v1`,
    {
      json: {
        token: token,
        messageId: messageId,
        message: message,
      }
    }
  );

  return JSON.parse(res.getBody() as string);
}

// PUT because messageEdit is called
export function requestMessageRemove(token: string, messageId: number) {
  const res = request(
    'DELETE',
    `${url}:${port}/message/remove/v1`,
    {
      qs: {
        token: token,
        messageId: messageId,
      }
    }
  );

  return JSON.parse(res.getBody() as string);
}

export function requestMessageSenddm(token: string, dmId: number, message: string) {
  const res = request(
    'POST',
    SERVER_URL + '/message/senddm/v1',
    {
      json: {
        token: token,
        dmId: dmId,
        message: message
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestMessageSend(token: string, channelId: number, message: string) {
  const res = request(
    'POST',
    SERVER_URL + '/message/send/v1',
    {
      json: {
        token: token,
        channelId: channelId,
        message: message
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestChannelDetails(token: string, channelId: number) {
  const res = request(
    'GET',
    SERVER_URL + '/channel/details/v2',
    {
      qs: {
        token: token,
        channelId: channelId,
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestChannelsCreate(token: string, name: string, isPublic: boolean) {
  const res = request(
    'POST',
    SERVER_URL + '/channels/create/v3',
    {
      headers: { token },
      json: {
        name, isPublic
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestChannelsListAll(token: string) {
  const res = request(
    'GET',
    SERVER_URL + '/channels/listall/v3',
    {
      headers: { token },
      qs: {
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestChannelsList(token: string) {
  const res = request(
    'GET',
    SERVER_URL + '/channels/list/v3',
    {
      headers: { token },
      qs: {
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestClear() {
  const res = request(
    'DELETE',
    `${url}:${port}/clear/v1`,
    {

    }
  );

  return JSON.parse(res.getBody() as string);
}

export function requestUsersAllV1(token: string) {
  const res = request(
    'GET',
    SERVER_URL + '/users/all/v1',
    {
      qs: {
        token
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestSetNameV1(token: string, nameFirst: string, nameLast: string) {
  const res = request(
    'PUT',
    SERVER_URL + '/user/profile/setname/v1',
    {
      json: {
        token, nameFirst, nameLast
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestuserSetemail(token: string, email: string) {
  const res = request(
    'PUT',
    SERVER_URL + '/user/profile/setemail/v1',
    {
      json: {
        token, email
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestuserProfileSethandleV1(token: string, handleStr: string) {
  const res = request(
    'PUT',
    SERVER_URL + '/user/profile/sethandle/v1',
    {
      json: {
        token, handleStr
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

/*
export function requestStandupStart(token: string, channelId: number, length: number) {
  const res = request(
    'POST',
    SERVER_URL + '/standup/start/v1',
    {
      headers: { token },
      json: {
        channelId, length
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestStandupActive(token: string, channelId: number) {
  const res = request(
    'GET',
    SERVER_URL + '/standup/active/v1',
    {
      headers: { token },
      qs: {
        channelId
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestStandupSend(token: string, channelId: number, message: string) {
  const res = request(
    'POST',
    SERVER_URL + '/standup/send/v1',
    {
      headers: { token },
      json: {
        channelId, message
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}
*/