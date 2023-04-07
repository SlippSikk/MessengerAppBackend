
import { getData, setData } from './dataStore';
import { isChannelIdValid, validateToken, isUserIdValid, getUIdFromToken, isOwner, getChannel, isMember, getUser, isOwnerByToken } from './helper';
import { user, channel, dataTs } from './interfaces';

export function channelJoinV2(token: string, channelId: number) {
  const data: dataTs = getData();

  if (!isChannelIdValid(channelId)) {
    return { error: 'This channel does not exist' };
  }
  if (!validateToken(token)) {
    return { error: 'Invalid token' };
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const authUserId: number = getUIdFromToken(token) as number;
  // checks if a non-global owner is joining a private channel

  const channel: channel = getChannel(channelId) as channel;
  if (!channel.isPublic && authUserId !== 1) {
    return { error: 'Regular users cannot join private channels' };
  }

  if (isMember(channelId, authUserId) !== false) {
    return { error: 'This user is already in this channel' };
  }
  const userObj = getUser(authUserId);
  data.channels[channelIndex].allMembers.push(userObj);
  setData(data);
  return {};
}

export function channelInviteV2(token: string, channelId: number, uId: number) {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    return { error: 'This channel does not exist' };
  }

  if (!validateToken(token)) {
    return { error: 'Invalid token' };
  }

  if (!isUserIdValid(uId)) {
    return { error: 'The invitee does not exist' };
  }

  // can safely assume authUserId is a number as token must be valid from above
  const authUserId: number = getUIdFromToken(token) as number;
  if (authUserId === uId && authUserId !== 1) {
    return { error: 'A user cannot invite themselves' };
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  if (isMember(channelId, uId)) {
    return { error: 'This user is already in this channel' };
  } else if (!isMember(channelId, authUserId) && authUserId !== 1) {
    return { error: 'This auth user is not in the channel' };
  }

  // finally adds user to channel
  const userObj = getUser(uId);
  data.channels[channelIndex].allMembers.push(userObj);
  setData(data);
  return {};
}

export function channelRemoveOwnerV1(token: string, channelId: number, uId: number) {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    return { error: 'This channel does not exist' };
  }

  if (!validateToken(token)) {
    return { error: 'Invalid token' };
  }

  if (!isUserIdValid(uId)) {
    return { error: 'The invitee does not exist' };
  }

  if (!isOwner(channelId, uId)) {
    return { error: 'This user is not an owner' };
  }

  const channel: channel = getChannel(channelId) as channel;
  if (channel.ownerMembers.length === 1) {
    return { error: 'This channel only has one owner' };
  }

  const authUserId: number = getUIdFromToken(token) as number;
  if (!isOwner(channelId, authUserId) && authUserId !== 1) {
    return { error: 'This authUser does not have owner permissions' };
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  data.channels[channelIndex].ownerMembers = channel.ownerMembers.filter(owner => owner.uId !== uId);
  setData(data);
  return {};
}

export function channelMessagesV2(token: string, channelId: number, start: number) {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    return { error: 'This channel does not exist' };
  }

  if (!validateToken(token)) {
    return { error: 'Invalid token' };
  }

  // can safely assume authUserId is a number as token must be valid from above
  const authUserId: number = getUIdFromToken(token) as number;

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const channel: channel = data.channels[channelIndex];
  const hasAuthUser: user = channel.allMembers.find(member => member.uId === authUserId);

  if (hasAuthUser === undefined && authUserId !== 1) {
    return { error: 'This user is not in the channel' };
  }

  if (start > channel.messages.length) {
    return { error: 'Start is greater than the total number of messages in the channel' };
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

    messages: channel.messages.slice(start, endrange),
    start: start,
    end: end

  };
}

/**
 *
 * @param uId
 * @sum Makes uId owner of channelId
 */
export const channelAddownerV1 = (token: string, channelId: number, uId: number) => {
  const data: dataTs = getData();
  // Error handle
  if (!validateToken(token)) {
    return { error: 'invalid token' };
  }
  if (!isChannelIdValid(channelId)) {
    return { error: 'channelId invalid' };
  }
  if (!isUserIdValid(uId)) {
    return { error: 'Invalid uId' };
  }
  if (!isMember(channelId, uId)) {
    return { error: 'uId is not a member of channelId' };
  }
  if (!isOwnerByToken(channelId, token)) {
    return { error: 'User(token) does not have owner permissions' };
  }
  if (isOwner(channelId, uId)) {
    return { error: 'uId is already owner' };
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const user = getUser(uId);
  data.channels[channelIndex].ownerMembers.push(user);
  setData(data);
  return {};
};

/**
 * @param {number} authUserId
 * @param {number} channelId
 * @returns {name, isPublic, ownerMembers, allMembers}
 */

export const channelDetailsV2 = (token: string, channelId: number) => {
  if (!isChannelIdValid(channelId)) {
    return { error: 'channelId not valid' };
  }
  if (!validateToken(token)) {
    return { error: 'authUserId not valid' };
  }
  const uId = getUIdFromToken(token) as number;
  if (!isMember(channelId, uId) && uId !== 1) {
    return { error: 'authUserId is not a member of channelId' };
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
 * @param {string} token
 * @param {number} channelId
 * @returns {{}}
 */

export const channelLeaveV1 = (token: string, channelId: number) => {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    return { error: 'Invalid channelId' };
  }
  if (!validateToken(token)) {
    return { error: 'Invalid token' };
  }
  const uId = getUIdFromToken(token) as number;
  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  if (!isMember(channelId, uId)) {
    return { error: 'user not a member of channelId' };
  }
  const channel = getChannel(channelId) as channel;

  data.channels[channelIndex].ownerMembers = channel.ownerMembers.filter(owner => owner.uId !== uId);
  data.channels[channelIndex].allMembers = channel.allMembers.filter(member => member.uId !== uId);
  setData(data);
  return {};
};
