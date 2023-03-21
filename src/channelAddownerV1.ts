
/**
 * @param {
 * Reminder :
 * 1. get data is no working
 * 2. is..valid functions is working and HAS PRESISTENCE (accessing)
 * 3. 
 * 
 * }
 * 
 * 
 */





// Make user with user id uId an owner of the channel.
app.get('/channel/addowner/v1', (req: Request, res: Response) => {
  const { token, channelId, uId} = req.body;
  res.json(channelAddowner(token, parseInt(channelId), parseInt(uId)));
});

/**
 * 
 * @param uId 
 * @sum Makes uId owner of channelId
 */
const channelAddowner = (uId: number, channelId : number) => {
  // Error handle
  //1. channelId invalid
  if (!isChannelIdValid()) {
    return {error: 'channelId invalid'};
  }
  if (!isUserIdValid()) {
    return { error: 'Invalid uId' };
  }
  if (!isMemberOfChannel()) {
    return { error: 'uId is not a member of channelId' };
  }
  if (!isOwner()) {
    return { error: 'uId is already owner' };
  }
  if (!hasOwnerPermission()) {
    return { error: 'uId does not have owner permissions' };
  }
  if (!isTokenValid()) {
    return { error: 'invalid token' }
  }
  // end of error handle
  // ADD NOTESSSS
  const data = getdata();
  
  // is this coppying the same location or not?
  // BELOW REQUIRES SEVERAL STEPS OF PRESISTENCE
  const channel = getChannel(channelId);
  channel.ownerMembers.push(uId);
  return {};
}

/**
 * 
 * @param channelId 
 * @returns the channel object or false
 * @sum get the channel object of channelId
 */
const getChannel = (channelId: number) => {
  const data = getData();
  const channel = data.channels.find(a => a.channelId === channelId);
  return channel ? channel : false;
}

/**
 * 
 * @param channelId 
 * @param uId 
 * @returns  true/false 
 * @summary check if uId is member of channelId
 */
const isMemberOfChannel = (channelId: number, uId: number): boolean => {
  const channel = getChannel(channelId);
  const value = channel.allMembers.find(a => a === uId);
  return value? value : false;
}

/**
 * 
 * @param channelId 
 * @param uId 
 * @returns  true/false 
 * @summary checks if uId is Owner of channelId
 */
const isOwner = (channelId: number, uId: number): boolean => {
  const channel = getChannel(channelId);
  const value = channel.ownerMembers.find(a => a === uId);
  return value? true : false;
} 

const hasOwnerPermission = () => {

}

const isTokenValid = () => {

}