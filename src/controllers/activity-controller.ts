import * as activityService from '@/services/activity-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function registerToActivity(req: Request, res: Response) {
  const { enrollementId, activityId } = req.body;

  const userActivity = await activityService.registerToActivity(enrollementId, activityId);

  return res.status(httpStatus.CREATED).send(userActivity);
}

export async function getUserActivities(req: Request, res: Response) {
    const { enrollementId, eventId } = req.body;
    
    const activities = await activityService.getUserActivities(enrollementId, eventId);
    
    return res.status(httpStatus.OK).send(activities);
}

export async function getActivitiesByEventId(req: Request, res: Response) {
    const { eventId } = req.params;
    
    const activities = await activityService.getActivitiesByEventId(Number(eventId));
    
    return res.status(httpStatus.OK).send(activities);
}