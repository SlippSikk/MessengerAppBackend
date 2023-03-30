
/**
 * For a valid user, returns information about their user ID,
 * email, first name, last name, and handle
 *
 * @param {string} authUserId
 * @param {string} uID
 * @returns {{user: object}}
 */
/*
import { getData, setData } from "./dataStore";
import validator from 'validator';
import { users, authUserId, error } from './interfaces'
import { isTokenValid, isUserIdValid, getHandle, getUser } from './helper'

/**
 * set a new email for a user
 * @param {string} token
 * @param {string} email
 * @returns {}
 */
/*     ---------------delete this line-----------------------
export function userProfileSetemailV1(token:string, email:string){
    let data = getData();
    if (isTokenValid(token) !== true) {
        return { error: 'Token is not valid' };
    }
    if (!(validator.isEmail(email))) {
        return { error: 'Invalid Email' }
    }
    const userObject_email = data.users.find(a => a.email === email)
    if ( userObject_email !== undefined) {
        return { error: 'Email in use' }
    }
    const userObject = data.users.find(a => a.token.includes(token))  //I guess it could work :D
    userObject.email = email
    setData(data)
    return {}
}
/**
 * set a new handle for a user
 * @param {string} token
 * @param {string} handleStr
 * @returns {}
 */
/*---------------delete this line-----------------------
export function userProfileSethandleV1(token:string, handleStr:string){
  let data = getData();
  if (isTokenValid(token) !== true) {
      return { error: 'Token is not valid' };
  }

  const userObject_handleStr = data.users.find(a => a.handleStr === handleStr)
  if ( userObject_handleStr !== undefined) {
      return { error: 'handleStr in use' }
  }
  const no_alphanumeric = /^[a-zA-Z0-9]+$/i         //not sure here..
  if (!no_alphanumeric.test(handleStr)){
    return {error: 'handleStr can not include non alphanumeric'}
  }

  if((handleStr.length > 20) || (handleStr.length < 3)){
    return {error: 'length of handleStr is not between 3 and 20 characters inclusive'}
  }

  const userObject = data.users.find(a => a.token.includes(token))  //I guess it could work :D
  userObject.handleStr = handleStr
  setData(data)
  return {}
}

/**
 * set a new name for a user
 * @param {string} token
 * @param {string} nameFirst
 * @param {string} nameLast
 * @returns {}
 */
/*---------------delete this line-----------------------
export function userProfileSetnameV1(token:string, nameFirst:string, nameLast:string){
  let data = getData();
  if (isTokenValid(token) !== true) {
      return { error: 'Token is not valid' };
  }
  if((nameFirst.length > 50) || (nameFirst.length < 1)){
    return {error: 'length of nameFirst is not between 1 and 50 characters inclusive'}
  }
  if((nameLast.length > 50) || (nameLast.length < 1)){
    return {error: 'length of nameLast is not between 1 and 50 characters inclusive'}
  }
  const userObject = data.users.find(a => a.token.includes(token))  //I guess it could work :D
  userObject.nameFirst = nameFirst
  userObject.nameLast = nameLast
  setData(data)
  return {}
}
/**
 * view all users' detail
 * @param {string} token
 * @returns {{users}}
 */
/*---------------delete this line-----------------------
export function usersAllV1(token:string){
  let data = getData();
  if (isTokenValid(token) !== true) {
    return { error: 'Token is not valid' };
  }
  const users = data.users
    .map(p =>({
      uId: p.uId, 
      email: p.email, 
      nameFirst: p.nameFirst, 
      nameLast: p.nameLast, 
      handleStr: p.handleStr
    }))
  return {users}
}
/**
 * view all users' detail
 * @param {string} token
 * @param {string} uId
 * @returns {user}
 */
/*---------------delete this line-----------------------
export function userProfileV2(token:string, uId:number){
  let data = getData();
  if (isTokenValid(token) !== true) {
    return { error: 'Token is not valid' };
  }
  const idToView = data.users.find(a => a.uId === uId)
  if(idToView === undefined){
    return { error: 'uId is not valid' };
  }
  return {user:{
    uId: idToView.uId,
    email: idToView.email,
    nameFirst: idToView.nameFirst,
    nameLast: idToView.nameLast,
    handleStr: idToView.handleStr
  }}


}
------------------delete me-----------------*/