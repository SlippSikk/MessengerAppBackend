import { getData, setData } from './dataStore';
import { users, authUserId, error } from './interfaces';
import HTTPError from 'http-errors';
import { encrypt, findPassword, hashToken, userIndexToken } from './helper';

export function PermissionChange(token: string, uId: number, permissionId:number){
    
}
