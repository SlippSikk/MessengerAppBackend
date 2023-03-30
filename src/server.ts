import express, { json, Request, Response } from 'express';
import { echo } from './echo';
import { authRegisterV2, authLoginV2, authLogoutV1 } from './auth';
import { dmCreateV1, dmLeaveV1, dmRemoveV1 } from './dm';
import { clearV1 } from './other.js';
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
app.post('/channel/addowner/v1', (req: Request, res: Response) => {
  const { token, channelId, uId } = req.body;
  res.json(addownerV1(token, parseInt(channelId), parseInt(uId)));
});
*/
/*
app.post('/channel/leave/v1', (req: Request, res: Response) => {
  const { token, channelId } = req.body;
  res.json(channelLeaveV1(token, parseInt(channelId)));
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

/*
app.post('/channel/join/v2', (req: Request, res: Response) => {
  const { token, channelId } = req.body;

  return res.json(channelJoinV2(token, channelId));
});

*/
/*
app.post('/channel/invite/v2', (req: Request, res: Response) => {
  const { token, channelId, uId } = req.body;

  return res.json(channelInviteV2(token, channelId, uId));
});

*/

/*
app.delete('/channel/removeowner/v1', (req: Request, res: Response) => {
  const token = req.query.token as string;
  const channelId = parseInt(req.query.channelId as string);
  const uId = parseInt(req.query.uId as string);
  return res.json(channelRemoveOwnerV1(token, channelId, uId));
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
