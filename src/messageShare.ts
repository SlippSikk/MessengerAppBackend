import { getData } from './dataStore';
import { validateToken, getUIdFromToken, isMember, isDmMember } from './helper';
import { isDmIdValid, isChannelIdValid } from './helper';
import { dataTs, messages } from './interfaces';
import { messageSendV2, messageSenddmV2 } from './message';
import HTTPError from 'http-errors';

/**
 * @param {number} messageId
 * @returns {object} msg object
 * @summary Gets message object
 */
export const getMessage = (messageId: number): messages | boolean => {
  const data: dataTs = getData();
  let msg;
  for (const channel of data.channels) {
    msg = channel.messages.find(message => message.messageId === messageId);
    if (msg) {
      return msg;
    }
  }
  for (const dm of data.dms) {
    msg = dm.messages.find(message => message.messageId === messageId);
    if (msg) {
      return msg;
    }
  }
  return false;
};

export const messageShareV1 = (token: string, ogMessageId: number, message: string, channelId: number, dmId: number) => {
  let toChannel = false;
  let toDms = false;
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid token');
  }
  if (channelId === -1 && dmId === -1) {
    throw HTTPError(400, 'both channelId and dmId is -1');
  }
  if (!(channelId === -1 || dmId === -1)) {
    throw HTTPError(400, 'either channelId/dmId must be -1');
  }
  if (!isChannelIdValid(channelId) && !isDmIdValid(dmId)) {
    throw HTTPError(400, 'Invalid dmId/channelId');
  }
  (channelId === -1) ? toDms = true : toChannel = true;
  // -------------- Test ogMessageId -------------------------------
  const ogMessage = (getMessage(ogMessageId) as messages).message;
  if (!ogMessage) {
    throw HTTPError(400, 'Invalid ogMessageId');
  }
  if (!(message.length <= 1000)) {
    throw HTTPError(400, 'message must be between 1 to 1000 letters');
  }
  const uId = getUIdFromToken(token) as number;
  if (toChannel) {
    if (!isMember(channelId, uId)) {
      throw HTTPError(403, 'user not a member of Channel');
    }
  }
  if (toDms) {
    if (!isDmMember(dmId, token)) {
      throw HTTPError(403, 'user not a member of Dms');
    }
  }
  const note = `${ogMessage}, Note: ${message}`;
  let sharedMessageId;
  if (toChannel) {
    sharedMessageId = messageSendV2(token, channelId, note).messageId;
  }
  if (toDms) {
    sharedMessageId = messageSenddmV2(token, dmId, note).messageId;
  }
  return { sharedMessageId: sharedMessageId };
};
