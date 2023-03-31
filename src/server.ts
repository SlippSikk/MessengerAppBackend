import express, { json, Request, Response } from 'express';
import { echo } from './echo';
import { authRegisterV2, authLoginV2, authLogoutV1 } from './auth';
import { dmCreateV1, dmLeaveV1, dmRemoveV1 } from './dm';
import { channelsCreateV2 } from './channels';
import { channelsListV2 } from './channels';
import { channelsListAllV2 } from './channels';

// import { channelInviteV2, channelJoinV2 } from './channel';
// import { channelDetailsV2, channelLeaveV1, channelAddownerV1 } from './channel';
import { clearV1 } from './other';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
// import { messageSend } from './messageSend';
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

// Example get request
app.get('/echo', (req: Request, res: Response, next) => {
  const data = req.query.echo as string;
  return res.json(echo(data));
});
/*
Import function messageSend
app.post('/message/send/v1', (req: Request, res: Response) => {
  const { token, channelId, message } = req.body;
  res.json(messageSend(token, parseInt(channelId), message));
});
*/
/*
app.post('/message/senddm/v1', (req: Request, res: Response) => {
  const { token, dmId, message } = req.body;

  res.json(messageSenddm(token, parseInt(dmId), message));
});
*/
/*
app.post('/channel/addowner/v1', (req: Request, res: Response) => {
  const { token, channelId, uId } = req.body;
  res.json(channelAddownerV1(token, parseInt(channelId), parseInt(uId)));
});
*/
/*
app.post('/channel/leave/v1', (req: Request, res: Response) => {
  const { token, channelId } = req.body;
  res.json(channelLeaveV1(token, parseInt(channelId)));
});
*/
/*
app.get('/channel/details/v2', (req: Request, res: Response, next) => {
  const token = req.query.token as string;
  const channelId = parseInt(req.query.channelId as string);
  res.json(channelDetailsV2(token, channelId));
});
*/
app.post('/auth/register/v2', (req: Request, res: Response) => {
  const { email, password, nameFirst, nameLast } = req.body;

  return res.json(authRegisterV2(email, password, nameFirst, nameLast));
});

app.post('/auth/login/v2', (req: Request, res: Response) => {
  const { email, password } = req.body;

  return res.json(authLoginV2(email, password));
});

app.post('/auth/logout/v1', (req: Request, res: Response) => {
  const { token } = req.body;

  return res.json(authLogoutV1(token));
});

app.post('/dm/create/v1', (req: Request, res: Response) => {
  const { token, uIds } = req.body;
  const Ids = uIds.map(function (x: string) {
    return parseInt(x, 10);
  });

  return res.json(dmCreateV1(token, Ids));
});

app.delete('/dm/remove/v1', (req: Request, res: Response) => {
  const token = req.query.token as string;
  const dmId = req.query.dmId as string;

  return res.json(dmRemoveV1(token, parseInt(dmId)));
});

app.post('/dm/leave/v1', (req: Request, res: Response) => {
  const { token, dmId } = req.body;

  return res.json(dmLeaveV1(token, parseInt(dmId)));
});

app.delete('/clear/v1', (req: Request, res: Response) => {
  return res.json(clearV1());
});

app.get('/channels/create/v2', (req: Request, res: Response) => {
  const token = req.query.token as string;
  const name = req.query.name as string;
  const isPublic = req.query.isPublic as string;

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

/*

app.put('/user/profile/sethandle/v1', (req: Request, res: Response) => {
  const { token, handleStr } = req.body;
  return res.json(userProfileSethandleV1(token, handleStr));
});

app.put('/user/profile/setemail/v1', (req: Request, res: Response) => {  //
  const { token, email } = req.body;
  return res.json(userProfileSetemailV1(token, email));
});

app.put('/user/profile/setname/v1', (req: Request, res: Response) => {    //everything about setname is fine... weird
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
*/
/*
app.post('/channel/join/v2', (req: Request, res: Response) => {
  const { token, channelId } = req.body;

  return res.json(channelsCreateV2(token, name, Boolean(isPublic)));
});

// app.get('/channels/list/v2', (req: Request, res: Response) => {
//   const token = req.query.token as string;

//   return res.json(channelsListV2(token));
// });


// app.post('/channel/join/v2', (req: Request, res: Response) => {
//   const { token, channelId } = req.body;

//   return res.json(channelJoinV2(token, channelId));
// });

// app.post('/channel/invite/v2', (req: Request, res: Response) => {
//   const { token, channelId, uId } = req.body;

//   return res.json(channelInviteV2(token, channelId, uId));
// });

/*
app.delete('/channel/removeowner/v1', (req: Request, res: Response) => {
  const token = req.query.token as string;
  const channelId = parseInt(req.query.channelId as string);
  const uId = parseInt(req.query.uId as string);
  return res.json(channelRemoveOwnerV1(token, channelId, uId));
});

*/

/*
app.get('/channel/messages/v2', (req: Request, res: Response) => {
  const token = req.query.token as string;
  const channelId = parseInt(req.query.channelId as string);
  const start = parseInt(req.query.start as string);
  return res.json(channelMessagesV2(token, channelId, start));
});

*/

/*
app.post('/message/edit/v1', (req: Request, res: Response) => {
  const { token, messageId, message } = req.body;

  return res.json(messageEditV1(token, messageId, message));
});

*/

/*

app.delete('/message/remove/v1', (req: Request, res: Response) => {
  const { token, messageId } = req.body;

  return res.json(messageRemoveV1(token, messageId));
});

*/
// start server
const server = app.listen(PORT, HOST, () => {
  // DO NOT CHANGE THIS LINE
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
