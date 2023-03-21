

function requestChannelLeave(token: string, channelId: number) {
  const res = request(
      'POST',
      SERVER_URL + '/channel/leave/v1',
      {
        json: {
          token: token,
          channelId: channelId,
        }
      }
  );
    return JSON.parse(res.getBody() as string);
}

describe('Error Cases', () => {
  beforeEach(() => {
       
  });
  test('Invalid channelId', () => {
    expect().toStrictEqual(ERROR);
  });
  test('Authorised user is not a member of the channel', () => {
    expect().toStrictEqual(ERROR);

  });
  test('Invalid channelId', () => {
    expect().toStrictEqual(ERROR);
  });
});
   

