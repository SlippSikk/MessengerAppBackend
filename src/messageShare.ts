/*
import { getData, setData } from './dataStore';
import { validateToken, getUIdFromToken, isMember, isDmMember } from './helper';
import { isDmIdValid, isChannelIdValid } from './helper';
import { dataTs, channel, dms } from './interfaces';
import { messageSendV2, messageSenddmV2 } from './message';
import HTTPError from 'http-errors';

const getChannelFromMessageId = (messageId: number): channel => {
  const data: dataTs = getData();
  return data.channels.find(channel => channel.messages.find(message => message.messageId === messageId));
};

const getDmFromMessageId = (messageId: number): dms => {
  const data: dataTs = getData();
  return data.dms.find(dm => dm.messages.find(message => message.messageId === messageId));
};

export const messageShareV1 = (token: string, ogMessageId: number, message: string, channelId: number, dmId: number) => {
  const data: dataTs = getData();
  let toChannel = false;
  let toDms = false;
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid token');
  }
  if (channelId === -1 && dmId === -1) {
    throw HTTPError(400, 'both channelId and dmId is -1');
  }
  if (!isChannelIdValid(channelId) && !isDmIdValid(dmId)) {
    throw HTTPError(400, 'Invalid dmId/channelId');
  }
  (channelId === -1) ? toDms = true : toChannel = true;
  if (!getChannelFromMessageId(ogMessageId) && !getDmFromMessageId(ogMessageId)) {
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

  // ////////////////////////////////////////////////////////////////

  const note = `${ogMessage}, Note: ${message}`;
  let sharedMessageId;
  if (toChannel) {
    sharedMessageId = messageSendV2(token, channelId, note).messageId;
  }
  if (toDms) {
    sharedMessageId = messageSenddmV2(token, dmId, note).messageId;
  }
  setData(data);
  return { sharedMessageId: sharedMessageId };
};
*/
