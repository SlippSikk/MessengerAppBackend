
/*
import { getData, setData } from './dataStore';
import { isTokenValid, isMessageInChannel, getDm, getUser, findChannelIndexWithMessage, getUIdFromToken, isOwnerByToken, isMember, isMessageInDM, findDMIndexWithMessage } from './helper';
import { dataTs, channel, dms } from './interfaces';

const isDmMember = (dmId: number, token: string): boolean => {
    const uId = getUIdFromToken(token) as number;
    const dm = getDm(dmId) as dms;
    return dm.members.find(dmMember => dmMember.uId === uId) !== undefined;
}
export function messageEditV1(token: string, messageId: number, message: string) {
    const data: dataTs = getData();
    if (message.length > 1000) {
      return { error: 'Messages cannot be longer than 1000 characters' };
    }

    if (!isTokenValid(token)) {
      return { error: 'Invalid token' };
    }

    if (isMessageInChannel(messageId)) {
      const channelIndex: number = findChannelIndexWithMessage(messageId);
      const channel: channel = data.channels[channelIndex];
      const currentMessage = channel.messages.find(message => message.messageId === messageId);
      const authUserId: number = getUIdFromToken(token) as number;
      if (!isMember(channel.channelId, authUserId) && authUserId !== 1) {
        return {error: 'This user is not a member of this channel'};
      }

      if (!isOwnerByToken(channel.channelId, token) && currentMessage.uId !== authUserId && authUserId !== 1) {
        return { error: 'authUser does not have correct privileges' };
      }

      if (message.length === 0) {
        data.channels[channelIndex].messages = data.channels[channelIndex].messages.filter(message => message.messageId !== messageId);
      } else {
        const messageIndex: number = channel.messages.findIndex(message => message.messageId === messageId);
        data.channels[channelIndex].messages[messageIndex].message = message;
      }
      setData(data);
      return {};

    } else if (isMessageInDM(messageId)) {
      const dmIndex: number = findDMIndexWithMessage(messageId);
      const dm: dms = data.dms[dmIndex];
      const currentMessage = dm.messages.find(message => message.messageId === messageId);
      const authUserId: number = getUIdFromToken(token) as number;

      if (dm.creator.uId !== authUserId && currentMessage.uId !== authUserId) {
        return { error: 'authUser does not have correct privileges' };
      }

      if (dm.creator.uId !== authUserId && !isDmMember(dm.dmId, token)) {
        console.log('This user is not a member of this DM');
      }

      if (message.length === 0) {
        data.dms[dmIndex].messages = data.dms[dmIndex].messages.filter(message => message.messageId !== messageId);
      } else {
        const messageIndex: number = dm.messages.findIndex(message => message.messageId === messageId);
        data.dms[dmIndex].messages[messageIndex].message = message;
      }
      setData(data);
      console.log(data.dms[dmIndex].messages)
      return {};
    }

    return { error: 'MessageID is invalid' };
  }

*/
