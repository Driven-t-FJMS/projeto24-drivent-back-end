import * as activityRepository from '@/repositories/activity-repository';

import { notFoundError, conflictError } from '@/errors';

export async function registerToActivity(enrollementId: number, activityId: number) {
  const activity = await activityRepository.findActivity(activityId);
  if (!activity) throw notFoundError();
  if (activity.vacancy <= 0) throw conflictError('Activity is full');

  const userActivity = await activityRepository.findUserActivity(enrollementId, activityId);
  if (userActivity) throw conflictError('User already registered to activity');

  return await activityRepository.register(enrollementId, activityId);
  /*await activityRepository.decreaseActivityVacancy(activityId, 1);
  return await activityRepository.registerToActivity(enrollementId, activityId);*/
}

export async function getUserActivities(enrollementId: number, eventId: number) {
  return await activityRepository.findUserActivies(enrollementId, eventId);
}

export async function getActivitiesByEventId(eventId: number) {
  return await activityRepository.findActiviesByEventId(eventId);
}
