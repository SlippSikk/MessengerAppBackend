import request from 'sync-request';
import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;

export function requestPermissionChange(token: string, uId: number, permissionId: number) {
    const res = request(
      'POST',
      `${url}:${port}/admin/userpermission/change/v1`,
      {
        headers: {
          token
        },
        json: {
          uId: uId,
          permissionId: permissionId,
        },
        timeout: 2000
      }
    );
  
    return JSON.parse(res.body as string);
}
