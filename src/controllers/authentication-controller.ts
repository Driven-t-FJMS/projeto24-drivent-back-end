import authenticationService, { SignInParams } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });

  res.status(httpStatus.OK).send(result);
}

export async function singInPostOAuth(req: Request, res: Response) {
  const token = await authenticationService.codeForAccessToken(req);
  const user = await authenticationService.fetchUser(token);

  const instanceUser = await authenticationService.createUserAndSession(user.email);
  res.status(httpStatus.OK).send(instanceUser);
}
