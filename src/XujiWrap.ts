import request from 'sync-request';
import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;

export function requestPermissionChange(token: string, uId: number, permissionId: number) {
  const res = request(
    'POST',
    `${url}:${port}/admin/userpermission/change/v1`,
    {
      json: {
        permissionId: permissionId,
        uId: uId,
      },
      headers: {
        token
      },
      timeout: 2000
    }
  );
  const body = JSON.parse(res.body as string);  //
  const statusCode = res.statusCode;

  return { body, statusCode };
}

export function requestUserRemove(token: string, uId: number) {
  const res = request(
    'DELETE',
    `${url}:${port}/admin/user/remove/v1`,
    {
      qs: {
        uId: uId,
      },
      headers: {
        token
      },
      timeout: 2000
    }
  );
  const body = JSON.parse(res.body as string);  //
  const statusCode = res.statusCode;

  return { body, statusCode };
}

