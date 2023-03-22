// import { ischannelIdValid, isMember, isTokenValid, createMessageId, getUidFromToken } from './helper';

/**
 *
 * @param token
 * @param channelId
 * @param message
 * @returns
 */
/*
const messageSend = (token: string, channelId: number, message: string) => {
  if (!isChannelIdValid(channelId)) {
    return { error: 'Invalid channelId' };
  }
  if (!(message.length >= 1 && message.length <= 1000)) {
    return { error: 'message must be between 1 to 1000 letters' };
  }
  if (!isMember(channelId, uId)) {
    return { error: 'user is not member of channel' };
  }
  if (!isTokenValid(token)) {
    return { error: 'invalid token' };
  }
  const messageId = createMessageId();
  const uId = getUidFromToken(token);

  //   should I put time stamp ??
  channel.messages.push({
    messageId: messageId,
    uId: uId,
    message: message,
    timeSent: getTime()
  })
  return { messageId: messageId }
};
*/
