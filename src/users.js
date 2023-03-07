import { getData } from "./dataStore";
export function userProfileV1(authUserId, uId){
    let data = getData();
    const authUser = data.userMembers.find(object => object.userId === authUserId);
    const idToView = data.userMembers.find(object => object.userId === uId); 
    if (authUser === undefined) {
        return { error: 'authUserId is invaild' };
    } else if (idToView === undefined) {
        return { error: 'uId is invaild' };
    }


    return {
        user: {
          uId: idToView.userID,
          email: idToView.email,
          firstName: idToView.firstName,
          lastName: idToView.lastName,
          handleStr: idToView.handleStr,
        }
      }
}