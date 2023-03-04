import { clearV1 } from './other.js'
import { channelJoinV1 } from '../channel.js'
import { authRegisterV1 } from '../auth.js'
import { channelsCreateV1 } from '../channels.js'
import {getData} from '../dataStore'


//because it's a black box test, I find that I can test nothing but the return value.

  
  
  const userA = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li')
  
  const channelID1 = channelsCreateV1(userA, 'Channel 1', true)
 
  const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui')
  
  const channelID2 = channelsCreateV1(authID2, 'Channel 2', true) 

  const authID3 = authRegisterV1('lion@qq.com', 'asduif8195', 'agsdfoj', 'antman')


 
describe("return value of clear", () => {
  test('Correct Inputs', () => {
      
      expect(clearV1()).toStrictEqual({});
  });
});




