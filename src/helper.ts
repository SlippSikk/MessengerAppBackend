import { getData } from './dataStore';
import { users } from './interfaces';
// HELPER FUNCTION

/**
 * @param channelId
 * @returns the channel object or false
 * @sum get the channel object of channelId
 */
export const getChannel = (channelId: number) => {
  const data = getData();
  const channel = data.channels.find(a => a.channelId === channelId);
  return channel !== undefined ? channel : false;
};

/**
 * @param channelId
 * @param uId
 * @returns  true/false
 * @summary check if uId is member of channelId
 */
export const isMember = (channelId: number, uId: number): boolean => {
  const channel = getChannel(channelId);
  const value = channel.allMembers.find(a => a === uId);
  return value !== undefined ? value : false;
};

/**
 * @param channelId
 * @param uId
 * @returns  true/false
 * @summary checks if uId is Owner of channelId
 */
export const isOwner = (channelId: number, uId: number): boolean => {
  const channel = getChannel(channelId);
  const value = channel.ownerMembers.find(a => a === uId);
  return value !== undefined;
};

// idk how this works yet, feel free to fill if u know
export const hasOwnerPermission = () => {
  console.log('finish this');
};

/**
 * @param {token:string}
 * @return {true/false}
 */
export const isTokenValid = (token: string): boolean => {
  return !!getUidFromToken(token);
};

/**
 * @returns messageId thats unique
 */
export const createMessageId = (): number => {
  const data = getData();
  let id = Math.floor(Math.random() * 10000);
  const findId = (n) => {
    return n.messages.find(mId => mId.messageId === id) !== undefined;
  };
  while (data.channels.find(findId) !== undefined) {
    id = Math.floor(Math.random() * 10000);
  }
  return id;
};

/**
 * @param token
 * @returns returns the uId from a token
 * , or returns false
 */
export const getUidFromToken = (token: string): users => {
  const data = getData();
  const findToken = (a) => {
    return a.token.find(n => n === token) !== undefined;
  };
  const uId = data.users.find(findToken).uId;
  return uId || false;
};
