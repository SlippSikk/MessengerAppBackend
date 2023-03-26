
import { error, dmId, user, dms } from './interfaces'
import { isTokenValid, isUserIdValid, getHandle, getUser } from './helper'
import { getData, setData } from './dataStore';


function dmCreateV1(token: string, uIds: number[]): dmId | error {
    let data = getData();

    // Error Cases
    if (isTokenValid(token) !== true) {
        return { error: 'Token is not valid' };
    }

    for (const Id of uIds) {
        if (isUserIdValid(Id) === false) {
            return { error: 'A user Id is not valid' };
        }
    }

    function hasDuplicates(arr: number[]): boolean {
        return new Set(arr).size !== arr.length;
    }

    if (!hasDuplicates(uIds)) {
        return { error: 'uIds contains duplicates' };
    }

    const creatorId = data.users.find(element => element.token.find(element => element === token)).uId


    const foundCreator = uIds.find(element => element === creatorId);

    if (foundCreator !== undefined) {
        return { error: 'Creator Id in list of uIds' };
    }

    // Creating Dm
    let names: string[] = [];
    let membersS: user[] = [];

    membersS.push(getUser(creatorId));
    const creator = getUser(creatorId);
    names.push(getHandle(creatorId))

    for (const Id of uIds) {
        names.push(getHandle(Id));
        membersS.push(getUser(Id));
    }

    const dmId = Math.floor(Math.random() * Date.now());

    names.sort();

    const nameSorted = names.join(', ')

    const dm: dms = {
        dmId: dmId,
        name: nameSorted,
        creator: creator,
        members: membersS,
        messages: []
    }

    data.dms.push(dm);

    setData(data);

    return { dmId: dmId }

}

export { dmCreateV1 }