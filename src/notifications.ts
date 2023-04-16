// import { channel } from 'diagnostics_channel';
import HTTPError from 'http-errors';
import { getData, setData } from './dataStore';
import { getIdFromMessage, userObjToken, validateToken } from './helper';
import { channels, notifications } from './interfaces';
// import { getIdFromMessage } from './helper';
// : notifications[] (add to function return type)
export function notificationsGet(token: string): { notifications: notifications[] } {
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid Token');
  }

  const userObject = userObjToken(token);
  return { notifications: userObject.notifications };
}

// Add to messegesend messagesenddm  and message edit
export function tagChannelNotification(message: string, channelId: number, token: string) {
  const regex = /@\w+/g;
  const handles = message.match(regex);
  const handleArr = handles ? handles.map(handle => handle.slice(1)) : [];
  const handleSet = new Set<string>(handleArr);
  const arr = Array.from(handleSet);

  const tokenHandle = userObjToken(token).handleStr;

  const data = getData();

  const name = data.channels.find(element => element.channelId === channelId).name;

  for (const handle of arr) {
    const channelIndex = data.channels.findIndex(element => element.channelId === channelId);
    const inChannel = data.channels[channelIndex].allMembers.find(element => element.handleStr === handle);

    if (inChannel !== undefined) {
      const userIndex = data.users.findIndex(element => element.handleStr === handle);
      const notif = {
        channelId: channelId,
        dmId: -1,
        notificationMessage: `{${tokenHandle}} tagged you in {${name}}: ${message.slice(0, 20)}`
      };
      data.users[userIndex].notifications.unshift(notif);
      setData(data);
    }
  }
}

export function tagDmNotification(message: string, dmId: number, token: string) {
  const regex = /@\w+/g;
  const handles = message.match(regex);
  const handleArr = handles ? handles.map(handle => handle.slice(1)) : [];
  const handleSet = new Set<string>(handleArr);
  const arr = Array.from(handleSet);

  const tokenHandle = userObjToken(token).handleStr;

  const data = getData();

  const name = data.dms.find(element => element.dmId === dmId).name;

  for (const handle of arr) {
    const dmIndex = data.dms.findIndex(element => element.dmId === dmId);
    const inDm = data.dms[dmIndex].members.find(element => element.handleStr === handle);

    if (inDm !== undefined) {
      const userIndex = data.users.findIndex(element => element.handleStr === handle);
      const notif = {
        channelId: -1,
        dmId: dmId,
        notificationMessage: `{${tokenHandle}} tagged you in {${name}}: ${message.slice(0, 20)}`
      };
      data.users[userIndex].notifications.unshift(notif);
      setData(data);
    }
  }
}

// Add to channelInvite
export function addNotification(uId: number, channelId: number, dmId: number, token: string) {
  const data = getData();
  const tokenHandle = userObjToken(token).handleStr;

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
  };
  data.users[userIndex].notifications.unshift(notif);
  setData(data);
}

// add to message react
export function reactNotification(messageId: number, token: string) {

  const tokenHandle = userObjToken(token).handleStr

  let data = getData();
  const Id = getIdFromMessage(messageId);

  let channelId: number = -1;
  let dmId: number = -1;
  let name: string;
  let uId: number;
  let inChannel = undefined;
  let inDm = undefined;
  if (Id.type === 'channel') {
    channelId = Id.Id;
    name = data.channels.find(element => element.channelId === channelId).name;
    uId = Id.uId;
  } else {
    dmId = Id.Id;
    name = data.dms.find(element => element.dmId === dmId).name;
    uId = Id.uId;
  }

  if (dmId == -1) {
    const channelIndex = data.channels.findIndex(element => element.channelId === channelId);
    inChannel = data.channels[channelIndex].allMembers.find(element => element.uId === uId);
  } else {
    const dmIndex = data.dms.findIndex(element => element.dmId === dmId);
    inDm = data.dms[dmIndex].members.find(element => element.uId === uId);

  }

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
