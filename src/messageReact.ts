/*
import { receiveMessageOnPort } from 'worker_threads';
import { getData, setData } from './dataStore';
import { isTokenValid, isMessageInChannel, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember, getUser } from './helper';
import { isDmIdValid, createMessageId, isChannelIdValid, getMessage, validateToken } from './helper';
import { dataTs, channel, dms, messages } from './interfaces';
import HTTPError from 'http-errors';
/**
 * @param {number} messageId
 * @returns {object} msg object
 * @summary Gets message object
 */

/**
 * @param token
 * @param dmId
 * @param message
 * @returns
 */
/*
export const messageReactV1 = (token: string, messageId: number, reactId: number) => {
  const data: dataTs = getData();
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid token');
  }
  const msg = getMessage(messageId) as messages;
  if (!msg) {
    throw HTTPError(400, 'Invalid messageId');
  }
  if (reactId !== 1) {
    throw HTTPError(400, 'Invalid ReactId');
  }
  const indexReactId = reactId - 1;
  const uId = getUIdFromToken(token) as number;
  if (msg.reacts[indexReactId].allUsers.find(user => user.uId === uId)) {
    throw HTTPError(400, 'Already reacted');
  }
  msg.reacts[indexReactId].allUsers.push(getUser(uId));
  setData(data);
  return { messageId: messageId };
};
*/
