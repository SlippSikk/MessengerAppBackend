import { getData } from './dataStore';
import { channel, user } from './interfaces';

// NOTE: checkExsists param "array" needs attention

// HELPER FUNCTION
/**
 * @param {number} searchID      - the unique ID to search for in the array
 * @param {integer} array        - an array of IDS
 * @returns {integer | boolean}  - either the index of search ID, or false if unfound
 * @summary check if an object exists in an array of objects based on searchID ,
 *  returns the index of that object if it exists, otherwise returns false
 */
export const checkExists = (searchID: number, array: number[]): number | boolean => {
  let i = 0;
  for (const element of array) {
    // the ID of a channel or user is always the first value in both objects
    const currentID = Object.values(element)[0];
    if (currentID === searchID) {
      return i;
    }
    i++;
  }
  return false;
};

/**
 * @param {integer} authUserId
 * @returns {boolean}
 * @summary check  if authUserId is valid/notValid
 */
export const isUserIdValid = (userId: number): boolean => {
  const dataStore = getData();
  for (const a of dataStore.users) {
    if (a.uId === userId) return true;
  }
  return false;
};
/**
 * @param {integer} channelId
 * @returns {boolean}
 * @summary check  if channelId is valid/notValid
 */
export const isChannelIdValid = (channelId: number): boolean => {
  const dataStore = getData();
  for (const a of dataStore.channels) {
    if (a.channelId === channelId) return true;
  }
  return false;
};

/**
 * @param channelId
 * @returns the channel object or false
 * @sum get the channel object of channelId
 */
export const getChannel = (channelId: number): channel | boolean => {
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
  return value !== undefined;
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

/**
 * @param channelId
 * @param uId
 * @summary Not Global owner permission , checks if uId is an owner (?);
 */
export const isOwnerByToken = (channelId: number, token: string): boolean => {
  const uId = getUIdFromToken(token) as number;
  return isOwner(channelId, uId);
};

/**
 * @param {token:string}
 * @return {true/false}
 */
export const isTokenValid = (token: string): boolean => {
  return !!getUIdFromToken(token);
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
export const getUIdFromToken = (token: string): number | boolean => {
  // const data = getData();
  // const findToken = (a) => {
  //   return a.token.find(n => n === token) !== undefined;
  // };
  // const uId = data.users.find(findToken).uId;
  // return uId || false;
  const data = getData();
  const foundToken = data.users.find(element => element.token.find(element => element === token))

  if (foundToken === undefined) {
    return false;
  }
  return foundToken.uId;
};

export const getHandle = (uId: number): string => {
  const data = getData();

  const user = data.users.find(element => element.uId === uId);

  return user.handleStr;

}

export const getUser = (uId: number): user => {
  const data = getData();
  const user = data.users.find(element => element.uId === uId);
  const member: user = {
    uId: user.uId,
    email: user.email,
    nameFirst: user.nameFirst,
    nameLast: user.nameLast,
    handleStr: user.handleStr
  }

  return member;
}
