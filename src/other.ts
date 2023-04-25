/**
 * Resets the internal data of the application to its initial state
 * @param none
 * @returns {{}}
 */
import { setData } from './dataStore';
import { dataTs } from './interfaces';
export function clearV1() {
  const stats = {
      channelsExist: [{numChannelsExist: 0, timeStamp: Math.floor((new Date()).getTime() / 1000)}],
      dmsExist: [{numDmsExist: 0, timeStamp: Math.floor((new Date()).getTime() / 1000)}], 
      messagesExist: [{numMessagesExist: 0, timeStamp: Math.floor((new Date()).getTime() / 1000)}], 
      utilizationRate: 0 
      
  }
  const iniData: dataTs = {
    users: [],
    channels: [],
    dms: [],
    deletedUsers: [],
    usersStats: stats
    
  };
  setData(iniData);

  return {};
}
