import request from 'sync-request';
import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;

export function requestPermissionChange(token: string, uId: number, permissionId: number) {
    const res = request(
      'POST',
      `${url}:${port}/admin/userpermission/change/v1`,
      {
        
        json: {
          uId: uId,
          permissionId: permissionId,
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
