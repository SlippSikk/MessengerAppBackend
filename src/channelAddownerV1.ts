import { isChannelIdValid, isUserIdValid, isMember, isOwner, hasOwnerPermission, isTokenValid, getChannel } from './helper';
/**
 *
 * @param uId
 * @sum Makes uId owner of channelId
 */
export const channelAddowner = (uId: number, channelId: number) => {
  // Error handle
  // 1. channelId invalid
  if (!isChannelIdValid()) {
    return { error: 'channelId invalid' };
  }
  if (!isUserIdValid()) {
    return { error: 'Invalid uId' };
  }
  if (!isMember()) {
    return { error: 'uId is not a member of channelId' };
  }
  if (!isOwner()) {
    return { error: 'uId is already owner' };
  }
  if (!hasOwnerPermission()) {
    return { error: 'uId does not have owner permissions' };
  }
  if (!isTokenValid()) {
    return { error: 'invalid token' };
  }
  const channel = getChannel(channelId);
  channel.ownerMembers.push(uId);
  return {};
};
