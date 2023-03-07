import { getData, setData } from "./dataStore";
import validator from 'validator';

function authRegisterV1(email, password, nameFirst, nameLast) {
    let data = getData();

    // Create Users array
    if (data.users === undefined) {
        data.users = [];
    }


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
    let nameConcat = nameFirst.toLowerCase() + nameLast.toLowerCase();

    if (nameConcat.length > 20) {
        nameConcat = nameConcat.slice(0, 20);
    }

    // Check for duplicate and if found add numbers till unique
    let foundHandle = data.users.find(element => element.handleStr === nameConcat);
    for (let i = 0; foundHandle !== undefined; i++) {
        nameConcat = nameConcat + 'i';
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
