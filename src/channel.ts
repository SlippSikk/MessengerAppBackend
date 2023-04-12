import HTTPError from 'http-errors';
import { getData, setData } from './dataStore';
import { isChannelIdValid, validateToken, isUserIdValid, getUIdFromToken, isOwner, getChannel, isMember, getUser, isOwnerByToken } from './helper';
import { user, channel, dataTs } from './interfaces';
import { addNotification } from './notifications';
// import { standupActiveV1 } from './helper';
export function channelJoinV3(token: string, channelId: number) {
  const data: dataTs = getData();

  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'Invalid ChannelId');
  }
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid Token');
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const authUserId: number = getUIdFromToken(token) as number;
  // checks if a non-global owner is joining a private channel

  const channel: channel = getChannel(channelId) as channel;
  if (!channel.isPublic && authUserId !== 1) {
    throw HTTPError(403, 'Regular users cannot join private channels');
  }

  if (isMember(channelId, authUserId) !== false) {
    throw HTTPError(400, 'This user is already a member of this channel');
  }
  const userObj = getUser(authUserId);
  data.channels[channelIndex].allMembers.push(userObj);
  setData(data);
  return {};
}

export function channelInviteV3(token: string, channelId: number, uId: number) {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'Invalid ChannelId');
  }

  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid Token');
  }

  if (!isUserIdValid(uId)) {
    throw HTTPError(400, 'Invalid uId');
  }

  // can safely assume authUserId is a number as token must be valid from above
  const authUserId: number = getUIdFromToken(token) as number;

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  if (isMember(channelId, uId)) {
    throw HTTPError(400, 'This user is already a member of this channel');
  } else if (!isMember(channelId, authUserId)) {
    throw HTTPError(403, 'This authorised user is not a member of this channel');
  }

  // finally adds user to channel
  const userObj = getUser(uId);
  data.channels[channelIndex].allMembers.push(userObj);
  setData(data);
  addNotification(uId, channelId, -1, token);
  return {};
}

export function channelRemoveOwnerV2(token: string, channelId: number, uId: number) {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'Invalid ChannelId');
  }

  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid Token');
  }

  if (!isUserIdValid(uId)) {
    throw HTTPError(400, 'Invalid uId');
  }

  if (!isOwner(channelId, uId)) {
    throw HTTPError(400, 'This user is not currently an owner');
  }

  const channel: channel = getChannel(channelId) as channel;
  if (channel.ownerMembers.length === 1) {
    throw HTTPError(400, 'This user is the only owner in this channel');
  }

  const authUserId: number = getUIdFromToken(token) as number;
  if (!isOwner(channelId, authUserId) && (authUserId !== 1 || !isMember(channelId, 1))) {
    throw HTTPError(403, 'This authUser does not have the correct owner permissions');
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  data.channels[channelIndex].ownerMembers = channel.ownerMembers.filter(owner => owner.uId !== uId);
  setData(data);
  return {};
}

export function channelMessagesV3(token: string, channelId: number, start: number) {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'Invalid ChannelId');
  }

  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid Token');
  }

  // can safely assume authUserId is a number as token must be valid from above
  const authUserId: number = getUIdFromToken(token) as number;

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const channel: channel = data.channels[channelIndex];
  const hasAuthUser: user = channel.allMembers.find(member => member.uId === authUserId);

  if (hasAuthUser === undefined) {
    throw HTTPError(403, 'This authUser is not a member of this channel');
  }

  if (start > channel.messages.length) {
    throw HTTPError(400, 'Start is greater than the total number of messages in this channel');
  }

  let end: number;
  let endrange: number;
  if (channel.messages.length > start + 50) {
    end = start + 50;
    endrange = end;
  } else {
    end = -1;
    endrange = channel.messages.length;
  }
  return {

    messages: channel.messages.reverse().slice(start, endrange),
    start: start,
    end: end

  };
}

/**
 * @param token
 * @param channelId
 * @param uId
 * @returns none
 * @method POST
 * @summary Makes user with user ID uId an owner of the channel.
 */
export const channelAddownerV2 = (token: string, channelId: number, uId: number) => {
  const data: dataTs = getData();
  // Error handle
  if (!validateToken(token)) {
    throw HTTPError(400, 'Invalid token');
  }
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'channelId invalid');
  }
  if (!isUserIdValid(uId)) {
    throw HTTPError(400, 'Invalid uId');
  }
  if (!isMember(channelId, uId)) {
    throw HTTPError(400, 'uId is not a member of channelId');
  }
  if (!isOwnerByToken(channelId, token)) {
    throw HTTPError(403, 'User(token) does not have owner permissions');
  }
  if (isOwner(channelId, uId)) {
    throw HTTPError(400, 'uId is already owner');
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const user = getUser(uId);
  data.channels[channelIndex].ownerMembers.push(user);
  setData(data);
  return {};
};

/**
 * @param token
 * @param channelId
 * @returns { name, isPublic, ownerMembers, allMembers }
 * @method GET
 * @summary
 * Given a channel with ID channelId that the authorised user
 * is a member of, provides basic details about the channel.
 */
export const channelDetailsV3 = (token: string, channelId: number) => {
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'Invalid ChannelId');
  }
  if (!validateToken(token)) {
    throw HTTPError(400, 'authUserId not valid');
  }
  const uId = getUIdFromToken(token) as number;
  if (!isMember(channelId, uId) && uId !== 1) {
    throw HTTPError(403, 'authUserId is not a member of channelId');
  }
  const channel = getChannel(channelId) as channel;
  return {
    name: channel.name,
    isPublic: channel.isPublic,
    ownerMembers: channel.ownerMembers,
    allMembers: channel.allMembers
  };
};

/**
 *
 * @param token
 * @param channelId
 * @returns none
 * @method POST
 * @summary
 * Given a channel with ID channelId that the authorised user is a
 * member of, removes them as a member of the channel. Their
 * messages should remain in the channel. If the only channel
 * owner leaves, the channel will remain.
 */
export const channelLeaveV2 = (token: string, channelId: number) => {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'Invalid ChannelId');
  }
  if (!validateToken(token)) {
    throw HTTPError(400, 'Invalid token');
  }
  // if (standupActiveV1(token, channelId).isActive) {
  //   throw HTTPError(400, 'Standup Is active, can not leave !');
  // }
  const uId = getUIdFromToken(token) as number;
  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  if (!isMember(channelId, uId)) {
    throw HTTPError(403, 'user not a member of channelId');
  }
  const channel = getChannel(channelId) as channel;

  data.channels[channelIndex].ownerMembers = channel.ownerMembers.filter(owner => owner.uId !== uId);
  data.channels[channelIndex].allMembers = channel.allMembers.filter(member => member.uId !== uId);
  setData(data);
  return {};
};
