import { getData } from './dataStore';
import { users } from './interfaces';
// HELPER FUNCTION
/**
 *
 * @returns messageId thats unique
 *
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
/*
const data = {
  channels: [
    {
      messages: [{ messageId: 1 }, { messageId: 2}]
    },
    {
      messages: [{ messageId: 3}, { messageId: 4}]
    },
    {
      messages: [{ messageId: 5}, { messageId: 6}]
    },
  ]
}
let id = Math.floor(Math.random() * 10);
const findId = (n) => {
    return n.messages.find(mId => mId.messageId === id)!==undefined ? true : false;
}
console.log(id);
while (data.channels.find(findId) !== undefined) {
  id = Math.floor(Math.random() * 10);
  console.log(id);
}
console.log(id);
*/

/**
 *
 * @param token
 * @returns returns the uId from a token
 * , or returns false
 */
export const getUidFromToken = (token: string): users => {
  const data = getData();
  const findToken = (a) => {
    return !!a.token.find(n => n === token);
  };
  const uId = data.users.find(findToken).uId; // smtng wriong
  return uId || false;
};

/// //////////////////////////////////////////////////////////////////////////////////
/*   Test in terminal
const data = {
  users: [

    {
      uId: 3,
      token: ['a', 'b']
    },
    {
      uId: 4,
      token: ['c', 'd']
    },
    {
      uId: 7,
      token: ['e', 'f']
    },
  ]
}
const findToken = (a) => {
  return a.token.find(n => n === token) ? true : false;
}
const token = 'c';
const uId = data.users.find(findToken).uId;
console.log(uId);

*/
