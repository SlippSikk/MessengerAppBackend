/*
import { getData, setData } from './dataStore';
import { isChannelIdValid, isTokenValid, isUserIdValid, getUIdFromToken, isOwner, getChannel } from './helper';
import { user, channel, dataTs } from './interfaces';

function channelJoinV2(token: string, channelId: number) {
  const data: dataTs = getData();

  if (!isChannelIdValid(channelId)) {
    return { error: 'This channel does not exist' };
  }

  if (!isTokenValid(token)) {
    return { error: 'Invalid token' };
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const authUserId: number = getUIdFromToken(token) as number;
  // checks if a non-global owner is joining a private channel

  if (!data.channels[channelIndex].isPublic && authUserId !== 1) {
    return { error: 'Regular users cannot join private channels' };
  }

  // checks if that user is already in the channel
  const channel: channel = data.channels[channelIndex];
  const hasUser: user = channel.allMembers.find(member => member.uId === authUserId);
  if (hasUser !== undefined) {
    return { error: 'This user is already in this channel' };
  }

  // finally adds user to channel
  const userObj : users = data.users.find(user => user.uId = authUserId)
  data.channels[channelIndex].allMembers.push(userObj);
  setData(data);

  return {};
}
*/
/*
function channelInviteV2(token: string, channelId: number, uId: number) {
    const data: dataTs = getData();
    if (!isChannelIdValid(channelId)) {
      return { error: 'This channel does not exist' };
    }

    if (!isTokenValid(token)) {
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
    const channel: channel = data.channels[channelIndex];
    const hasUser: user = channel.allMembers.find(member => member.uId === uId);
    const hasAuthUser: user = channel.allMembers.find(member => member.uId === authUserId);
    if (hasUser !== undefined) {
      return { error: 'This user is already in this channel' };
    } else if (hasAuthUser === undefined && authUserId !== 1) {
      return { error: 'This auth user is not in the channel' };
    }

    // finally adds user to channel

    const userObj : users = data.users.find(user => user.uId = authUserId)
    data.channels[channelIndex].allMembers.push(userObj);
    setData(data);
    return {};
  }
  */

/*
export function channelRemoveOwnerV1(token: string, channelId: number, uId: number) {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    return { error: 'This channel does not exist' };
  }

  if (!isTokenValid(token)) {
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
} export function channelRemoveOwnerV1(token: string, channelId: number, uId: number) {
  const data: dataTs = getData();
  if (!isChannelIdValid(channelId)) {
    return { error: 'This channel does not exist' };
  }

  if (!isTokenValid(token)) {
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
  */
