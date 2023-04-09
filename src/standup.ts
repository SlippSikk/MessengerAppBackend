import HTTPError from 'http-errors';
import { getData, setData } from './dataStore';
import { standupActive, dataTs, channel } from './interfaces';
import { getUIdFromToken, isChannelIdValid, isMember, validateToken, getChannel } from './helper';


export function standupActiveV1(token: string, channelId: number): standupActive {
  const data: dataTs = getData();
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