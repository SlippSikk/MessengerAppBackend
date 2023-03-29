/*
import { getData, setData } from './dataStore';
import { isChannelIdValid, isTokenValid, isUserIdValid, getUIdFromToken, isOwner, getChannel } from './helper';
import { user, channel, dataTs } from './interfaces';


function channelJoinWhitebox(token: string, channelId: number) {
  const data: dataTs = getData();

  if (!isChannelIdValid(channelId)) {
    return { error: 'This channel does not exist' };
  }

  if (!isTokenValid(token)) {
    return { error: 'Invalid token' };
  }

  const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
  const authUserId: number = getUIdFromToken(token) as number;
  // checks if a non-global owner is joining a private channel

  if (!data.channels[channelIndex].isPublic && authUserId !== 1) {
    return { error: 'Regular users cannot join private channels' };
  }

  // checks if that user is already in the channel
  const channel: channel = data.channels[channelIndex];
  const hasUser: user = channel.allMembers.find(member => member.uId === authUserId);
  if (hasUser !== undefined) {
    return { error: 'This user is already in this channel' };
  }

  // finally adds user to channel
  data.channels[channelIndex].allMembers.push(getUser(authUserId));
  setData(data);

  return {};
}
*/