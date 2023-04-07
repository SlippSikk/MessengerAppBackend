/
import { getData, setData } from './dataStore';
import { isOwner, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember, getUser } from './helper';
import { isDmIdValid, isDmOwner, isChannelIdValid, getMessage } from './helper';
import { dataTs, channel, dms, messages } from './interfaces';
// HELPER FUNCTIONS ADD LATER

const getChannelIdFromMessageId = (messageId: number) => {

};

const getDmIdFromMessageId = (messageId: number) => {

};

const getMessage = (messageId: number) => {

};
/**
 * @param token
 * @param dmId
 * @param message
 * @returns
 */
export const messagePinV1 = (token: string, messageId: number) => {
  const data: dataTs = getData();
  let inChannel = true;
  let inDm = true;
  let channelId: number, dmId: number;
  // --------- CHECKS IF IS MESSAGEID ISVALID -----------------------
  // Checks if messageId is in channel or a dm
  if (isDmIdValid(messageId)) {
    inChannel = false;
  }
  if (isChannelIdValid(messageId)) {
    inDm = false;
  }
  if (inChannel && inDm) {
    return { error: 'Invalid messageId' };
  }
  const uId = getUIdFromToken(token);
  // Check if user is in Channel
  if (inChannel) {
    channelId = getChannelIdFromMessageId(messageId) as number;
    if (!isMember(channelId, uId)) {
      return { error: 'not a member of messageId' };
    }
  }
  // Check if user is in dm
  if (inDm) {
    dmId = getDmIdFromMessageId(messageId) as number;
    if (!isDmMember(dmId, token)) {
      return { error: 'not a member of messageId' };
    }
  }
  const msg = getMessage(messageId) as messages;
  // --------- CHECKS IF IS PINNED -----------------------
  if (msg.isPinned === true) {
    return { error: 'Already Pinned' };
  }
  // ----------CHECKS OWNER PERMISSION--------------------
  // IN CHANNEL
  if (!isOwner(channelId, uId) && uId !== 1 && inChannel) {
    return { error: 'no Owner permission' };
  }
  // IN DM
  if (!isDmOwner(dmId, uId) && inDm) {
    return { error: 'no Owner permission' };
  }
  msg.isPinned = true;
  setData(data);
  return {};
};
