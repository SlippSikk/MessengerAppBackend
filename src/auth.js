import { getData, setData } from "./dataStore";
import validator from 'validator';

function authRegisterV1(email, password, nameFirst, nameLast) {
    return {
        authUserId: 1,
    };
}

function authLoginV1(email, password) {

    let data = getData();

    // Error Block & find Object with details
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
