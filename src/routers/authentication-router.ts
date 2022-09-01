import { singInPost, singInPostOAuth } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema, codeAuthGitHub } from '@/schemas';
import { Router } from 'express';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.post('/sign-in/github', validateBody(codeAuthGitHub), singInPostOAuth);

export { authenticationRouter };
