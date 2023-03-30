/*
import { getData, setData } from './dataStore';
import { isChannelIdValid, isTokenValid, isUserIdValid, getUIdFromToken, isOwner, getChannel } from './helper';
import { user, channel, dataTs } from './interfaces';

function channelInviteV2(token: string, channelId: number, uId: number) {
    const data: dataTs = getData();
    if (!isChannelIdValid(channelId)) {
      return { error: 'This channel does not exist' };
    }

    if (!isTokenValid(token)) {
      return { error: 'Invalid token' };
    }

    if (!isUserIdValid(uId)) {
      return { error: 'The invitee does not exist' };
    }

    // can safely assume authUserId is a number as token must be valid from above
    const authUserId: number = getUIdFromToken(token) as number;

    if (authUserId === uId && authUserId !== 1) {
      return { error: 'A user cannot invite themselves' };
    }

    const channelIndex: number = data.channels.findIndex(channel => channel.channelId === channelId);
    const channel: channel = data.channels[channelIndex];
    const hasUser: user = channel.allMembers.find(member => member.uId === uId);
    const hasAuthUser: user = channel.allMembers.find(member => member.uId === authUserId);
    if (hasUser !== undefined) {
      return { error: 'This user is already in this channel' };
    } else if (hasAuthUser === undefined && authUserId !== 1) {
      return { error: 'This auth user is not in the channel' };
    }

    // finally adds user to channel
    data.channels[channelIndex].allMembers.push(getUser(uId));
    setData(data);
    return {};
  }
  */
