import { getData, setData } from './dataStore';
import { users, authUserId, error } from './interfaces';
import HTTPError from 'http-errors';
import { validateToken, userIndexToken, userIndexUid, getUIdFromToken, isUserIdValid, isGlobalOwnerFromUid, isGlobalOwnerFromToken,getPermissionIdFromUid } from './helper';
export function PermissionChange(token: string, uId: number, permissionId:number){
    const data = getData();
    if (!validateToken(token)) {
        throw HTTPError(403, 'token is not valid');
    }
    
    if (!isUserIdValid(uId)) {
        throw HTTPError(400, 'Invalid uId');
    }
    if (!(permissionId === 1 || permissionId === 2)) {
        throw HTTPError(400, 'permissionId invaild');
    }
    if (!isGlobalOwnerFromToken(token)) {
        throw HTTPError(403, 'you are not a global owner!');
    }
    if (getPermissionIdFromUid(uId) === permissionId){
        throw HTTPError(400, 'the user already has this permission level!');
    }
    let newArrays = data.users.filter(function(item){
        return item.permissionId === permissionId
    });
    if (newArrays.length === 1 && uId === getUIdFromToken(token) && permissionId === 2){
        throw HTTPError(400, 'You are the only global user now and you can not demote yourself!');
    }
    const userIndex = userIndexUid(uId);
    data.users[userIndex].permissionId = permissionId;
    return {};
}
