import request from 'sync-request';
import config from './config.json';
import { dmId } from './interfaces';

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
}

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
}

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
}

// export function requestChannelJoin(token: string, channelId: number) {
//   const res = request(
//     'POST',
//         `${url}:${port}/channel/join/v2`,
//         {
//           json: {
//             token: token,
//             channelId: channelId
//           }
//         }
//   );

//   return JSON.parse(res.getBody() as string);
// }

// export function requestChannelInvite(token: string, channelId: number, uId: number) {
//   const res = request(
//     'POST',
//         `${url}:${port}/channel/join/v2`,
//         {
//           json: {
//             token: token,
//             channelId: channelId,
//             uId: uId
//           }
//         }
//   );

//   return JSON.parse(res.getBody() as string);
// }

/*
export function requestChannelRemoveOwner(token: string, channelId: number, uId: number) {
  const res = request(
    'DELETE',
        `${url}:${port}/channel/removeowner/v1`,
        {
          qs: {
            token: token,
            channelId: channelId,
            uId: uId,
          }
        }
  );

  return JSON.parse(res.getBody() as string);
}

*/

/*
export function requestChannelMessages(token: string, channelId: number, start: number): error | channelMessages {
  const res = request(
    'GET',
        `${url}:${port}/channel/messages/v2`,
        {
          qs: {
            token: token,
            channelId: channelId,
            start: start
          }
        }
  );

  return JSON.parse(res.getBody() as string);
}

*/

/*
export function requestMessageEdit(token: string, messageId: number, message: string) {
  const res = request(
    'POST',
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

*/

/*
export function requestMessageRemove(token: string, messageId: number) {
  const res = request(
    'POST',
        `${url}:${port}/message/remove/v1`,
        {
          json: {
            token: token,
            messageId: messageId,
          }
        }
  );

  return JSON.parse(res.getBody() as string);
}

*/
/*
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

*/
/*
export function requestChannelDetails(token: string, channelId: number) {
  const res = request(
    'GET',
    SERVER_URL + '/channel/details/v2',
    {
      json: {
        token: token,
        channelId: channelId,
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}
*/
export function requestChannelsCreate(token: string, name: string, isPublic: boolean) {
  const res = request(
    'GET',
    SERVER_URL + '/channels/create/v2',
    {
      // Note that for PUT/POST requests, you should
      // use the key 'json' instead of the query string 'qs'
      qs: {
        token, name, isPublic
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestChannelsListAll(token: string) {
  const res = request(
    'GET',
    SERVER_URL + '/channels/listall/v2',
    {
      // Note that for PUT/POST requests, you should
      // use the key 'json' instead of the query string 'qs'
      qs: {
        token
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestChannelsList(token: string) {
  const res = request(
    'GET',
    SERVER_URL + '/channels/list/v2',
    {
      // Note that for PUT/POST requests, you should
      // use the key 'json' instead of the query string 'qs'
      qs: {
        token
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export { requestAuthRegister, requestAuthLogin, requestClear };
