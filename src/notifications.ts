import { channel } from 'diagnostics_channel';
import HTTPError from 'http-errors';
import { getData, setData } from './dataStore';
import { getIdFromMessage, userObjToken, validateToken } from './helper';
import { notifications } from './interfaces';

// : notifications[] (add to function return type)
export function notificationsGet(token: string) {
    if (!validateToken(token)) {
        throw HTTPError(403, "Invalid Token");
    }

    const userObject = userObjToken(token);
    return { notifications: userObject.notifications };

}

export function tagNotification(message: string, channelId: number, dmId: number, token: string) {
    const regex = /@\w+/g;
    const handles = message.match(regex);
    let handleArr = handles ? handles.map(handle => handle.slice(1)) : [];
    let handleSet = new Set<string>(handleArr)
    const arr = Array.from(handleSet)

    const tokenHandle = userObjToken(token).handleStr

    if (arr.length === 0) {
        return;
    };

    let data = getData();

    let name: string;
    if (dmId === -1) {
        name = data.channels.find(element => element.channelId === channelId).name;
    } else {
        name = data.dms.find(element => element.dmId === dmId).name;
    }

    for (const handle of arr) {
        const channelIndex = data.channels.findIndex(element => element.channelId === channelId);
        const inChannel = data.channels[channelIndex].allMembers.find(element => element.handleStr === handle);

        const dmIndex = data.dms.findIndex(element => element.dmId === dmId);
        const inDm = data.dms[dmIndex].members.find(element => element.handleStr === handle);

        if (inChannel !== undefined || inDm !== undefined) {
            const userIndex = data.users.findIndex(element => element.handleStr === handle);
            const notif = {
                channelId: channelId,
                dmId: dmId,
                notificationMessage: `{${tokenHandle}} tagged you in {${name}}: ${message.slice(0, 20)}`
            }
            data.users[userIndex].notifications.unshift(notif);
            setData(data);
        }

    }

}

export function addNotification(uId: number, channelId: number, dmId: number, token: string) {

    let data = getData();
    const tokenHandle = userObjToken(token).handleStr

    let name: string;
    if (dmId === -1) {
        name = data.channels.find(element => element.channelId === channelId).name;
    } else {
        name = data.dms.find(element => element.dmId === dmId).name;
    }

    const userIndex = data.users.findIndex(element => element.uId === uId);
    const notif = {
        channelId: channelId,
        dmId: dmId,
        notificationMessage: `{${tokenHandle}} added you to {${name}}`
    }
    data.users[userIndex].notifications.unshift(notif);
    setData(data);
}

export function reactNotification(messageId: number, token: string) {

    const tokenHandle = userObjToken(token).handleStr

    let data = getData();
    const Id = getIdFromMessage(messageId);

    let channelId: number = -1;
    let dmId: number = -1;
    let name: string;
    let uId: number;
    if (Id.type === 'channel') {
        channelId = Id.Id;
        name = data.channels.find(element => element.channelId === channelId).name;
        uId = Id.uId;
    } else {
        dmId = Id.Id;
        name = data.dms.find(element => element.dmId === dmId).name;
        uId = Id.uId;
    }

    const channelIndex = data.channels.findIndex(element => element.channelId === channelId);
    const inChannel = data.channels[channelIndex].allMembers.find(element => element.uId === uId);

    const dmIndex = data.dms.findIndex(element => element.dmId === dmId);
    const inDm = data.dms[dmIndex].members.find(element => element.uId === uId);

    if (inChannel !== undefined || inDm !== undefined) {
        const userIndex = data.users.findIndex(element => element.uId === uId);
        const notif = {
            channelId: channelId,
            dmId: dmId,
            notificationMessage: `{${tokenHandle}} reacted to your message in {${name}}`
        }
        data.users[userIndex].notifications.unshift(notif);
        setData(data);
    }

}

