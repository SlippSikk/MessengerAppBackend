import { getData, setData } from './dataStore';
import { validateToken, isMessageInChannel, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember } from './helper';
import { isDmIdValid, createMessageId, isChannelIdValid } from './helper';
import { dataTs, channel, dms, error, messageId } from './interfaces';
import { tagChannelNotification, tagDmNotification } from './notifications';
import HTTPError from 'http-errors';

export function messageSendLaterV1 (token: string, channelId: number, message: string, timeSent: number): error | messageId {
  const data: dataTs = getData();

  // channelId does not refer to a valid channel
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'Invalid channelId');
  }

  // length of message is less than 1 or over 1000 characters
  if (!(message.length >= 1 && message.length <= 1000)) {
    throw HTTPError(400, 'message must be between 1 to 1000 letters');
  }

  // Invalid token
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid token');
  }

  // channelId is valid and the authorised user is not a member of the channel they are trying to post to
  const uId = getUIdFromToken(token) as number;
  if (!isMember(channelId, uId)) {
    throw HTTPError(403, 'user is not member of channel');
  }

  // timeSent is a time in the past
  if (timeSent * 1000 < new Date().getTime()) {
    throw HTTPError(400, 'timeSent is a time in the past');
  }

  for (;;) {
    if (new Date().getTime() >= timeSent * 1000) {
      break;
    }
  }

  const messageId = createMessageId();
  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);

  data.channels[channelIndex].messages.push({
    messageId: messageId,
    uId: uId,
    message: message,
    timeSent: ~~(new Date().getTime() / 1000),
    reacts: [{
      reactId: 1,
      allUsers: []
    }],
    isPinned: false
  });

  setData(data);

  tagChannelNotification(message, channelId, token);

  return { messageId: messageId };
}

export function messageEditV1(token: string, messageId: number, message: string) {
  const data: dataTs = getData();
  if (message.length > 1000) {
    return { error: 'Messages cannot be longer than 1000 characters' };
  }

  if (!validateToken(token)) {
    return { error: 'Invalid token' };
  }

  if (isMessageInChannel(messageId)) {
    const channelIndex: number = findChannelIndexWithMessage(messageId);
    const channel: channel = data.channels[channelIndex];
    const currentMessage = channel.messages.find(message => message.messageId === messageId);
    const authUserId: number = getUIdFromToken(token) as number;
    if (!isMember(channel.channelId, authUserId) && authUserId !== 1) {
      return { error: 'This user is not a member of this channel' };
    }

    if (!isOwnerByToken(channel.channelId, token) && currentMessage.uId !== authUserId && authUserId !== 1) {
      return { error: 'authUser does not have correct privileges' };
    }

    if (message.length === 0) {
      data.channels[channelIndex].messages = data.channels[channelIndex].messages.filter(message => message.messageId !== messageId);
    } else {
      const messageIndex: number = channel.messages.findIndex(message => message.messageId === messageId);
      data.channels[channelIndex].messages[messageIndex].message = message;
    }
    setData(data);
    tagChannelNotification(message, data.channels[channelIndex].channelId, token);
    return {};
  } else if (isMessageInDM(messageId)) {
    const dmIndex: number = findDMIndexWithMessage(messageId);
    const dm: dms = data.dms[dmIndex];
    const currentMessage = dm.messages.find(message => message.messageId === messageId);
    const authUserId: number = getUIdFromToken(token) as number;

    if (dm.creator.uId !== authUserId && currentMessage.uId !== authUserId) {
      return { error: 'authUser does not have correct privileges' };
    }

    if (dm.creator.uId !== authUserId && !isDmMember(dm.dmId, token)) {
      console.log('This user is not a member of this DM');
    }

    if (message.length === 0) {
      data.dms[dmIndex].messages = data.dms[dmIndex].messages.filter(message => message.messageId !== messageId);
    } else {
      const messageIndex: number = dm.messages.findIndex(message => message.messageId === messageId);
      data.dms[dmIndex].messages[messageIndex].message = message;
    }
    setData(data);
    tagDmNotification(message, data.dms[dmIndex].dmId, token);
    return {};
  }

  return { error: 'MessageID is invalid' };
}

export function messageRemoveV1(token: string, messageId: number) {
  return messageEditV1(token, messageId, '');
}

/**
 *
 * @param token
 * @param dmId
 * @param message
 * @returns
 */

export const messageSenddmV2 = (token: string, dmId: number, message: string) => {
  const data: dataTs = getData();

  if (!isDmIdValid(dmId)) {
    throw HTTPError(400, 'Invalid dmId');
  }
  if (!(message.length >= 1 && message.length <= 1000)) {
    throw HTTPError(400, 'message must be between 1 to 1000 letters');
  }
  if (!validateToken(token)) {
    throw HTTPError(400, 'Invalid token');
  }
  if (!isDmMember(dmId, token)) {
    throw HTTPError(403, 'user is not member of channel');
  }
  const messageId = createMessageId();
  const uId = getUIdFromToken(token) as number;
  const dmIndex: number = data.dms.findIndex(dm => dm.dmId === dmId);
  data.dms[dmIndex].messages.push({
    messageId: messageId,
    uId: uId,
    message: message,
    timeSent: ~~(new Date().getTime() / 1000),
    reacts: [{
      reactId: 1,
      allUsers: []
    }],
    isPinned: false
  });
  setData(data);
  tagDmNotification(message, dmId, token);
  return { messageId: messageId };
};

/**
 *
 * @param token
 * @param channelId
 * @param message
 * @returns
 */

export const messageSendV2 = (token: string, channelId: number, message: string) => {
  const data: dataTs = getData();

  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, 'Invalid channelId');
  }
  if (!(message.length >= 1 && message.length <= 1000)) {
    throw HTTPError(400, 'message must be between 1 to 1000 letters');
  }
  if (!validateToken(token)) {
    throw HTTPError(400, 'Invalid token');
  }
  const uId = getUIdFromToken(token) as number;
  if (!isMember(channelId, uId)) {
    throw HTTPError(403, 'user is not member of channel');
  }
  const messageId = createMessageId();
  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  data.channels[channelIndex].messages.push({
    messageId: messageId,
    uId: uId,
    message: message,
    timeSent: ~~(new Date().getTime() / 1000),
    reacts: [{
      reactId: 1,
      allUsers: []
    }],
    isPinned: false
  });
  setData(data);

  tagChannelNotification(message, channelId, token);
  return { messageId: messageId };
};
