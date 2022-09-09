import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

import * as activityController from '@/controllers/activity-controller';

const activityRouter = Router();

activityRouter
  .all('/*', authenticateToken)
  .post('/register', activityController.registerToActivity)
  .post('/', activityController.getUserActivities)
  .get('/:eventId', activityController.getActivitiesByEventId);

export { activityRouter };
