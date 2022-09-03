import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import qs from 'query-string';
import axios from 'axios';

import sessionRepository from '@/repositories/session-repository';
import userService from '@/services/users-service';
import userRepository from '@/repositories/user-repository';
import { exclude } from '@/utils/prisma-utils';
import { User } from '@prisma/client';
import { invalidCredentialsError } from './errors';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function codeForAccessToken(req: Request) {
  const code = req.body.code;

  const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const params = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.GITHUB_REDIRECT,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataObject = qs.parse(data);
  return dataObject.access_token;
}

async function fetchUser(token: string | string[]) {
  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

async function createUserAndSession(email: string) {
  await userService.canEnrollOrFail();
  await createUserOrNot(email);

  const user = await getUserOrFailAuthGitHub(email);
  const tokenJWT = await createSession(user.id);

  return {
    user,
    token: tokenJWT,
  };
}

async function getUserOrFailAuthGitHub(email: string) {
  const user = await userRepository.findByEmail(email, { id: true, email: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createUserOrNot(email: string) {
  const userFound = await userRepository.findByEmail(email, { id: true, email: true });
  if (userFound) return;
  else await userRepository.create({ email });
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  codeForAccessToken,
  fetchUser,
  createUserAndSession,
};

export default authenticationService;
export * from './errors';
