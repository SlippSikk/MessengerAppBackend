import { getData } from './dataStore';
import { getUser, getUIdFromToken, validateToken } from './helper';
import { messages, error } from './interfaces';
import HTTPError from 'http-errors';

export function searchV1(token: string, queryStr: string): error | { messages: messages[] } {
  const data = getData();

  // Invalid token
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid token');
  }

  // length of queryStr is less tahn 1 or over 1000 characters
  if (queryStr.length > 1000 || queryStr.length < 1) {
    throw HTTPError(400, 'message must be between 1 to 1000 letters');
  }

  const uId = getUIdFromToken(token);
  const user = getUser(uId);

  const messages = [];

  for (const channel of data.channels) {
    if (channel.allMembers.findIndex(element => element.uId === user.uId) >= 0) {
      for (const mess of channel.messages) {
        if (mess.message.includes(queryStr)) {
          messages.push(mess);
        }
      }
    }
  }

  for (const dm of data.dms) {
    if (dm.members.findIndex(element => element.uId === user.uId) >= 0) {
      for (const dir of dm.messages) {
        if (dir.message.includes(queryStr)) {
          messages.push(dir);
        }
      }
    }
  }

  //   for (const message of messages) {
  //     for (const react of message.reacts) {
  //       if (react.allUsers.findIndex(element => element.uId === user.uId) >= 0) {
  //         react.allUsers.push(user);
  //       }
  //     }
  //   }

  return { messages: messages };
}
