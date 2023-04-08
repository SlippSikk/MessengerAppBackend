/*
import { getData, setData } from './dataStore';
import { isOwner, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember, getUser, userIndexToken } from './helper';
import { isDmIdValid, isDmOwner, isChannelIdValid, getMessage } from './helper';
import { dataTs, channel, dms, messages } from './interfaces';
// HELPER FUNCTIONS ADD LATER

const getChannelFromMessageId = (messageId: number): channel => {
  const data: dataTs = getData();
  return data.channels.find(channel => channel.messages.find(message => message.messageId === messageId));
};

const getDmFromMessageId = (messageId: number): dms => {
  const data: dataTs = getData();
  return data.dms.find(dm => dm.messages.find(message => message.messageId === messageId));
};

const getMessage = (messageId: number): messages => {
  return isYieldExpression;
};

const isDmOwner = (dmId: number, uId: number): boolean => {
  return true;
};
/**
 * @param token
 * @param dmId
 * @param message
 * @returns
 */
/*
export const messagePinV1 = (token: string, messageId: number) => {
  const data: dataTs = getData();
  let inChannel = true;
  let inDm = true;
  // MESSAGE OBJECT = either channel or dm
  let dms;
  let channel = getChannelFromMessageId(messageId);
  if (!channel) {
    dms = getDmFromMessageId(messageId);
    inChannel = false;
  }
  if (!dms) {
    inDm = false;
  }
  // --------- CHECKS IF IS MESSAGEID ISVALID -----------------------
  // Checks if messageId is in channel or a dm
  if (inChannel && inDm) {
    return { error: 'Invalid messageId' };
  }
  const uId = getUIdFromToken(token);
  // Check if user is in Channel
  let channelId: number;
  if (inChannel) {
    channelId = channel.channelId;
    if (!isMember(channelId, uId)) {
      return { error: 'not a member of messageId' };
    }
  }
  // Check if user is in dm
  let dmId: number;
  if (inDm) {
    dmId = dms.dmId;
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
*/
