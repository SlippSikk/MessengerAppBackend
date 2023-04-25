import { setData, getData } from "./dataStore";
import { userIndexToken, userObjToken, validateToken } from "./helper";
import HTTPError from 'http-errors';
import { usersStats } from "./interfaces";

export function userStatsV1(token: string) {
    if (!validateToken(token)) {
        throw HTTPError(403, 'Invalid Token');
      }
    
      const userObject = userObjToken(token);
      return { userStats: userObject.userStats };
}

export function usersStatsV1(token: string): {workspaceStats : usersStats} {
    let data = getData();
    if (!validateToken(token)) {
        throw HTTPError(403, 'Invalid Token');
      }
    
      return { workspaceStats : data.usersStats };
}
export function channelExistStats(Creating: boolean) {
    let data = getData();

    // Get users stats

    let usersStat = data.usersStats;

    // Get most recent num of channels Joined and either increase or decrease
    let recentNum = usersStat.channelsExist.slice(-1).pop().numChannelsExist;
    let chanData;
    chanData = {numChannelsExist: recentNum + 1, timeStamp: Math.floor((new Date()).getTime() / 1000)}

    // Push new stat and update data
    usersStat.channelsExist.push(chanData);

    
    data.usersStats = usersStat;

    setData(data);
    utilizationRate()
}
export function dmsExistStats(Creating: boolean) {
    let data = getData();

    // Get users stats

    let usersStat = data.usersStats;

    // Get most recent num of channels Joined and either increase or decrease
    let recentNum = usersStat.dmsExist.slice(-1).pop().numDmsExist;
    let dmData;
    if (Creating) {
        dmData = {numDmsExist: recentNum + 1, timeStamp: Math.floor((new Date()).getTime() / 1000)}
    } else {
        dmData = {numDmsExist: recentNum - 1, timeStamp: Math.floor((new Date()).getTime() / 1000)}
    }

    // Push new stat and update data
    usersStat.dmsExist.push(dmData);

    
    data.usersStats = usersStat;

    setData(data);
    utilizationRate()
}

export function msgExistStats(Creating: boolean, num: number) {
    let data = getData();

    // Get users stats

    let usersStat = data.usersStats;

    // Get most recent num of channels Joined and either increase or decrease
    let recentNum = usersStat.messagesExist.slice(-1).pop().numMessagesExist;
    let msgData;
    if (Creating) {
        msgData = {numMessagesExist: recentNum + num, timeStamp: Math.floor((new Date()).getTime() / 1000)}
    } else {
        msgData = {numMessagesExist: recentNum - num, timeStamp: Math.floor((new Date()).getTime() / 1000)}
    }

    // Push new stat and update data
    usersStat.messagesExist.push(msgData);

    
    data.usersStats = usersStat;

    setData(data);
    utilizationRate()}

function utilizationRate() {
    let data = getData();
    let joined = 0;
    for (const user of data.users) {
        const uId = user.uId
        const existChan = data.channels.find(element => element.allMembers.find(element => element.uId === uId));
        const existDm = data.dms.find(element => element.members.find(element => element.uId === uId));
        if (existChan !== undefined || existDm !== undefined) {
            joined++;
        }
    }
    let usersStat = data.usersStats;
    usersStat.utilizationRate = joined/data.users.length;
    data.usersStats = usersStat;

    setData(data);

}
//////////////////////// Helper Functions ///////////////////////
/**
 * Update user stats for channels
 * @param token 
 * @param joining 
 */
export function channelStats(uId: number, joining: boolean) {
    let data = getData();

    // Get users stats

    let userStat = data.users.find(element => element.uId === uId).userStats;

    // Get most recent num of channels Joined and either increase or decrease
    let recentNum = userStat.channelsJoined.slice(-1).pop().numChannelsJoined;
    let chanData;
    if (joining) {
        chanData = {numChannelsJoined: recentNum + 1, timeStamp: Math.floor((new Date()).getTime() / 1000)}
    } else {
        chanData = {numChannelsJoined: recentNum - 1, timeStamp: Math.floor((new Date()).getTime() / 1000)}
    }

    // Push new stat and update data
    userStat.channelsJoined.push(chanData);

    let userIndex = data.users.findIndex(element => element.uId === uId);
    data.users[userIndex].userStats = userStat;

    setData(data);
    involvement(uId);

}

export function dmStats(uId: number, joining: boolean) {
    let data = getData();

    // Get users stats
    let userStat = data.users.find(element => element.uId === uId).userStats;

    // Get most recent num of dms Joined and either increase or decrease
    let recentNum = userStat.dmsJoined.slice(-1).pop().numDmsJoined;
    let dmData;
    if (joining) {
        dmData = {numDmsJoined: recentNum + 1, timeStamp: Math.floor((new Date()).getTime() / 1000)}
    } else {
        dmData = {numDmsJoined: recentNum - 1, timeStamp: Math.floor((new Date()).getTime() / 1000)}
    }

    // Push new stat and update data
    userStat.dmsJoined.push(dmData);

    let userIndex = data.users.findIndex(element => element.uId === uId);
    data.users[userIndex].userStats = userStat;

    setData(data);
    involvement(uId);

}

export function msgStats(uId: number) {
    let data = getData();

    // Get users stats
    let userStat = data.users.find(element => element.uId === uId).userStats;

    // Get most recent num of messages sent and increase count
    let recentNum = userStat.messagesSent.slice(-1).pop().numMessagesSent;
    let msgData;
    msgData = {numMessagesSent: recentNum + 1, timeStamp: Math.floor((new Date()).getTime() / 1000)}

    // Push new stat and update data
    userStat.messagesSent.push(msgData);

    let userIndex = data.users.findIndex(element => element.uId === uId);
    data.users[userIndex].userStats = userStat;

    setData(data);
    involvement(uId);

}

function involvement(uId: number) {
    let data = getData();

    // Grab total number of messages, dms and channels
    let msgTotal = 0;
    let dmTotal = data.dms.length;
    let channelTotal = data.channels.length;
    for (const channel of data.channels) {
        msgTotal += channel.messages.length;
    }
    for (const dm of data.dms) {
        msgTotal += dm.messages.length;
    }

    // Get users stats
    let userStat = data.users.find(element => element.uId === uId).userStats;
    const numChan = userStat.channelsJoined.slice(-1).pop().numChannelsJoined;
    const numDm =  userStat.dmsJoined.slice(-1).pop().numDmsJoined;
    const numMsg =  userStat.messagesSent.slice(-1).pop().numMessagesSent;

    // Calcualte involvement
    let involvement;
    const denominator = (msgTotal + dmTotal + channelTotal);
    if (denominator === 0) {
        involvement = 0;
    }
    involvement = (numChan + numDm + numMsg)/denominator;
    if (involvement > 1) {
        involvement = 1;
    }
    userStat.involvementRate = involvement;

    let userIndex = data.users.findIndex(element => element.uId === uId);

    data.users[userIndex].userStats = userStat;

    setData(data);
}