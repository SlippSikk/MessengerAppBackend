/*
import { receiveMessageOnPort } from 'worker_threads';
import { getData, setData } from './dataStore';
import { isTokenValid, isMessageInChannel, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember, getUser } from './helper';
import { isDmIdValid, createMessageId, validateToken, getMessage } from './helper';
import { dataTs, channel, dms, messages, user } from './interfaces';
import HTTPError from 'http-errors';
/**
 * @param token
 * @param dmId
 * @param message
 * @returns
 */
/*
export const messageUnreactV1 = (token: string, messageId: number, reactId: number) => {
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
  if (!msg.reacts[indexReactId].allUsers.find(user => user.uId === uId)) {
    throw HTTPError(400, 'no Reaction');
  }
  ////////////////////////////
  const indexToRemove = msg.reacts[indexReactId].allUsers.findIndex(user => user.uId === getUIdFromToken(token) as number);
  msg.reacts[indexReactId].allUsers.splice(indexToRemove, 1);
  setData(data);
  return {};
};
*/
