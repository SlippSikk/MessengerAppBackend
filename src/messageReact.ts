import { getData, setData } from './dataStore';
import { isTokenValid, isMessageInChannel, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember } from './helper';
import { isDmIdValid, createMessageId, isChannelIdValid } from './helper';

/**
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