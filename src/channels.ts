// import { isToken } from 'typescript';
import { getData, setData } from './dataStore';
import { getUIdFromToken, isTokenValid } from './helper';
import { error, channel, channelId } from './interfaces';
// import { channels } from './interfaces'

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
 * @returns {channelId: number} - The unique channelId that gets created upon creating a new channel
 */

export function channelsCreateV2(token: string, name: string, isPublic: boolean): channelId | error {
  const data = getData();

  // Error cases:
  // name is less than 1 character
  if (name.length < 1) {
    return { error: 'name is less than 1 character' };
  }

  // name is more than 20 characters
  if (name.length > 20) {
    return { error: 'name is more than 20 characters' };
  }

  // token is invalid
  if (!isTokenValid(token)) return { error: 'token not valid' };

  // Find and assign a suitable channelId
  let channelId: number;
  if (data.channels.length === 0) {
    channelId = 1;
  } else if (data.channels.length > 0) {
    channelId = data.channels[data.channels.length - 1].channelId + 1;
  }

  const userId = getUIdFromToken(token);
  const userIndex = data.users.findIndex(user => user.uId === userId);

  const newChannel: channel = {
    channelId: channelId,
    name: name,
    isPublic: isPublic,
    ownerMembers: [{
      uId: data.users[userIndex].uId,
      email: data.users[userIndex].email,
      nameFirst: data.users[userIndex].nameFirst,
      nameLast: data.users[userIndex].nameLast,
      handleStr: data.users[userIndex].handleStr,
    }],
    allMembers: [{
      uId: data.users[userIndex].uId,
      email: data.users[userIndex].email,
      nameFirst: data.users[userIndex].nameFirst,
      nameLast: data.users[userIndex].nameLast,
      handleStr: data.users[userIndex].handleStr,
    }],
    messages: []
  };

  data.channels.push(newChannel);

  setData(data);

  return { channelId: channelId };
}
