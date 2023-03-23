// import { isChannelIdValid, isUserIdValid, isMember, isOwner, isOwnerByToken, isTokenValid, getChannel } from './helper';
/**
 *
 * @param uId
 * @sum Makes uId owner of channelId
 */
/*
export const channelAddowner = (token: string, channelId: number, uId: number) => {
  // Error handle
  if (!isChannelIdValid(channelId)) {
    return { error: 'channelId invalid' };
  }
  if (!isUserIdValid(uId)) {
    return { error: 'Invalid uId' };
  }
  if (!isMember(channelId, uId)) {
    return { error: 'uId is not a member of channelId' };
  }
  if (!isOwner(channelId, uId)) {
    return { error: 'uId is already owner' };
  }
  if (!isOwnerByToken(channelId, token)) {
    return { error: 'uId does not have owner permissions' };
  }
  if (!isTokenValid(token)) {
    return { error: 'invalid token' };
  }
  const channel = getChannel(channelId);
  channel.ownerMembers.push(uId);
  return {};
};
*/
