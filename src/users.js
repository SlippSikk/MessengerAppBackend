
/**
 * For a valid user, returns information about their user ID, 
 * email, first name, last name, and handle
 *
 * @param {string} authUserId
 * @param {string} uID
 * @returns {{user: object}}
 */

import { getData } from "./dataStore";
export function userProfileV1(authUserId, uId){   //here
    let data = getData();
    const authUser = data.users.find(object => object.uId === authUserId);
    const idToView = data.users.find(object => object.uId === uId); 
    if (authUser === undefined) {
        return { error: 'authUserId is invaild' };
    } else if (idToView === undefined) {
        return { error: 'uId is invaild' };
    }


    return {
        user: {
          uId: idToView.uId,
          email: idToView.email,
          nameFirst: idToView.nameFirst,
          nameLast: idToView.nameLast,
          handleStr: idToView.handleStr,
        }
      }
}