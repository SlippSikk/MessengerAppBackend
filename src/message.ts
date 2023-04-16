import { getData, setData } from './dataStore';
import { validateToken, isMessageInChannel, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember } from './helper';
import { isDmIdValid, createMessageId, isChannelIdValid,isGlobalOwnerFromToken } from './helper';
import { dataTs, channel, dms, error, messageId } from './interfaces';
import { tagChannelNotification, tagDmNotification } from './notifications';
import HTTPError from 'http-errors';

/**
 * Summary:
 * When given a valid token, name, and privacy setting,
 * this function will create a new channel
 *
 * Description:
 * When given a valid name and token, the function will create a unique
 * channelId, and after it will create a new object containing; channelId, ownerId,
 * adminIds, memberIds, channelName, isPublic, messages. Then will set this new object into
 * the array named "channels", in the dataStore.js file using the setData function
 *
 * @param {string} token - Unique Id of a user
 * @param {string} name - Desired name for a new channel
 * @param {boolean} isPublic - Desired setting for the channel's privacy
 *
 * @returns {error: 'string'} - Error Message - Error message describing the error cause
 * @returns {messageId: number} - The unique messageId that gets created upon creating a new message
 */
export function messageSendLaterDmV1(token: string, dmId: number, message: string, timeSent: number): error | messageId {
  const data: dataTs = getData();

  // dmId does not refer to a valid DM
  if (!isDmIdValid(dmId)) {
    throw HTTPError(400, 'Invalid dmId');
  }

  // length of message is less than 1 or over 100 characters
  if (!(message.length >= 1 && message.length <= 1000)) {
    throw HTTPError(400, 'message must be between 1 to 1000 letters');
  }

  // invalid token
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid token');
  }

  // dmId is valid and the authorised user is not a member of the DM they are trying to post to
  if (!isDmMember(dmId, token)) {
    throw HTTPError(403, 'user is not a mmeber of the DM');
  }

  // timeSent is a time in the past
  if (timeSent * 1000 < new Date().getTime()) {
    throw HTTPError(400, 'timeSent is a time in the past');
  }

  // stay in this loop until the delay has been met
  for (; ;) {
    if (new Date().getTime() >= timeSent * 1000) {
      break;
    }
  }

  // prepare to make a new message
  const messageId = createMessageId();
  const uId = getUIdFromToken(token) as number;
  const dmIndex: number = data.dms.findIndex(dm => dm.dmId === dmId);

  // post message
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

  // notification
  tagDmNotification(message, dmId, token);

  return { messageId: messageId };
}

export function messageSendLaterV1(token: string, channelId: number, message: string, timeSent: number): error | messageId {
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

  // stay in this loop until the delay has been met
  for (; ;) {
    if (new Date().getTime() >= timeSent * 1000) {
      break;
    }
  }

  // prepare to create a new message
  const messageId = createMessageId();
  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);

  // post the message
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

  // notification
  tagChannelNotification(message, channelId, token);

  return { messageId: messageId };
}

export function messageEditV2(token: string, messageId: number, message: string) {
  const data: dataTs = getData();
  if (message.length > 1000) {
    throw HTTPError(400, 'Messages must be longer than 1000 characters');
  }

  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid token');
  }

  if (isMessageInChannel(messageId)) {
    const channelIndex: number = findChannelIndexWithMessage(messageId);
    const channel: channel = data.channels[channelIndex];
    const currentMessage = channel.messages.find(message => message.messageId === messageId);
    const authUserId: number = getUIdFromToken(token) as number;
    if (!isMember(channel.channelId, authUserId)) {
      throw HTTPError(403, 'This user is not a member of this channel');
    }

    if (!isOwnerByToken(channel.channelId, token) && currentMessage.uId !== authUserId && !isGlobalOwnerFromToken(token)) {
      throw HTTPError(403, 'User does not have correct permissions');
    }

    if (message.length === 0) {
      data.channels[channelIndex].messages = data.channels[channelIndex].messages.filter(message => message.messageId !== messageId);
    } else {
      const messageIndex: number = channel.messages.findIndex(message => message.messageId === messageId);
      data.channels[channelIndex].messages[messageIndex].message = message;
    }
    setData(data);
    tagChannelNotification(message, channel.channelId, token);
    return {};
  } else if (isMessageInDM(messageId)) {
    const dmIndex: number = findDMIndexWithMessage(messageId);
    const dm: dms = data.dms[dmIndex];
    const currentMessage = dm.messages.find(message => message.messageId === messageId);
    const authUserId: number = getUIdFromToken(token) as number;

    if (dm.creator.uId !== authUserId && currentMessage.uId !== authUserId) {
      throw HTTPError(403, 'User does not have correct permissions');
    }

    if (dm.creator.uId !== authUserId && !isDmMember(dm.dmId, token)) {
      throw HTTPError(403, 'This user is not a member of this DM');
    }

    if (message.length === 0) {
      data.dms[dmIndex].messages = data.dms[dmIndex].messages.filter(message => message.messageId !== messageId);
    } else {
      const messageIndex: number = dm.messages.findIndex(message => message.messageId === messageId);
      data.dms[dmIndex].messages[messageIndex].message = message;
    }
    setData(data);
    tagDmNotification(message, dm.dmId, token);
    return {};
  }

  throw HTTPError(400, 'Invalid messageId');
}

export function messageRemoveV2(token: string, messageId: number) {
  return messageEditV2(token, messageId, '');
}

/**
 * @param token
 * @param dmId
 * @param message
 * @returns { messageId }
 * @method POST
 * @summary
 * Sends a message from authorised user to the DM specified by dmId.
 * Note: Each message should have its own unique ID, i.e. no messages
 * should share an ID with another message, even if that other message
 * is in a different channel or DM.
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
 * @param token
 * @param channelId
 * @param message
 * @returns { messageId }
 * @method POST
 * @summary
 *  Sends a message from the authorised user to the channel specified by channelId.
 *  Note: Each message should have its own unique ID, i.e. no messages should share an ID
 *  with another message, even if that other message is in a different channel or DM.
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
