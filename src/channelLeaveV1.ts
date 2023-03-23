/*
import { isChannelIdValid, isTokenValid, getUIdFromToken, getChannel, isOwner, isMember } from './wrappers';
export const channelLeaveV1 = (token: string, channelId: number) => {
  if (!isChannelIdValid(channelId)) {
    return { error: 'Invalid channelId' };
  }
  if (!isTokenValid(token)) {
    return { error: 'Invalid token' };
  }
  const uId = getUIdFromToken(token);
  if (!isMember(channelId, uId)) {
    return { error: 'user not a member of channelId' };
  }
  const channel = getChannel(channelId);
  // remove ownership
  if (isOwner(channelId, uId)) {
    const ownerIndex = channel.ownerMembers.indexOf(uId);
    channel.ownerMembers.splice(ownerIndex, 1);
  }
  // remove membership
  const memberIndex = channel.allMembers.indexOf(uId);
  channel.allMembers.splice(memberIndex, 1);
  return {};
};
*/
