import { clearV1 } from '../other.js';

import { authRegisterV1 } from '../auth.js';
import { channelsCreateV1 } from '../channels.js';







const userA = authRegisterV1('gura@gmail.com', '114514810', 'huaizhi', 'li');

const channelID1 = channelsCreateV1(userA, 'Channel 1', true);

const authID2 = authRegisterV1('Ina@outlook.com', 'asdgf8', 'me', 'vasdui');

const channelID2 = channelsCreateV1(authID2, 'Channel 2', true);

const authID3 = authRegisterV1('lion@qq.com', 'asduif8195', 'agsdfoj', 'antman');



describe("three tests", () => {
  test('Correct return value', () => {

    expect(clearV1()).toStrictEqual({});
  });

  /*  two test should be added
    test('clear the userMember', () => {
        
      expect(clearV1()).toStrictEqual({});
  });
  
  
  test('clear the channelDetails', () => {
        
    expect(clearV1()).toStrictEqual({});
  });*/


});




