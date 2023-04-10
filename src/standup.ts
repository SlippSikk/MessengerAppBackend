import HTTPError from 'http-errors';
import { getData, setData } from './dataStore';
import { standupActive, dataTs, channel, timeFinish } from './interfaces';
import { getUIdFromToken, isChannelIdValid, isMember, validateToken, getChannel, getUser, createMessageId } from './helper';


function sendMessages(channelId: number, uId: number) {
  const channel: channel = getChannel(channelId) as channel;
  const message: string = channel.standup.standupMessage;

  if (message.length === 0) {
    return {};
  }

  const data: dataTs = getData();
  const messageId = createMessageId();
  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  data.channels[channelIndex].messages.push({
    messageId: messageId,
    uId: uId,
    message: message,
    timeSent: ~~(new Date().getTime() / 1000)
  });

  data.channels[channelIndex].standup.isActive = false;
  data.channels[channelIndex].standup.timeFinish = null;
  data.channels[channelIndex].standup.authUserId = null;
  data.channels[channelIndex].standup.standupMessage = '';
  setData(data);
}

export function standupStartV1(token: string, channelId: number, length: number): timeFinish {
  const data: dataTs = getData();

  if (!validateToken(token)) {
    throw HTTPError(403, "Invalid token");
  }
  
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, "Invalid ChannelId");
  }

  if (length < 0) {
    throw HTTPError(400, "The length of a standup must be positive");
  }

  if (standupActiveV1(token, channelId).isActive) {
    throw HTTPError(400, "A standup is already running in this channel");
  }

  const uId = getUIdFromToken(token);
  if (!isMember(channelId, uId)) {
    throw HTTPError(403, "This user does not have the correct permissions");
  }

  const timeFinish = Math.floor(Date.now() / 1000) + length;

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  data.channels[channelIndex].standup.isActive = true;
  data.channels[channelIndex].standup.timeFinish = timeFinish;
  data.channels[channelIndex].standup.authUserId = uId;

  setData(data);
  setTimeout(() => sendMessages(channelId, uId), length * 1000);

  return {timeFinish: timeFinish}
}


export function standupActiveV1(token: string, channelId: number): standupActive {
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, "Invalid ChannelId");
  }

  if (!validateToken(token)) {
    throw HTTPError(403, "Invalid Token");
  }

  const uId: number = getUIdFromToken(token);
  if (!isMember(channelId, uId)) {
    throw HTTPError(403, "This authorised user is not a member of this channel");
  }

  const channel: channel = getChannel(channelId) as channel;
  const returnObj: standupActive = {
    isActive: channel.standup.isActive,
    timeFinish: channel.standup.timeFinish
  }
  
  return returnObj;
}

export function standupSendV1(token: string, channelId: number, message: string) {
  const data: dataTs = getData();
  if (!validateToken(token)) {
    throw HTTPError(403, "Invalid token");
  }
  
  if (!isChannelIdValid(channelId)) {
    throw HTTPError(400, "Invalid ChannelId");
  }

  if (message.length > 1000) {
    throw HTTPError(400, "Messages cannot be longer than 1000 characters");
  }

  if (!standupActiveV1(token, channelId).isActive) {
    throw HTTPError(400, "A standup is not running in this channel");
  }

  const uId = getUIdFromToken(token);
  if (!isMember(channelId, uId)) {
    throw HTTPError(403, "This user does not have the correct permissions");
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const userhandle: string = getUser(uId).handleStr;

  data.channels[channelIndex].standup.standupMessage += userhandle + ": " + message + '\n';
  setData(data);

  return {};
}