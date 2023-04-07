/*
import { receiveMessageOnPort } from 'worker_threads';
import { getData, setData } from './dataStore';
import { isTokenValid, isMessageInChannel, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember, getUser } from './helper';
import { isDmIdValid, createMessageId, isChannelIdValid, getMessage } from './helper';
import { dataTs, channel, dms, messages } from './interfaces';

/**
 * @param token
 * @param dmId
 * @param message
 * @returns
 */
/*
export const messageReactV1 = (token: string, messageId: number, reactId: number) => {
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
  const msg = getMessage(messageId) as messages;
  const indexReactId = reactId - 1;
  msg.reacts[indexReactId].allUsers.push(
    getUser(getUIdFromToken(token) as number)
  );

  setData(data);
  return { messageId: messageId };
};
*/
