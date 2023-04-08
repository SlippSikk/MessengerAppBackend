import express, { json, Request, Response } from 'express';
import { echo } from './echo';
import { authRegisterV3, authLoginV3, authLogoutV2 } from './auth';
import { dmCreateV2, dmLeaveV2, dmRemoveV2, dmDetailsV1, dmMessagesV1, dmListV1 } from './dm';
import { channelsListAllV2, channelsListV2, channelsCreateV2 } from './channels';
import { channelDetailsV2, channelLeaveV1, channelAddownerV1, channelInviteV2, channelJoinV2, channelRemoveOwnerV1, channelMessagesV2 } from './channel';
import { userProfileSethandleV1, userProfileSetemailV1, userProfileSetnameV1, usersAllV1, userProfileV2 } from './users';
import { messageSenddmV1, messageSendV1, messageEditV1, messageRemoveV1 } from './message';

import { clearV1 } from './other';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import errorHandler from 'middleware-http-errors';

// Set up web app
const app = express();
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware that allows for access from other domains
app.use(cors());
// for logging errors (print to terminal)
app.use(morgan('dev'));

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || 'localhost';

app.get('/echo', (req: Request, res: Response, next) => {
  const data = req.query.echo as string;
  return res.json(echo(data));
});



app.post('/message/send/v1', (req: Request, res: Response) => {
  const { token, channelId, message } = req.body;
  res.json(messageSendV1(token, parseInt(channelId), message));
});

app.post('/message/senddm/v1', (req: Request, res: Response) => {
  const { token, dmId, message } = req.body;

  res.json(messageSenddmV1(token, parseInt(dmId), message));
});

app.put('/message/edit/v1', (req: Request, res: Response) => {
  const { token, messageId, message } = req.body;

  return res.json(messageEditV1(token, messageId, message));
});

app.delete('/message/remove/v1', (req: Request, res: Response) => {
  const token = req.query.token as string;
  const messageId = parseInt(req.query.messageId as string);

  return res.json(messageRemoveV1(token, messageId));
});

app.post('/channel/addowner/v1', (req: Request, res: Response) => {
  const { token, channelId, uId } = req.body;
  res.json(channelAddownerV1(token, parseInt(channelId), parseInt(uId)));
});

app.post('/channel/leave/v1', (req: Request, res: Response) => {
  const { token, channelId } = req.body;
  res.json(channelLeaveV1(token, parseInt(channelId)));
});

app.get('/channel/details/v2', (req: Request, res: Response, next) => {
  const token = req.query.token as string;
  const channelId = parseInt(req.query.channelId as string);
  res.json(channelDetailsV2(token, channelId));
});

app.post('/channel/join/v2', (req: Request, res: Response) => {
  const { token, channelId } = req.body;

  return res.json(channelJoinV2(token, parseInt(channelId)));
});

app.post('/channel/invite/v2', (req: Request, res: Response) => {
  const { token, channelId, uId } = req.body;

  return res.json(channelInviteV2(token, channelId, uId));
});

app.post('/channel/removeowner/v1', (req: Request, res: Response) => {
  const { token, channelId, uId } = req.body;
  return res.json(channelRemoveOwnerV1(token, channelId, uId));
});

app.get('/channel/messages/v2', (req: Request, res: Response) => {
  const token = req.query.token as string;
  const channelId = parseInt(req.query.channelId as string);
  const start = parseInt(req.query.start as string);
  return res.json(channelMessagesV2(token, channelId, start));
});

app.post('/auth/register/v3', (req: Request, res: Response) => {
  const { email, password, nameFirst, nameLast } = req.body;

  return res.json(authRegisterV3(email, password, nameFirst, nameLast));
});

app.post('/auth/login/v3', (req: Request, res: Response) => {
  const { email, password } = req.body;

  return res.json(authLoginV3(email, password));
});

app.post('/auth/logout/v2', (req: Request, res: Response) => {
  const token = req.header('token');
  return res.json(authLogoutV2(token));
});

app.post('/dm/create/v2', (req: Request, res: Response) => {
  const { uIds } = req.body;
  const token = req.header('token');

  return res.json(dmCreateV2(token, uIds));
});

app.get('/dm/list/v1', (req: Request, res: Response) => {
  const token = req.header('token');

  return res.json(dmListV1(token));
});

app.get('/dm/details/v1', (req: Request, res: Response) => {
  const dmId = req.query.dmId as string;
  const token = req.header('token');

  return res.json(dmDetailsV1(token, parseInt(dmId)));
});

app.delete('/dm/remove/v2', (req: Request, res: Response) => {
  const token = req.header('token');
  const dmId = req.query.dmId as string;

  return res.json(dmRemoveV2(token, parseInt(dmId)));
});

app.post('/dm/leave/v2', (req: Request, res: Response) => {
  const { dmId } = req.body;
  const token = req.header('token');

  return res.json(dmLeaveV2(token, parseInt(dmId)));
});

app.get('/dm/messages/v1', (req: Request, res: Response) => {
  const token = req.header('token');
  const dmId = req.query.dmId as string;
  const start = req.query.start as string;

  return res.json(dmMessagesV1(token, parseInt(dmId), parseInt(start)));
});

app.post('/channels/create/v2', (req: Request, res: Response) => {
  const { token, name, isPublic } = req.body;

  return res.json(channelsCreateV2(token, name, Boolean(isPublic)));
});

app.get('/channels/list/v2', (req: Request, res: Response) => {
  const token = req.query.token as string;

  return res.json(channelsListV2(token));
});

app.get('/channels/listall/v2', (req: Request, res: Response) => {
  const token = req.query.token as string;

  return res.json(channelsListAllV2(token));
});

app.put('/user/profile/sethandle/v1', (req: Request, res: Response) => {
  const { token, handleStr } = req.body;
  return res.json(userProfileSethandleV1(token, handleStr));
});

app.put('/user/profile/setemail/v1', (req: Request, res: Response) => { //
  const { token, email } = req.body;
  return res.json(userProfileSetemailV1(token, email));
});

app.put('/user/profile/setname/v1', (req: Request, res: Response) => { // everything about setname is fine... weird
  const { token, nameFirst, nameLast } = req.body;
  return res.json(userProfileSetnameV1(token, nameFirst, nameLast));
});

app.get('/users/all/v1', (req: Request, res: Response) => {
  const token = req.query.token as string;
  return res.json(usersAllV1(token));
});

app.get('/user/profile/v2', (req: Request, res: Response) => {
  const token = req.query.token as string;
  const uId = parseInt(req.query.uId as string);
  return res.json(userProfileV2(token, uId));
});

app.delete('/clear/v1', (req: Request, res: Response) => {
  return res.json(clearV1());
});

// Keep this BENEATH route definitions
// handles errors nicely
app.use(errorHandler());

// start server
const server = app.listen(PORT, HOST, () => {
  // DO NOT CHANGE THIS LINE
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
