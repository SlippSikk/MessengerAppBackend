
import { error, dmId, user, dms, dmDetails, dmsOutput, dmMessages } from './interfaces';
import { validateToken, isUserIdValid, getHandle, getUser, getUIdFromToken, getDm, userObjToken, userIndexToken } from './helper';
import { getData, setData } from './dataStore';
import HTTPError from 'http-errors';

export function dmMessagesV1(token: string, dmId: number, start: number): error | dmMessages {
  // get data from dataStore
  const data = getData();

  // errors:
  // case: token is invalid
  if (validateToken(token) !== true) {
    return { error: 'Token is not valid' };
  }

  // case: dmId does not refer to a valid DM
  const findDm = data.dms.find(dm => dm.dmId === dmId);
  if (findDm === undefined) {
    return { error: 'dmId is not valid' };
  }

  // case: start is greater than the total number of messages in the channel
  if (start > findDm.messages.length) {
    return { error: 'Start is greater than the total number of messages in the channel' };
  }

  // get the user's details with the given token
  // const currUser = data.users.find(users => users.token.includes(token));
  const currUser = userObjToken(token);

  // case: dmId is valid and the authorised user is not a member of the DM
  const hasToken = findDm.members.find(user => user.uId === currUser.uId);
  // const hasToken = findDm.members.find(currUser);
  if (hasToken === undefined) {
    return { error: 'User is not a member of the DM' };
  }

  // Set end
  let end;
  let endrange;
  const dm = getDm(dmId) as dms;
  if (findDm.messages.length > start + 50) {
    end = start + 50;
    endrange = end;
  } else {
    end = -1;
    endrange = dm.messages.length;
  }

  // return
  return {
    messages: findDm.messages.slice(start, endrange),
    start: start,
    end: end
  };
}

export function dmListV1(token: string): { dms: dmsOutput[] } | error {
  // error case: invalid token
  if (validateToken(token) !== true) {
    return { error: 'Token is not valid' };
  }

  // get data from dataStore
  const data = getData();

  // get the user's uId with the given token
  const uId = getUIdFromToken(token);

  // Go through all dms and filter the ones this user is a member of
  const userDms = [];

  for (const currDms of data.dms) {
    if ((currDms.members.find(element => element.uId === uId)) !== undefined) {
      userDms.push({
        dmId: currDms.dmId,
        name: currDms.name
      });
    }
  }

  // return
  return { dms: userDms };
}

export function dmCreateV2(token: string, uIds: number[]): dmId | error {
  const data = getData();

  // Error Cases
  if (validateToken(token) === false) {
    throw HTTPError(403, 'Token is not valid');
  }

  for (const Id of uIds) {
    if (isUserIdValid(Id) === false) {
      throw HTTPError(400, 'A user Id is not valid');
    }
  }

  function hasDuplicates(arr: number[]): boolean {
    return new Set(arr).size !== arr.length;
  }

  if (hasDuplicates(uIds)) {
    throw HTTPError(400, 'uIds contains duplicates');
  }

  const creatorId = userObjToken(token).uId;

  const foundCreator = uIds.find(element => element === creatorId);

  if (foundCreator !== undefined) {
    throw HTTPError(400, 'Creator Id in list of uIds');
  }

  // Creating Dm
  const names: string[] = [];
  const membersS: user[] = [];

  membersS.push(getUser(creatorId));
  const creator = getUser(creatorId);
  names.push(getHandle(creatorId));

  for (const Id of uIds) {
    names.push(getHandle(Id));
    membersS.push(getUser(Id));
  }

  const dmId = Math.floor(Math.random() * Date.now());

  names.sort();

  const nameSorted = names.join(', ');

  const dm: dms = {
    dmId: dmId,
    name: nameSorted,
    creator: creator,
    members: membersS,
    messages: []
  };

  data.dms.push(dm);

  setData(data);

  return { dmId: dmId };
}

export function dmLeaveV2(token: string, dmId: number) {
  const data = getData();
  // Error Cases
  const foundDm = data.dms.find(element => element.dmId === dmId);
  if (foundDm === undefined) {
    return { error: 'dmId does not exist' };
  }
  if (validateToken(token) !== true) {
    return { error: 'Token is not valid' };
  }
  const authId = getUIdFromToken(token);
  const foundAuth = foundDm.members.find(element => element.uId === authId);
  if (foundAuth === undefined) {
    return { error: 'authorised user no longer in the DM' };
  }

  // remove authorised user
  const dmIndex = data.dms.findIndex(element => element.dmId === dmId);
  const authIndex = data.dms[dmIndex].members.findIndex(element => element.uId === authId);
  data.dms[dmIndex].members.splice(authIndex, 1);

  setData(data);

  return {};
}

export function dmRemoveV2(token: string, dmId: number) {
  const data = getData();

  // Error Cases
  const foundDm = data.dms.find(element => element.dmId === dmId);
  if (foundDm === undefined) {
    throw HTTPError(400, 'dmId does not exist');
  }
  if (validateToken(token) !== true) {
    throw HTTPError(403, 'Token is not valid');
  }
  const creatorId = getUIdFromToken(token);
  if (creatorId !== foundDm.creator.uId) {
    throw HTTPError(403, 'authorised user is not the creator');
  }
  const foundCreator = foundDm.members.find(element => element.uId === creatorId);
  if (foundCreator === undefined) {
    throw HTTPError(403, 'authorised user no longer in the DM');
  }

  // Removing dm

  const dmIndex = data.dms.findIndex(element => element.dmId === dmId);
  data.dms.splice(dmIndex, 1);

  setData(data);

  return {};
}

export function dmDetailsV1(token: string, dmId: number): error | dmDetails {
  // get data from dataStore
  const data = getData();

  // errors:
  // case: token is invalid
  if (validateToken(token) === false) {
    return { error: 'Token is not valid1' };
  }

  // if (data.users.findIndex(element => element.token.includes(token)) === -1) {
  //   return { error: 'token is invalid2' };
  // }

  if (userIndexToken(token) === -1) {
    return { error: 'token is invalid2' };
  }

  // case: dmId does not refer to a valid DM
  const findDm = data.dms.find(dm => dm.dmId === dmId);
  if (findDm === undefined) {
    return { error: 'dmId is not valid' };
  }

  // get the user's details with the given token
  // const currUser = data.users.find(users => users.token.includes(token));
  const currUser = userObjToken(token);

  // case: dmId is valid and the authorised user is not a member of the DM
  const hasToken = findDm.members.find(user => user.uId === currUser.uId);
  // const hasToken = findDm.members.find(currUser);
  if (hasToken === undefined) {
    return { error: 'User is not a member of the DM' };
  }

  // return
  return {
    name: findDm.name,
    members: findDm.members
  };
}
