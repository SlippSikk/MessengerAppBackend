import { getData, setData } from './dataStore';
import { isTokenValid, isMessageInChannel, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember } from './helper';
import { isDmIdValid, createMessageId, isChannelIdValid } from './helper';
import { dataTs, channel, dms } from './interfaces';

export function messageEditV1(token: string, messageId: number, message: string) {
  const data: dataTs = getData();
  if (message.length > 1000) {
    return { error: 'Messages cannot be longer than 1000 characters' };
  }

  if (!isTokenValid(token)) {
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
    console.log(data.dms[dmIndex].messages);
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

export const messageSenddmV1 = (token: string, dmId: number, message: string) => {
  const data: dataTs = getData();

  if (!isDmIdValid(dmId)) {
    return { error: 'Invalid dmId' };
  }
  if (!(message.length >= 1 && message.length <= 1000)) {
    return { error: 'message must be between 1 to 1000 letters' };
  }
  if (!isTokenValid(token)) {
    return { error: 'invalid token' };
  }
  if (!isDmMember(dmId, token)) {
    return { error: 'user is not member of channel' };
  }
  const messageId = createMessageId();
  const uId = getUIdFromToken(token) as number;
  const dmIndex: number = data.dms.findIndex(dm => dm.dmId === dmId);
  data.dms[dmIndex].messages.push({
    messageId: messageId,
    uId: uId,
    message: message,
    timeSent: ~~(new Date().getTime() / 1000)
  });
  setData(data);
  return { messageId: messageId };
};

/**
 *
 * @param token
 * @param channelId
 * @param message
 * @returns
 */

export const messageSendV1 = (token: string, channelId: number, message: string) => {
  const data: dataTs = getData();

  if (!isChannelIdValid(channelId)) {
    return { error: 'Invalid channelId' };
  }
  if (!(message.length >= 1 && message.length <= 1000)) {
    return { error: 'message must be between 1 to 1000 letters' };
  }
  if (!isTokenValid(token)) {
    return { error: 'invalid token' };
  }
  const uId = getUIdFromToken(token) as number;
  if (!isMember(channelId, uId)) {
    return { error: 'user is not member of channel' };
  }
  const messageId = createMessageId();
  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  data.channels[channelIndex].messages.push({
    messageId: messageId,
    uId: uId,
    message: message,
    timeSent: ~~(new Date().getTime() / 1000)
  });
  setData(data);
  return { messageId: messageId };
};
