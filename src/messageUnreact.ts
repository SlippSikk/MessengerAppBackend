/*
import { receiveMessageOnPort } from 'worker_threads';
import { getData, setData } from './dataStore';
import { isTokenValid, isMessageInChannel, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage, isDmMember, getUser } from './helper';
import { isDmIdValid, createMessageId, isChannelIdValid, getMessage } from './helper';
import { dataTs, channel, dms, messages, user } from './interfaces';

/**
 * @param token
 * @param dmId
 * @param message
 * @returns
 */
/*
export const messageUnreactV1 = (token: string, messageId: number, reactId: number) => {
  const data: dataTs = getData();

  ////////////////////////////
  // ERROR CASE HERE
  ////////////////////////////
  const msg = getMessage(messageId) as messages;
  const indexReactId = reactId - 1;
  const indexToRemove = msg.reacts[indexReactId].allUsers.findIndex(user => user.uId === getUIdFromToken(token) as number);
  msg.reacts[indexReactId].allUsers.splice(indexToRemove, 1);
  setData(data);
  return { messageId: messageId };
};
*/
