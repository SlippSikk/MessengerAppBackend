import { getData, setData } from "./dataStore.js";
import validator from 'validator';

/**
 * Summary: Registers a user returning their unique Id
 * 
 * Description:
 * This function accepts arguments that are details of a user and register his
 * details and then returns his unique Id. The way they are registered is first
 * making sure the inputs are valid, second storing their information in an object
 * inside of an array called users. 
 * Amongst the inofrmation stored are two new fields. The userId and handleStr. The 
 * userId is uniquely generated then the handleStr is made concatenating the first name
 * and last name.
 * Finally the userId is returned
 * 
 * @param {string} email - Email address of the user
 * @param {string} password - password of the user
 * @param {string} nameFirst - first name of the user
 * @param {string} nameLast - last name of the user
 * 
 * @returns {authUserId: Number} authUserId - Unqiue ID of the user created
 * @returns {error: 'string'} Error Message - Error message describing the error cause
 **/

function authRegisterV1(email, password, nameFirst, nameLast) {
    let data = getData();

    // Error Block
    const found = data.users.find(element => element.email === email);
    if (!(validator.isEmail(email))) {
        return { error: 'Invalid Email' };
    } else if (found !== undefined) {
        return { error: 'Email in use' };
    } else if (password.length < 6) {
        return { error: 'Password too short' }
    } else if (nameFirst.length < 1 || nameFirst.length > 50) {
        return { error: 'Incorrect nameFirst length' };
    } else if (nameLast.length < 1 || nameLast.length > 50) {
        return { error: 'Incorrect nameLast length' };
    }

    // Create handleStr
    let nameConcats = nameFirst.toLowerCase() + nameLast.toLowerCase();

    const regex = /[^a-z0-9]/g;
    // Remove all non-alphanumeric characters and convert to lowercase
    nameConcats = nameConcats.replace(regex, '').toLowerCase(); 

    if (nameConcats.length > 20) {
        nameConcats = nameConcats.slice(0, 20);
    }

    let nameConcat = nameConcats;
    // Check for duplicate and if found add numbers till unique
    let foundHandle = data.users.find(element => element.handleStr === nameConcats);
    for (let i = 0; foundHandle !== undefined; i++) {
        nameConcat = nameConcats + i;
        foundHandle = data.users.find(element => element.handleStr === nameConcat);
    }

    const Id = data.users.length + 1;

    const user = {
        uId: Id,
        email: email,
        nameFirst: nameFirst,
        nameLast: nameLast,
        handleStr: nameConcat,
        password: password,
    };

    data.users.push(user);

    setData(data);

    return {
        authUserId: Id,
    };
}

/**
 * Summary: Logs a user in and returns their userId
 * 
 * Descritpion: This function accepts the email and password of the user. It checks
 * that the user exists and then proceeds to return the userId of the user if their 
 * email and password match up together.
 * 
 * @param {string} email - Email address of the user
 * @param {string} password - password of the user
 * 
 * @returns {authUserId: Number} authUserId - Unqiue ID of the user created
 * @returns {error: 'string'} Error Message - Error message describing the error caus
 */
function authLoginV1(email, password) {

    let data = getData();

    // Error Block & find Object with details
    if (data.users === undefined) {
        return { error: 'user does not exist' };
    }

    const found = data.users.find(element => element.email === email);
    const foundPass = data.users.find(element => element.password === password);
    if (found === undefined) {
        return { error: 'Email does not belong to a user' };
    } else if (foundPass === undefined) {
        return { error: 'Password Incorrect' };
    }


    return {
        authUserId: found.uId,
    };
}

export { authRegisterV1, authLoginV1 };
